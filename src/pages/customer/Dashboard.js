// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Container, Grid, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import merge from 'lodash/merge';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
import { BaseOptionChart } from '../../components/chart';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import Label from '../../components/Label';
import { fDateTimeSuffix } from '../../utils/formatTime'
// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const transactions = [
    { referenceId: '44aa22f4', beneficiary: 'Limospay', amount: 2200, currency: 'NGN', time: new Date(), status: 1 },
    { referenceId: '44aa22f5', beneficiary: 'Musa idris', amount: 2200, currency: 'NGN', time: new Date(), status: -1 },
    { referenceId: '44aa22f6', beneficiary: 'Ikecgunwu Mba', amount: 2200, currency: 'NGN', time: new Date(), status: 0 },
    { referenceId: '44aa22f7', beneficiary: 'Kayode Idu', amount: 2200, currency: 'NGN', time: new Date(), status: -2 },
  ]

  const seriesOverview = [{
    data:[...Array(12)].map((_)=>Math.floor(100000*Math.random()))
  }]
  const seriesPayments = [ 40, 25, 10, 13]

  const chartOverviewOptions = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 1,
      colors: [theme.palette.primary.main],
    },
    fill: {
      show: false,
      opacity: 0,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'],
    },
    tooltip: {
      y: {
        title: {
          formatter: (name) => ''
        }
      },
    },
  });

  const chartPaymentOptions = {
    labels: [ 'Card 40%', 'Bank Acct 25%', 'Wallet 10%', 'USSD 13%' ],
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '85%',
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
            },
            name: {
              show: false
            },
            value: {
              show: true,
              fontSize: '36px',
            }
          }
        },
        startAngle: -(360*88/100),
        endAngle: 1,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom',
      offsetY: 0,
      tooltipHoverFormatter: (seriesName, opts) => {
        return `${seriesName} - <strong>${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]}</strong>`
      }
    }
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '25px 20px' }}>
              <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1} sx={{ width: 1, mb: 1 }}>
                <Image src={`/icons/ic_deposited.svg`} sx={{ width: '40px', height: '40px' }} />
                <Typography component="span">
                  Amount Deposited
                </Typography>
              </Stack>
              <Typography variant="h4">N23,000</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '25px 20px' }}>
              <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1} sx={{ width: 1, mb: 1 }}>
                <Image src={`/icons/ic_transfered.svg`} sx={{ width: '40px', height: '40px' }} />
                <Typography component="span">
                  Amount Transfered
                </Typography>
              </Stack>
              <Typography variant="h4">N23,000</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '25px 20px' }}>
              <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1} sx={{ width: 1, mb: 1 }}>
                <Image src={`/icons/ic_total_billed.svg`} sx={{ width: '40px', height: '40px' }} />
                <Typography component="span">
                  Total Bills Paid
                </Typography>
              </Stack>
              <Typography variant="h4">N23,000</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '25px 20px', border: '1px solid #00008B', backgroundColor: 'rgba(0, 0, 139, 0.1)'}}>
              <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1} sx={{ width: 1, mb: 1 }}>
                <Image src={`/icons/ic_balance.svg`} sx={{ width: '40px', height: '40px' }} />
                <Typography component="span">
                  My Balance
                </Typography>
              </Stack>
              <Typography variant="h4">N23,000</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card sx={{ 
              '& .apexcharts-tooltip': {
                transform: 'translate(-50%, -100%)'
              },
              '& .apexcharts-tooltip-marker': {
                display: 'none'
              },
              '& .apexcharts-canvas path:hover': {
                fill: theme.palette.primary.main
              },
              p: 3 
            }}>
              <CardHeader title="Overview" sx={{ p:0 }}
              action={
                <TextField
                  select
                  fullWidth
                  // value={seriesData}
                  SelectProps={{ native: true }}
                  // onChange={handleChangeSeriesData}
                  sx={{
                    '& fieldset': { border: '0 !important' },
                    '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
                    '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
                    '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 },
                  }}
                >
                  {[0].map((year) => (
                    <option key={year} value={year}>
                      {year===0?'This Year':year}
                    </option>
                  ))}
                </TextField>
              }
            />
              <ReactApexChart type="bar" series={seriesOverview} options={chartOverviewOptions} height={364} />
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card sx={{ p: '15px 20px' }}>
              <CardHeader title="Recent Transactions" sx={{ p: 0, mb:1 }} />
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Reference ID</TableCell>
                        <TableCell>Beneficiary</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.referenceId}</TableCell>
                          <TableCell>{row.beneficiary}</TableCell>
                          <TableCell>{row.currency} {row.amount}</TableCell>
                          <TableCell>{fDateTimeSuffix(row.time)}</TableCell>
                          <TableCell sx={{ textTransform: 'capitalize' }}>
                            {row.status===1 && <Label color="success">successful</Label>}
                            {row.status===0 && <Label color="info">pending</Label>}
                            {row.status===-1 && <Label color="error">fail</Label>}
                            {row.status===-2 && <Label color="error">reverted</Label>}
                          </TableCell>
                          <TableCell align='center'>
                            <IconButton size="small" onClick={()=>{}}>
                              <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              '& .apexcharts-datalabels-group text::after': {
                content: '"%"'
              },
              p: '15px 20px' 
            }}>
              <CardHeader title="Payment Methods" sx={{ p:0 }}/>
              <ReactApexChart type="donut" series={seriesPayments} options={chartPaymentOptions} height={400} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
