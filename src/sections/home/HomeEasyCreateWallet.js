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

const COMMON = {
  scaleX: 0.86,
  skewY: 8,
  skewX: 0,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  opacity: 0,
};

const variantScreenLeft = {
  initial: COMMON,
  animate: { ...COMMON, translateX: '-50%', translateY: 40, opacity: 1 },
};
const variantScreenCenter = {
  initial: COMMON,
  animate: { ...COMMON, opacity: 1 },
};
const variantScreenRight = {
  initial: COMMON,
  animate: { ...COMMON, translateX: '50%', translateY: -40, opacity: 1 },
};

// ----------------------------------------------------------------------

export default function HomeEasyCreateWallet() {
  const theme = useTheme();

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={0} justifyContent="center">
          <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentStyle>
              <m.div variants={varFade().inUp}>
                <Typography sx={{ mb: 3, fontSize: '36px', fontWeight: 600, lineHeight: '50px', color: 'grey.900'}}>
                  Easily create your wallet and fund your waller 
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: 'grey.700',
                    fontSize: '22px',
                    fontWeight: 400
                  }}
                >
                  One platform that lets you sell wherever your customers are — online, in‑person, anywhere in the world
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Button
                  sx={{ bgcolor:'primary.main', color:'common.white', '&:hover':{bgcolor:'primary.main',opacity:0.65} }}
                  size="large"
                  variant="outlined"
                  target="_blank"
                  rel="noopener"
                  href="https://www.minimals.cc/components/"
                >
                  Start paying Bills
                </Button>
              </m.div>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={7} dir="ltr">
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
                alt="easily-create-wallet"
                src="/images/home/easily-create-wallet.png"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
