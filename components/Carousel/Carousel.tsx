import Image from 'next/image';
import Zoom from 'react-medium-image-zoom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType, Navigation, EffectCoverflow, Pagination } from 'swiper';

import { Product } from '@core/types/products';
import { getProductImgUrl } from '@core/utils/products';
import Container from '@mui/material/Container';

type Props = {
  product: Product
}

const Carousel = ({ product }: Props) => {

  return (
    <Container maxWidth="sm" sx={{ p: 0 }}>
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
            <div>
              <Zoom>
                <Image 
                  src={getProductImgUrl(product, index)} 
                  alt="Product image" 
                  width="400"
                  height="400"
                  layout="responsive" 
                  objectFit="cover" 
                  priority
                />
              </Zoom>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Carousel;
