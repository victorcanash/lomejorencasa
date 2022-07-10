export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  addresses: UserAddress[];
  payments: UserPayment[];
  cart: Cart;
}

export type UserUpdate = {
  firstName: string;
  lastName: string;
  age: number;
}

export type AuthLogin = {
  email: string;
  password: string;
};

export type AuthRegister = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
}


export type UserAddress = {
  id: number;
  addressLine: string;
  additionalInfo: string;
  postalCode: string;
  locality: string;
  administrativeArea: string;
  country: string;
  type?: string;
}


export type UserPayment = {
  id: number;
  type: string;
  provider: string;
  accountNumber: string;
  expiry: Date
}


export type Cart = {
  id: number;
  total: number;
  items: CartItem[];
}


export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
}


export type Product = {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  imageNames: string[];
  inventories: ProductInventory[];
  discount?: ProductDiscount;
};


export type ProductCategory = {
  id: number;
  name: string;
  description: string;
}


export type ProductInventory = {
  id: number;
  quantity: number;
  size?: string;
}


export type ProductDiscount = {
  id: number;
  name: string;
  description: string;
  discountPercent: number;
  active: boolean;
}
