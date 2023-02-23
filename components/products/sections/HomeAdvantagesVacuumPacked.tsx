import Image, { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';

import { pages } from '@lib/constants/navigation';
import { themeCustomElements } from '@lib/constants/themes/elements';
import Title from '@components/ui/Title';
import EverfreshIcon from '@components/products/ui/everfresh/EverfreshIcon';
import advantages_vacuum_packed_bg from 'public/images/home/advantages-vacuum-packed-bg.png';
import microorganism_icon from 'public/images/icons/microorganism-icon.png';
import frezzer_icon from 'public/images/icons/frezzer-icon.png';
import diet_icon from 'public/images/icons/diet-icon.png';
import shield_icon from 'public/images/icons/shield-icon.png';
import time_icon from 'public/images/icons/time-icon.png';

const HomeAdvantagesVacuumPacked = () => {
  const advantage = (
    textId: string, 
    src: StaticImageData, 
    alt: string, 
    widthSrc = '100px', 
    heightSrc = '100px'
  ) => {
    return (
      <Grid 
        item 
        xs={12}
      >
        <Box maxWidth="sm">
          <Typography 
            component="div" 
            variant="body1" 
            mb={4}
          >
            <FormattedMessage id={textId} />
          </Typography>
          <EverfreshIcon
            src={src}
            alt={alt}
            widthSrc={widthSrc}
            heightSrc={heightSrc}
          />
        </Box>
      </Grid>
    );
  };

  return (
    <>
      <Container>
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h2"
            texts={{
              title: {
                id: 'home.advantagesVacuumPacked.title',
              },
            }}
            divider={false}
          />
        </Box>
      </Container>

      <Box
        sx={{
          ...convertElementToSx(themeCustomElements.home.advantagesVacuumPacked.content),
          position: 'relative',
          zIndex: '-2',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: {
              xs: '127px',
              sm: '160px',
              md: '200px',
            },
            zIndex: '-1',
          }}
        >
          <Image 
            src={advantages_vacuum_packed_bg} 
            alt={'Background advantages vacuum machine'} 
            layout="responsive" 
            objectFit="cover"
            quality="100"
          />
        </Box>

        <Grid 
          container 
          spacing={4}
          sx={{
            position: 'relative',
            width: '70%',
            ml: 'auto',
          }}
          py={4}
          pr={2}
          justifyContent="flex-end"
        >   
          { advantage('home.advantagesVacuumPacked.description.1', microorganism_icon, 'everfresh advantage') }
          { advantage('home.advantagesVacuumPacked.description.2', shield_icon, 'everfresh advantage', '81px') }
          { advantage('home.advantagesVacuumPacked.description.3', diet_icon, 'everfresh advantage') }
          { advantage('home.advantagesVacuumPacked.description.4', frezzer_icon, 'everfresh advantage') }
          { advantage('home.advantagesVacuumPacked.description.5', time_icon, "everfresh advantage", '76px') }
          <Grid 
            item 
            xs={12}
          >
            <LinkButton
              href={pages.everfresh.path}
              id="advantages"
              sx={convertElementToSx(themeCustomElements.button.action)}
            >
              <FormattedMessage id="home.advantagesVacuumPacked.buyBtn" />
            </LinkButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomeAdvantagesVacuumPacked;
