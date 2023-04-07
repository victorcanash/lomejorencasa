import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Box from '@mui/material/Box';

import type { Source } from '@core/types/multimedia';
import CustomImage from '@core/components/CustomImage';

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
              <CustomImage 
                src={source.src}
                alt="Product image" 
                width="1080"
                height="1080"
                layout="responsive" 
                objectFit="cover"
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
