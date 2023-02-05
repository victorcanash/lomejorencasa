import Image, { StaticImageData } from 'next/image';

import Box from '@mui/material/Box';

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
        position: 'relative', 
        width: '150px',
        maxWidth: '100%',
        height: '150px',           
        m: 'auto', 
        mt: 2,
        mb: 2,
        borderRadius: '100%', 
        backgroundColor: '#e5ecdc',
      }} 
    >   
      <Box
        sx={{
          m: 0,
          position: 'absolute',
          top: '50%',
          left: '50%',
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
