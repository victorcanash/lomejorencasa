import Image from 'next/image';
// import Zoom from 'react-medium-image-zoom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType, Navigation, EffectCoverflow, Pagination } from 'swiper';

import { Product } from '@core/types/products';
import { getProductImgUrl } from '@core/utils/products';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

type Props = {
  product: Product
}

const Carousel = ({ product }: Props) => {

  return (
    <Box sx={{ minWidth: "200px", maxWidth: "sm" }}>
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
                  width="4000"
                  height="4000"
                  layout="responsive" 
                  objectFit="cover" 
                  sizes="100vw"
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
