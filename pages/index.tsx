import type { NextPage } from 'next';

import Box from '@mui/material/Box';

import { PageTypes } from '@core/constants/navigation';

import { keywords } from '@lib/config/next-seo.config';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ProductBanner from '@components/products/sections/ProductBanner';
import LandingList from '@components/products/collection/LandingList';
import ProductReviews from '@components/products/sections/ProductReviews';

const Home: NextPage = () => {
  const _page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleAdd: keywords.vacuumMachine.main,
          descriptionAdd: keywords.vacuumMachine.main,
        }}
      />

      <Box 
        sx={{
          overflow: 'hidden',
        }}
      >
        <ProductBanner />
        <LandingList />
        <ProductReviews />
      </Box>
    </>
  );
};

export default Home;
