import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card,Stack, Box, Button, Link, Container, Typography } from '@mui/material';
import LeftSection from './LeftSection';
// routes
import { PATH_AUTH } from '../../routes/paths';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { VerifyCodeForm } from '../../sections/auth/verify-code';

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
  height: 520,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 18),
  borderTop: '10px solid #00008B',
  borderRadius: '10px',
  textAlign: 'center'
}));

// ----------------------------------------------------------------------

export default function VerifyCode() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Page title="Verify">
      <RootStyle>
        {mdUp && (
          <LeftSection />
        )}

        <Container maxWidth="sm" style={{margin: 0, padding: 0}}>
          <ContentStyle >
          <Stack direction="column" alignItems="center" sx={{ mt: 10 }}>

            <Typography  paragraph style={{fontSize: '24px', fontWeight: 'Medium'}}>
              Verify Your Account
            </Typography>
            <Typography sx={{  }}>
              Please Input the OTP sent to your mobile number.
            </Typography>

            <Box sx={{ mt: 5, mb: 5 }}>
              <VerifyCodeForm />
            </Box>

            <Typography variant="body2" align="center" >
              <Link variant="subtitle2" underline="none" onClick={() => {}} style={{cursor: 'pointer', color: 'red'}}>
                Did not get OTP?
              </Link>
            </Typography>
          </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
