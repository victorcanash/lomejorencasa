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

import { pages } from '@lib/constants/navigation';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import MultimediaContainer from '@components/ui/MultimediaContainer';

const HomeBanner = () => {
  const { getProductBannerImgsUrl } = useProductsContext();

  const isXsBreakpoint = useMediaQuery('(max-width:500px)');
  const isMdBreakpoint = useMediaQuery('(max-width:600px)');
  const isLgBreakpoint = useMediaQuery('(max-width:750px)');

  const getSxContent = () => {
    if (isXsBreakpoint) {
      return convertElementToSx(themeCustomElements.home.banner.sm);
    } else if (isMdBreakpoint) {
      return convertElementToSx(themeCustomElements.home.banner.md);
    } else if (isLgBreakpoint) {
      return convertElementToSx(themeCustomElements.home.banner.lg);
    }
    return convertElementToSx(themeCustomElements.home.banner.xl);
  };

  const getContent = (index: number) => {
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
        rowSpacing={2}
        direction="column"
        wrap="nowrap"
        justifyContent="center"
        px="20px"
        py="10px" 
        sx={{
          position: 'absolute',
          height: '100%',
          width: {
            xs: '75%',
            sm: '50%'
          },
          top: '0px',
        }}
      >
        <Grid item>
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
            id="advantages"
            sx={convertElementToSx(themeCustomElements.button.action)}
          >
            <FormattedMessage id="home.banner.buyBtn" />
          </LinkButton>
        </Grid>
      </Grid>
    );
  };

  return ( 
    <Box
      maxWidth="md_lg"
      m="auto"
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
        { getProductBannerImgsUrl().map((src, index) => (
          <SwiperSlide key={index}>
            <MultimediaContainer
              type="banner"
              source={{ 
                src,
                alt: 'Everfresh banner images',
                priority: true,
              }}
            />
            { getContent(index) }
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HomeBanner;
