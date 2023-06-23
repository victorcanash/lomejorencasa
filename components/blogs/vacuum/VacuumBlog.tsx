import Box from '@mui/material/Box';

import { VacuumBlogPageProps } from '@core/staticPages/vacuumBlog';

import Intro from './sections/Intro';
import PackingMachine from './sections/PackingMachine';
import WhatIsVacuumPacked from './sections/WhatIsVacuumPacked';
import WhyVacuumPacked from './sections/WhyVacuumPacked';
import Characteristics from './sections/Characteristics';
import Use from './sections/Use';
import FoodStorage from './sections/FoodStorage';
import Conservation from './sections/Conservation';

type VacuumBlogProps = {
  pageProps: VacuumBlogPageProps,
}

const VacuumBlog = (props: VacuumBlogProps) => {
  const {
    pageProps,
  } = props;

  return (
    <Box 
      sx={{
        overflow: 'hidden',
      }}
    >
      <Intro />

      <PackingMachine />

      <WhatIsVacuumPacked />

      <WhyVacuumPacked />

      <Characteristics
        type="advantages"
        landingVacuumMachine={pageProps.landingVacuumMachine}
      />

      <Use
        landingVacuumBags={pageProps.landingVacuumBags}
      />

      <FoodStorage />

      <Conservation />

      <Characteristics
        type="characteristics"
        landingVacuumMachine={pageProps.landingVacuumMachine}
      />
    </Box>
  );
};

export default VacuumBlog;
