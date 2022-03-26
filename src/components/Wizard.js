export default function Wizard({steps}) {
    const [ backLoading,setBackLoading ] = useState(false)
    const [ nextLoading,setNextLoading ] = useState(false)
    const [ step,setStep ] = useState(0)
    const [ dataFundModal,setDataFundModal ] = useState({})

    const goBack = () => {
        if(step>1)
            setStep(step-1)
        else
            close()
    }

    const goNext = () => {
        setNextLoading(true)
        setTimeout(()=>{
            if(step==steps.length) {
                close()
            } else 
                setStep(step+1)
            setNextLoading(false)
        },1000)
    }

    const checkFilled = () => {
        if(dataFundModal.bank===0 || dataFundModal.accountNumber==='' || !dataFundModal.amount)
            return true
        if(step===2 && (!dataFundModal.code || dataFundModal.code.length<4)) return true
        return false
    }

    const handleChange = (name, value) => {
        setDataFundModal({...dataFundModal,[name]:value})
    }

    const close = () => {
        setStep(0)
    }
    return (
        <FormDialog state={step>0} scroll="body" title="Fund Wallet via Bank Transfer" subtitle="Select the Bank your transfering to proceed" onClose={close}>
          <DialogContent sx={{gap:2,display:"flex",flexDirection:"column"}}>
            {step===1 && 
            <>
              <TextField select variant='standard' label='Select Bank' value={dataFundModal.bank} onChange={(e)=>handleChange('bank',e.target.value)}>
                <MenuItem value={1}>Bank1</MenuItem>
                <MenuItem value={2}>Bank2</MenuItem>
                <MenuItem value={3}>Bank3</MenuItem>
              </TextField>
              <TextField variant='standard' label='Account Number' value={dataFundModal.accountNumber??''} onChange={(e)=>handleChange('accountNumber',e.target.value)}/>
              <TextField variant='standard' label='Enter Amount' value={dataFundModal.amount??''} onChange={(e)=>handleChange('amount',e.target.value)}/>
              <TextField variant='standard' label='Transaction Remark' value={dataFundModal.remark??''} onChange={(e)=>handleChange('remark',e.target.value)}/>
            </>}
            {step===2 && <VerifyCode digit={4} onChange={(code)=>handleChange('code',code)}/>}
          </DialogContent>
          <DialogActions>
            <LoadingButton fullWidth size="large" loading={nextLoading} variant="contained" disabled={checkFilled()} color="primary" onClick={goNext}>
              {step===1 && 'Next'}
              {step===2 && 'Confirm'}
            </LoadingButton>
            <LoadingButton fullWidth size="large" loading={backLoading} variant="outlined" onClick={goBack}>
              {step>1 ? 'Back' : 'Close'}
            </LoadingButton>
          </DialogActions>
        </FormDialog>
    )
}