import { useState } from 'react'
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, Button, Switch, IconButton, Stack, 
  MenuItem, Typography, FormControlLabel, OutlinedInput, InputAdornment, DialogActions, DialogContent, TextField, Input, FormHelperText, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from '@mui/lab';
import { AddCircleOutline, Autorenew, CheckCircleOutline } from '@mui/icons-material';
// hooks
// import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import FundWallet from '../../components/FundWallet';
import SvgIconStyle from '../../components/SvgIconStyle';
import Image from '../../components/Image';
import { Dialog, FormDialog } from '../../components/modal';
import VerifyCode from '../../sections/auth/verify-code/VerifyCode';
// ----------------------------------------------------------------------

export default function Wallet() {
  const theme = useTheme();
  const { themeStretch } = useSettings()
  const [ showFundList,setShowFundList ] = useState(false)
  const [ showWalletDetail,setShowWalletDetail ] = useState(false)
  const [ backLoading ] = useState(false)
  const [ nextLoading,setNextLoading ] = useState(false)
  const [ openProgress,setOpenProgress ] = useState(false)
  const [ loading,setLoading ] = useState(false)
  const [ activeFundModal,setActiveFundModal ] = useState('transfer')
  const [ stepFundModal,setStepFundModal ] = useState(0)
  const [ dataFundModal,setDataFundModal ] = useState({})
  
  const modalTitle = {
    create: [
      null, 'Create Wallet'
    ],
    credit: [
      null, 'Fund Wallet using Credit Card', 'Payment Details'
    ],
    transfer: [
      null, 'Fund Wallet via Bank Transfer', 'Enter your 4-digit Password'
    ],
    account: [
      null, 'Fund Wallet via Bank Account'
    ],
    attitude: [
      null, 'Fund Wallet via Pay Attitude','Fund Wallet via Pay Attitude'
    ],
    ussd: [
      null, 'Pay by dialling USSD code on your mobile device','Pay by dialling USSD code on your mobile device'
    ],
    wallet: [
      null, 'Fund Wallet by Scanning QR code','You are about send money to {Merchant-Business-Name} for the purchase/order of {Product-name}','Fund Wallet by Scanning QR code'
    ],
    betting: [
      null, 'Betting','Enter your 4-digit Password'
    ],
    utility: [
      null, 'Pay Utility Bills','Enter your 4-digit Password'
    ],
    cable: [
      null, 'Card Subcription','Enter your 4-digit Password'
    ],
    airtime: [
      null, 'Airtime Purchase','Enter your 4-digit Password'
    ],
    data: [
      null, 'Mobile Data Purchase','Enter your 4-digit Password'
    ],
    other: [
      null, 'Mobile Data Purchase','Enter your 4-digit Password'
    ],
  }
  const modalSubTitle = {
    create: [],
    credit: [
      null, 'Input your card detail to process payment', 'Kindly enter your Transaction Password to Proceed'
    ],
    transfer: [
      null, 'Select the Bank your transfering to proceed', 'Kindly enter your Transaction Password to Proceed'
    ],
    account: [
      null, 'Copy the details below to send money to your Waya Account from any bank\'s app'
    ],
    ussd: [
      null, 'Pay with your Phone Number','Pay with your Phone Number'
    ],
    wallet: [
      null, 'Scan the QR Code below using your Mobile App to complete the payment.','','Kindly enter your Transaction Password to Proceed'
    ],
    betting: [
      null, '','Kindly enter your Transaction Password to Proceed'
    ],
    utility: [
      null, '','Kindly enter your Transaction Password to Proceed'
    ],
    cable: [
      null, '','Kindly enter your Transaction Password to Proceed'
    ],
    airtime: [
      null, '','Kindly enter your Transaction Password to Proceed'
    ],
    data: [
      null, '','Kindly enter your Transaction Password to Proceed'
    ],
    other: [
      null, '','Kindly enter your Transaction Password to Proceed'
    ],
  }
  const modalContent = {
    create: [
      null,
      <>
        <TextField variant='standard' label='Wallet Name' value={dataFundModal.name??''} onChange={(e)=>updateFundModal('name',e.target.value)}/>
        <TextField variant='standard' label='Type of Wallet' value={dataFundModal.type??''} onChange={(e)=>updateFundModal('type',e.target.value)}/>
        <TextField variant='standard' label='Phone Number' value={dataFundModal.phoneNumber??''} onChange={(e)=>updateFundModal('phoneNumber',e.target.value)}/>
        <TextField variant='standard' label='Email Address' value={dataFundModal.email??''} onChange={(e)=>updateFundModal('email',e.target.value)}/>
        <TextField variant='standard' label='BVN' value={dataFundModal.BVN??''} onChange={(e)=>updateFundModal('BVN',e.target.value)}/>
        <Box sx={{display:'flex',justifyContent:'center'}}>
          <FormControlLabel
            control={<Switch checked={Boolean(dataFundModal.defaultAccount)??false} onChange={(e)=>updateFundModal('defaultAccount',e.target.checked)}/>}
            label="Make this your default Account"
            labelPlacement='start'
          />
        </Box>
      </>
    ],
    credit: [
      null,
      <>
        <Stack direction="row" justifyContent="end">
          <Button startIcon={<AddCircleOutline/>} onClick={()=>setDataFundModal({})}>Add Another card</Button>
        </Stack>
        <TextField variant='standard' label='Amount' value={dataFundModal.amount??''} onChange={(e)=>updateFundModal('amount',e.target.value)}/>
        <TextField variant='standard' label='Name on the card' value={dataFundModal.name??''} onChange={(e)=>updateFundModal('name',e.target.value)}/>
        <TextField variant='standard' label='Card Number' value={dataFundModal.cardNumber??''} onChange={(e)=>updateFundModal('cardNumber',e.target.value)}/>
        <Stack direction="row" gap={2}>
          <TextField variant='standard' label='Expiration' value={dataFundModal.expiration??''} onChange={(e)=>updateFundModal('expiration',e.target.value)}/>
          <TextField variant='standard' label='Cvv' value={dataFundModal.cvv??''} onChange={(e)=>updateFundModal('cvv',e.target.value)}/>
        </Stack>
        <Box sx={{display:'flex',justifyContent:'flex-end'}}>
          <FormControlLabel
            control={<Switch checked={Boolean(dataFundModal.addThisCard)??false} onChange={(e)=>updateFundModal('addThisCard',e.target.checked)}/>}
            label="Add this card"
            labelPlacement='start'
          />
        </Box>
      </>,
      <>
        <TextField variant='standard' type='password' label='Transaction Password' value={dataFundModal.password??''} onChange={(e)=>updateFundModal('password',e.target.value)}/>
      </>
    ],
    transfer: [
      null,
      <>
        <TextField select variant='standard' label='Select Bank' value={dataFundModal.bank??''} onChange={(e)=>updateFundModal('bank',e.target.value)}>
          <MenuItem value={1}>Bank1</MenuItem>
          <MenuItem value={2}>Bank2</MenuItem>
          <MenuItem value={3}>Bank3</MenuItem>
        </TextField>
        <TextField variant='standard' label='Account Number' defaultValue={dataFundModal.accountNumber??''} onChange={(e)=>updateFundModal('accountNumber',e.target.value)}/>
        <TextField variant='standard' label='Enter Amount' value={dataFundModal.amount??''} onChange={(e)=>updateFundModal('amount',e.target.value)}/>
        <TextField variant='standard' label='Transaction Remark' value={dataFundModal.remark??''} onChange={(e)=>updateFundModal('remark',e.target.value)}/>
      </>,
      <>
        <VerifyCode digit={4} onChange={(code)=>updateFundModal('code',code)}/>
      </>
    ],
    account: [
      null,
      <>
        <Button size="medium" onClick={()=>closeFundModal()} sx={{'& .MuiButton-startIcon':{width: 30, height:30, color:'primary'},position:'absolute',left:'2em', top:'2rem'}} startIcon={<SvgIconStyle src={`/icons/ic_back.svg`} sx={{ width: 1, height: 1 }} />}>
          Back
        </Button>
        <TextField variant='standard' value='Waya Bank' disabled/>
        <TextField variant='standard' value={`Account Number - ${3541681781}`} disabled/>
        <TextField variant='standard' value={`Account Name - ${'Meline Chizaram'}`} disabled/>
      </>,
    ],
    attitude: [
      null,
      <>
        <FormControl variant="standard">
          <Input placeholder='Enter the phone number' value={dataFundModal.number??''} onChange={(e)=>updateFundModal('number',e.target.value)}
            endAdornment={<Image src="/icons/ic_attitude.svg"/>} />
          <FormHelperText>Phone number linked to Payattitude</FormHelperText>
        </FormControl>
      </>,
      <>
        <FormControl variant="standard">
          <TextField variant='standard' value={dataFundModal.number} onChange={(e)=>updateFundModal('number',e.target.value)} select>
            <MenuItem value={dataFundModal.number}>{dataFundModal.number}</MenuItem>
          </TextField>
          <FormHelperText sx={{color:theme.palette.success.main,display:'flex',alignItems:'center',gap:1}}>
            <CheckCircleOutline />
            Successful
          </FormHelperText>
        </FormControl>
        <TextField variant='standard' label='Enter Amount' value={dataFundModal.amount??''} onChange={(e)=>updateFundModal('amount',e.target.value)}/>
      </>,
    ],
    ussd: [
      null,
      <>
        <TextField select variant='standard' label='Choose your bank to start the payment' value={dataFundModal.bank??''} onChange={(e)=>updateFundModal('bank',e.target.value)}>
          <MenuItem value={1}>Bank1</MenuItem>
          <MenuItem value={2}>Bank2</MenuItem>
          <MenuItem value={3}>Bank3</MenuItem>
        </TextField>
      </>,
      <>
        <FormControl variant="standard">
          <TextField variant='standard' onChange={(e)=>updateFundModal('number',e.target.value)} select>
            <MenuItem value='1234567890'>1234567890</MenuItem>
          </TextField>
          <FormHelperText sx={{color:theme.palette.success.main,display:'flex',alignItems:'center',gap:1}}>
            <CheckCircleOutline />
            Successful
          </FormHelperText>
        </FormControl>
        <TextField variant='standard' label='Enter Amount' value={dataFundModal.amount??''} onChange={(e)=>updateFundModal('amount',e.target.value)}/>
      </>,
    ],
    wallet: [
      null,
      <>
        <Stack alignItems="center" gap={2}>
          <Image src="/images/qrcode.svg" sx={{width:241,height:265}} onClick={()=>nextFundModal()}/>
          <Typography variant='subtitle' sx={{mt:4}}>Amount Payable is</Typography>
          <Typography variant='h5'>NGN 5,000.00</Typography>
        </Stack>
      </>,
      <>
        <Stack sx={{bgcolor:'#E0E0E059',p:2}} gap={1.5}>
          <Stack direction="row" justifyContent="space-between">
            <span>Amount :</span>
            <span>NGN 5,000.00</span>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <span>Fee :</span>
            <span>NGN 0.00</span>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{fontWeight:'bold'}}>
            <span>Total Amount :</span>
            <span>NGN 5,000.00</span>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={2}>
            <Box sx={{py:1.5,px:2,bgcolor:'#00008B1A',color:'#00008B',display:'flex',alignItems:'center',borderRadius:1}}>
              <SvgIconStyle src="/icons/ic_wallet_wallet.svg"/>
            </Box>
            Wallet Balance
          </Stack>
          <Typography variant='body2' sx={{py:1.5,px:2,bgcolor:'#00008B1A',color:'#00008B',fontWeight:700,display:'flex',alignItems:'center',borderRadius:1}}>NGN 5,000.00</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{p:2,border:'1px solid #00008B80',borderRadius:1}}>
          <Stack gap={1}>
            <Typography variant='h5'>Richard Daniel</Typography>
            <Typography color='primary' variant='caption'>27585445556</Typography>
          </Stack>
          <IconButton><Autorenew/></IconButton>
        </Stack>
      </>,
      <>
        <TextField variant='standard' type='password' label='Transaction Password' value={dataFundModal.password??''} onChange={(e)=>updateFundModal('password',e.target.value)}/>
      </>
    ],
    betting: [
      null,
      <>
        <TextField select variant='standard' label='Service Provider' onChange={(e)=>updateFundModal('service',e.target.value)}>
          <MenuItem value={1}>Service Provider1</MenuItem>
        </TextField>
        <TextField select variant='standard' label='Select Package' onChange={(e)=>updateFundModal('package',e.target.value)}>
          <MenuItem value={1}>Package1</MenuItem>
        </TextField>
        <TextField variant='standard' label='Customer ID' defaultValue={dataFundModal.customer??''} onChange={(e)=>updateFundModal('customer',e.target.value)}/>
        <TextField variant='standard' label='Amount' value={dataFundModal.amount??''} onChange={(e)=>updateFundModal('amount',e.target.value)}/>
      </>,
      <>
        <VerifyCode digit={4} onChange={(code)=>updateFundModal('code',code)}/>
      </>
    ],
    utility: [
      null,
      <>
        <TextField select variant='standard' label='Choose Utility Company' onChange={(e)=>updateFundModal('company',e.target.value)}>
          <MenuItem value={1}>EKCD/DISCO</MenuItem>
        </TextField>
        <TextField select variant='standard' label='Select Package' onChange={(e)=>updateFundModal('package',e.target.value)}>
          <MenuItem value={1}>Pre-Paid</MenuItem>
        </TextField>
        <TextField variant='standard' label='Meter Number' defaultValue={dataFundModal.number??''} onChange={(e)=>updateFundModal('number',e.target.value)}/>
        <TextField variant='standard' label='Amount' value={dataFundModal.amount??''} onChange={(e)=>updateFundModal('amount',e.target.value)}/>
      </>,
      <>
        <VerifyCode digit={4} onChange={(code)=>updateFundModal('code',code)}/>
      </>
    ],
    cable: [
      null,
      <>
        <TextField select variant='standard' label='Service Provider' defaultValue='' onChange={(e)=>updateFundModal('service',e.target.value)}>
          <MenuItem value={1}>DSTV</MenuItem>
        </TextField>
        <TextField select variant='standard' label='Select Package' onChange={(e)=>updateFundModal('package',e.target.value)}>
          <MenuItem value={1}>DSTV Compact - N10,000</MenuItem>
        </TextField>
        <TextField variant='standard' label='Smart card/Decorder Number' defaultValue={dataFundModal.number??''} onChange={(e)=>updateFundModal('number',e.target.value)}/>
        <TextField variant='standard' label='Amount' value={dataFundModal.amount??''} onChange={(e)=>updateFundModal('amount',e.target.value)}/>
      </>,
      <>
        <VerifyCode digit={4} onChange={(code)=>updateFundModal('code',code)}/>
      </>
    ],
    airtime: [
      null,
      <>
        <TextField select variant='standard' label='Network Provider' onChange={(e)=>updateFundModal('network',e.target.value)}>
          <MenuItem value={1}>MTN</MenuItem>
        </TextField>
        <TextField variant='standard' label='Phone Number' defaultValue={dataFundModal.number??''} onChange={(e)=>updateFundModal('number',e.target.value)}/>
        <TextField variant='standard' label='Amount' value={dataFundModal.amount??''} onChange={(e)=>updateFundModal('amount',e.target.value)}/>
      </>,
      <>
        <VerifyCode digit={4} onChange={(code)=>updateFundModal('code',code)}/>
      </>
    ],
    data: [
      null,
      <>
        <TextField select variant='standard' label='Network Provider' defaultValue='' onChange={(e)=>updateFundModal('network',e.target.value)}>
          <MenuItem value={1}>AIRTEL</MenuItem>
        </TextField>
        <TextField select variant='standard' label='Select Package' onChange={(e)=>updateFundModal('package',e.target.value)}>
          <MenuItem value={1}>20GB - 1 month</MenuItem>
        </TextField>
        <TextField variant='standard' label='Phone Number' defaultValue={dataFundModal.number??''} onChange={(e)=>updateFundModal('number',e.target.value)}/>
        <TextField variant='standard' label='Amount' value={dataFundModal.amount??''} onChange={(e)=>updateFundModal('amount',e.target.value)}/>
      </>,
      <>
        <VerifyCode digit={4} onChange={(code)=>updateFundModal('code',code)}/>
      </>
    ],
    other: [
      null,
      <>
        <TextField select variant='standard' label='Network Provider' defaultValue='' onChange={(e)=>updateFundModal('network',e.target.value)}>
          <MenuItem value={1}>AIRTEL</MenuItem>
        </TextField>
        <TextField select variant='standard' label='Select Package' onChange={(e)=>updateFundModal('package',e.target.value)}>
          <MenuItem value={1}>20GB - 1 month</MenuItem>
        </TextField>
        <TextField variant='standard' label='Phone Number' defaultValue={dataFundModal.number??''} onChange={(e)=>updateFundModal('number',e.target.value)}/>
        <TextField variant='standard' label='Amount' value={dataFundModal.amount??''} onChange={(e)=>updateFundModal('amount',e.target.value)}/>
      </>,
      <>
        <VerifyCode digit={4} onChange={(code)=>updateFundModal('code',code)}/>
      </>
    ],
  }
  const transactionProcess = {
    create: 'Please wait while we create your Wallet',
    credit: 'Please wait while we Process your transaction',
    transfer: 'Please wait while we Process your transaction',
    attitude: 'Please wait while we Process your transaction',
    ussd: 'Please wait while we Process your transaction',
    wallet: 'Please wait while we Process your transaction',
    betting: 'Please wait while we Process your transaction',
    utility: 'Please wait while we Process your transaction',
    cable: 'Please wait while we Process your transaction',
    airtime: 'Please wait while we Process your transaction',
    data: 'Please wait while we Process your transaction',
    other: 'Please wait while we Process your transaction',
  }
  const transactionSuccess = {
    create: 'Your new Wallet was created successfully',
    credit: 'Your Wallet was successfully funded via Credit card',
    transfer: 'Your Wallet was successfully funded via Bank Transfer',
    attitude: 'Your Wallet was successfully funded via Pay Attitude',
    ussd: 'Your Wallet was successfully funded via USSD',
    wallet: 'Your Wallet was successfully funded via Wallet Funding',
    betting: 'Your Bet was funded Successfully',
    utility: 'Your Utility Bills was paid Successfully',
    cable: 'Your DSTV Premium subcription was paid Successfully',
    airtime: 'Your phone number was created Successfully',
    data: 'Your DSTV Premium subcription was paid Successfully',
    other: 'Your DSTV Premium subcription was paid Successfully',
  }

  const backFundModal = () => {
    if(stepFundModal>1)
      setStepFundModal(stepFundModal-1)
    else
      closeFundModal()
  }

  const nextFundModal = () => {
    if(stepFundModal===modalContent[activeFundModal].length-1) {
      closeFundModal()
      setLoading(true)
      setOpenProgress(true)
      setTimeout(()=>setLoading(false),3000)
    } else {      
      setNextLoading(true)
      setTimeout(()=>{
        setStepFundModal(stepFundModal+1)
        setNextLoading(false)
      },1000)
    }
  }

  const filledFundModal = () => {
    if(activeFundModal==='create') {
      if(!dataFundModal.name || !dataFundModal.type || !dataFundModal.phoneNumber || !dataFundModal.email || !dataFundModal.BVN)
        return true
    } else if(activeFundModal==='credit') {
      if(!dataFundModal.amount || !dataFundModal.name || !dataFundModal.cardNumber || !dataFundModal.cvv)
        return true
      if(stepFundModal===2 && (!dataFundModal.password || dataFundModal.password.length<8)) return true
    } else if(activeFundModal==='transfer') {
      if(!dataFundModal.bank || !dataFundModal.accountNumber || !dataFundModal.amount)
        return true
      if(stepFundModal===2 && (!dataFundModal.code || dataFundModal.code.length<4)) return true
    } else if(activeFundModal==='attitude') {
      if(!dataFundModal.number)
        return true
      if(stepFundModal===2 && !dataFundModal.amount) return true
    } else if(activeFundModal==='ussd') {
      if(!dataFundModal.bank)
        return true
      if(stepFundModal===2 && (!dataFundModal.number || !dataFundModal.amount)) return true
    } else if(activeFundModal==='betting') {
      if(!dataFundModal.service || !dataFundModal.package || !dataFundModal.customer || !dataFundModal.amount)
        return true
      if(stepFundModal===2 && (!dataFundModal.code || dataFundModal.code.length<4)) return true
    } else if(activeFundModal==='utility') {
      if(!dataFundModal.company || !dataFundModal.package || !dataFundModal.number || !dataFundModal.amount)
        return true
      if(stepFundModal===2 && (!dataFundModal.code || dataFundModal.code.length<4)) return true
    } else if(activeFundModal==='cable') {
      if(!dataFundModal.service || !dataFundModal.package || !dataFundModal.number || !dataFundModal.amount)
        return true
      if(stepFundModal===2 && (!dataFundModal.code || dataFundModal.code.length<4)) return true
    } else if(activeFundModal==='airtime') {
      if(!dataFundModal.network || !dataFundModal.number || !dataFundModal.amount)
        return true
      if(stepFundModal===2 && (!dataFundModal.code || dataFundModal.code.length<4)) return true
    } else if(activeFundModal==='data') {
      if(!dataFundModal.network || !dataFundModal.package || !dataFundModal.number || !dataFundModal.amount)
        return true
      if(stepFundModal===2 && (!dataFundModal.code || dataFundModal.code.length<4)) return true
    } else if(activeFundModal==='other') {
      if(!dataFundModal.network || !dataFundModal.package || !dataFundModal.number || !dataFundModal.amount)
        return true
      if(stepFundModal===2 && (!dataFundModal.code || dataFundModal.code.length<4)) return true
    }
    return false
  }

  const updateFundModal = (name, value) => {
    setDataFundModal({...dataFundModal,[name]:value})
  }

  const showFundModal = (active) => {
    setDataFundModal({})
    setActiveFundModal(active)
    setStepFundModal(1)
    setOpenProgress(false)
  }

  const closeFundModal = () => {
    setStepFundModal(0)
  }

  const handleFundList = () => {
    setShowFundList(true)
  }

  return (
    <Page title="Payment">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} sx={{pr:4}}>
            <Box sx={{display:'flex',justifyContent:'space-around', bgcolor: 'common.white', pl: 5, py: 1, ml: -5, mt: -3, border: '1px solid #efefef'}}>
              <Button onClick={()=>showFundModal('transfer')} size="medium" sx={{'& .MuiButton-startIcon':{width: 20, height:20}, color: 'common.black'}} startIcon={<SvgIconStyle src={`/icons/ic_transfer.svg`} sx={{ width: 1, height: 1 }} />}>
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
            <FundWallet onFund={handleFundList}/>
            <Box sx={{my:2}}>
              <OutlinedInput
                sx={{width:1,overflow:'hidden'}}
                size="small"
                startAdornment={
                  <Box sx={{whiteSpace:'nowrap',backgroundColor:'#eee',py:1, px:2, ml:-2, mr:2}}>Fund Wallet</Box>
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
            {!showFundList ?
              <Stack spacing={2} sx={{
                '& button': {
                  p: '1.5rem 3rem',
                  fontSize: '1.2rem',
                  color: '#666',
                  border: '1px solid #E6E6F4',
                  fontWeight: 'normal'
                }
              }}>
                <Button onClick={()=>showFundModal('create')} sx={{'& .MuiButton-startIcon':{width: 43, height:43, color:'#00008B', border:'2px solid #ddd', borderRadius: '50%'}, color: '#252733', bgcolor:'common.white', px: 4, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_wallet_create.svg`} sx={{ width: 1, height: 1 }} />}>
                  Create Wallet
                </Button>
                <Button onClick={handleFundList} sx={{'& .MuiButton-startIcon':{width: 43, height:43, color:'#00008B', border:'2px solid #ddd', borderRadius: '50%'}, color: '#252733', bgcolor:'common.white', px: 4, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_wallet_fund.svg`} sx={{ width: 1, height: 1 }} />}>
                  Fund Wallet
                </Button>
                <Button sx={{'& .MuiButton-startIcon':{width: 43, height:43, color:'#00008B', border:'2px solid #ddd', borderRadius: '50%'}, color: '#252733', bgcolor:'common.white', px: 4, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_wallet_transactions.svg`} sx={{ width: 1, height: 1 }} />}>
                  Transactions
                </Button>
                <Button sx={{'& .MuiButton-startIcon':{width: 43, height:43, color:'#00008B', border:'2px solid #ddd', borderRadius: '50%'}, color: '#252733', bgcolor:'common.white', px: 4, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_wallet_freeze.svg`} sx={{ width: 1, height: 1 }} />}>
                  Freeze Wallet
                </Button>
                <Button sx={{'& .MuiButton-startIcon':{width: 43, height:43, color:'#f00', border:'2px solid #ddd', borderRadius: '50%'}, color: '#252733', bgcolor:'common.white', px: 4, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_wallet_remove.svg`} sx={{ width: 1, height: 1 }} />}>
                  Remove Wallet
                </Button>
              </Stack>:
              <Stack spacing={2} sx={{
                '> button': {
                  p: '0.75rem 2rem',
                  fontSize: '1.2rem',
                  color: '#666',
                  border: '1px solid #E6E6F4',
                  fontWeight: 'normal',
                  justifyContent:'start',
                  gap: 2,
                  'img': {
                    objectFit: 'contain'
                  }
                }
              }}>
                {showWalletDetail?
                  <>
                    <div>
                      <Button size="medium" onClick={()=>setShowWalletDetail(false)} sx={{'& .MuiButton-startIcon':{width: 30, height:30, color:'common.white', bgcolor:'#00008B', borderRadius:'50%'}}} startIcon={<SvgIconStyle src={`/icons/ic_back.svg`} sx={{ width: 1, height: 1 }} />}>
                        Back
                      </Button>
                    </div>
                    <Button onClick={()=>showFundModal('wallet')} startIcon={<Image src="/icons/ic_wallet_wallet.svg" sx={{width:100,height:30}}/>}>
                      <Stack alignItems='start'>
                        <Typography variant="h5" color="common.black">Scan to Pay</Typography>
                        <Typography variant="caption">Make payment by scanning the QR code</Typography>
                      </Stack>
                    </Button>
                    <Button onClick={()=>showFundModal('wallet')} startIcon={<Image src="/icons/ic_wallet_wallet.svg" sx={{width:100,height:30}}/>}>
                      <Stack alignItems='start'>
                        <Typography variant="h5" color="common.black">Login to Pay</Typography>
                        <Typography variant="caption">Login or Scan to Pay</Typography>
                      </Stack>
                    </Button>
                  </>:
                  <>
                    <div>
                      <Button size="medium" onClick={()=>setShowFundList(false)} sx={{'& .MuiButton-startIcon':{width: 30, height:30, color:'common.white', bgcolor:'#00008B', borderRadius:'50%'}}} startIcon={<SvgIconStyle src={`/icons/ic_back.svg`} sx={{ width: 1, height: 1 }} />}>
                        Back
                      </Button>
                      <Typography variant="body2" sx={{pt:4,pl:6}}>Kindly select how you want to Fund your Wallet</Typography>
                    </div>
                    <Button onClick={()=>showFundModal('credit')} startIcon={<Image src="/icons/ic_wallet_credit.svg" sx={{width:100,height:30}}/>}>
                      <Stack alignItems='start'>
                        <Typography variant="h5" color="common.black">Fund Wallet via Credit card</Typography>
                        <Typography variant="caption">Mastercard, Verve, Visa</Typography>
                      </Stack>
                    </Button>
                    <Button onClick={()=>showFundModal('transfer')} startIcon={<Image src="/icons/ic_wallet_bank.svg" sx={{width:100,height:30}}/>}>
                      <Stack alignItems='start'>
                        <Typography variant="h5" color="common.black">Fund Wallet via Bank Transfer</Typography>
                        <Typography variant="caption">Pay with your Bank Account</Typography>
                      </Stack>
                    </Button>
                    <Button onClick={()=>showFundModal('account')} startIcon={<Image src="/icons/ic_transfer.svg" sx={{width:100,height:30}}/>}>
                      <Stack alignItems='start'>
                        <Typography variant="h5" color="common.black">Fund Wallet via Bank Account</Typography>
                        <Typography variant="caption">Pay with transfer from other bank</Typography>
                      </Stack>
                    </Button>
                    <Button onClick={()=>showFundModal('attitude')} startIcon={<Image src="/icons/ic_wallet_attitude.svg" sx={{width:100,height:30}}/>}>
                      <Stack alignItems='start'>
                        <Typography variant="h5" color="common.black">Pay Attitude</Typography>
                        <Typography variant="caption">Pay with your phone number</Typography>
                      </Stack>
                    </Button>
                    <Button onClick={()=>showFundModal('ussd')} startIcon={<Image src="/icons/ic_wallet_ussd.svg" sx={{width:100,height:30}}/>}>
                      <Stack alignItems='start'>
                        <Typography variant="h5" color="common.black">USSD</Typography>
                        <Typography variant="caption">Pay with USSD code via your mobile device</Typography>
                      </Stack>
                    </Button>
                    <Button onClick={()=>setShowWalletDetail(true)} startIcon={<Image src="/icons/ic_wallet_wallet.svg" sx={{width:100,height:30}}/>}>
                      <Stack alignItems='start'>
                        <Typography variant="h5" color="common.black">Wallet</Typography>
                        <Typography variant="caption">Login or Scan to Pay</Typography>
                      </Stack>
                    </Button>
                  </>
                }
              </Stack>
            }
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" color="primary">Bills Payment</Typography>
            <Stack sx={{mt:2}} spacing={1}>
              <Button onClick={()=>showFundModal('betting')} size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, bgcolor:'#F1F7FA', border:'2px solid #064A72', borderRadius: '4px'}, color: '#252733', bgcolor:'common.white', px: 2, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_bills_betting.svg`} sx={{ width: 1, height: 1 }} />}>
                Betting
              </Button>
              <Button onClick={()=>showFundModal('utility')} size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, bgcolor:'#F1F7FA', border:'2px solid #064A72', borderRadius: '4px'}, color: '#252733', bgcolor:'common.white', px: 2, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_bills_utility.svg`} sx={{ width: 1, height: 1 }} />}>
                Utility Bills
              </Button>
              <Button onClick={()=>showFundModal('cable')} size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, bgcolor:'#F1F7FA', border:'2px solid #064A72', borderRadius: '4px'}, color: '#252733', bgcolor:'common.white', px: 2, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_bills_cable.svg`} sx={{ width: 1, height: 1 }} />}>
                Cable
              </Button>
              <Button onClick={()=>showFundModal('airtime')} size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, bgcolor:'#F1F7FA', border:'2px solid #064A72', borderRadius: '4px'}, color: '#252733', bgcolor:'common.white', px: 2, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_bills_airtime.svg`} sx={{ width: 1, height: 1 }} />}>
                Airtime
              </Button>
              <Button onClick={()=>showFundModal('data')} size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, bgcolor:'#F1F7FA', border:'2px solid #064A72', borderRadius: '4px'}, color: '#252733', bgcolor:'common.white', px: 2, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_bills_data.svg`} sx={{ width: 1, height: 1 }} />}>
                Data
              </Button>
              <Button onClick={()=>showFundModal('other')} size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, bgcolor:'#F1F7FA', border:'2px solid #064A72', borderRadius: '4px'}, color: '#252733', bgcolor:'common.white', px: 2, justifyContent:'start'}} startIcon={<SvgIconStyle src={`/icons/ic_bills_other.svg`} sx={{ width: 1, height: 1 }} />}>
                Other Bills Payment
              </Button>
            </Stack>
            <Box sx={{
              textAlign: 'center',
              border: '1px solid #eee',
              mt: 5,
              p: 2,
            }}>
              <Typography variant="h5" sx={{mb: 2}}>Download our App</Typography>
              <Typography variant="body2" sx={{mb:4}}>
                Download our mobile application for better experience and to receive custom notifications in real time.
              </Typography>
              <Box sx={{
                display:'flex',
                gap: '4px',
                '& a': {
                  p: 1,
                  backgroundColor: 'black',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'common.white',
                  fontSize: '10px',
                  fontWeight: 'normal',
                  textDecoration: 'none'
                },
                '& strong': {
                  whiteSpace: 'nowrap',
                  fontSize: '1.2em'
                },
              }}>
                <a href="https://appstore.com">
                  <Image src="/icons/ic_apple.svg" height={30}/>
                  <span>Donwload on the <strong>Appstore</strong></span>
                </a>
                <a href="https://appstore.com">
                  <Image src="/icons/ic_google.svg" height={30}/>
                  <span>Get it on <strong>Google play</strong></span>
                </a>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <FormDialog state={stepFundModal>0} scroll="body" title={modalTitle[activeFundModal][stepFundModal]} subtitle={modalSubTitle[activeFundModal][stepFundModal]} onClose={closeFundModal}>
          <DialogContent sx={{gap:2,display:"flex",flexDirection:"column"}}>
            {modalContent[activeFundModal][stepFundModal]}
          </DialogContent>
          {(activeFundModal==='account' || activeFundModal==='wallet' && stepFundModal===1)?null:
          <DialogActions>
            {activeFundModal==='create' ? 
            <LoadingButton fullWidth size="large" loading={nextLoading} variant="contained" disabled={filledFundModal()} color="primary" onClick={nextFundModal}>
              Create Wallet
            </LoadingButton> : 
            <>
              <LoadingButton fullWidth size="large" loading={nextLoading} variant="contained" disabled={filledFundModal()} color="primary" onClick={nextFundModal}>
                {stepFundModal===modalContent[activeFundModal].length-1 ? 'Confirm' : 'Next'}
              </LoadingButton>
              <LoadingButton fullWidth size="large" loading={backLoading} variant="outlined" onClick={backFundModal}>
                {stepFundModal>1 ? 'Back' : 'Close'}
              </LoadingButton>
            </>}            
          </DialogActions>}
        </FormDialog>
        <Dialog
          onClose={()=>setOpenProgress(false)}
          open={openProgress}
          title="Transaction Processing"
          description={transactionProcess[activeFundModal]}
          success={transactionSuccess[activeFundModal]}
          loading={loading}
          continue="Fund another?"
          onContinue={()=>showFundModal('transfer')} />
      </Container>
    </Page>
  );
}
