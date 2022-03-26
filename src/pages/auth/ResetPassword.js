import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Button, Link, Typography } from '@mui/material';
import { PATH_AUTH } from '../../routes/paths';
import { ResetPasswordForm } from '../../sections/auth/reset-password';
import { SentIcon } from '../../assets';
import AuthPage from '../../components/AuthPage';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <AuthPage title="Forgot Password">
      {!sent ? (
        <>
          <Typography sx={{ color: 'text.secondary', mt:2, mb: 10 }} align="center">
            To reset your password, kindly enter the email you used to create this account
          </Typography>
          <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Return to{' '}
            <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
              Login
            </Link>
          </Typography>
        </>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

          <Typography variant="h3" gutterBottom>
            Request sent successfully
          </Typography>
          <Typography>
            We have sent a confirmation email to &nbsp;
            <strong>{email}</strong>
            <br />
            Please check your email.
          </Typography>

          <Button size="large" variant="contained" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 5 }}>
            Back
          </Button>
        </Box>
      )}
    </AuthPage>
  );
}
