import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Stack, Button } from '@mui/material';

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: 'white',
  marginRight: theme.spacing(5),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none',
  },
}));

const ButtonStyle = styled(Button)(() => ({
  backgroundColor:'white', 
  padding: '0.75em 2.5em',
  '&:hover': {
    backgroundColor: 'white',
    opacity: 0.65,
    textDecoration: 'none',
  }
}))

MenuDesktop.propTypes = {
  isHome: PropTypes.bool,
};

export default function MenuDesktop({ isHome }) {
  const { pathname } = useLocation();

  return (
    <Stack direction="row" alignItems="center">
      {!isHome && <MenuDesktopItem title='Home' path='/'/>}
      <MenuDesktopItem title='Our Solutions' path='/'/>
      <MenuDesktopItem title='Login' path='auth/login'/>
      <ButtonStyle component={RouterLink} to='auth/register'>Register</ButtonStyle>
    </Stack>
  );
}

MenuDesktopItem.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
};

function MenuDesktopItem({ title, path }) {
  return (
    <LinkStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
    >
      {title}
    </LinkStyle>
  );
}
