import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Link, FormControlLabel, Checkbox  } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const RegisterSchema1 = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
   
  });
  const RegisterSchema2 = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('ConfirmPassword is required').oneOf([Yup.ref("password"), null], "password doesn't match"),
    termsOfService: Yup.boolean().oneOf([true], 'You must check this terms of service'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsOfService: false,
  };

  const methods = useForm({
    resolver: yupResolver(step===1?RegisterSchema1:RegisterSchema2),
    defaultValues,
  });

  const {
    reset,

    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    if(step===1){
      setStep(2)
      return;
    }
    try {
      // await register(data.email, data.password, data.firstName, data.lastName);
      navigate(PATH_AUTH.verify, { replace: true });
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        {step===1? (
          <>
            <RHFTextField name="firstName" label="First Name" />
            <RHFTextField name="lastName" label="Last Name" />
            <RHFTextField name="phone" label="Phone Number" />
            <RHFTextField name="email" label="Email Address" />
            <RHFTextField name="bvn" label="BVN" />
          </>
        ):( 
          <>
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            style={{marginTop: '50px'}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            style={{marginTop: '20px'}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div style={{marginBottom: '50px'}}>
            {/* <FormControlLabel control={<Checkbox />} name="termsOfService" label="Creating an account means you’ve accepted our"/> */}
            <RHFCheckbox name="termsOfService" label="Creating an account means you’ve accepted our"/>
            <Link variant="subtitle2" component={RouterLink} to={'#'}>
                Terms of Service
              </Link>
          </div>
        </>
        )}
        {step===1? (
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
            Next
          </LoadingButton>):(
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} >
            Register
          </LoadingButton>
        )}
      </Stack>
    </FormProvider>
  );
}
