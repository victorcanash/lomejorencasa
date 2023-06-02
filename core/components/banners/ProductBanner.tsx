import { useMemo, useCallback } from 'react';

import { FormattedMessage } from 'react-intl';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/inputs/LinkButton';
import MultimediaContainer from '@core/components/multimedia/MultimediaContainer';
import productBannerConfig from '@lib/config/productBanner.config';
import { pages } from '@lib/config/navigation.config';
import { themeCustomElements } from '@lib/config/theme/elements';

const ProductBanner = () => {
  const smallBreakpoint = useMediaQuery('(max-width:600px)');

  const styleXs = useMemo(() => {
    return {
      containerWidth: '2103px',
      containerLeft: -673,
      imgSeparatorWidth: '95vw',
    };
  }, []);

  const getSxContent = useCallback(() => {
    if (smallBreakpoint) {
      return themeCustomElements.banners?.product?.small ?
        convertElementToSx(themeCustomElements.banners.product.small) : undefined;
    }
    return themeCustomElements.banners?.product?.default ?
      convertElementToSx(themeCustomElements.banners.product.default) : undefined;
  }, [smallBreakpoint]);

  return (
    <Box 
      sx={{
        position: 'relative',
        width: {
          xs: styleXs.containerWidth,
          sm_md: '100%',
        },
        left: {
          xs: `${styleXs.containerLeft}px`,
          sm_md: '0px',
        },
      }}
    >
      <Box
        sx={{
          display: {
            xs: 'inline-block',
            sm_md: 'hidden',
          },
          width: {
            xs: styleXs.imgSeparatorWidth,
            sm_md: '0px',
          },
        }}
      />
      <Box
        sx={{
          display: {
            xs: 'inline-block',
            sm_md: 'block',
          },
          width: '1010px',
          m: 'auto',
        }}
      >
        <Swiper
          modules={[Autoplay]}
          speed={1000} 
          loop
          centeredSlides
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          { productBannerConfig.items.map((item, index) => (
            <SwiperSlide key={index}>
              <MultimediaContainer
                type="banner"
                source={item.source}
              />
              <Grid
                container
                direction="column"
                wrap="nowrap"
                justifyContent="center"
                px="20px"
                py="10px" 
                sx={{
                  position: 'absolute',
                  height: '100%',
                  width: '100vw',
                  top: {
                    xs: '40px',
                    sm: '0px',
                  },
                  left: {
                    xs: `calc(${-styleXs.containerLeft}px - ${styleXs.imgSeparatorWidth})`,
                    sm_md: '0px',
                  },
                }}
              >
                <Grid item mb={2}>
                  <Typography
                    component="div"
                    align={item.contentText.textAlign}
                    sx={getSxContent()}
                  >
                    <FormattedMessage
                      id={item.contentText.id}
                      values={item.contentText.values}
                      defaultMessage={item.contentText.id}
                    />
                  </Typography>
                </Grid>
                <Grid item>
                  <LinkButton
                    href={item.button.path || pages.home.path}
                    customtype="actionPrimary"
                  >
                    <FormattedMessage
                      id={item.button.text.id}
                      values={item.button.text.values}
                      defaultMessage={item.button.text.id}
                    />
                  </LinkButton>
                </Grid>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default ProductBanner;
