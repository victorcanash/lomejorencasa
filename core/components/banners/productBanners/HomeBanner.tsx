import { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import type { ThemeElement } from '@core/types/themes';
import type { ProductBannerConfig } from '@core/types/banners';
import { convertElementToSx } from '@core/utils/themes';
import CustomImage from '@core/components/multimedia/CustomImage';
import LinkButton from '@core/components/inputs/LinkButton';

import { pages } from '@lib/config/navigation.config';

type HomeBannerProps = {
  productBannerConfig: ProductBannerConfig,
  typographyThemeElements?: {
    small?: ThemeElement,
    default?: ThemeElement,
  },
};

const HomeBanner = (props: HomeBannerProps) => {
  const {
    productBannerConfig,
    typographyThemeElements,
  } = props;

  const smallBreakpoint = useMediaQuery('(max-width:600px)');

  const getSxContent = useCallback(() => {
    if (smallBreakpoint) {
      return typographyThemeElements?.small ?
        convertElementToSx(typographyThemeElements.small) : undefined;
    }
    return typographyThemeElements?.default ?
      convertElementToSx(typographyThemeElements.default) : undefined;
  }, [smallBreakpoint, typographyThemeElements?.default, typographyThemeElements?.small]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: productBannerConfig.height,
      }}
    >
      <Swiper
        modules={productBannerConfig.items.length > 1 ? [Autoplay] : undefined}
        speed={1000} 
        loop={productBannerConfig.items.length > 1 ? true : undefined}
        centeredSlides
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        style={{
          position: 'relative',
          height: '100%',
        }}
      >
        { productBannerConfig.items.map((item, index) => (
          <SwiperSlide key={index}>
            <CustomImage
              src={item.source.src}
              alt={item.source.alt}
              layout="fill"
              objectFit="cover"
              priority={item.source.priority}
            />

            <Grid
              container
              direction="column"
              wrap="nowrap"
              justifyContent="center"
              rowSpacing={4}
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                p: 2,
              }}
            >
              <Grid
                item
                xs={12}
                container
                direction="column"
                justifyContent="flex-end"
                alignItems="center"
              >
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
              <Grid
                item
                xs={12}
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                <LinkButton
                  href={item.button.path || pages.home.path}
                  customtype="banner"
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
  );
};

export default HomeBanner;
