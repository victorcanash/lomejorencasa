import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { FormattedMessage, useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Pagination } from 'swiper';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import usePage from '@lib/hooks/usePage';
import placeholder from 'public/images/placeholder.jpeg';
import microorganismIcon from 'public/images/microorganism-icon.png';
import frezzerIcon from 'public/images/frezzer-icon.png';
import dietIcon from 'public/images/diet-icon.png';
import shieldIcon from 'public/images/shield-icon.png';
import timeIcon from 'public/images/time-icon.png';

const Home: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'home.metas.title' });
  const description = intl.formatMessage({ id: 'home.metas.description' });

  const maxWidthImgs = "600px";

  const swipper = () => {
    return (
      <Box 
        sx={{ 
          maxWidth: maxWidthImgs, 
          margin: 'auto', 
          border: '1px solid black' 
        }}
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
                  src={placeholder} 
                  alt="Product image" 
                  width="500"
                  height="500"
                  layout="responsive" 
                  objectFit="cover" 
                  priority
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
                  <Typography component={"h1"} variant={"h2"} sx={{ mb: '15px' }}>
                    <FormattedMessage id="home.h1" />
                  </Typography>  
                  <Button
                    variant="contained"
                  >
                    <FormattedMessage id="home.buyBtn" />
                  </Button>
                </Box>
            </div>
          </SwiperSlide>
        </Swiper>
      </Box>
    );
  };

  const liAdvantage = (index: number) => {
    let imgSrc = microorganismIcon;
    let width = '100px';
    let height = '100px';
    switch (index) {
      case 0:
        imgSrc = microorganismIcon;
        break;
      case 1:
        imgSrc = shieldIcon;
        width = '81px';
        height = '100px';
        break;
      case 2:
        imgSrc = dietIcon;
        break;
      case 3:
        imgSrc = frezzerIcon;
        width = '73px';
        height = '100px';
        break;
      case 4:
        imgSrc = timeIcon;
        width = '76px';
        height = '100px';
        break;
    }
    return (
      <Typography component="li" variant="body1" sx={{ mb: '15px' }}>
        <FormattedMessage id={`home.advantages.${index+1}`} />
        <div 
          style={{ 
            borderRadius: '100%', 
            backgroundColor: '#ecf7dc',
            width: '200px',
            maxWidth: '100%',
            height: '200px',
            position: 'relative',
            margin: 'auto',
            marginTop: '15px',
          }}
        >   
          <div
            style={{
              margin: 0,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Image 
              src={imgSrc} 
              alt="Advantage" 
              width={width}
              height={height}
              layout="fixed" 
              objectFit="cover" 
            />
          </div>
        </div>
      </Typography>
    );
  };

  const liUse = (index: number) => {
    const imgSrc = placeholder;
    return (
      <Typography component="li" variant="body1" sx={{ mb: '15px' }}>
        <FormattedMessage id={`home.use.${index+1}`} />
        <Grid container sx={{ mt: '15px' }}>
          <Grid item xs={12}>
            <Box 
              sx={{ 
                maxWidth: maxWidthImgs, 
                margin: 'auto', 
                border: '1px solid black'
              }}
            >
              <Image 
                src={imgSrc} 
                alt="Use" 
                width={500}
                height={500}
                layout="responsive" 
                objectFit="cover" 
              />
            </Box>
          </Grid>
        </Grid>
      </Typography>
    );
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Grid
        container
        className='animate__animated animate__fadeIn'
      >
        <Grid
          item
          xs={12}
          className='animate__animated animate__fadeInLeft'
          sx={{ mb: 4 }}
        >  
          { swipper() }
        </Grid>
        <Grid
          item
          xs={12}
          className='animate__animated animate__fadeInLeft'
          sx={{ textAlign: 'center' }}
        >
          <Typography component={"h2"} variant={"h1"} sx={{ mb: 3 }}>
            <FormattedMessage id="home.advantages.title" />
          </Typography> 
          <ol style={{ listStyleType: 'none', paddingInlineStart: '0px' }}>
            { liAdvantage(0) }
            { liAdvantage(1) }
            { liAdvantage(2) }
            { liAdvantage(3) }
            { liAdvantage(4) }
          </ol>

          <Typography component={"h2"} variant={"h1"} sx={{ mt: 4, mb: 3 }}>
            <FormattedMessage id="home.use.title" />
          </Typography> 
          <ol style={{ listStyleType: 'none', paddingInlineStart: '0px' }}>
            { liUse(0) }
            { liUse(1) }
            { liUse(2) }
          </ol>

          <Typography component={"h2"} variant={"h1"} sx={{ mt: 4, mb: 3 }}>
            <FormattedMessage id="home.conservation.title" />
          </Typography> 
          <Typography component={"div"} variant={"body1"} sx={{ textAlign: 'left', mb: 2 }}>
            <FormattedMessage id="home.conservation.description1" />
          </Typography> 
          <Typography component={"div"} variant={"body1"} sx={{ textAlign: 'left', mb: 4 }}>
            <FormattedMessage id="home.conservation.description2" />
          </Typography> 

          <Typography component={"h2"} variant={"h1"} sx={{ mb: 3 }}>
            <FormattedMessage id="home.characteristics.title" />
          </Typography> 
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
