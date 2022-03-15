import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Button, Container, Typography, Stack } from '@mui/material';
import LeftSection from './LeftSection';
// routes
import { PATH_AUTH } from '../../routes/paths';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
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
            <Stack direction="column" alignItems="center" sx={{ mt: 10 }}>
                <Image
                    visibleByDefault
                    disabledEffect
                    alt="login"
                    src="/logo/limospay.svg"
                    style={{width: '176px'}}
                />
                <Typography sx={{ mt:5, fontSize: "24px", fontWeight: 'medium' }} paragraph>
                  Forgot Password
                </Typography>
                  
                <Typography sx={{ color: 'text.secondary', mb: 5, textAlign: 'center' }}>
                  To reset your password, kindly enter the email you used to create this account
                </Typography>
              </Stack>

                <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

                <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
                  Back
                </Button>
                
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
