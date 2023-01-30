import Image, { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Pagination } from 'swiper';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import LinkButton from '@core/components/LinkButton';

import { pages } from '@lib/constants/navigation';
import EverfreshTutorial from '@components/products/everfresh/EverfreshTutorial';
import EverfreshConservation from '@components/products/everfresh/EverfreshConservation';
import everfresh1 from 'public/images/home/everfresh1.jpg';
import microorganismIcon from 'public/images/microorganism-icon.png';
import frezzerIcon from 'public/images/frezzer-icon.png';
import dietIcon from 'public/images/diet-icon.png';
import shieldIcon from 'public/images/shield-icon.png';
import timeIcon from 'public/images/time-icon.png';
import airplaneIcon from 'public/images/airplane-icon.png';
import breezeIcon from 'public/images/breeze-icon.png';
import cableIcon from 'public/images/cable-icon.png';
import shoppingbagIcon from 'public/images/shoppingbag-icon.png';

const EverfreshHome = () => {
  const advantage = (textId: string, src: StaticImageData, widthSrc = '100px', heightSrc = '100px') => {
    return (
      <Typography component="div" variant="body1">
        <FormattedMessage id={textId} />
        <Box
          sx={{
            width: '200px',
            height: '200px',
            borderRadius: '100%',
            backgroundColor: '#e5ecdc',
            maxWidth: '100%',
            position: 'relative',
            m: 'auto',
            mt: 2,
            mb: 2,
          }} 
        >   
          <Box
            sx={{
              m: 0,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Image 
              src={src} 
              alt="Advantage" 
              width={widthSrc}
              height={heightSrc}
              layout="fixed" 
              objectFit="cover" 
            />
          </Box>
        </Box>
      </Typography>
    );
  };

  const characteristic = (textId: string, src: StaticImageData, widthSrc = '100px', heightSrc = '100px') => {
    return (
      <Grid item xs={6}>
        <Typography component="div" variant="body1">
          <Box
            sx={{
              maxWidth: '100%',
              position: 'relative',
              m: 'auto',
              width: { xs: '180px', sm: '200px' },
              height: { xs: '180px', sm: '200px' },
              borderRadius: '100%', 
              backgroundColor: '#e5ecdc',
              mt: 2,
              mb: 2,
            }} 
          >   
            <Box
              sx={{
                m: 0,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Image 
                src={src} 
                alt="Advantage" 
                width={widthSrc}
                height={heightSrc}
                layout="fixed" 
                objectFit="cover" 
              />
            </Box>
          </Box>
          <Box
            sx={{
              maxWidth: '100%',
              position: 'relative',
              m: 'auto',
              width: { xs: '150px', sm: '200px' },
            }}
          >
          <FormattedMessage id={textId} />
          </Box>
        </Typography>
      </Grid>
    );
  };

  return (
    <>
      <Grid container>

        {/* Swiper */}
        <Grid
          item
          xs={12}
          className='animate__animated animate__fadeInLeft'
          sx={{ mb: 4 }}
        >  
          <Box 
            className='centered-container-img'
          >
            <Swiper
              modules={[Navigation, EffectCoverflow, Pagination]}
              navigation
              pagination={{
                clickable: true
              }}
              effect="coverflow"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
            >
              <SwiperSlide>
                <div>
                  <Image
                    src={everfresh1} 
                    alt="Product image" 
                    layout="responsive" 
                    objectFit="cover"
                    quality="100"
                    priority
                    style={{ borderRadius: '4px' }}
                  />
                  <Box               
                    sx={{ 
                      position: 'absolute',
                      top: '50%',
                      width: '50%',
                      height: '50%',
                      pl: '20px',
                      pb: '10px',
                    }}
                  >
                    <Typography component={"h1"} variant={"h2"} sx={{ mb: 2, color: 'white' }}>
                      <FormattedMessage id="home.h1" />
                    </Typography>  
                    <LinkButton
                      href={pages.everfresh.path}
                      id="advantages"
                    >
                      <FormattedMessage id="home.buyBtn" />
                    </LinkButton>
                  </Box>
                </div>
              </SwiperSlide>
            </Swiper>
          </Box>
        </Grid>

        {/* Advantages */}
        <Grid
          item
          xs={12}
          className='animate__animated animate__fadeInLeft'
          sx={{ textAlign: 'center' }}
        >
          <Box className='centered-container-img'>
            <Typography component={"h2"} variant={"h1"} sx={{ mb: 3 }}>
              <FormattedMessage id="home.advantages.title" />
            </Typography> 
            { advantage('home.advantages.1', microorganismIcon) }
            { advantage('home.advantages.2', shieldIcon, '81px') }
            { advantage('home.advantages.3', dietIcon) }
            { advantage('home.advantages.4', frezzerIcon) }
            { advantage('home.advantages.5', timeIcon, '76px') }
          </Box>
        </Grid>

        {/* Tutorials */}
        <Grid
          item
          xs={12}
          className='animate__animated animate__fadeInLeft'
          sx={{ textAlign: 'center' }}
          id="use"
        >
          <Box className='centered-container-img'>
            <Typography component={"h2"} variant={"h1"} sx={{ mt: 2, mb: 3 }}>
              <FormattedMessage id="home.use.title" />
            </Typography> 
            <EverfreshTutorial 
              textId="home.use.1" 
              source={{ 
                type: 'video',
                src: require('../../../public/videos/home/everfresh1.mp4'),
              }} 
            />
            <EverfreshTutorial 
              textId="home.use.2" 
              source={{ 
                type: 'video',
                src: require('../../../public/videos/home/everfresh1.mp4'),
              }} 
            />
            <EverfreshTutorial 
              textId="home.use.3" 
              source={{ 
                type: 'video',
                src: require('../../../public/videos/home/everfresh1.mp4'),
              }} 
            />
          </Box>
        </Grid>

        {/* Conservation */}
        <Grid
          item
          xs={12}
          className='animate__animated animate__fadeInLeft'
          sx={{ textAlign: 'center' }}
          id="convervation"
        >
          <Box className='centered-container-img'>
            <Typography component={"h2"} variant={"h1"} sx={{ mt: 1, mb: 4 }}>
              <FormattedMessage id="home.conservation.title" />
            </Typography> 
            <EverfreshConservation />
            <Typography component={"div"} variant={"body1"} sx={{ mt: 2, mb: 2 }}>
              <FormattedMessage id="home.conservation.description1" />
            </Typography> 
            <Typography component={"div"} variant={"body1"} sx={{ mb: 3 }}>
              <FormattedMessage id="home.conservation.description2" />
            </Typography> 
          </Box>
        </Grid>

        {/* Characteristics */}
        <Grid
          item
          xs={12}
          className='animate__animated animate__fadeInLeft'
          sx={{ textAlign: 'center' }}
          id="characteristics"
        >
          <Box className='centered-container-img'>
            <Typography component={"h2"} variant={"h1"} sx={{ mb: 2 }}>
              <FormattedMessage id="home.characteristics.title" />
            </Typography> 
            <Grid container>     
              { characteristic('home.characteristics.1', breezeIcon) }
              { characteristic('home.characteristics.2', airplaneIcon) }
              { characteristic('home.characteristics.3', airplaneIcon) }
              { characteristic('home.characteristics.4', cableIcon) }
              { characteristic('home.characteristics.5', shoppingbagIcon) }
              { characteristic('home.characteristics.6', frezzerIcon) }
            </Grid>
          </Box>
        </Grid>

      </Grid>
    </>
  )
};

export default EverfreshHome;
