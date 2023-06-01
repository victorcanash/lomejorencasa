import { StaticImageData } from 'next/image';

export type MultimediaConfig = {
  placeholderSrc: string,
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
