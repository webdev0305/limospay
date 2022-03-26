import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { m } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography, Link, Button } from '@mui/material';
// components
import Image from './Image';
import { MotionContainer, varFade } from './animate';
import { CarouselDots, CarouselArrows } from './carousel';
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

export default function FundWallet() {
  const { user } = useAuth();
  const theme = useTheme();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
      zIndex: 9,
      position: 'absolute',
      width: '100%', 
      left: 0, 
      bottom: 8,
      color: 'common.white'
    }),
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  const wallets = [...Array(1)].map((_,index)=>({
    id: index, title: `Hello ${user.displayName}`, balance: 2850.75, image: '/images/slide-wallet.svg'
  }))

  return  (
    <div style={{position:'relative'}}>
      <Card>
        <Slider ref={carouselRef} {...settings}>
          {wallets.map((wallet, index) => (
            <CarouselItem key={index} item={wallet} isActive={index === currentIndex} />
          ))}
        </Slider>
      </Card>
      <CarouselArrows
        onNext={handleNext}
        onPrevious={handlePrevious}
        spacing={0}
        customIcon={'eva:arrow-ios-forward-fill'}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          top: '50%',
          left: -20,
          width: 'calc(100% + 40px)',
          height: 0,
          position: 'absolute',
          '& .arrow': {
            p: 0,
            width: 40,
            height: 40,
            backgroundColor: 'common.white',
            color: 'common.gray',
            boxShadow: '0 0 4px black',
            '&:hover': { color: 'common.black', backgroundColor: 'common.white', opacity: 1 },
          },
        }}
      />
    </div>
  )
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  isActive: PropTypes.bool,
  item: PropTypes.shape({
    balance: PropTypes.number,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
};

function CarouselItem({ item, isActive }) {
  const { image, title, balance } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        component={MotionContainer}
        animate={isActive}
        action
        sx={{
          width: 1,
          zIndex: 9,
          pl: 5,
          textAlign: 'left',
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Box sx={{display:'flex'}}>
            <Image src="/images/slide-qrcode.svg" sx={{ height: '24px', width: '34px' }} />
            <Typography variant="h5" gutterBottom noWrap sx={{ml:1, mb:2}}>
              {title}
            </Typography>
            <span style={{width:'100%',textAlign:'right'}}>
              <Button variant="outlined" size="small" color="white">Fund Wallet</Button>
            </span>
          </Box>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Typography variant="caption" noWrap>
            Wallet balance 1/3
          </Typography>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Typography variant="h4" noWrap>
            NGN {balance}
          </Typography>
        </m.div>
      </CardContent>
      <OverlayStyle />
      <Image alt={title} src={image} sx={{ height: { xs: 156, xl: 320 } }} />
    </Box>
  );
}
