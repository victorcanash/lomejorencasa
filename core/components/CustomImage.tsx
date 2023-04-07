import Image, {
  ImageLoader,
  ImageLoaderProps,
  ImageProps,
} from 'next/image';

import envConfig from '@core/config/env.config';

const normalizeSrc = (src: string) => src[0] === '/' ? src.slice(1) : src;

const cloudinaryLoader: ImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps) => {
  const params = [
    'f_auto',
    'c_limit',
    'w_' + width,
    'q_' + (quality || 'auto:best')
  ];
  return `https://res.cloudinary.com/${envConfig.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${params.join(',')}/${normalizeSrc(src)}`;
};

const CustomImage = (props: ImageProps) => {

  return (
    <Image
      alt={props.alt || 'image'}
      {...props}
      loader={typeof props.src === 'string' ? cloudinaryLoader : undefined}
    />
  );
};

export default CustomImage;
