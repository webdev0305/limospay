import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, CardHeader, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Typography, OutlinedInput, InputAdornment, CardContent, TableFooter, Pagination, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/lab';
import { ArrowDropDown } from '@mui/icons-material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import SvgIconStyle from '../../components/SvgIconStyle';
import { formatDate } from '../../utils/formatTime';
import Image from '../../components/Image';
// ----------------------------------------------------------------------

export default function Notifications() {
  const { themeStretch } = useSettings();
  const [loading, setLoading] = useState(true)
  const nav = useNavigate();

  useEffect(()=>{
    const timer = setTimeout(()=>setLoading(false),1000)
    return ()=>clearTimeout(timer)
  })

  const notifications = [...Array(15)].map(() => (
    { activity: 'You received a payment of (N500.00)', sender: 'Richard', time: new Date() }
  ))

  const showNotification = (id) => {
    nav(`/notification/${id}`)
  }

  return (
    <Page title="Payment">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {loading && (
          <Card>
            <CardHeader title="" sx={{bgcolor:'#F1F7FA'}}/>
            <CardContent sx={{p:15,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Image src="/images/alarm.svg" height={205} width={205}/>
            </CardContent>
            <div/>
          </Card>
        )}
        {!loading && (
          <Card>
            <TableContainer>
              <Table sx={{fontSize: '14px'}}>
                <TableHead sx={{
                  bgcolor: '#00008B10',
                  '& th': {
                    color: 'common.black',
                    '&:first-of-type, &:last-of-type': {
                      boxShadow: 'unset',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0
                    }
                  }
                }}>
                  <TableRow>
                    <TableCell>Activity</TableCell>
                    <TableCell>Sender</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align='center'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Box sx={{my:1, display:'flex', justifyContent:'space-between', alignItems:'center',gap:2}}>
                        <OutlinedInput
                          sx={{width:1,overflow:'hidden'}}
                          size="small"
                          placeholder="Search here..."
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton edge="end">
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <Box sx={{display:'flex',gap:1,alignItems:'center',ml:2,width:1}}>
                          <Typography>From</Typography>
                          <DatePicker onChange={()=>{}}
                            renderInput={(params) => <TextField size="small" {...params} />} 
                            components={{
                              OpenPickerIcon: ArrowDropDown
                            }}/>
                          <Typography>To</Typography>
                          <DatePicker onChange={()=>{}}
                            renderInput={(params) => <TextField size="small" {...params} />} 
                            components={{
                              OpenPickerIcon: ArrowDropDown
                            }}/>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                  {notifications.map((row,index) => (
                    <TableRow key={index} onClick={()=>showNotification(row.id)}>
                      <TableCell>
                        <Box sx={{display:'flex', gap: 1,alignItems:'center'}}>
                          <Box sx={{width:35,height:35,color:'#00008B',backgroundColor:'#00008B10',borderRadius:'50%',justifyContent:'center',alignItems:'center',display:'flex'}}>
                            <SvgIconStyle src={`/icons/ic_alarm.svg`} sx={{ width: '20px', height: '20px' }} />
                          </Box>
                          {row.activity}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {row.sender}
                      </TableCell>
                      <TableCell>
                        {formatDate(row.time,'d MMMM Y')}
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton size="small">
                          <Box sx={{width:30,height:30}}>
                            <SvgIconStyle src={`/icons/ic_wallet_remove.svg`} sx={{ width: 1, height: 1 }} />
                          </Box>
                        </IconButton >
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell align='center' colSpan={4}>
                      <Pagination count={10} hideNextButton hidePrevButton sx={{'& .MuiPagination-ul':{
                        justifyContent:'center'
                      }}}/>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Card>
        )}
      </Container>
    </Page>
  );
}
