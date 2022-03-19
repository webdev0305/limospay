import { NavLink as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Box, Card, Container, Button, Typography, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import SvgIconStyle from '../../components/SvgIconStyle';
// ----------------------------------------------------------------------

export default function Support() {
  const { themeStretch } = useSettings();
  const { page } = useParams()

  const subjects = [
    { title:'Setup Guid', description:'Learn how to integrate LimosPay with your business', action:'Show Me',link:'/support/setup',icon:'setup' },
    { title:'API Documentation', description:'Learn how to build amazing things with the LimosPay API', action:'View Doc',link:'/support/api',icon:'api' },
    { title:'Dashboard Guide', description:'Learn about the features of the LimosPay Dashboard', action:'Explore',link:'/support/dashboard',icon:'dashboard' },
    { title:'FAQs', description:'Get quick answers to any questions about LimosPay', action:'Find Answers',link:'/support/faqs',icon:'faqs' },
    { title:'Share Your Feedback', description:'If you spot something that can be better, let us know', action:'Share',link:'/support/feedback',icon:'feedback' },
    { title:'Get in touch', description:'Send us a message or chat when someone is available', action:'Contact us',link:'/support/touch',icon:'touch' },
  ]

  return (
    <Page title="Payment">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{position:"relative"}}>
        <Typography variant="h5" sx={{textAlign:'center',mb:2}}>Support</Typography>
        <Typography variant="body1" sx={{textAlign:'center',mb:6}}>You need? Kindly select any option and you’ll get right away</Typography>
        {page===undefined ? (
          <Box sx={{display:'flex',flexWrap:'wrap'}} gap={2}>
            {subjects.map(subject=>(
              <Card key={subject.title} sx={{display:'flex',flexDirection:'column',flexGrow:1,width:'25%',alignItems:'center',py:6,px:4,gap:2}}>
                <Box sx={{width:60,height:60,color:'#FF4400',bgcolor:'#00008B10',borderRadius:'50%'}}>
                  <SvgIconStyle src={`/icons/ic_support_${subject.icon}.svg`} sx={{width:'100%', height:'100%'}}/>
                </Box>
                <Typography variant='h5'>{subject.title}</Typography>
                <Typography variant='body2' textAlign="center">{subject.description}</Typography>
                <RouterLink to={subject.link} style={{textDecoration:'none'}}>
                  <Button variant="outlined">{subject.action}</Button>
                </RouterLink>
              </Card>
            ))}
          </Box>
        ) : (
          <>
            <RouterLink to="/support" style={{textDecoration:"none",position:"absolute",left:"1em",top:0}}>
              <Button size="medium" sx={{'& .MuiButton-startIcon':{width: 30, height:30, color:'common.white', bgcolor:'#00008B', borderRadius:'50%'}}} startIcon={<SvgIconStyle src={`/icons/ic_back.svg`} sx={{ width: 1, height: 1 }} />}>
                Back
              </Button>
            </RouterLink>
            <Stack sx={{mt:2}} spacing={1}>
              {[...Array(5)].map((_,index) => (
              <RouterLink key={index} to="#" style={{color: '#252733', backgroundColor:'white',padding:'1em 2em',borderRadius:'8px',textDecoration:'none'}}>
                Learn how to Integrate LimosPay with your Busines
              </RouterLink>
              ))}
            </Stack>
          </>
        )}
      </Container>
    </Page>
  );
}
