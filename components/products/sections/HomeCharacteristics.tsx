import Image from 'next/image';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';

import { pages } from '@lib/constants/navigation';
import { themeCustomElements } from '@lib/constants/themes/elements';
import Title from '@components/ui/Title';
import characteristics_bg from 'public/images/home/characteristics-bg.png';
import advantages_bg from 'public/images/home/advantages-bg.png';
import frezzer_icon from 'public/images/home/icons/frezzer-icon.png';
import hand_icon from 'public/images/home/icons/hand-icon.png';
import airplane_icon from 'public/images/home/icons/airplane-icon.png';
import breeze_icon from 'public/images/home/icons/breeze-icon.png';
import cable_icon from 'public/images/home/icons/cable-icon.png';
import shoppingbag_icon from 'public/images/home/icons/shoppingbag-icon.png';
import microorganism_icon from 'public/images/home/icons/microorganism-icon.png';
import diet_icon from 'public/images/home/icons/diet-icon.png';
import shield_icon from 'public/images/home/icons/shield-icon.png';
import time_icon from 'public/images/home/icons/time-icon.png';

type HomeCharacteristicsProps = {
  type: 'characteristics' | 'advantages',
};

const HomeCharacteristics = (props: HomeCharacteristicsProps) => {
  const { type } = props;

  const characteristicIcon = (
    source: Source,
    alt: string,
    widthSrc?: string, 
    heightSrc?: string,
  ) => {
    return (
      <Box
        sx={{
          ...convertElementToSx(themeCustomElements.home.characteristics.icons),
          position: 'relative', 
          width: '150px',
          maxWidth: '100%',
          height: '150px',           
          m: 'auto', 
        }} 
      >   
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            m: 'auto',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Image 
            src={source.src} 
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

  const characteristic = (
    textId: string, 
    source: Source, 
    alt: string, 
    widthSrc = '100px', 
    heightSrc = '100px'
  ) => {
    return (
      <Grid 
        item 
        xs={12}
      >   
        { type == 'characteristics' ?
          <Box maxWidth="xs_sm" ml="auto">
            { characteristicIcon(source, alt, widthSrc, heightSrc) }
            <Typography 
              component="div" 
              variant="body1"
              sx={{ textAlign: 'center' }}
              mt={2}
            >
              <FormattedMessage id={textId} />
            </Typography>
          </Box>
          :
          <Box maxWidth="sm">
            <Typography 
              component="div" 
              variant="body1" 
              mb={2}
            >
              <FormattedMessage id={textId} />
            </Typography>
            { characteristicIcon(source, alt, widthSrc, heightSrc) }
          </Box>
        }
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
                id: type == 'characteristics' ? 'home.characteristics.title' : 'home.advantages.title',
              },
            }}
            divider={type == 'characteristics' ? true : false}
          />
          { type == 'characteristics' &&
            <Typography component="div" variant="body1" mb={4}>
              <FormattedMessage id="home.characteristics.description" />
            </Typography>
          }
        </Box>
      </Container>

      <Box
        sx={{
          ...convertElementToSx(themeCustomElements.home.characteristics.content),
          position: 'relative',
          mt: type == 'characteristics' ? 18 : 4,
          zIndex: '-2',
          overflow: type == 'characteristics' ? undefined : 'hidden',
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
            right: type == 'characteristics' ? '0px' : undefined,
            mt: type == 'characteristics' ? -10 : undefined,
            zIndex: '-1',
            overflow: type == 'characteristics' ? 'hidden' : undefined,
          }}
        >
          <Box
            sx={{
              width: {
                xs: '141px',
                sm: '174px',
                md: '214px',
              },
            }}
          >
            <Image 
              src={type == 'characteristics' ? characteristics_bg : advantages_bg} 
              alt={'Vacuum machine characteristics background'} 
              layout="responsive" 
              objectFit="cover"
              quality="100"
            />
          </Box>
        </Box>

        <Grid 
          container 
          spacing={4}
          sx={{
            position: 'relative',
            width: '70%',
            ml: type == 'characteristics' ? undefined : 'auto',
            py: 4,
            pr: type == 'characteristics' ? undefined : 2,
            pl: type == 'characteristics' ? 2 : undefined,
            justifyContent: type == 'characteristics' ? 'flex-start' : 'flex-end',
          }}
        >
          { type == 'characteristics' ?
            <>
              { characteristic('home.characteristics.description.1', { src: breeze_icon } as Source, 'everfresh characteristic') }
              { characteristic('home.characteristics.description.2', { src: hand_icon } as Source, 'everfresh characteristic') }
              { characteristic('home.characteristics.description.3', { src: airplane_icon } as Source, 'everfresh characteristic') }
              { characteristic('home.characteristics.description.4', { src: cable_icon } as Source, 'everfresh characteristic') }
              { characteristic('home.characteristics.description.5', { src: frezzer_icon } as Source, 'everfresh characteristic') }
              { characteristic('home.characteristics.description.6', {src: shoppingbag_icon } as Source, 'everfresh characteristic') }
            </>
            :
            <>
              { characteristic('home.advantages.description.1', { src: microorganism_icon } as Source, 'everfresh advantage') }
              { characteristic('home.advantages.description.2', { src: shield_icon } as Source, 'everfresh advantage', '81px') }
              { characteristic('home.advantages.description.3', { src: diet_icon } as Source, 'everfresh advantage') }
              { characteristic('home.advantages.description.4', { src: frezzer_icon } as Source, 'everfresh advantage') }
              { characteristic('home.advantages.description.5', { src: time_icon } as Source, 'everfresh advantage', '76px') }
            </>
          }
          <Grid 
            item
            xs={12}
          >
            <LinkButton
              href={pages.everfresh.path}
              id="advantages"
              sx={convertElementToSx(themeCustomElements.button.action)}
            >
              <FormattedMessage id={type == 'characteristics' ? 'home.characteristics.buyBtn' : 'home.advantages.buyBtn'} />
            </LinkButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomeCharacteristics;
