// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';

import Image from '../../components/Image';


// ----------------------------------------------------------------------

const SectionStyle = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 478,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

// ----------------------------------------------------------------------

export default function LeftSection() {

  return (
    <SectionStyle>
        <Image
            visibleByDefault
            disabledEffect
            alt="login"
            src="/logo/logo.png"
            style={{width: '178px'}}
        />
    <Typography sx={{  mt: 10, mb: 5, fontSize: '40px', fontWeight: 'Bold' }}>
      Providing secure Payment Infrasture
    </Typography>
    <Typography sx={{ mb: 5}}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem iaculis lectus vitae interdum vestibulum amet urna blandit. Scelerisque iaculis auctor nibh justo in pretium. Praesent
    </Typography>
    
    </SectionStyle>
        
  );
}
