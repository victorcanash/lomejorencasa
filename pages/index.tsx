import type { NextPage } from 'next';

import Box from '@mui/material/Box';

import { PageTypes } from '@core/constants/navigation';

import { keywords } from '@lib/config/next-seo.config';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import HomeBanner from '@components/products/sections/HomeBanner';
import LandingList from '@components/products/collection/LandingList';
import DetailReviews from '@components/products/sections/DetailReviews';

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
        <HomeBanner />
        <LandingList />
        <DetailReviews />
      </Box>
    </>
  );
};

export default Home;
