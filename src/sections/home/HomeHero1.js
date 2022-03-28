import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Link, Button, Container, Typography, Stack } from '@mui/material';
// _mock_
import { _homePlans } from '../../_mock';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { varFade, MotionViewport } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 0),
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero1() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <m.div variants={varFade().in}>
          <Box sx={{ p: 5, mt: 1, textAlign: 'center' }}>
            <m.div variants={varFade().inDown}>
              <Typography variant="h3">Get started now to develop your business.</Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
                Please describe your case to receive the most accurate advice.
              </Typography>
            </m.div>
            <Stack sx={{display:'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px'}}>
              <Button component={RouterLink} to="auth/register" sx={{ bgcolor:'primary.main', color:'common.white', px: 3, py: 1, '&:hover':{bgcolor:'primary.main',opacity:0.65} }}>Register now</Button>
              <Button component={Link} href="auth/register" target="_blank" sx={{ bgcolor:'grey.300', color:'grey.900', px: 3, py: 1, '&:hover':{bgcolor:'common.white',opacity:0.65} }}>Explore Docs</Button>
            </Stack>
          </Box>
        </m.div>
      </Container>
    </RootStyle>
  );
}
