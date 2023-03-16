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

  const isMdBreakpoint = useMediaQuery('(max-width:600px)');

  const styleXs = {
    containerWidth: '2103px',
    containerLeft: -673,
    imgSeparatorWidth: '95vw',
  } 

  const getSxContent = () => {
    if (isMdBreakpoint) {
      return convertElementToSx(themeCustomElements.home.banner.small);
    }
    return convertElementToSx(themeCustomElements.home.banner.default);
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
          //loop
          centeredSlides
          /*autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}*/
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
    </Box>
  );
};

export default HomeBanner;
