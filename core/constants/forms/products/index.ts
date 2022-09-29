import * as Yup from 'yup';

import { 
  Product, 
  ProductCategory,
  ProductInventory,
  ProductDiscount,
} from '@core/types/products';

export const productValidation = Yup.object().shape(
  {
    categoryId: Yup
      .number()
      .min(0, 'CategoryId must be at least 0')
      .required('CategoryId is required'),
    name: Yup
      .string()
      .min(3, 'Name must have 3 letters minimum')
      .max(12, 'Name must have maximum 12 letters')
      .required('Name is required'),
    description: Yup
      .string()
      .min(3, 'Description must have 3 letters minimum')
      .required('Description is required'),
    sku: Yup
      .string()
      .required('SKU is required'),
    price: Yup
      .number()
      .min(0, 'Price must be at least 0')
      .required('Price is required'),
  }
);

export const initProductValues: Product = {
  id: -1,
  categoryId: -1,
  name: '',
  description: '',
  sku: '',
  price: 0,
  realPrice: 0,
  imageNames: [],
  inventories: [],
}

export const productCategoryValidation = Yup.object().shape(
  {
    name: Yup
      .string()
      .min(3, 'Name must have 3 letters minimum')
      .max(12, 'Name must have maximum 12 letters')
      .required('Name is required'),
    description: Yup
      .string()
      .min(3, 'Description must have 3 letters minimum')
      .required('Description is required'),
  }
);

export const initProductCategoryValues: ProductCategory = {
  id: -1,
  name: '',
  description: '',
};
