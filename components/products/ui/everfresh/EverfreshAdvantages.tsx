import { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import EverfreshIcon from '@components/products/ui/everfresh/EverfreshIcon';
import microorganismIcon from 'public/images/microorganism-icon.png';
import frezzerIcon from 'public/images/frezzer-icon.png';
import dietIcon from 'public/images/diet-icon.png';
import shieldIcon from 'public/images/shield-icon.png';
import timeIcon from 'public/images/time-icon.png';

const EverfreshAdvantages = () => {
  const advantage = (textId: string, src: StaticImageData, alt: string, widthSrc = '100px', heightSrc = '100px') => {
    return (
      <Typography component="div" variant="body1">
        <FormattedMessage id={textId} />
        <EverfreshIcon
          src={src}
          alt={alt}
          widthSrc={widthSrc}
          heightSrc={heightSrc}
        />
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
          { advantage('home.advantages.1', microorganismIcon, "everfresh advantage") }
          { advantage('home.advantages.2', shieldIcon, "everfresh advantage", '81px') }
          { advantage('home.advantages.3', dietIcon, "everfresh advantage") }
          { advantage('home.advantages.4', frezzerIcon, "everfresh advantage") }
          { advantage('home.advantages.5', timeIcon, "everfresh advantage", '76px') }
        </Box>
      </Grid>
    </Grid>
  );
};

export default EverfreshAdvantages;
