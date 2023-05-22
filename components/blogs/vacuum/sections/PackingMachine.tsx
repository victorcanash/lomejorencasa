import { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';
import { Autoplay, EffectCards } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { convertElementToSx } from '@core/utils/themes';

import { keywords } from '@lib/config/next-seo.config';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { homePackingMachineImgIds } from '@lib/constants/multimedia';
import Title from '@components/ui/Title';
import MultimediaContainer from '@components/multimedia/MultimediaContainer';

const PackingMachine = () => {
  const getCardSx = useCallback((index: number) => {
    if (index == 0) {
      return convertElementToSx(themeCustomElements.home.packingMachine.card.first);
    } else if (index == 1) {
      return convertElementToSx(themeCustomElements.home.packingMachine.card.second);
    }
    return convertElementToSx(themeCustomElements.home.packingMachine.card.third);
  }, []);

  return (
    <>
      <Container id="packingMachine">
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h2"
            texts={{
              title: {
                id: 'home.packingMachine.title',
              },
            }}
            divider={true}
          />
        </Box>

        <Box
          sx={{     
            position: 'absolute',
            width: '225px',
            left: {
              xs: '8%',
              sm: '5%',
              sm_md: '10%',
              lg: '15%',
              lg_xl: '20%',
              xl: '25%',
            },
          }}
        >
          <Swiper 
            modules={[Autoplay, EffectCards]}
            //speed={1000} 
            effect={"cards"}
            grabCursor={true}
            className="mySwiper"
          >
            { [
                'home.packingMachine.description.1', 
                'home.packingMachine.description.2',
                'home.packingMachine.description.3'
              ].map((item, index) => (
              <SwiperSlide key={index}>
                <Card
                  sx={{
                    ...convertElementToSx(themeCustomElements.home.packingMachine.card.default),
                    ...getCardSx(index),
                    minHeight: '256px',
                  }}
                >
                  <CardContent>
                    <Typography component="div" variant="body1">
                      <FormattedMessage id={item} />
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>

      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <MultimediaContainer
          type="homePackingMachine"
          source={{ 
            src: homePackingMachineImgIds[0],
            alt: keywords.vacuumMachine.main,
            priority: true,
            width: '8000',
            height: '4500',
          }}
        />
      </Box>
    </>
  );
};

export default PackingMachine;
