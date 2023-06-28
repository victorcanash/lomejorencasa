import { useMemo } from 'react';

import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

import { convertElementToSx } from '@core/utils/themes';
import CustomImage from '@core/components/multimedia/CustomImage';
import CustomVideo from '@core/components/multimedia/CustomVideo';
import CenterBannerContent from './bannerContents/CenterBannerContent';
import LeftBannerContent from './bannerContents/LeftBannerContent';

import { homeBannersConfig } from '@lib/config/productBanners.config';
import { themeCustomElements } from '@lib/config/theme/elements';

type HomeBannerProps = {
  type: 'allProducts' | 'seasonal' | 'offers',
};

const HomeBanner = (props: HomeBannerProps) => {
  const {
    type,
  } = props;

  const smallBreakpoint = useMediaQuery('(max-width:600px)');

  const bannerConfig = useMemo(() => {
    let config = homeBannersConfig.allProducts;
    if (type === 'seasonal') {
      config = homeBannersConfig.seasonal;
    } else if (type === 'offers') {
      config = homeBannersConfig.offers;
    }
    return config;
  }, [type]);

  const themeElements = useMemo(() => {
    let typographyThemeElement = themeCustomElements.banners?.home?.allProducts?.text;
    let btnThemeElement = themeCustomElements.banners?.home?.allProducts?.btn;
    if (type === 'seasonal') {
      typographyThemeElement = themeCustomElements.banners?.home?.seasonal?.text;
      btnThemeElement = themeCustomElements.banners?.home?.seasonal?.btn;
    } else if (type === 'offers') {
      typographyThemeElement = themeCustomElements.banners?.home?.offers?.text;
      btnThemeElement = themeCustomElements.banners?.home?.offers?.btn;
    }
    return {
      typography: typographyThemeElement,
      btn: btnThemeElement,
    };
  }, [type]);

  const typographySx = useMemo(() => {
    if (smallBreakpoint) {
      return themeElements.typography?.small ?
        convertElementToSx(themeElements.typography.small) : undefined;
    }
    return themeElements.typography?.default ?
      convertElementToSx(themeElements.typography.default) : undefined;
  }, [smallBreakpoint, themeElements.typography?.default, themeElements.typography?.small]);

  const btnSx = useMemo(() => {
    return themeElements.btn ?
      convertElementToSx(themeElements.btn) : undefined;
  }, [themeElements.btn]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: bannerConfig.height,
      }}
    >
      <Swiper
        modules={bannerConfig.items.length > 1 ? [Autoplay] : undefined}
        speed={1000} 
        loop={bannerConfig.items.length > 1 ? true : undefined}
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
        { bannerConfig.items.map((item, index) => (
          <SwiperSlide key={index}>
            { item.source.type !== 'video' ?
              <CustomImage
                src={item.source.src}
                alt={item.source.alt}
                layout="fill"
                objectFit="cover"
                priority={item.source.priority}
              />
              :
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <CustomVideo
                  src={item.source.src as string}
                  style={{
                    position: 'relative',
                    objectFit: 'cover',
                    width: '100%',
                    height: bannerConfig.height,
                  }}
                />
              </Box>
            }

            { (type === 'allProducts' || type === 'seasonal') &&
              <CenterBannerContent
                item={item}
                typographySx={typographySx}
                btnSx={btnSx}
              />
            }
            { (type === 'offers') && 
              <LeftBannerContent
                item={item}
                typographySx={typographySx}
                btnSx={btnSx}
              />
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HomeBanner;
