import type { MultimediaConfig } from '@core/types/multimedia';

const multimediaConfig: MultimediaConfig = {
  imgIds: {
    navbarLogo: 'v1683277258/laenvasadora/LOGOS/LOGO-NUEVO-NAVBAR-SPACE-GREY_rjnkl7.png',
    placeholder: 'v1681059169/laenvasadora/LANDING%20PAGE/placeholder_tl7jks.jpg',
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
