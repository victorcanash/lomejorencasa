export enum RouterPaths {
  home = '/',
  about = '/about',
  productList = '/collections',
  productDetail = '/products',

  login = '/login',
  register = '/register',
  forgot = '/forgot',

  activation = '/activation',
  reset = '/reset',
  newemail= '/newemail',
  
  myaccount = '/myaccount',
  cart = '/cart',
  orders = '/orders',
  
  admin = '/admin',
};

export const routerPathsProtected = [
  RouterPaths.myaccount,
  RouterPaths.cart,
  RouterPaths.orders,
  RouterPaths.admin,
];

export const routerPathsAdmin = [
  RouterPaths.admin,
];

export const routerPathsWithoutLayout = [
  RouterPaths.activation,
  RouterPaths.reset,
  RouterPaths.newemail,
];
