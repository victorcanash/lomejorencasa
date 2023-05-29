import { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/navigation/LinkButton';
import CustomImage from '@core/components/multimedia/CustomImage';

import { pages } from '@lib/config/navigation.config';
import { homeCharacteristicsBgImgIds, homeCharacteristicsIconsIds, homeAdvantagesIconsIds } from '@lib/constants/multimedia';
import { themeCustomElements } from '@lib/constants/themes/elements';
import Title from '@core/components/ui/Title'; 
import colors from '@lib/constants/themes/colors';

type CharacteristicsProps = {
  type: 'characteristics' | 'advantages',
};

const Characteristics = (props: CharacteristicsProps) => {
  const { type } = props;

  const characteristicIcon = useCallback((
    source: Source,
    alt: string,
    widthSrc?: string, 
    heightSrc?: string,
  ) => {
    return (
      <Box
        sx={{
          backgroundColor: colors.background.third,
          borderRadius: '100%',
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
          <CustomImage 
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
  }, []);

  const characteristic = useCallback((
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
          <Box maxWidth="sm" ml="auto">
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
          <Box maxWidth="sm" mr="auto">
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
  }, [characteristicIcon, type]);

  return (
    <>
      <Container id={type}>
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
          backgroundColor: colors.background.homeSection,
          color: colors.text.white,
          position: 'relative',
          mt: 4,
          zIndex: '0',
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
            right: type == 'characteristics' ? '0px' : undefined,
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
            <CustomImage 
              src={homeCharacteristicsBgImgIds[0]}
              width="597"
              height="9125"
              layout="responsive" 
              objectFit="cover"
              flip={type !== 'characteristics' ? 'h' : undefined}
            />
          </Box>
        </Box>

        <Grid 
          container 
          spacing={4}
          sx={{
            position: 'relative',
            width: '70%',
            mr: type == 'characteristics' ? 'auto' : undefined,
            ml: type == 'characteristics' ? undefined : 'auto',
            py: 4,
            pr: type == 'characteristics' ? undefined : 2,
            pl: type == 'characteristics' ? 2 : undefined,
            justifyContent: type == 'characteristics' ? 'flex-start' : 'flex-end',
          }}
        >
          { type == 'characteristics' ?
            <>
              { characteristic('home.characteristics.description.1', { src: homeCharacteristicsIconsIds[0] } as Source, '') }
              { characteristic('home.characteristics.description.2', { src: homeCharacteristicsIconsIds[1] } as Source, '') }
              { characteristic('home.characteristics.description.3', { src: homeCharacteristicsIconsIds[2] } as Source, '') }
              { characteristic('home.characteristics.description.4', { src: homeCharacteristicsIconsIds[3] } as Source, '') }
              { characteristic('home.characteristics.description.5', { src: homeCharacteristicsIconsIds[4] } as Source, '') }
              { characteristic('home.characteristics.description.6', {src: homeCharacteristicsIconsIds[5] } as Source, '') }
            </>
            :
            <>
              { characteristic('home.advantages.description.1', { src: homeAdvantagesIconsIds[0] } as Source, '') }
              { characteristic('home.advantages.description.2', { src: homeAdvantagesIconsIds[1] } as Source, '', '81px') }
              { characteristic('home.advantages.description.3', { src: homeAdvantagesIconsIds[2] } as Source, '') }
              { characteristic('home.advantages.description.4', { src: homeAdvantagesIconsIds[3] } as Source, '') }
              { characteristic('home.advantages.description.5', { src: homeAdvantagesIconsIds[4] } as Source, '', '76px') }
            </>
          }
          <Grid 
            item
            xs={12}
            container
            direction={type == 'characteristics' ? 'row-reverse' : undefined}
          >
            <Grid item>
              <LinkButton
                href={pages.everfresh.path}
                id="advantages"
                sx={convertElementToSx(themeCustomElements.button.action.primary)}
              >
                <FormattedMessage id={type == 'characteristics' ? 'home.characteristics.buyBtn' : 'home.advantages.buyBtn'} />
              </LinkButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Characteristics;
