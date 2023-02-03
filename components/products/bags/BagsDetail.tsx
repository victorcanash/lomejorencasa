import Grid from '@mui/material/Grid';

import ProductAccordion from '@components/products/ProductAccordion';

const BagsDetail = () => {

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
            textId={'bags.small'}
            itemsCount={1}
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm={6}
        >
          <ProductAccordion
            textId={'bags.medium'}
            itemsCount={1}
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm={6}
        >
          <ProductAccordion
            textId={'bags.big'}
            itemsCount={1}
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
      </Grid>
    </>
  );
};

export default BagsDetail;
