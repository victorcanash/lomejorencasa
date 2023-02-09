import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import ProductAccordion from '@components/products/ui/ProductAccordion';
import ProductTutorial from '@components/products/ui/ProductTutorial';

const EverfreshDetail = () => {

  return (
    <>
      <Grid
        container
        className='animate__animated animate__fadeIn'
        spacing={1}
      >
        <Grid 
          item 
          xs={12} 
          sm={6}
        >
          <ProductAccordion
            textId={'everfresh.details'}
            itemsCount={8}
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm={6}
        >
          <ProductAccordion
            textId={'everfresh.characteristics'}
            itemsCount={4}
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm={6}
        >
          <ProductAccordion
            textId={'everfresh.dimensions'}
            itemsCount={3}
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm={6}
        >
          <ProductAccordion
            textId={'productDetail.shipping'}
            itemsCount={3}
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm={6}
        >
          <ProductAccordion
            textId={'productDetail.refund'}
            itemsCount={2}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mt: 5, mb: 5 }}/>

      <Grid
        container
        className='animate__animated animate__fadeIn'
        spacing={1}
      >
        <Grid 
          item 
          xs={12} 
        > 
          <ProductTutorial 
            textId="everfresh.videoComment.1" 
            source={{ 
              type: 'video',
              src: require('../../../public/videos/everfresh/everfresh1.mp4'),
            }} 
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
        > 
          <ProductTutorial
            textId="everfresh.videoComment.2" 
            source={{ 
              type: 'video',
              src: require('../../../public/videos/everfresh/everfresh2.mp4'),
            }} 
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
        > 
          <ProductTutorial
            textId="everfresh.videoComment.3" 
            source={{ 
              type: 'video',
              src: require('../../../public/videos/everfresh/everfresh3.mp4'),
            }} 
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EverfreshDetail;
