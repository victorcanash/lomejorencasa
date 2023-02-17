import { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import EverfreshIcon from '@components/products/ui/everfresh/EverfreshIcon';
import frezzerIcon from 'public/images/icons/frezzer-icon.png';
import airplaneIcon from 'public/images/icons/airplane-icon.png';
import breezeIcon from 'public/images/icons/breeze-icon.png';
import cableIcon from 'public/images/icons/cable-icon.png';
import shoppingbagIcon from 'public/images/icons/shoppingbag-icon.png';

const EverfreshCharacteristics = () => {
  const characteristic = (textId: string, src: StaticImageData, alt: string, widthSrc = '100px', heightSrc = '100px') => {
    return (
      <Grid item xs={6}>
        <EverfreshIcon
          src={src}
          alt={alt}
          widthSrc={widthSrc}
          heightSrc={heightSrc}
        />
        <Typography 
          component="div" 
          variant="body1"
          m="auto"
          mt={2}
          sx={{
            position: 'relative',
            width: { xs: '150px', sm: '200px' },
            maxWidth: '100%',
          }}
        >
          <FormattedMessage id={textId} />
        </Typography>
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
      <Typography component="div" variant="h1" align="center" mb={3}>
        <FormattedMessage id="home.characteristics.title" />
      </Typography>
      <Typography component="div" variant="body1" mb={2}>
        <FormattedMessage id="home.characteristics.description" />
      </Typography>
      <Grid container rowSpacing={2}>     
        { characteristic('home.characteristics.1', breezeIcon, "everfresh characteristic") }
        { characteristic('home.characteristics.2', airplaneIcon, "everfresh characteristic") }
        { characteristic('home.characteristics.3', airplaneIcon, "everfresh characteristic") }
        { characteristic('home.characteristics.4', cableIcon, "everfresh characteristic") }
        { characteristic('home.characteristics.5', shoppingbagIcon, "everfresh characteristic") }
        { characteristic('home.characteristics.6', frezzerIcon, "everfresh characteristic") }
      </Grid>
    </Box>
  );
};

export default EverfreshCharacteristics;
