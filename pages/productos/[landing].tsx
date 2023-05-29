import type { NextPage } from 'next';

import {
  LandingPageProps,
  getLandingStaticPaths,
  getLandingStaticProps,
} from '@core/staticPages/landing';
import { PageTypes } from '@core/constants/navigation';
import PageHeader from '@core/components/pages/PageHeader';

import usePage from '@core/hooks/usePage';
import useLandingPage from '@core/hooks/useLandingPage';
import Landing from '@components/Landing';

const LandingPage: NextPage<LandingPageProps> = (props) => {
  const { path } = props;

  const page = usePage();
  const { landingModel, landingConfig } = useLandingPage(path);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleAdd: landingConfig?.metas.title || path,
          descriptionAdd: landingConfig?.metas.title || path,
        }}
        marginTop={true}
      />

      { (landingModel && landingConfig) &&
        <Landing 
          landingModel={landingModel}
          landingConfig={landingConfig}
        />
      }
    </>
  );
};

export default LandingPage;

export const getStaticPaths = getLandingStaticPaths;

export const getStaticProps = getLandingStaticProps;
