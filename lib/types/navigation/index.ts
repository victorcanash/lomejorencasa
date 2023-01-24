import type { Page } from '@core/types/navigation';

export type NavigationConfig = {
  pages: {
    home: Page,
    about: Page,
    faq: Page,
    everfresh: Page,
    bags: Page,
    productList: Page,
    productDetail: Page,

    login: Page,
    register: Page,
    forgot: Page,

    activation: Page,
    reset: Page,
    newemail: Page,
    
    settings: Page,
    cart: Page,
    checkout: Page,
    orderList: Page,
    orderDetail: Page,
    
    admin: Page,
  },
};
