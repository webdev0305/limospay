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
  backgroundColor: '#F4F7FA',
  paddingTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(5),
  },
}));

const SectionStyle = styled('div')(({theme}) => ({
    border: 0,
    margin: 'auto',
    textAlign: 'left',
    padding: '10px',
}));
// ----------------------------------------------------------------------

const Items= [
  {
    icon: '/images/home/feature1.png',
    title: 'Buy Credit and Airtime',
    description: 'Get enacted and execute inside 2 minutes. Totally internet onboarding with least documentation.'

  },
  {
    icon: '/images/home/feature2.png',
    title: 'Pay Bills',
    description: 'With modules for every significant stage and dialects, coordinate and go live with wayaPay in under 60 minutes.'

  },
  {
    icon: '/images/home/feature3.png',
    title: 'Create Multiple Wallets',
    description: 'Assemble your business for scale with our total API-driven robotization that requires zero manual intercession.'

  },
  {
    icon: '/images/home/feature4.png',
    title: 'Fund Wallet',
    description: 'Offer your customer the luxury of payment methond that waya pay supports including credit/debit cards, USSD, Bank and wallets'

  },
  {
    icon: '/images/home/feature5.png',
    title: 'Track your expenses',
    description: 'Our imaginative installment arrangements with serious evaluating simplify installments.'

  },
  {
    icon: '/images/home/feature6.png',
    title: 'Feeze Wallet',
    description: 'Continuously accessible email, telephone and talk based help to help you in all your means.'

  },
  {
    icon: '/images/home/feature7.png',
    title: 'Multiple payment Method',
    description: 'Continuous information and bits of knowledge on your Wayapay Dashboard to settle on informed business choices.'

  },
  {
    icon: '/images/home/feature8.png',
    title: 'Dispute Management',
    description: 'PCI DSS Level 1 consistent arrangement which eliminates your weight of administrative consistence.'

  }
]
export default function HomeUniqueFeatures() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

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
            <Typography sx={{fontSize:"36px", lineHeight:"1.5", fontWeight: 600}}>Unique Features</Typography>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography  sx={{ mb: 2, mt: 3, fontSize:'22px', width:'680px', mx:'auto' }}>
              Enable your business with the appropriate tools to acknowledge online payments and give the best client experience
            </Typography>
          </m.div>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 3, lg: 3 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
          }}
        >
          {Items.map((item, index) => (
            <m.div variants={varFade().inUp} key={item.title}>
              <SectionStyle>
                <Image
                  src={item.icon}
                  alt={item.title}
                  sx={{
                    width: 61,
                    height: 61,
                  }}
                />
                <Typography sx={{ fontSize: '18px', fontWeight: 700, pt: 2, mb:1 }}>{item.title}</Typography>
                <Typography sx={{ fontSize: '14px', pt: 1,}}>
                  {item.description}
                </Typography>
                
              </SectionStyle>
              
            </m.div>
          ))}
          
        </Box>

      </Container>
    </RootStyle>
  );
}
