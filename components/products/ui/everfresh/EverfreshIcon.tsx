import Image, { StaticImageData } from 'next/image';

import Box from '@mui/material/Box';

import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/constants/themes/elements';

type EverfreshIconProps = {
  src: StaticImageData,
  alt: string,
  widthSrc?: string, 
  heightSrc?: string,
};

const EverfreshIcon = (props: EverfreshIconProps) => {
  const {
    src,
    alt,
    widthSrc,
    heightSrc,
  } = props;

  return (
    <Box
      sx={{
        ...convertElementToSx(themeCustomElements.home.icons),
        position: 'relative', 
        width: '150px',
        maxWidth: '100%',
        height: '150px',           
        m: 'auto', 
      }} 
    >   
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          m: 0,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Image 
          src={src} 
          alt={alt} 
          width={widthSrc || '100px'}
          height={heightSrc || '100px'}
          layout="fixed" 
          objectFit="cover" 
        />
      </Box>
    </Box>
  );
};

export default EverfreshIcon;
