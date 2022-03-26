import { Link, Typography } from '@mui/material';
import AuthPage from '../../components/AuthPage';
import { VerifyCodeForm } from '../../sections/auth/verify-code';

export default function VerifyCode() {
  return (
    <AuthPage title="Verify your Account">
      <Typography sx={{ mt:2,mb:4 }} align="center">
        Please Input the OTP sent to your mobile number.
      </Typography>

      <VerifyCodeForm/>
      
      <Typography variant="body2" align="center" sx={{mt:4}}>
        <Link variant="subtitle2" underline="none" onClick={() => {}} style={{cursor: 'pointer', color: 'red'}}>
          Did not get OTP?
        </Link>
      </Typography>
    </AuthPage>
  );
}
