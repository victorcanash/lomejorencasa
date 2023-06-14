import type { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { categoryConfigs } from '@lib/config/inventory.config';
import { pages } from '@lib/config/navigation.config';

export type CategoryPageProps = {
  path: string,
};

interface ICategoryPageParams extends ParsedUrlQuery {
  category: string
};

export const getCategoryStaticPaths: GetStaticPaths = () => {
  const splitAllPath = pages.collectionsAll.path.split('/');
  const allSubpath = splitAllPath[splitAllPath.length - 1];

  const paths = categoryConfigs.map((categoryConfig) => {
    return {
      params: {
        category: categoryConfig.path,
      } as ICategoryPageParams,
    };
  }).concat({
    params: {
      category: allSubpath,
    }
  });

  return {
    paths,
    fallback: false,
  };
};

export const getCategoryStaticProps: GetStaticProps = (context) => {
  const { category } = context.params as ICategoryPageParams;
  return {
    props: {
      path: category,
    } as CategoryPageProps,
  };
};
