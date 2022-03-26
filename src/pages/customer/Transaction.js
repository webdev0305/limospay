import { useState } from 'react';
import { NavLink as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Box, Card, Container, Button, Typography, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, MenuItem } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import SvgIconStyle from '../../components/SvgIconStyle';
import MenuPopover from '../../components/MenuPopover';
import Label from '../../components/Label';
// ----------------------------------------------------------------------

export default function Support() {
  const { themeStretch } = useSettings();
  const { id } = useParams()

  const ShareButton = () => {
    const [open, setOpen] = useState(null);
  
    const handleOpen = (event) => {
      setOpen(event.currentTarget);
    };
  
    const handleClose = () => {
      setOpen(null);
    };
  
    return (
      <>
        <Button size="medium" onClick={handleOpen} sx={{'& .MuiButton-startIcon':{width: 20, height:20}, color: 'primary'}} startIcon={<SvgIconStyle src={`/icons/ic_share.svg`} sx={{ width: 1, height: 1 }} />}>
          Share
        </Button>
  
        <MenuPopover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            mt: 1,
            width: 160,
            '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
          }}
        >
          <MenuItem>via SMS</MenuItem>
          <MenuItem>via Email</MenuItem>
        </MenuPopover>
      </>
    );
  }

  return (
    <Page title="Transaction">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{position:"relative",pt:8}}>
        <RouterLink to="/payment" style={{textDecoration:"none",position:"absolute",left:"1em",top:0}}>
          <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, color:'common.white', bgcolor:'#00008B', borderRadius:'50%'}}} startIcon={<SvgIconStyle src={`/icons/ic_back.svg`} sx={{ width: 1, height: 1 }} />}>
            Back
          </Button>
        </RouterLink>
        <Card>
          <TableContainer>
            <Table sx={{fontSize: '14px'}}>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="h4" color="primary">LimosPay</Typography></TableCell>
                  <TableCell><Typography color='common.black'>Transaction Details</Typography></TableCell>
                  <TableCell align="center"><ShareButton/></TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{'& td':{border:0}}}>
                <TableRow>
                  <TableCell>Transaction Date</TableCell>
                  <TableCell>23rd Jan, 2022</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Reference Number</TableCell>
                  <TableCell>Ref No: 571654168874</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Amount Sent</TableCell>
                  <TableCell>N70,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sender</TableCell>
                  <TableCell>Seun Ajibode</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Account Name</TableCell>
                  <TableCell>Rox Knight</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Beneficiary Bank</TableCell>
                  <TableCell>Zenith Bank</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Account Number</TableCell>
                  <TableCell>015736492</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Beneficiary</TableCell>
                  <TableCell>DSTV</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell><Label color='success'>Successful</Label></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </Page>
  );
}
