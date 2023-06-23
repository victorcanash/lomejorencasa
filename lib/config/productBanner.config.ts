import type { ProductBannerConfig } from '@core/types/products';

import { keywords } from '@lib/config/next-seo.config';

const productBannerConfig: ProductBannerConfig = {
  items: [
    {
      contentText: {
        id: 'home.banner.1',
      },
      source: { 
        src: 'v1681038418/laenvasadora/HOME%20PAGE/BANNER/FOTO_5_zbi5lg.jpg',
        alt: keywords.vacuumMachine.others[0],
        priority: true,
        width: '1920',
        height: '1080', 
      },
      button: {
        path: '/productos/envasadora-al-vacio',
        text: {
          id: 'home.banner.buyBtn',
        },
      },
    },
    {
      contentText: {
        id: 'home.banner.2',
      },
      source: { 
        src: 'v1681038421/laenvasadora/HOME%20PAGE/BANNER/FOTO_1_cbslc0.jpg',
        alt: keywords.vacuumMachine.others[1],
        priority: true,
        width: '1920',
        height: '1080', 
      },
      button: {
        path: '/productos/envasadora-al-vacio',
        text: {
          id: 'home.banner.buyBtn',
        },
      },
    },
    {
      contentText: {
        id: 'home.banner.3',
      },
      source: { 
        src: 'v1680888620/laenvasadora/HOME%20PAGE/BANNER/FOTO_PRODUCTO_QUESO_eihinu.jpg',
        alt: keywords.vacuumMachine.others[0],
        priority: true,
        width: '1920',
        height: '1080', 
      },
      button: {
        path: '/productos/envasadora-al-vacio',
        text: {
          id: 'home.banner.buyBtn',
        },
      },
    },
    {
      contentText: {
        id: 'home.banner.4',
      },
      source: { 
        src: 'v1680888619/laenvasadora/HOME%20PAGE/BANNER/HOME_PAGE_ARRIBA_pwcckn.jpg',
        alt: keywords.vacuumMachine.others[1],
        priority: true,
        width: '1920',
        height: '1080', 
      },
      button: {
        path: '/productos/envasadora-al-vacio',
        text: {
          id: 'home.banner.buyBtn',
        },
      },
    },
  ],
};

export default productBannerConfig;
