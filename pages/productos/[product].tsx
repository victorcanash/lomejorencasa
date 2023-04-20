import { useMemo } from 'react';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { PageTypes } from '@core/constants/navigation';
import type { Product } from '@core/types/products';

import { allProductPaths, productPaths } from '@lib/constants/products';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ProductDetail from '@components/products/detail';
import seoConfig from '@lib/constants/seo';

type ProductProps = {
  path: string,
};

const Product: NextPage<ProductProps> = (props) => {
  const { path } = props;

  const { everfreshProduct, bagsProduct } = useProductsContext();

  const _page = usePage();

  const product = useMemo(() => {
    if (path === productPaths.bags) {
      return bagsProduct;
    }
    return everfreshProduct;
  }, [bagsProduct, everfreshProduct, path]);

  const metaTitle = useMemo(() => {
    if (path === productPaths.bags) {
      return seoConfig.keywords.bags.main
    }
    return seoConfig.keywords.vacuumMachine.main;
  }, [path]);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleAdd: metaTitle,
          descriptionAdd: metaTitle,
        }}
        marginTop={true}
      />

      <ProductDetail 
        product={product}
      />
    </>
  );
};

export default Product;

interface IParams extends ParsedUrlQuery {
  product: string
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allProductPaths.map((path) => {
      return {
        params: {
          product: path,
        },
      };
  });
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  const { product } = context.params as IParams
  return {
    props: {
      path: product,
    } as ProductProps,
  };
};
