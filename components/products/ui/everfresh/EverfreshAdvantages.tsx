import Image, { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import microorganismIcon from 'public/images/microorganism-icon.png';
import frezzerIcon from 'public/images/frezzer-icon.png';
import dietIcon from 'public/images/diet-icon.png';
import shieldIcon from 'public/images/shield-icon.png';
import timeIcon from 'public/images/time-icon.png';

const EverfreshAdvantages = () => {
  const advantage = (textId: string, src: StaticImageData, widthSrc = '100px', heightSrc = '100px') => {
    return (
      <Typography component="div" variant="body1">
        <FormattedMessage id={textId} />
        <Box
          sx={{
            width: '150px',
            height: '150px',
            borderRadius: '100%',
            backgroundColor: '#e5ecdc',
            maxWidth: '100%',
            position: 'relative',
            m: 'auto',
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
      </Typography>
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
          <Typography component={"h2"} variant={"h1"} sx={{ mb: 3 }}>
            <FormattedMessage id="home.advantages.title" />
          </Typography> 
          { advantage('home.advantages.1', microorganismIcon) }
          { advantage('home.advantages.2', shieldIcon, '81px') }
          { advantage('home.advantages.3', dietIcon) }
          { advantage('home.advantages.4', frezzerIcon) }
          { advantage('home.advantages.5', timeIcon, '76px') }
        </Box>
      </Grid>
    </Grid>
  );
};

export default EverfreshAdvantages;
