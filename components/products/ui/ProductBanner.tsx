import Image from 'next/image';

import { FormattedMessage } from 'react-intl';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import LinkButton from '@core/components/LinkButton';

import { pages } from '@lib/constants/navigation';
import colors from '@lib/constants/themes/colors';
import { getProductBannerImgsUrl } from '@lib/utils/products';

const ProductBanner = () => {
  const getContent = (index: number) => {
    return (
      <Grid 
        container
        rowSpacing={2}          
        sx={{
          position: 'absolute',
          height: '100%',
          width: {
            xs: '50%',
          },
          top: '0px',
          px: '20px',
          py: '10px',
          flexWrap: 'nowrap',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Grid item>
          <Typography 
            component="div" 
            sx={{ 
              /*typography: { 
                xs: 'home_h3', 
                xs_sm: 'home_h2',
                sm_md: 'home_h1', 
              },*/
              color: colors.text.home.banner.primary,
            }}
          >
            <FormattedMessage id={`home.banner.${index + 1}`} />
          </Typography>
        </Grid>
        <Grid item>
          <LinkButton
            href={pages.everfresh.path}
            id="advantages"
            sx={{
              backgroundColor: colors.background.button.action.primary,
              color: colors.text.button.action.primary,
              '&:hover': {
                backgroundColor: colors.background.button.action.hover,
                color: colors.text.button.action.hover,
              },
            }}
          >
            <FormattedMessage id="home.buyBtn" />
          </LinkButton>
        </Grid>
      </Grid>
    );
  };

  return ( 
    <Box 
      sx={{
        maxWidth: '1075px',
        m: 'auto',
      }}
    >
      <Swiper 
        modules={[Autoplay]}
        speed={1000} 
        loop
        centeredSlides
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        { getProductBannerImgsUrl().map((src, index) => (
          <SwiperSlide key={index}>
            <div>
              <Image
                src={src} 
                alt="Product image" 
                layout="responsive" 
                objectFit="cover"
                quality="100"
                priority
              />
              { getContent(index) }
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductBanner;
