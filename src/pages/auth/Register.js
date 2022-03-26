import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
import { RegisterForm } from '../../sections/auth/register';
import AuthPage from '../../components/AuthPage';

export default function Register() {
  return (
    <AuthPage title="Create Account with us">
      <RegisterForm />
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account?{' '}
        <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
          Login
        </Link>
      </Typography>
    </AuthPage>
  );
}
