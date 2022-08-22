import Image from 'next/image';
// import Zoom from 'react-medium-image-zoom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Pagination } from 'swiper';

import Box from '@mui/material/Box';

import { Product } from '@core/types/products';
import { getProductImgUrl } from '@core/utils/products';

type CarouselProps = {
  product: Product,
}

const Carousel = ({ product }: CarouselProps) => {

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
        {product.imageNames.map((imgName, index) => (
          <SwiperSlide key={index}>
            <div style={{ marginBottom: "40px"}}>
              {/*<Zoom>*/}
                <Image 
                  src={getProductImgUrl(product, index)} 
                  alt="Product image" 
                  width="500"
                  height="500"
                  layout="responsive" 
                  objectFit="cover" 
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
