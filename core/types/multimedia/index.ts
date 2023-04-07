import { StaticImageData } from 'next/image';

export type UploadFile = {
  url: string,
  file: File,
};

export type Source = {
  type?: 'video' | 'image',
  src: StaticImageData | string,
  alt?: string,
  priority?: boolean,
};
