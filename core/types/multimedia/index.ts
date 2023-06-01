import { StaticImageData } from 'next/image';

export type MultimediaConfig = {
  imgIds: {
    navbarLogo: string,
    placeholder: string,
    productBanner: string[],
  },
  upload: {
    extensions: string[],
    maxSize: string,
  },
};

export type UploadFile = {
  url: string,
  file: File,
};

export type Source = {
  type?: 'video' | 'image',
  src: StaticImageData | string,
  alt?: string,
  width?: string,
  height?: string,
  priority?: boolean,
};
