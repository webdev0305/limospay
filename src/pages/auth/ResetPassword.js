import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Button, Container, Typography } from '@mui/material';
import LeftSection from './LeftSection';
// routes
import { PATH_AUTH } from '../../routes/paths';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';
// assets
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100vh',
  },
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  width: 600,
  // margin: 'auto',
  display: 'flex',
  height: 787,
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(0, 5),
  borderTop: '10px solid #00008B',
  borderRadius: '10px',
}));


// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const mdUp = useResponsive('up', 'md');
  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        {mdUp && (
          <LeftSection />
        )}

        <Container maxWidth="sm" style={{margin: 0, padding: 0}}>
          <ContentStyle style={{display: 'flex',flexDirection: 'column', justifyContent: 'flex-start', paddingInline: 90}}>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!sent ? (
              <>
                <Typography variant="h3" paragraph>
                  Forgot your password?
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                  Please enter the email address associated with your account and We will email you a link to reset your
                  password.
                </Typography>

                <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

                <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
                  Back
                </Button>
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
          </Box>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
