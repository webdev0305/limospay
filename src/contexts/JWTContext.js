import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user, tokenOTP } = action.payload;
    return {
      ...state,
      isAuthenticated: false,
      tokenOTP,
      user
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  verify: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/account/my-account');
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/api/user/login', {
      email,
      password,
    });
    const { success, message, accessToken, user } = response.data;
    if(success) {
      setSession(accessToken);
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
    } else {
      throw Error(message)
    }
  };

  const register = async (data) => {
    const response = await axios.post('/api/user/register', {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phoneNumber: data.phoneNumber,
      bvn: data.bvn
    });
    const { success, message, user, token } = response.data;

    if(success) {
      if(user && user.status===1)
        return false
      dispatch({
        type: 'REGISTER',
        payload: { tokenOTP: token, user }
      });
    } else
      throw Error(message)
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const verify = async (action, code) => {
    const response = await axios.post(`/api/user/verify/${action}`, {
      id: state.user?.id,
      code,
    }, {
      headers: {
        'OTP-Token': state.tokenOTP
      }
    });
    const { success, message } = response.data;

    // if(success) {
    //   dispatch({
    //     type: 'REGISTER',
    //     payload: { user }
    //   });
    // }
    if(!success)
      throw Error(message)
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        verify
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
