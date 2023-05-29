import type { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { landingConfigs } from '@lib/config/inventory.config';

export type LandingPageProps = {
  path: string,
};

interface ILandingPageParams extends ParsedUrlQuery {
  landing: string
};

export const getLandingStaticPaths: GetStaticPaths = () => {
  const paths = landingConfigs.map((landingConfig) => {
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

export const getLandingStaticProps: GetStaticProps = (context) => {
  const { landing } = context.params as ILandingPageParams;
  return {
    props: {
      path: landing,
    } as LandingPageProps,
  };
};
