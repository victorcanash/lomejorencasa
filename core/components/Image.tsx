import { CldImage } from 'next-cloudinary';

type ImageProps = {
  src: string,
  width?: string,
  height?: string,
};

const Image = (props: ImageProps) => {
  const { 
    src,
    width,
    height
  } = props;

  return (
    <CldImage
      src={src}
      width={width}
      height={height}
    />
  );
};

export default Image;
