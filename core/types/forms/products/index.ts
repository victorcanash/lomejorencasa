export type FormProduct = {
  categoryId: number,
  name: string,
  description: string,
  sku: string,
  price: number,
  images: string[],
};

export type FormProductCategory = {
  name: string,
  description: string,
};

export type FormProductInventory = {
  quantity: number,
  size?: string,
};

export type FormProductDiscount = {
  name: string,
  description: string,
  discountPercent: number,
  active: boolean,
};
