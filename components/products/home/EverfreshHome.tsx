import Container from '@mui/material/Container';

import HomeBanner from '@components/products/sections/HomeBanner';
import HomeIntro from '@components/products/sections/HomeIntro';
import HomePackingMachine from '@components/products/sections/HomePackingMachine';
import HomeWhatIsVacuumPacked from '@components/products/sections/HomeWhatIsVacuumPacked';
import HomeWhyVacuumPacked from '@components/products/sections/HomeWhyVacuumPacked';
import HomeAdvantagesVacuumPacked from '@components/products/sections/HomeAdvantagesVacuumPacked';
import EverfreshUse from '@components/products/ui/everfresh/EverfreshUse';
import EverfreshConservation from '@components/products/ui/everfresh/EverfreshConservation';
import EverfreshCharacteristics from '@components/products/ui/everfresh/EverfreshCharacteristics';

const EverfreshHome = () => {

  return (
    <>
      <HomeBanner />

      <Container>

        <HomeIntro />

        <HomePackingMachine />

        <HomeWhatIsVacuumPacked />

        <HomeWhyVacuumPacked />

        <HomeAdvantagesVacuumPacked />

        <EverfreshUse />

        <EverfreshConservation />

        <EverfreshCharacteristics />

      </Container>
    </>
  );
};

export default EverfreshHome;
