import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import ProductBanner from '@components/products/ui/ProductBanner';
import ProductTutorial from '@components/products/ui/ProductTutorial';
import EverfreshAdvantages from '@components/products/ui/everfresh/EverfreshAdvantages';
import EverfreshCharacteristics from '@components/products/ui/everfresh/EverfreshCharacteristics';
import EverfreshConservation from '@components/products/ui/everfresh/EverfreshConservation';

const EverfreshHome = () => {

  return (
    <>
      <ProductBanner />

      <Container sx={{ mt: 4 }}>

        <Grid
          container
          className='animate__animated animate__fadeIn'
          mt={4}
        >
          <Grid 
            item 
            xs={12} 
          > 
            <EverfreshAdvantages />
          </Grid>
        </Grid>

        <Grid
          container
          className='animate__animated animate__fadeIn'
          spacing={1}
          mt={4}
        >
          <Grid 
            item 
            xs={12} 
          > 
            <ProductTutorial
              titleId="home.use.title"
              textId="home.use.1" 
              source={{ 
                type: 'video',
                src: require('../../../public/videos/home/everfresh1.mp4'),
              }} 
            />
          </Grid>
          <Grid 
            item 
            xs={12} 
          >
            <ProductTutorial 
              textId="home.use.2" 
              source={{ 
                type: 'video',
                src: require('../../../public/videos/home/everfresh1.mp4'),
              }} 
            />
          </Grid>
          <Grid 
            item 
            xs={12} 
          >
            <ProductTutorial 
              textId="home.use.3" 
              source={{ 
                type: 'video',
                src: require('../../../public/videos/home/everfresh1.mp4'),
              }} 
            />
          </Grid>
        </Grid>

        <Grid
          container
          className='animate__animated animate__fadeIn'
          mt={4}
        >
          <Grid 
            item 
            xs={12} 
          > 
            <EverfreshCharacteristics />
          </Grid>
        </Grid>

        <Grid
          container
          className='animate__animated animate__fadeIn'
          mt={4}
        >
          <Grid 
            item 
            xs={12} 
          > 
            <EverfreshConservation />
          </Grid>
        </Grid>

      </Container>
    </>
  );
};

export default EverfreshHome;
