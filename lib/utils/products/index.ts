import type { Product } from '@core/types/products';
import { 
  getProductImgUrl as getProductImgUrlMW, 
  getAllProductImgsUrl as getAllProductImgsUrlMW,
} from '@core/utils/products';

import { everfreshProductId, bagsProductId } from '@lib/constants/products';
import detail_everfresh1 from 'public/images/everfresh/everfresh1.jpg';
import detail_everfresh2 from 'public/images/everfresh/everfresh2.jpg';
import detail_everfresh3 from 'public/images/everfresh/everfresh3.jpg';
import detail_everfresh4 from 'public/images/everfresh/everfresh4.jpg';
import detail_bags1 from 'public/images/bags/bags1.jpg';
import detail_bags2 from 'public/images/bags/bags2.jpg';
import detail_bags3 from 'public/images/bags/bags3.jpg';
import banner_everfresh1 from 'public/images/home/everfresh1.jpg';
import banner_everfresh2 from 'public/images/home/everfresh2.jpg';
import banner_everfresh3 from 'public/images/home/everfresh3.jpg';
import banner_everfresh4 from 'public/images/home/everfresh4.jpg';

export const getProductImgUrl = (product: Product, index = 0) => {
  if (everfreshProductId === product.id) {
    return detail_everfresh1;
  } else if (bagsProductId === product.id) {
    return detail_bags1;
  }
  return getProductImgUrlMW(product, index);
};

export const getProductDetailImgsUrl = (product: Product) => {
  if (everfreshProductId === product.id) {
    return [
      detail_everfresh1, 
      detail_everfresh2, 
      detail_everfresh3, 
      detail_everfresh4
    ];
  } else if (bagsProductId === product.id) {
    return [
      detail_bags1, 
      detail_bags2, 
      detail_bags3
    ];
  }
  return getAllProductImgsUrlMW(product);
};

export const getProductBannerImgsUrl = () => {
  return [
    banner_everfresh1, 
    banner_everfresh2, 
    banner_everfresh3, 
    banner_everfresh4
  ];
};
