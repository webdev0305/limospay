import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Button, Link, Card, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------


const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(5),
  },
}));

const CardImgStyle = styled(Card)(({theme}) => {
  return {
    border: 0,
    maxWidth: 400,
    minHeight: 400,
    margin: 'auto',
    textAlign: 'center',
  }
})

const CardStyle = styled(Card)(({theme}) => {
  return {
    border: 0,
    maxWidth: 400,
    minHeight: 185,
    margin: 'auto',
    textAlign: 'left',
    padding: '30px',

  }
})
// ----------------------------------------------------------------------

export default function HomeEasyToUse() {
  const theme = useTheme();

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 10, md: 10 },
          }}
        >
          
          <m.div variants={varFade().inDown}>
            <Typography sx={{fontSize:"36px", lineHeight:"46.8px", fontWeight: 600}}>The easy-to-use Banking platform</Typography>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography  sx={{ mb: 2, color: 'text.disabled', mt: 3, fontSize:'18px', width:'500px', mx:'auto' }}>
              We re-engineered this app to proudly enable you do alot + perform financial transactions with ease. 
            </Typography>
          </m.div>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 3, lg: 3 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          <div>
            <CardImgStyle >
              <Image
                src="/images/home/easy-to-use.png"
                alt="imageAlt"
                sx={{
                  mx: 'auto',
                  width: {md:400, xs: '100%'},
                  height: {md:400, xs: '100%'},
                }}
              />
            </CardImgStyle>
          </div>
          <div style={{display: 'grid', alignContent: 'space-between', gap: '20px'}}>
            <CardStyle>
              <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="35" height="33" rx="10" fill="#EBEBFF"/>
                <path d="M25 11L14 22L9 17" fill="#EBEBFF"/>
                <path d="M25 11L14 22L9 17" stroke="#00008B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <Typography sx={{ color: 'gray.main', fontSize: '22px', pt: 2 }}>Send and receive money without  any complexity</Typography>
            </CardStyle>
            <CardStyle>
              <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="35" height="33" rx="10" fill="#EBEBFF"/>
                <path d="M25 11L14 22L9 17" fill="#EBEBFF"/>
                <path d="M25 11L14 22L9 17" stroke="#00008B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <Typography sx={{ color: 'gray.main', fontSize: '22px', pt: 2 }}>Send and receive money without  any complexity</Typography>
            </CardStyle>
          </div>
          <div style={{display: 'grid', alignContent: 'space-between'}}>
            <CardStyle>
              <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="35" height="33" rx="10" fill="#EBEBFF"/>
                <path d="M25 11L14 22L9 17" fill="#EBEBFF"/>
                <path d="M25 11L14 22L9 17" stroke="#00008B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <Typography sx={{ color: 'gray.main', fontSize: '20px', pt: 2 }}>Pay bills and buy airtime easily without switching platforms.</Typography>
            </CardStyle>
            <CardStyle>
              <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="35" height="33" rx="10" fill="#EBEBFF"/>
                <path d="M25 11L14 22L9 17" fill="#EBEBFF"/>
                <path d="M25 11L14 22L9 17" stroke="#00008B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <Typography sx={{ color: 'gray.main', fontSize: '22px', pt: 2 }}>Take care of all youe expenses in one place</Typography>
            </CardStyle>
          </div>
            
        </Box>
        <Box sx={{textAlign: 'center'}}>
          <Button component={Link} href="auth/register" target="_blank" sx={{ bgcolor:'grey.1000', color:'primary.main', py: 2, px: 5, mt: 5, mb: 3, '&:hover':{bgcolor:'common.white',opacity:0.65} }}>Open an Account in minutes</Button>
        </Box>

      </Container>
    </RootStyle>
  );
}
