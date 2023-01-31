import Image, { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type EverfreshTutorialProps = {
  textId: string,
  source: {
    type?: 'video' | 'image',
    src: StaticImageData | 'string',
  },
};

const EverfreshTutorial = (props: EverfreshTutorialProps) => {
  const { textId, source } = props;

  return (
    <Grid
      container
      spacing={3}
      className='animate__animated animate__fadeIn'
      mb={3}
    >
      <Grid 
        item 
        xs={12}
      >
        <Box 
          className="centered-container-img"
          sx={{ textAlign: 'center' }}
        >
          <Typography component="div" variant="body1" sx={{ mb: 3 }}>
            <FormattedMessage id={textId} />
          </Typography>
        </Box>
        <Box 
          className='centered-container-img'
          sx={{ 
            mb: 3,
          }}
        >
          { source.type == 'video' ?
            <video 
              loop
              muted
              autoPlay={true}  
              style={{ 
                position: 'relative',
                width: '100%', 
                height: '100%',
                borderRadius: '4px',
              }}
            >
              <source src={source.src as string} />
            </video> :
            <Image 
              src={source.src} 
              alt="Tutorial" 
              width={500}
              height={500}
              quality={100}
              layout="responsive" 
              objectFit="cover"
              style={{ borderRadius: '4px' }}
            />
          }
        </Box>
      </Grid>
    </Grid>
  );
};

export default EverfreshTutorial;
