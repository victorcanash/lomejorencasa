import { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import type { Source } from '@core/types/multimedia';
import type { Landing } from '@core/types/products';
import { useProductsContext } from '@core/contexts/ProductsContext';
import LinkButton from '@core/components/inputs/LinkButton';
import CustomImage from '@core/components/multimedia/CustomImage';
import Title from '@core/components/ui/Title'; 

import colors from '@lib/config/theme/colors';

type CharacteristicsProps = {
  type: 'characteristics' | 'advantages',
  landingVacuumMachine: Landing,
};

const Characteristics = (props: CharacteristicsProps) => {
  const {
    type,
    landingVacuumMachine,
  } = props;

  const { getItemPath } = useProductsContext();

  const characteristicIcon = useCallback((
    source: Source,
    alt: string,
    widthSrc?: string, 
    heightSrc?: string,
  ) => {
    return (
      <Box
        sx={{
          backgroundColor: '#E9D9B1',
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
          backgroundColor: '#586453',
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
              src="v1680692903/laenvasadora/HOME%20PAGE/BARRAS%20LATERALES/Sanefa_final_para_caracteristicas_reflect_h3nsrg.png"
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
              { characteristic('home.characteristics.description.1', { src: 'v1680693021/laenvasadora/HOME%20PAGE/ICONS/18159369621571183082-128_cuy5ir.png' } as Source, '') }
              { characteristic('home.characteristics.description.2', { src: 'v1680693021/laenvasadora/HOME%20PAGE/ICONS/1809346091571183078-128_lzebra.png' } as Source, '') }
              { characteristic('home.characteristics.description.3', { src: 'v1680693022/laenvasadora/HOME%20PAGE/ICONS/11060696791558965392-128_xjkwsx.png' } as Source, '') }
              { characteristic('home.characteristics.description.4', { src: 'v1680693021/laenvasadora/HOME%20PAGE/ICONS/16709206561548330555-128_e8xcyh.png' } as Source, '') }
              { characteristic('home.characteristics.description.5', { src: 'v1680693006/laenvasadora/HOME%20PAGE/ICONS/751078_refrigerator_cold_freezer_fridge_kitchen_icon_phafyq.png' } as Source, '') }
              { characteristic('home.characteristics.description.6', {src: 'v1680692992/laenvasadora/HOME%20PAGE/ICONS/8679879_shield_check_line_icon_gqtqcv.png' } as Source, '') }
            </>
            :
            <>
              { characteristic('home.advantages.description.1', { src: 'v1680692992/laenvasadora/HOME%20PAGE/ICONS/5875889_bacteria_cell_dish_lab_microorganism_icon_wknl4r.png' } as Source, '') }
              { characteristic('home.advantages.description.2', { src: 'v1680693021/laenvasadora/HOME%20PAGE/ICONS/18728019991544610488-128_zkcqbo.png' } as Source, '', '81px') }
              { characteristic('home.advantages.description.3', { src: 'v1680692992/laenvasadora/HOME%20PAGE/ICONS/4394725_avocado_diet_food_healthy_organic_icon_mueb2f.png' } as Source, '') }
              { characteristic('home.advantages.description.4', { src: 'v1680693006/laenvasadora/HOME%20PAGE/ICONS/751078_refrigerator_cold_freezer_fridge_kitchen_icon_phafyq.png' } as Source, '') }
              { characteristic('home.advantages.description.5', { src: 'v1680692992/laenvasadora/HOME%20PAGE/ICONS/6351925_appointment_clock_hour_hourglass_schedule_icon_mko2ak.png' } as Source, '', '76px') }
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
                href={getItemPath(landingVacuumMachine)}
                id="advantages"
                customtype="actionPrimary"
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
