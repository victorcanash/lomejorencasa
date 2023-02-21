import { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Title from '@components/ui/Title';
import EverfreshIcon from '@components/products/ui/everfresh/EverfreshIcon';
import microorganismIcon from 'public/images/icons/microorganism-icon.png';
import frezzerIcon from 'public/images/icons/frezzer-icon.png';
import dietIcon from 'public/images/icons/diet-icon.png';
import shieldIcon from 'public/images/icons/shield-icon.png';
import timeIcon from 'public/images/icons/time-icon.png';

const HomeAdvantagesVacuumPacked = () => {
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
      <Title
        type="h2"
        texts={{
          title: {
            id: 'home.advantagesVacuumPacked.title',
          },
        }}
        divider={true}
      />
      <Grid container rowSpacing={2}>   
        { advantage('home.advantagesVacuumPacked.1', microorganismIcon, "everfresh advantage") }
        { advantage('home.advantagesVacuumPacked.2', shieldIcon, "everfresh advantage", '81px') }
        { advantage('home.advantagesVacuumPacked.3', dietIcon, "everfresh advantage") }
        { advantage('home.advantagesVacuumPacked.4', frezzerIcon, "everfresh advantage") }
        { advantage('home.advantagesVacuumPacked.5', timeIcon, "everfresh advantage", '76px') }
      </Grid>
    </Box>
  );
};

export default HomeAdvantagesVacuumPacked;
