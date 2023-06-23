import type { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

import type { Landing } from '@core/types/products';
import { getAllLandings, getLanding } from '@core/utils/products';

export type LandingPageProps = {
  landing: Landing,
};

interface ILandingPageParams extends ParsedUrlQuery {
  landing: string
};

export const getLandingStaticPaths: GetStaticPaths = async () => {
  let landings: Landing[] = [];
  await getAllLandings()
    .then((response) => {
      landings = response.landings;
    })
    .catch((error) => {
      throw error;
    });

  const paths = landings.map((landing) => {
    return {
      params: {
        landing: landing.slug,
      } as ILandingPageParams,
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getLandingStaticProps: GetStaticProps = async (context) => {
  const { landing: slug } = context.params as ILandingPageParams;

  let landing: Landing = {} as Landing;
  await getLanding(slug)
    .then((response) => {
      landing = response.landing;
    })
    .catch((error) => {
      throw error;
    });

  return {
    props: {
      landing: landing,
    } as LandingPageProps,
  };
};
