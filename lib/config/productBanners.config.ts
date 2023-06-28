import type { HomeBannersConfig, ProductBannerConfig } from '@core/types/banners';

import { keywords } from '@lib/config/next-seo.config';
import { pages } from '@lib/config/navigation.config';

export const homeBannersConfig: HomeBannersConfig = {
  allProducts: {
    height: '700px',
    items: [
      {
        contentText: {
          id: 'banners.allProducts.1',
          textAlign: 'center',
        },
        source: { 
          src: 'v1687881922/LO%20MEJOR%20EN%20CASA/banners/home_qgq47k.jpg',
          //alt: keywords.vacuumMachine.others[0],
          priority: true,
        },
        button: {
          path: pages.products.path,
          text: {
            id: 'banners.allProducts.btn',
          },
        },
      },
    ],
  },
  seasonal: {
    height: '500px',
    items: [
      {
        contentText: {
          id: 'banners.seasonal.1',
          textAlign: 'center',
        },
        source: {
          type: 'video',
          src: 'v1687951205/LO%20MEJOR%20EN%20CASA/banners/production_id_3681525_1080p_ot1hfr.mp4',
          //alt: keywords.vacuumMachine.others[0],
        },
        button: {
          path: '/colecciones/verano',
          text: {
            id: 'banners.seasonal.btn',
          },
        },
      },
    ],
  },
  offers: {
    height: '500px',
    items: [
      {
        contentText: {
          id: 'banners.offers.1',
        },
        source: { 
          src: 'v1687971407/LO%20MEJOR%20EN%20CASA/banners/offers_gwnswz.jpg',
          //alt: keywords.vacuumMachine.others[0],
        },
        button: {
          path: pages.offers.path,
          text: {
            id: 'banners.offers.btn',
          },
        },
      },
    ],
  },
};

export const vacuumBannerConfig: ProductBannerConfig = {
  height: '',
  items: [
    {
      contentText: {
        id: 'banners.vacuum.1',
      },
      source: { 
        src: 'v1681038418/laenvasadora/HOME%20PAGE/BANNER/FOTO_5_zbi5lg.jpg',
        alt: keywords.vacuumMachine.others[0],
        priority: true,
        width: '1920',
        height: '1080', 
      },
      button: {
        path: '/productos/envasadora-al-vacio-everfresh',
        text: {
          id: 'banners.vacuum.buyBtn',
        },
      },
    },
    {
      contentText: {
        id: 'banners.vacuum.2',
      },
      source: { 
        src: 'v1681038421/laenvasadora/HOME%20PAGE/BANNER/FOTO_1_cbslc0.jpg',
        alt: keywords.vacuumMachine.others[1],
        priority: true,
        width: '1920',
        height: '1080', 
      },
      button: {
        path: '/productos/envasadora-al-vacio-everfresh',
        text: {
          id: 'banners.vacuum.buyBtn',
        },
      },
    },
    {
      contentText: {
        id: 'banners.vacuum.3',
      },
      source: { 
        src: 'v1680888620/laenvasadora/HOME%20PAGE/BANNER/FOTO_PRODUCTO_QUESO_eihinu.jpg',
        alt: keywords.vacuumMachine.others[0],
        priority: true,
        width: '1920',
        height: '1080', 
      },
      button: {
        path: '/productos/envasadora-al-vacio-everfresh',
        text: {
          id: 'banners.vacuum.buyBtn',
        },
      },
    },
    {
      contentText: {
        id: 'banners.vacuum.4',
      },
      source: { 
        src: 'v1680888619/laenvasadora/HOME%20PAGE/BANNER/HOME_PAGE_ARRIBA_pwcckn.jpg',
        alt: keywords.vacuumMachine.others[1],
        priority: true,
        width: '1920',
        height: '1080', 
      },
      button: {
        path: '/productos/envasadora-al-vacio-everfresh',
        text: {
          id: 'banners.vacuum.buyBtn',
        },
      },
    },
  ],
};
