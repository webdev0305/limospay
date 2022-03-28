// @mui
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from '../components/Image';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomeEasyToUse,
  HomeEasyCreateWallet,
  HomeGetOnboarded,
  HomeProtection,
  HomeUniqueFeatures,
  HomeReview,
  HomeDarkMode,
  HomeHero1,
} from '../sections/home';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="The starting point for your next project">
      <RootStyle>
        <HomeHero />
        <ContentStyle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              bgcolor: '#FAFAFA'
            }}
            py={6}
          >
            <Typography variant="h5" color="#aaa">Trusted by over 50,000 businesses</Typography>            
            <Image src="/images/home/trust-mtn.png"/>
            <Image src="/images/home/trust-domino.png"/>
            <Image src="/images/home/trust-b.png"/>
          </Box>
          <HomeEasyToUse />
          <HomeEasyCreateWallet />
          <HomeGetOnboarded />
          <HomeProtection />
          <HomeUniqueFeatures />
          <HomeReview />
          <HomeDarkMode />
          <HomeHero1 />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
