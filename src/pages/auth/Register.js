import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Stack } from '@mui/material';
import LeftSection from './LeftSection';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { RegisterForm } from '../../sections/auth/register';

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

export default function Register() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Register">
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
                <Typography gutterBottom sx={{mt: 3, fontSize: '20px', fontWeight: 'Medium', marginBottom: '20px'}}>
                  Create Account with us
                </Typography>
            </Stack>
            

            <RegisterForm />

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have an account?{' '}
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
                Login
              </Link>
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
