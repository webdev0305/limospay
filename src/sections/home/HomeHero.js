import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Link, Container, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import TextIconLabel from '../../components/TextIconLabel';
import { MotionContainer, varFade } from '../../components/animate';
import { HEADER } from '../../config';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundImage: 'url(/images/home/hero-back.png)',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    // position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    marginTop: HEADER.MAIN_DESKTOP_HEIGHT,
    textAlign: 'left',
  },
  '& a': {
    padding: '1em 3em',
  }
}));

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    marginTop: HEADER.MAIN_DESKTOP_HEIGHT+50,
    right: 0,
    width: 'auto',
    height: `calc(100% - ${HEADER.MAIN_DESKTOP_HEIGHT+40}px)`,
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <MotionContainer>
      <RootStyle>
        <HeroImgStyle
          alt="hero"
          src="/images/home/hero.png"
          variants={varFade().inUp}
        />

        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ color: 'primary.main' }}>
                Start accepting payments in minutes
              </Typography>
              <Typography variant="h5" sx={{ color: 'gray.main', fontWeight: 'normal' }} mt={4}>
                One platform that lets perform banking activities and agency banking services.
              </Typography>
              <Stack direction="row" mt={8} gap={4}>
                <Button component={RouterLink} to="auth/register" sx={{ bgcolor:'primary.main', color:'common.white', '&:hover':{bgcolor:'primary.main',opacity:0.65} }}>Register now</Button>
                <Button component={Link} href="auth/register" target="_blank" sx={{ bgcolor:'common.white', color:'common.gray', '&:hover':{bgcolor:'common.white',opacity:0.65} }}>Explore Docs</Button>
              </Stack>
            </m.div>
          </ContentStyle>
        </Container>
      </RootStyle>
    </MotionContainer>
  );
}
