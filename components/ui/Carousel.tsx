import Image, { StaticImageData } from 'next/image';
// import Zoom from 'react-medium-image-zoom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Pagination } from 'swiper';

import Box from '@mui/material/Box';

type CarouselProps = {
  imgSources: (string | StaticImageData)[],
}

const Carousel = (props: CarouselProps) => {
  const { imgSources } = props;
  
  return (
    <Box>
      <Swiper
        modules={[Navigation, EffectCoverflow, Pagination]}
        navigation
        pagination={{
          clickable: true
        }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        { imgSources.map((imgSrc, imgSrcIndex) => (
          <SwiperSlide key={imgSrcIndex}>
            <div style={{ marginBottom: "40px"}}>
              {/*<Zoom>*/}
                <Image 
                  src={imgSrc} 
                  alt="Product image" 
                  layout="responsive" 
                  objectFit="cover"
                  quality="100"
                  priority
                />
              {/*</Zoom>*/}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Carousel;
