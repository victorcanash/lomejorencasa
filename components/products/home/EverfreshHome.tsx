import Container from '@mui/material/Container';

import HomeBanner from '@components/products/sections/HomeBanner';
import HomeIntro from '@components/products/sections/HomeIntro';
import HomePackingMachine from '@components/products/sections/HomePackingMachine';
import HomeWhatIsVacuumPacked from '@components/products/sections/HomeWhatIsVacuumPacked';
import HomeWhyVacuumPacked from '@components/products/sections/HomeWhyVacuumPacked';
import HomeAdvantagesVacuumPacked from '@components/products/sections/HomeAdvantagesVacuumPacked';
import HomeUse from '@components/products/sections/HomeUse';
import HomeFoodStorage from '@components/products/sections/HomeFoodStorage';
import HomeConservation from '@components/products/sections/HomeConservation';
import EverfreshCharacteristics from '@components/products/ui/everfresh/EverfreshCharacteristics';

const EverfreshHome = () => {

  return (
    <>
      <HomeBanner />

      <HomeIntro />

      <HomePackingMachine />

      <HomeWhatIsVacuumPacked />

      <HomeWhyVacuumPacked />

      <HomeAdvantagesVacuumPacked />

      <HomeUse />

      <HomeFoodStorage />

      <HomeConservation />

      <EverfreshCharacteristics />

    </>
  );
};

export default EverfreshHome;
