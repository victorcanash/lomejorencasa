import { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import EverfreshIcon from '@components/products/ui/everfresh/EverfreshIcon';
import microorganismIcon from 'public/images/icons/microorganism-icon.png';
import frezzerIcon from 'public/images/icons/frezzer-icon.png';
import dietIcon from 'public/images/icons/diet-icon.png';
import shieldIcon from 'public/images/icons/shield-icon.png';
import timeIcon from 'public/images/icons/time-icon.png';

const EverfreshVacuumPacked = () => {
  const advantage = (textId: string, src: StaticImageData, alt: string, widthSrc = '100px', heightSrc = '100px') => {
    return (
      <Grid item xs={12}>
        <Typography 
          component="div" 
          variant="body1" 
          mb={2}
        >
          <FormattedMessage id={textId} />
        </Typography>
        <EverfreshIcon
          src={src}
          alt={alt}
          widthSrc={widthSrc}
          heightSrc={heightSrc}
        />
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        m: 'auto',
      }}
    >
      <Typography component="h2" variant="h1" align="center" mb={3}>
        <FormattedMessage id="home.vacuumPacked.title" />
      </Typography>
      <Typography component="div" variant="body1" mb={3}>
        <FormattedMessage id="home.vacuumPacked.description" />
      </Typography>

      <Typography component="h3" variant="h2" align="center" mb={3}>
        <FormattedMessage id="home.vacuumPacked.whatIs.title" />
      </Typography>
      <Typography component="div" variant="body1" mb={3}>
        <FormattedMessage id="home.vacuumPacked.whatIs.description" />
      </Typography>

      <Typography component="h3" variant="h2" align="center" mb={3}>
        <FormattedMessage id="home.vacuumPacked.why.title" />
      </Typography>
      <Typography component="div" variant="body1" mb={3}>
        <FormattedMessage id="home.vacuumPacked.why.description" />
      </Typography>

      <Typography component="h3" variant="h2" align="center" mb={3}>
        <FormattedMessage id="home.vacuumPacked.advantages.title" />
      </Typography>
      <Grid container rowSpacing={2}>   
        { advantage('home.vacuumPacked.advantages.1', microorganismIcon, "everfresh advantage") }
        { advantage('home.vacuumPacked.advantages.2', shieldIcon, "everfresh advantage", '81px') }
        { advantage('home.vacuumPacked.advantages.3', dietIcon, "everfresh advantage") }
        { advantage('home.vacuumPacked.advantages.4', frezzerIcon, "everfresh advantage") }
        { advantage('home.vacuumPacked.advantages.5', timeIcon, "everfresh advantage", '76px') }
      </Grid>
    </Box>
  );
};

export default EverfreshVacuumPacked;
