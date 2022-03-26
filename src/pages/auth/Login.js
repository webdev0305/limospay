import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@mui/material';
import { PATH_AUTH } from '../../routes/paths';
import { LoginForm } from '../../sections/auth/login';
import AuthPage from '../../components/AuthPage';

export default function Login() {
  return (
    <AuthPage title="Login to your Account">
      <LoginForm/>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Don’t have an account?{' '}
        <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
          Register
        </Link>
      </Typography>
    </AuthPage>
  )
}
