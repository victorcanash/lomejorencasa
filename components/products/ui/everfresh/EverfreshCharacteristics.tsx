import Image, { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import frezzerIcon from 'public/images/frezzer-icon.png';
import airplaneIcon from 'public/images/airplane-icon.png';
import breezeIcon from 'public/images/breeze-icon.png';
import cableIcon from 'public/images/cable-icon.png';
import shoppingbagIcon from 'public/images/shoppingbag-icon.png';

const EverfreshCharacteristics = () => {
  const characteristic = (textId: string, src: StaticImageData, widthSrc = '100px', heightSrc = '100px') => {
    return (
      <Grid item xs={6}>
        <Typography component="div" variant="body1">
          <Box
            sx={{
              maxWidth: '100%',
              position: 'relative',
              m: 'auto',
              width: '150px',
              height: '150px',
              borderRadius: '100%', 
              backgroundColor: '#e5ecdc',
              mt: 2,
              mb: 2,
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
                alt="Advantage" 
                width={widthSrc}
                height={heightSrc}
                layout="fixed" 
                objectFit="cover" 
              />
            </Box>
          </Box>
          <Box
            sx={{
              maxWidth: '100%',
              position: 'relative',
              m: 'auto',
              width: { xs: '150px', sm: '200px' },
            }}
          >
            <FormattedMessage id={textId} />
          </Box>
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid
      container
      className='animate__animated animate__fadeInLeft'
    >
      <Grid
        item
        xs={12}
      >
        <Box
          sx={{
            maxWidth: '600px',
            m: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography component={"h2"} variant={"h1"} sx={{ mb: 2 }}>
            <FormattedMessage id="home.characteristics.title" />
          </Typography> 
          <Grid container>     
            { characteristic('home.characteristics.1', breezeIcon) }
            { characteristic('home.characteristics.2', airplaneIcon) }
            { characteristic('home.characteristics.3', airplaneIcon) }
            { characteristic('home.characteristics.4', cableIcon) }
            { characteristic('home.characteristics.5', shoppingbagIcon) }
            { characteristic('home.characteristics.6', frezzerIcon) }
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EverfreshCharacteristics;
