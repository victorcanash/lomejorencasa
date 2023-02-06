import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import ProductBanner from '@components/products/ui/ProductBanner';
import EverfreshIntro from '@components/products/ui/everfresh/EverfreshIntro';
import EverfreshPackingMachine from '@components/products/ui/everfresh/EverfreshPackingMachine';
import EverfreshVacuumPacked from '@components/products/ui/everfresh/EverfreshVacuumPacked';
import EverfreshUse from '@components/products/ui/everfresh/EverfreshUse';
import EverfreshConservation from '@components/products/ui/everfresh/EverfreshConservation';
import EverfreshCharacteristics from '@components/products/ui/everfresh/EverfreshCharacteristics';

const EverfreshHome = () => {
  const section = (content: JSX.Element, spacing?: number) => {
    return (
      <Grid
        container
        className='animate__animated animate__fadeIn'
        spacing={spacing}
        mt={4}
      >
        { content }
      </Grid>
    );
  };

  return (
    <>
      <ProductBanner />

      <Container>

        { section(
          <Grid item xs={12}> 
            <EverfreshIntro />
          </Grid>
        )}

        { section(
          <Grid item xs={12}> 
            <EverfreshPackingMachine />
          </Grid>
        )}

        { section(
          <Grid item xs={12}> 
            <EverfreshVacuumPacked />
          </Grid>
        )}

        { section(
          <Grid item xs={12}> 
            <EverfreshUse />
          </Grid>
        )}

        { section(
          <Grid item xs={12}> 
            <EverfreshConservation />
          </Grid>
        )}

        { section(
          <Grid item xs={12}> 
            <EverfreshCharacteristics />
          </Grid>
        )}

      </Container>
    </>
  );
};

export default EverfreshHome;
