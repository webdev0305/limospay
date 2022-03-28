import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Divider, Container, Typography, Stack, Input, InputAdornment, Button } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// components
// import Logo from '../../components/Logo';
import SocialsButton from '../../components/SocialsButton';

// ----------------------------------------------------------------------

const LINKS = [
  { name: 'About us', href: PATH_PAGE.about },
  { name: 'About us', href: PATH_PAGE.about },
  { name: 'About us', href: PATH_PAGE.about },
  { name: 'About us', href: PATH_PAGE.about },
  { name: 'About us', href: PATH_PAGE.about },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));


// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <div style={{backgroundColor: 'black'}}>
        <Container sx={{ py: 5}}>
          <Grid
            container
            justifyContent={{ xs: 'center', md: 'space-between' }}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            <Grid item xs={12} md={8}>
              <Typography sx={{ fontSize:'36px', fontWeight: 600, mt: 2, color: 'grey.0' }}>
                Customer Support
              </Typography>
              <Typography sx={{ fontSize:'18px', fontWeight: 600, mt: 2, color: 'grey.500', maxWidth: '600px' }}>
                If you have any questions or want to know more about Wayapay
                and our services, check our FAQ or contact our Customer Support
              </Typography>
              <Typography sx={{ fontSize:'18px', fontWeight: 600, mt: 3, color: 'grey.100' }}>
                Contact us &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="mailto:info@limospay.com" style={{color: 'white'}}>info@limospay.com</a>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize:'36px', fontWeight: 600, mt: 2, color: 'grey.0' }}>
                Stay Updated
              </Typography>
              <Typography sx={{ fontSize:'18px', fontWeight: 600, mt: 2, mb: 3, color: 'grey.500' }}>
                Be the First to Know About our Promotions, Giveaways, and Amazing Business Offers
              </Typography>
              <Input
                name="email"
                placeholder="Enter your email address"
                sx={{border: '0px solid white', bgcolor: 'grey.800', px: 1, width: '350px', height: '56px', borderRadius: '4px'}}
              />
              <Button sx={{bgcolor: 'primary.main', color:'grey.0', px:2, ml: -13, height: 46, '&:hover':{bgcolor: 'primary.light'}}}>
                Subscribe
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container sx={{ py: 5 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} md={5}>
            <Typography sx={{ fontSize:'24px', fontWeight: 600, mt: 2 }}>
              Follow and Contact us.
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-end' }}
              sx={{}}
            >
              <SocialsButton sx={{ mx: 0.5 }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container sx={{ py: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} md={5}>
            <Typography sx={{ fontSize:'20px' }}>
              Copyright © Waya 2020  All rights reserved
            </Typography>

            
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => (
                <Stack key={list.name} spacing={2}>
                  <Link
                      to={list.href}
                      key={list.name}
                      color="primary.main"
                      variant="body2"
                      component={RouterLink}
                      sx={{ display: 'block' }}
                    >
                      <Typography component="p" sx={{fontSize: '18px', fontWeight: 'bold'}}>
                        {list.name}
                      </Typography>
                    </Link>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
