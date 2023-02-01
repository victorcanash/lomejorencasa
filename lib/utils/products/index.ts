import type { Product } from '@core/types/products';
import { 
  getProductImgUrl as getProductImgUrlMW, 
  getAllProductImgsUrl as getAllProductImgsUrlMW,
} from '@core/utils/products';

import { everfreshProductId, bagProductId } from '@lib/constants/products';
import everfresh1 from 'public/images/everfresh/everfresh1.jpg';
import everfresh2 from 'public/images/everfresh/everfresh2.jpg';
import everfresh3 from 'public/images/everfresh/everfresh3.jpg';
import everfresh4 from 'public/images/everfresh/everfresh4.jpg';

export const getProductImgUrl = (product: Product, index = 0) => {
  if (everfreshProductId === product.id) {
    return everfresh1;
  } else if (bagProductId === product.id) {
    return everfresh1;
  }
  return getProductImgUrlMW(product, index);
};

export const getAllProductImgsUrl = (product: Product) => {
  if (everfreshProductId === product.id) {
    return [everfresh1, everfresh2, everfresh3, everfresh4];
  } else if (bagProductId === product.id) {
    return [everfresh1, everfresh2, everfresh3, everfresh4];
  }
  return getAllProductImgsUrlMW(product);
};