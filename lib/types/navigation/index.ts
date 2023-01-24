import type { Page } from '@core/types/navigation';

export type NavigationConfig = {
  pages: {
    home: Page,
    productList: Page,
    productDetail: Page,
    everfresh: Page,
    bags: Page,
    about: Page,
    faq: Page,

    privacy: Page,
    cookies: Page,
    legal: Page,
    conditions: Page,

    login: Page,
    register: Page,
    forgot: Page,
    
    cart: Page,
    checkout: Page,
    orderList: Page,
    orderDetail: Page,
    settings: Page,

    activation: Page,
    reset: Page,
    newemail: Page,
    
    admin: Page,
  },
};
