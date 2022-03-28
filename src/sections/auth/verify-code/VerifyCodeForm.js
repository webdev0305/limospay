import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { Dialog } from '../../../components/modal';
import VerifyCode from './VerifyCode';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function VerifyCodeForm() {
  const { verify } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('')
  const handleClose = () => {
    setOpen(false);
    navigate('/auth/login')
  };
  
  const {
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async () => {
    setLoading(true)
    setOpen(true)
    try {
      await verify('register',code)
      // enqueueSnackbar('Verify success!');
      // navigate(PATH_DASHBOARD.root, { replace: true });
    } catch (error) {
      setError('afterSubmit', { ...error, message: error.message })
      // reset()
      setOpen(false)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VerifyCode digit={6} onChange={(code)=>{
        reset()
        setCode(code)
      }}/>
      {!!errors.afterSubmit && <Alert severity="error" sx={{ mt: 4 }}>{errors.afterSubmit.message}</Alert>}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        disabled={code.length!==6}
        sx={{ mt: 5 }}
      >
        Submit
      </LoadingButton>
      <Dialog
        onClose={handleClose}
        open={open}
        title='Creating Account'
        description='Please wait while we create and Account for you'
        success="You have successfully signed up LimosPay and a Waya Bank virtual account have been created for you."
        loading={loading}/>
    </form>
  );
}
