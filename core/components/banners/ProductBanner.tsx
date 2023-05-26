import { useMemo, useCallback } from 'react';

import { FormattedMessage } from 'react-intl';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import type { FormatText } from '@core/types/texts';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';

import seoConfig from '@lib/config/next-seo.config';
import { pages } from '@lib/config/navigation.config';
import { homeBannerImgIds } from '@lib/constants/multimedia';
import { themeCustomElements } from '@lib/constants/themes/elements';
import MultimediaContainer from '@components/multimedia/MultimediaContainer';

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

  const getContent = useCallback((index: number) => {
    const text: FormatText = {
      id: 'home.banner.1',
    };
    if (index == 1) {
      text.id = 'home.banner.2';
    } else if (index == 2) {
      text.id = 'home.banner.3';
    } else if (index == 3) {
      text.id = 'home.banner.4';
    }
    return (
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
            align={text.textAlign}
            sx={getSxContent()}
          >
            <FormattedMessage id={text.id} values={text.values} defaultMessage={text.id} />
          </Typography>
        </Grid>
        <Grid item>
          <LinkButton
            href={pages.everfresh.path}
            sx={convertElementToSx(themeCustomElements.button.action.primary)}
          >
            <FormattedMessage id="home.banner.buyBtn" />
          </LinkButton>
        </Grid>
      </Grid>
    );
  }, [getSxContent, styleXs.containerLeft, styleXs.imgSeparatorWidth]);

  const getAltImg = useCallback((index: number) => {
    if (seoConfig.productBannerAlts.length >= index + 1) {
      return seoConfig.productBannerAlts[index];
    } else if (seoConfig.productBannerAlts.length >= 1) {
      return seoConfig.productBannerAlts[0];
    }
    return '';
  }, []);

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
          { homeBannerImgIds.map((src, index, srcs) => (
            <SwiperSlide key={index}>
              <MultimediaContainer
                type="banner"
                source={{ 
                  src,
                  alt: getAltImg(index),
                  priority: true,
                  width: '1920',
                  height: '1080', 
                }}
              />
              { getContent(index) }  
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default ProductBanner;
