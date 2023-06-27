import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Box from '@mui/material/Box';

import CustomImage from '@core/components/multimedia/CustomImage';

import { homeBannersConfig } from '@lib/config/productBanners.config';

const AllProductsBanner = () => {

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '500px',
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
        style={{
          position: 'relative',
          height: '100%',
        }}
      >
        { homeBannersConfig.allProducts.items.map((item, index) => (
          <SwiperSlide key={index}>
            <CustomImage
              src={item.source.src}
              alt={item.source.alt}
              width={item.source.width}
              height={item.source.height}
              layout="fill"
              objectFit="cover"
              priority={item.source.priority}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default AllProductsBanner;
