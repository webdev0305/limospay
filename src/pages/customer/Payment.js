import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Container, Grid, Button, Switch, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Tabs, Tab, MenuItem, Typography, FormControlLabel, OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import FundWallet from '../../components/FundWallet';
import SvgIconStyle from '../../components/SvgIconStyle';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import Label from '../../components/Label';
import MenuPopover from '../../components/MenuPopover';
import { formatDate, fDateTimeSuffix } from '../../utils/formatTime';
// ----------------------------------------------------------------------

export default function Payment() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const nav = useNavigate();

  const transactions = [
    { id:1, referenceId: '44aa22f4', beneficiary: 'Limospay', amount: 2200, currency: 'NGN', time: new Date(), status: 1 },
    { id:2, referenceId: '44aa22f5', beneficiary: 'Musa idris', amount: 2200, currency: 'NGN', time: new Date(), status: -1 },
    { id:3, referenceId: '44aa22f6', beneficiary: 'Ikecgunwu Mba', amount: 2200, currency: 'NGN', time: new Date(), status: 0 },
    { id:4, referenceId: '44aa22f7', beneficiary: 'Kayode Idu', amount: 2200, currency: 'NGN', time: new Date(), status: -2 },
  ]

  const showTransaction = (id) => {
    nav(`/transaction/${id}`)
  }

  const MoreMenuButton = () => {
    const [open, setOpen] = useState(null);
  
    const handleOpen = (event) => {
      setOpen(event.currentTarget);
    };
  
    const handleClose = () => {
      setOpen(null);
    };
  
    const ICON = {
      mr: 2,
      width: 20,
      height: 20,
    };
  
    return (
      <>
        <IconButton size="large" onClick={handleOpen}>
          <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
        </IconButton>
  
        <MenuPopover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          arrow="right-top"
          sx={{
            mt: -0.5,
            width: 160,
            '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
          }}
        >
          <MenuItem>View</MenuItem>
          <MenuItem>Share</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuPopover>
      </>
    );
  }

  return (
    <Page title="Payment">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{display:'flex',justifyContent:'space-around', bgcolor: 'common.white', pl: 5, py: 1, ml: -5, mt: -3, border: '1px solid #efefef'}}>
              <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 20, height:20}, color: 'common.black'}} startIcon={<SvgIconStyle src={`/icons/ic_transfer.svg`} sx={{ width: 1, height: 1 }} />}>
                Transfer
              </Button>
              <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 20, height:20}, color: 'common.black'}} startIcon={<SvgIconStyle src={`/icons/ic_receive.svg`} sx={{ width: 1, height: 1 }} />}>
                Receive
              </Button>
              <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 20, height:20}, color: 'common.black'}} startIcon={<SvgIconStyle src={`/icons/ic_withdraw.svg`} sx={{ width: 1, height: 1 }} />}>
                Withdraw
              </Button>
              <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 20, height:20}, color: 'common.black'}} startIcon={<SvgIconStyle src={`/icons/ic_request.svg`} sx={{ width: 1, height: 1 }} />}>
                Request
              </Button>
            </Box>
            <Box sx={{display:'flex',justifyContent:'flex-end', py: 1, pr: 3}}>
              <FormControlLabel
                control={<Switch defaultChecked/>}
                label="Default Wallet"
                labelPlacement='start'
              />
            </Box>
            <FundWallet />
            <Box sx={{my:2}}>
              <OutlinedInput
                sx={{width:1,overflow:'hidden'}}
                size="small"
                startAdornment={
                  <Box sx={{whiteSpace:'nowrap',backgroundColor:'#eee',py:1, px:2, ml:-2, mr:2}}>Transaction History</Box>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" color="primary" sx={{pl:6}}>Bills Payment</Typography>
            <Stack sx={{mt:2,pl:6}} spacing={1}>
              <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, bgcolor:'#F1F7FA', border:'2px solid #064A72', borderRadius: '4px'}, color: '#252733', bgcolor:'common.white', px: 2, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_bills_betting.svg`} sx={{ width: 1, height: 1 }} />}>
                Betting
              </Button>
              <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, bgcolor:'#F1F7FA', border:'2px solid #064A72', borderRadius: '4px'}, color: '#252733', bgcolor:'common.white', px: 2, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_bills_utility.svg`} sx={{ width: 1, height: 1 }} />}>
                Utility Bills
              </Button>
              <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, bgcolor:'#F1F7FA', border:'2px solid #064A72', borderRadius: '4px'}, color: '#252733', bgcolor:'common.white', px: 2, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_bills_cable.svg`} sx={{ width: 1, height: 1 }} />}>
                Cable
              </Button>
              <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, bgcolor:'#F1F7FA', border:'2px solid #064A72', borderRadius: '4px'}, color: '#252733', bgcolor:'common.white', px: 2, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_bills_airtime.svg`} sx={{ width: 1, height: 1 }} />}>
                Airtime
              </Button>
              <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, bgcolor:'#F1F7FA', border:'2px solid #064A72', borderRadius: '4px'}, color: '#252733', bgcolor:'common.white', px: 2, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_bills_data.svg`} sx={{ width: 1, height: 1 }} />}>
                Data
              </Button>
              <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, bgcolor:'#F1F7FA', border:'2px solid #064A72', borderRadius: '4px'}, color: '#252733', bgcolor:'common.white', px: 2, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_bills_other.svg`} sx={{ width: 1, height: 1 }} />}>
                Other Bills Payment
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: '15px 20px' }}>
              <Tabs value={0} sx={{ px: 10, mb:1 }}>
                <Tab label="All Transaction" />
                <Tab label="Transfer" />
                <Tab label="Receive" />
                <Tab label="Withdraw" />
                <Tab label="Request" />
              </Tabs>
              <Scrollbar>
                <TableContainer>
                  <Table sx={{fontSize: '14px'}}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Beneficiary</TableCell>
                        <TableCell align='right'>Amount</TableCell>
                        <TableCell>Reference ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align='right'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((row,index) => (
                        <TableRow key={index} onClick={()=>showTransaction(row.id)}>
                          <TableCell>
                            {row.beneficiary}
                            <div><Typography variant="caption" color="common.gray">{row.beneficiary}</Typography></div>
                          </TableCell>
                          <TableCell align="right">
                            {row.currency} {row.amount}
                            <div><Typography variant="caption" color="common.gray">0.123456789</Typography></div>
                          </TableCell>
                          <TableCell>
                            {row.referenceId}
                            <div><Typography variant="caption" color="transparent">0</Typography></div>
                          </TableCell>
                          <TableCell>
                            {fDateTimeSuffix(row.time)}
                            <div><Typography variant="caption" color="common.gray">{formatDate(row.time,'p')}</Typography></div>
                          </TableCell>
                          <TableCell sx={{ textTransform: 'capitalize' }}>
                            {row.status===1 && <Label color="success">successful</Label>}
                            {row.status===0 && <Label color="info">pending</Label>}
                            {row.status===-1 && <Label color="error">fail</Label>}
                            {row.status===-2 && <Label color="error">reverted</Label>}
                            <div><Typography variant="caption" color="transparent">0</Typography></div>
                          </TableCell>
                          <TableCell align='center'>
                            <MoreMenuButton/>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
