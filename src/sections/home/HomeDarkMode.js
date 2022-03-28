import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0, 0, 0),
  backgroundColor: theme.palette.common.black,
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
}));

// ----------------------------------------------------------------------

export default function HomeDarkMode() {
  return (
    <RootStyle>
      <Container component={MotionViewport} sx={{ position: 'relative' }}>
        <Typography sx={{ mb: 1, fontSize: {md:'64px', xs:'32px'}, fontWeight: 600, lineHeight: '1.5', color: 'grey.0', textAlign:'center'}}>
          Start Banking for free
        </Typography>
        <Typography sx={{ mb: 1, fontSize: '18px', lineHeight: '1.5', color: 'grey.600', textAlign:'center', width: {md: 530}, mx: 'auto'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante id malesuada mauris orci vulputate ut blandit et. Pharetra dui 
        </Typography>
        <Box sx={{textAlign: 'center'}}>
          <Button component={Link} href="auth/register" target="_blank" sx={{ bgcolor:'grey.1000', color:'black', py: 2, px: 5, mt: 5, '&:hover':{bgcolor:'common.white',opacity:0.65} }}>Get started now</Button>
        </Box>
        <Image
          disabledEffect
          alt="image shape"
          src="/images/home/startBanking.png"
          sx={{
            mx: 'auto',
          }}
        />
        
        
      </Container>
    </RootStyle>
  );
}
