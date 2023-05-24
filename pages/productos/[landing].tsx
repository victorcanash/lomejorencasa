import { useMemo } from 'react';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { PageTypes } from '@core/constants/navigation';
import { getLandingConfigByPath } from '@core/utils/products';

import { allLandingConfigs } from '@lib/constants/products';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import usePage from '@lib/hooks/usePage';
import useFacebook from '@lib/hooks/useFacebook';
import PageHeader from '@components/ui/PageHeader';
import LandingDetail from '@components/products/detail';

type LandingPageProps = {
  path: string,
};

const LandingPage: NextPage<LandingPageProps> = (props) => {
  const { path } = props;

  const { getLandingByPath } = useProductsContext();

  const page = usePage();

  const { sendViewContentEvent } = useFacebook();

  const data = useMemo(() => {
    const landingModel = getLandingByPath(path);
    const landingConfig = getLandingConfigByPath(path, allLandingConfigs);
    if (landingModel?.name) {
      sendViewContentEvent(landingModel);
    }
    return {
      landingModel,
      landingConfig,
    };
  }, [getLandingByPath, path, sendViewContentEvent]);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleAdd: data.landingConfig?.metas.title || path,
          descriptionAdd: data.landingConfig?.metas.title || path,
        }}
        marginTop={true}
      />

      { (data.landingModel && data.landingConfig) &&
        <LandingDetail 
          landingModel={data.landingModel}
          landingConfig={data.landingConfig}
        />
      }
    </>
  );
};

export default LandingPage;

interface ILandingPageParams extends ParsedUrlQuery {
  landing: string
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allLandingConfigs.map((landingConfig) => {
    return {
      params: {
        landing: landingConfig.path,
      } as ILandingPageParams,
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  const { landing } = context.params as ILandingPageParams;
  return {
    props: {
      path: landing,
    } as LandingPageProps,
  };
};
