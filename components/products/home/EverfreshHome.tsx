import Container from '@mui/material/Container';

import HomeBanner from '@components/products/sections/HomeBanner';
import HomeIntro from '@components/products/sections/HomeIntro';
import EverfreshPackingMachine from '@components/products/ui/everfresh/EverfreshPackingMachine';
import EverfreshVacuumPacked from '@components/products/ui/everfresh/EverfreshVacuumPacked';
import EverfreshUse from '@components/products/ui/everfresh/EverfreshUse';
import EverfreshConservation from '@components/products/ui/everfresh/EverfreshConservation';
import EverfreshCharacteristics from '@components/products/ui/everfresh/EverfreshCharacteristics';

const EverfreshHome = () => {

  return (
    <>
      <HomeBanner />

      <Container>

        <HomeIntro />

        <EverfreshPackingMachine />

        <EverfreshVacuumPacked />

        <EverfreshUse />

        <EverfreshConservation />

        <EverfreshCharacteristics />

      </Container>
    </>
  );
};

export default EverfreshHome;
