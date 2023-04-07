import NextImage, {
  ImageLoader as NextImageLoader,
  ImageLoaderProps as NextImageLoaderProps,
  ImageProps as NextImageProps,
} from 'next/image';

import envConfig from '@core/config/env.config';

const normalizeSrc = (src: string) => src[0] === '/' ? src.slice(1) : src;

const cloudinaryLoader: NextImageLoader = ({
  src,
  width,
  quality,
}: NextImageLoaderProps) => {
  const params = [
    'f_auto',
    'c_limit',
    'w_' + width,
    'q_' + (quality || 'auto:best')
  ];
  return `https://res.cloudinary.com/${envConfig.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${params.join(',')}/${normalizeSrc(src)}`;
};

const Image = (props: NextImageProps) => {

  return (
    <NextImage
      {...props}
      loader={cloudinaryLoader}
    />
  );
};

export default Image;
