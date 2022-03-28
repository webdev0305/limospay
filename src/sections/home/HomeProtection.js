import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Button, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0,
  },
}));


// ----------------------------------------------------------------------

export default function HomeProtection() {
  const theme = useTheme();
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={0} justifyContent="center">
          
          <Grid item xs={12} md={6} dir="ltr" sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentStyle>
              <m.div variants={varFade().inUp}>
                <Box sx={{position: 'absolute', marginTop: '10px', display: {xs:'none', md: 'block'}}}>
                <svg width="16" height="150" viewBox="0 0 16 150" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M8 2L8.00002 150" stroke="#E0E0E0"/>
                  <circle cx="8" cy="8" r="8" fill="#00008B"/>
                </svg>
                </Box>
                <Typography sx={{ mb: 1, ml: {md:3}, fontSize: '24px', fontWeight: 600, lineHeight: '1.5', color: 'grey.900'}}>
                  Protected Access
                </Typography>
                <Typography
                  sx={{
                    mb: 5,
                    ml: {md:5},
                    color: 'grey.700',
                    fontSize: '20px',
                    fontWeight: 400
                  }}
                >
                  Your Limospay Account is protected with multiple layers of security. If you lose your phone, you can have your limsopay blocked at anytime.
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Box sx={{position: 'absolute', marginTop: '10px', display: {xs:'none', md: 'block'}}}>
                  <svg width="16" height="150" viewBox="0 0 16 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2L8.00002 150" stroke="#E0E0E0"/>
                    <circle cx="8" cy="8" r="8" fill="#00008B"/>
                  </svg>
                </Box>
                <Typography sx={{ mb: 1, ml: {md:3}, fontSize: '24px', fontWeight: 600, lineHeight: '1.5', color: 'grey.900'}}>
                  Secured Transactions
                </Typography>
                <Typography
                  sx={{
                    mb: 5,
                    ml: {md:5},
                    color: 'grey.700',
                    fontSize: '20px',
                    fontWeight: 400
                  }}
                >
                  At Limospay, we take security seriously so every payment made on your platformm is 100% secure, even exceding industry standard
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Box sx={{position: 'absolute', marginTop: '10px', display: {xs:'none', md: 'block'}}}>
                  <svg width="16" height="150" viewBox="0 0 16 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2L8.00002 150" stroke="#E0E0E0"/>
                    <circle cx="8" cy="8" r="8" fill="#00008B"/>
                  </svg>
                </Box>
                <Typography sx={{ mb: 1, ml: {md:3}, fontSize: '24px', fontWeight: 600, lineHeight: '1.5', color: 'grey.900'}}>
                  Data Protection
                </Typography>
                <Typography
                  sx={{
                    mb: 5,
                    ml: {md:5},
                    color: 'grey.700',
                    fontSize: '20px',
                    fontWeight: 400
                  }}
                >
                  Limospay stores all personal data at a secuire location and we do not disclose any personal data to thrid parties
                </Typography>
              </m.div>
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={6} >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center',
              }}
            >
              <Image
                disabledEffect
                alt="protection"
                src="/images/home/protection.png"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
