import type { NextPage } from 'next';

import {
  LandingPageProps,
  getLandingStaticPaths,
  getLandingStaticProps,
} from '@core/staticPages/landing';
import { PageTypes } from '@core/constants/navigation';
import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
import LandingDetail from '@core/components/LandingDetail';

const LandingPage: NextPage<LandingPageProps> = (props) => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleAdd: props.landing.name.current,
          descriptionAdd: props.landing.description.current,
        }}
        marginTop={true}
      />

      <LandingDetail
        landing={props.landing}
      />
    </>
  );
};

export default LandingPage;

export const getStaticPaths = getLandingStaticPaths;

export const getStaticProps = getLandingStaticProps;
