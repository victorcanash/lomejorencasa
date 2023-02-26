import Image, { StaticImageData } from 'next/image';

import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Box from '@mui/material/Box';

type ProductCarouselProps = {
  imgSources: (string | StaticImageData)[],
};

const ProductCarousel = (props: ProductCarouselProps) => {
  const { imgSources } = props;
  
  return (
    <Box>
      <Swiper
        modules={[Pagination]}
        loop
        pagination={{
          clickable: true
        }}
      >
        { imgSources.map((imgSrc, imgSrcIndex) => (
          <SwiperSlide key={imgSrcIndex}>
            <div 
              style={{ marginBottom: '40px' }}
            >
              <Image 
                src={imgSrc}
                alt="Product image" 
                layout="responsive" 
                objectFit="cover"
                quality="100"
                priority
                style={{ borderRadius: '10px' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductCarousel;