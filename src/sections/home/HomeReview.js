import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useRef } from 'react';
import Slider from 'react-slick';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Card, Button, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
// import { CarouselArrows } from '../../components/carousel';
import SocialsButton from '../../components/SocialsButton';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------
const members= [
  {
    avatar: '/images/home/avatar1.png',
    name: 'Samuel Johnson',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante id malesuada mauris orci vulputate ut blandit et. Pharetra dui suscipit odio diam et nunc suspendisse. '

  },
  {
    avatar: '/images/home/avatar1.png',
    name: 'Samuel Johnson',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante id malesuada mauris orci vulputate ut blandit et. Pharetra dui suscipit odio diam et nunc suspendisse. '

  },
  {
    avatar: '/images/home/avatar1.png',
    name: 'Samuel Johnson',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante id malesuada mauris orci vulputate ut blandit et. Pharetra dui suscipit odio diam et nunc suspendisse. '

  },
  {
    avatar: '/images/home/avatar1.png',
    name: 'Samuel Johnson',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante id malesuada mauris orci vulputate ut blandit et. Pharetra dui suscipit odio diam et nunc suspendisse. '

  },
  {
    avatar: '/images/home/avatar1.png',
    name: 'Samuel Johnson',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante id malesuada mauris orci vulputate ut blandit et. Pharetra dui suscipit odio diam et nunc suspendisse. '

  },
  {
    avatar: '/images/home/avatar1.png',
    name: 'Samuel Johnson',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante id malesuada mauris orci vulputate ut blandit et. Pharetra dui suscipit odio diam et nunc suspendisse. '

  },
  {
    avatar: '/images/home/avatar1.png',
    name: 'Samuel Johnson',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante id malesuada mauris orci vulputate ut blandit et. Pharetra dui suscipit odio diam et nunc suspendisse. '

  },
  {
    avatar: '/images/home/avatar1.png',
    name: 'Samuel Johnson',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante id malesuada mauris orci vulputate ut blandit et. Pharetra dui suscipit odio diam et nunc suspendisse. '

  }


]
export default function HomeReview() {
  const carouselRef = useRef(null);

  const theme = useTheme();

  const settings = {
    arrows: false,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: '0px',
    // rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div style={{textAlign: 'center'}}>
      <m.div variants={varFade().inUp}>
        <Typography sx={{ mb: 3, mt: 5, fontSize:' 36px', fontWeight: 600 }}>
          What people say about us
        </Typography>
      </m.div>

        <Box sx={{ position: 'relative' }}>
          <Slider ref={carouselRef} {...settings}>
            {members.map((member) => (
              <Box key={member.id} component={m.div} variants={varFade().in} sx={{ px: 1.5, py: 10 }}>
                <MemberCard member={member} />
              </Box>
            ))}
          </Slider>
        </Box>
      </div>
  );
}

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

function MemberCard({ member }) {
  const { name, avatar, description } = member;

  return (
    <Card key={name} sx={{ p: 2}}>
      <div style={{display:'flex'}}>
        <Image alt={name} src={avatar} sx={{ borderRadius: 30, width: 46, height: 46, mr: 2 }} s/>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5, textAlign: 'left' }}>
          {name}
        </Typography>
      </div>
      <Typography variant="body2" sx={{ mb: 2, mt: 2, color: 'text.secondary', textAlign:'left' }}>
        {description}
      </Typography>
    </Card>
  );
}
