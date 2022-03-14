import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';

import { Card, Stack, Link, Container, Typography } from '@mui/material';
import LeftSection from './LeftSection';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';


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

export default function Login() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
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
                <Typography sx={{ mt:5 }}>Welcome Back</Typography>
                <Typography variant="h4" gutterBottom sx={{mt: 3, fontWeight: 'Medium'}}>
                  Login to your Account
                </Typography>
            </Stack>
            

            <LoginForm/>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?{' '}
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                Register
              </Link>
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
