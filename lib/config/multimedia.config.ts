import type { MultimediaConfig } from '@core/types/multimedia';

const multimediaConfig: MultimediaConfig = {
  imgIds: {
    navbarLogo: 'v1683277258/laenvasadora/LOGOS/LOGO-NUEVO-NAVBAR-SPACE-GREY_rjnkl7.png',
    placeholder: 'v1681059169/laenvasadora/LANDING%20PAGE/placeholder_tl7jks.jpg',
    productBanner: [
      'v1681038418/laenvasadora/HOME%20PAGE/BANNER/FOTO_5_zbi5lg.jpg',
      'v1681038421/laenvasadora/HOME%20PAGE/BANNER/FOTO_1_cbslc0.jpg',
      'v1680888620/laenvasadora/HOME%20PAGE/BANNER/FOTO_PRODUCTO_QUESO_eihinu.jpg',
      'v1680888619/laenvasadora/HOME%20PAGE/BANNER/HOME_PAGE_ARRIBA_pwcckn.jpg',
    ],
  },
  upload: {
    extensions: [
      '.jpg',
      '.jpeg',
      '.jfif',
      '.pjpeg',
      '.pjp',
      '.gif',
      '.png',
      '.apng',
      '.avif',
      '.svg',
      '.webp',
    ],
    maxSize: '10mb',
  },
};

export default multimediaConfig;

export const imgIds = multimediaConfig.imgIds;

export const uploadConfig = multimediaConfig.upload;
