import Image from 'next/image';

import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Box from '@mui/material/Box';

import type { Source } from '@core/types/multimedia';

type ProductCarouselProps = {
  sources: Source[],
};

const ProductCarousel = (props: ProductCarouselProps) => {
  const { sources } = props;
  
  return (
    <Box>
      <Swiper
        modules={[Pagination]}
        loop
        pagination={{
          clickable: true
        }}
      >
        { sources.map((source, sourceIndex) => (
          <SwiperSlide key={sourceIndex}>
            <div 
              style={{ marginBottom: '40px' }}
            >
              <Image 
                src={source.src}
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
