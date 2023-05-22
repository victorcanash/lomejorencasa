import Box from '@mui/material/Box';

import Intro from '@components/blogs/vacuum/sections/Intro';
import PackingMachine from '@components/blogs/vacuum/sections/PackingMachine';
import WhatIsVacuumPacked from '@components/blogs/vacuum/sections/WhatIsVacuumPacked';
import WhyVacuumPacked from '@components/blogs/vacuum/sections/WhyVacuumPacked';
import Characteristics from '@components/blogs/vacuum/sections/Characteristics';
import Use from '@components/blogs/vacuum/sections/Use';
import FoodStorage from '@components/blogs/vacuum/sections/FoodStorage';
import Conservation from '@components/blogs/vacuum/sections/Conservation';
import ProductReviews from '@components/products/sections/ProductReviews';

const VacuumBlog = () => {

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
      />

      <Use />

      <FoodStorage />

      <Conservation />

      <Characteristics
        type="characteristics"
      />

      <ProductReviews />
    </Box>
  );
};

export default VacuumBlog;
