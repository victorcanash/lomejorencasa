import type { Product } from '@core/types/products';
import type { CartItem, GuestCartCheckItem } from '@core/types/cart';
import { 
  getProductByCartItem,
  getProductImgUrl as getProductImgUrlMW, 
  getAllProductImgsUrl as getAllProductImgsUrlMW,
} from '@core/utils/products';

import { pages } from '@lib/constants/navigation';
import { productIds, packIds } from '@lib/constants/products';
import placeholder from 'public/images/placeholder.jpeg';
import detail_everfresh1 from 'public/images/everfresh/everfresh1.jpg';
import detail_everfresh2 from 'public/images/everfresh/everfresh2.jpg';
import detail_everfresh3 from 'public/images/everfresh/everfresh3.jpg';
import detail_everfresh4 from 'public/images/everfresh/everfresh4.jpg';
import detail_bags1 from 'public/images/bags/bags1.jpg';
import detail_bags2 from 'public/images/bags/bags2.jpg';
import detail_bags3 from 'public/images/bags/bags3.jpg';
import banner_everfresh1 from 'public/images/banner/everfresh1.jpg';
import banner_everfresh2 from 'public/images/banner/everfresh2.jpg';
import banner_everfresh3 from 'public/images/banner/everfresh3.jpg';
import banner_everfresh4 from 'public/images/banner/everfresh4.jpg';

export const isEverfreshProduct = (item: Product | CartItem | GuestCartCheckItem) => {
  const product = convertToProduct(item);
  if (product?.id === productIds.everfresh) {
    return true;
  }
  return false;
};

export const isBagsProduct = (item: Product | CartItem | GuestCartCheckItem) => {
  const product = convertToProduct(item);
  if (product?.id === productIds.bags) {
    return true;
  }
  return false;
};

export const getProductPageUrl = (item: Product | CartItem | GuestCartCheckItem) => {
  const product = convertToProduct(item);
  if (product) {
    if (isEverfreshProduct(product)) {
      return `${pages.everfresh.path}`;
    } else if (isBagsProduct(product)) {
      return `${pages.bags.path}`;
    }
    return `${pages.productDetail.path}/${product.name.current}?id=${product.id}`;
  }
  return pages.productList.path;
};

export const getProductImgUrl = (item: Product | CartItem | GuestCartCheckItem, index = 0) => {
  const product = convertToProduct(item);
  if (product) {
    if (isEverfreshProduct(product)) {
      return detail_everfresh1;
    } else if (isBagsProduct(product)) {
      return detail_bags1;
    }
    return getProductImgUrlMW(product, index) || placeholder;
  }
  return placeholder;
};

export const getProductDetailImgsUrl = (item: Product | CartItem | GuestCartCheckItem) => {
  const product = convertToProduct(item);
  if (product) {
    if (isEverfreshProduct(product)) {
      return [
        detail_everfresh1, 
        detail_everfresh2, 
        detail_everfresh3, 
        detail_everfresh4
      ];
    } else if (isBagsProduct(product)) {
      return [
        detail_bags1, 
        detail_bags2, 
        detail_bags3
      ];
    }
    const imgsUrl = getAllProductImgsUrlMW(product);
    return imgsUrl.length >= 1 ? imgsUrl : [placeholder]
  }
  return [placeholder];
};

export const getProductBannerImgsUrl = () => {
  return [
    banner_everfresh1, 
    banner_everfresh2, 
    banner_everfresh3, 
    banner_everfresh4
  ];
};

const convertToProduct = (item: Product | CartItem | GuestCartCheckItem) => {
  if ((item as Product)?.categoryId) {
    return item as Product;
  } 
  return getProductByCartItem(item as (CartItem | GuestCartCheckItem));
};
