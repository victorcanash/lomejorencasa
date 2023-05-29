import { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';
import { Autoplay, EffectCards } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { keywords } from '@lib/config/next-seo.config';
import Title from '@core/components/ui/Title';
import colors from '@lib/constants/themes/colors';
import CustomImage from '@core/components/multimedia/CustomImage';

const PackingMachine = () => {
  const getBackgroundColor = useCallback((index: number) => {
    if (index == 0) {
      return colors.background.third;
    } else if (index == 1) {
      return colors.background.secondary;
    }
    return colors.background.tableHead;
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
                    borderRadius: '8px',
                    backgroundColor: getBackgroundColor(index),
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
        <Box
          maxWidth="md_lg"
          width={{
            xs: '765px',
            sm_md: '900px',
            md: '1085px',
          }}
          m="auto"
          mt={{
            xs: 17,
            sm_md: 14,
            md: 10,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 'calc(100% + (0px * 2))',
            }}
          >
            <CustomImage
              src="v1680692829/laenvasadora/HOME%20PAGE/PNG%20IMPLEMENTATION/FOTO_RECURSO_MASK_CROP_PARA_QUE_ES_UNA_ENVASADORA_cxham7.png"
              alt={keywords.vacuumMachine.main}
              width="8000"
              height="4500"
              layout="responsive"
              objectFit="cover"
              priority={true}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PackingMachine;
