import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
// routes
import {Dialog} from '../../../components/modal';
import VerifyCode from './VerifyCode';

// ----------------------------------------------------------------------

export default function VerifyCodeForm() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('')
  const handleClose = () => {
    setOpen(false);
    navigate('/auth/login')
  };
  
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const onSubmit = async () => {
    setLoading(true)
    setOpen(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false)
      // enqueueSnackbar('Verify success!');

      // navigate(PATH_DASHBOARD.root, { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VerifyCode digit={6} onChange={(code)=>setCode(code)}/>

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
