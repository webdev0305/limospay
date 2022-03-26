import { NavLink as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Card, Container, Button, Typography, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import SvgIconStyle from '../../components/SvgIconStyle';
import Avatar from '../../components/Avatar';
// ----------------------------------------------------------------------

export default function Notification() {
  const { themeStretch } = useSettings();
  const { id } = useParams()

  return (
    <Page title="Notification">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{position:"relative",pt:8}}>
        <RouterLink to="/notifications" style={{textDecoration:"none",position:"absolute",left:"1em",top:0}}>
          <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, color:'common.white', bgcolor:'#00008B', borderRadius:'50%'}}} startIcon={<SvgIconStyle src={`/icons/ic_back.svg`} sx={{ width: 1, height: 1 }} />}>
            Back
          </Button>
        </RouterLink>
        <Card sx={{p:4}}>
          <Typography variant='h4' sx={{my:2}}>Payment of N5,000 (Credit Transaction)</Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb:4}}>
            <Stack direction="row" alignItems="center" gap={2}>
              <Avatar />
              Richard Daniel
            </Stack>
            <Typography variant='body2'>10th December, 2021 5:20 PM</Typography>
          </Stack>
          <Typography variant='body2'>You have received a credit card alert payment of N5000 from Halima Isa.</Typography>
          <Typography variant='body2'>Your total Account Balance is N189000</Typography>
        </Card>
      </Container>
    </Page>
  );
}
