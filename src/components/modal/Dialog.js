import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { prototype } from 'apexcharts';


CustomizedDialogs.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    sx: PropTypes.object,
    title: PropTypes.string,
    description: PropTypes.string,
    loading: PropTypes.bool.isRequired,
  };

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root':{
    width: '590px',
    height: '376px'
  }
  
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, height: '81px', backgroundColor: '#00008B30', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }} {...other}>
      {children}
      
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ open = false, variants, onClose, children, title,description, loading, sx, ...other }) {

  return (
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          {title}
        </BootstrapDialogTitle>
        {loading?<DialogContent dividers sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
            <img src="/images/loader.gif" alt="loading" style={{width: '100px'}}/>
            <Typography gutterBottom>
                {description}
            </Typography>
          
        </DialogContent>:
        <DialogContent dividers sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
            <img src="/images/success.svg" alt="success"/>
            <Typography gutterBottom sx={{textAlign: 'center', paddingInline: '20px'}}>
                {other.success??description}
            </Typography>
            {other.continue && 
            <Typography gutterBottom sx={{textAlign: 'center', paddingInline: '20px'}}>
              {other.continue}
            </Typography>}
        </DialogContent>}
        {!loading && 
        <DialogActions sx={{justifyContent: 'space-around'}}>
          {!other.continue ?
          <Button autoFocus onClick={onClose} style={{padding: 0, fontSize: '24px', lineHeight: '35px'}}>OK</Button>:
          <>
            <Button onClick={onClose} style={{padding: 0, fontSize: '24px', lineHeight: '35px'}}>No</Button>
            <Button autoFocus onClick={other.onContinue} style={{padding: 0, fontSize: '24px', lineHeight: '35px'}}>Yes Continue</Button>
          </>}
        </DialogActions>
        }
      </BootstrapDialog>
  );
}