import Box from '@mui/material/Box';

import HomeBanner from '@components/products/sections/HomeBanner';
import HomeIntro from '@components/products/sections/HomeIntro';
import HomePackingMachine from '@components/products/sections/HomePackingMachine';
import HomeWhatIsVacuumPacked from '@components/products/sections/HomeWhatIsVacuumPacked';
import HomeWhyVacuumPacked from '@components/products/sections/HomeWhyVacuumPacked';
import HomeCharacteristics from '@components/products/sections/HomeCharacteristics';
import HomeUse from '@components/products/sections/HomeUse';
import HomeFoodStorage from '@components/products/sections/HomeFoodStorage';
import HomeConservation from '@components/products/sections/HomeConservation';

const EverfreshHome = () => {

  return (
    <Box 
      sx={{
        overflow: 'hidden',
      }}
    >
      <HomeBanner />

      <HomeIntro />

      <HomePackingMachine />

      <HomeWhatIsVacuumPacked />

      <HomeWhyVacuumPacked />

      <HomeCharacteristics
        type="advantages"
      />

      <HomeUse />

      <HomeFoodStorage />

      <HomeConservation />

      <HomeCharacteristics
        type="characteristics"
      />
    </Box>
  );
};

export default EverfreshHome;
