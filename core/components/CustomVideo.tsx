import { CSSProperties } from 'react';

import envConfig from '@core/config/env.config';

const normalizeSrc = (src: string) => src[0] === '/' ? src.slice(1) : src;

const cloudinaryLoader = (src: string, quality?: number) => {
  const params = [
    'f_auto',
    'c_scale',
    'q_' + (quality || 'auto:best')
  ];
  return `https://res.cloudinary.com/${envConfig.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${params.join(',')}/${normalizeSrc(src)}`;
};

const CustomVideo = (props: {
  src: string,
  quality?: number,
  style: CSSProperties,
}) => {
  const {
    src,
    quality,
    style,
  } = props;

  return (
    <video 
      loop
      muted
      autoPlay
      playsInline
      src={cloudinaryLoader(src, quality)}
      style={style}
    >
    </video>
  );
};

export default CustomVideo;
