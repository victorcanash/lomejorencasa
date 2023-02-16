import Image, { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type ProductTutorialProps = {
  titleId?: string,
  textId: string,
  source: {
    type?: 'video' | 'image',
    src: StaticImageData | 'string',
  },
};

const ProductTutorial = (props: ProductTutorialProps) => {
  const { titleId, textId, source } = props;

  const maxWidth = '800px';

  return (
    <>
      <Box 
        sx={{ 
          maxWidth, 
          m: 'auto',
          px: 3,
        }}
      >
        { titleId &&
          <Typography component="h3" variant="h1" sx={{ mb: 4 }} textAlign="center">
            <FormattedMessage id={titleId} />
          </Typography> 
        }
        <Typography component="div" variant="body1" sx={{ mb: 4 }}>
          <FormattedMessage id={textId} />
        </Typography>
      </Box>
      <Box 
        sx={{ 
          maxWidth, 
          m: 'auto',
        }}
      >
        { source.type == 'video' ?
          <video
            loop
            muted
            autoPlay
            playsInline
            style={{ 
              position: 'relative',
              width: '100%', 
              height: '100%',
              borderRadius: '10px',
            }}
          >
            <source 
              src={source.src as string} 
              type="video/mp4" 
            />
          </video> :
          <Image 
            src={source.src} 
            alt="Tutorial" 
            width={500}
            height={500}
            quality={100}
            layout="responsive" 
            objectFit="cover"
            style={{ borderRadius: '10px' }}
          />
        }
      </Box>
    </>
  );
};

export default ProductTutorial;
