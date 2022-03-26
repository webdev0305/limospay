import { forwardRef } from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';

import { Card, Stack, Typography } from '@mui/material';
// hooks
import useAuth from '../hooks/useAuth';
import useResponsive from '../hooks/useResponsive';
// components
import Page from './Page';
import Image from './Image';
import LeftSection from '../pages/auth/LeftSection';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  margin: '5rem 0',
  boxShadow: '0 0 5rem #ddd',
  borderRadius: '10px',
  width: 600,
  // margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '5rem',
  paddingTop: 0,
  borderTop: '10px solid #00008B',
  'input:-internal-autofill-selected': {
    backgroundColor: 'none',
  }
}));

const AuthPage = forwardRef(({ children, title }, ref) => {
  const mdUp = useResponsive('up', 'md');
  return (
    <Page title={title}>
      <RootStyle>
        {mdUp && (
          <LeftSection />
        )}

        <ContentStyle>
          <Stack direction="column" alignItems="center" sx={{ mt: 10 }}>
            <Image
                visibleByDefault
                disabledEffect
                alt="login"
                src="/logo/limospay.svg"
                style={{width: '176px'}}
            />
            {/* <Typography sx={{ mt:5 }}>Welcome Back</Typography> */}
            <Typography variant="h4" gutterBottom sx={{mt: 3, fontWeight: 'Medium'}}>
              {title}
            </Typography>
          </Stack>          
          {children}          
        </ContentStyle>
      </RootStyle>
    </Page>
  )
});

AuthPage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default AuthPage;