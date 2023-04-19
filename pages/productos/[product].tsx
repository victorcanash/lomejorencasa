import { useState, useEffect, useCallback } from 'react';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { PageTypes } from '@core/constants/navigation';
import type { Product } from '@core/types/products';

import { allProductSlugs, productSlugs } from '@lib/constants/products';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ProductDetail from '@components/products/detail';
import seoConfig from '@lib/constants/seo';

type ProductProps = {
  slug: string,
};

const Product: NextPage<ProductProps> = (props) => {
  const { slug } = props;

  const { everfreshProduct, bagsProduct } = useProductsContext();

  const page = usePage();

  const [product, setProduct] = useState<Product | undefined>(undefined);

  const getMetaTitle = useCallback(() => {
    if (slug === productSlugs.bags) {
      return seoConfig.keywords.bags.main
    } else {
      return seoConfig.keywords.vacuumMachine.main
    }
  }, [slug]);

  useEffect(() => {
    if (slug === productSlugs.bags) {
      setProduct(bagsProduct);
    } else {
      setProduct(everfreshProduct);
    }
  }, [bagsProduct, everfreshProduct, slug]);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleAdd: getMetaTitle(),
          descriptionId: getMetaTitle(),
        }}
        marginTop={true}
      />

      { product &&
        <ProductDetail 
          product={product}
        />
      }
    </>
  );
};

export default Product;

interface IParams extends ParsedUrlQuery {
  slug: string
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allProductSlugs.map((slug) => {
      return {
        params: {
          slug,
        },
      };
  });
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  const { slug } = context.params as IParams
  return {
    props: {
      slug: slug,
    } as ProductProps,
  };
};
