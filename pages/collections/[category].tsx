import type { NextPage } from 'next';
import Head from 'next/head';

import { useIntl } from 'react-intl';

import { CollectionProps, getCollectionProps } from '@lib/server/collection';
import usePage from '@lib/hooks/usePage';
import ProductList from '@components/products/ProductList';

const Search: NextPage<CollectionProps> = (props) => {
  const { 
    products, 
    currentPage, 
    totalPages, 
    productCategory,  
    keywords 
  } = props;

  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'productList.metas.title' });
  const description = intl.formatMessage({ id: 'productList.metas.description' });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <ProductList 
        category={productCategory}
        products={products} 
        totalPages={totalPages}
        currentPage={currentPage}
        keywords={keywords}
      />
    </>
  );
};

export default Search;

export const getServerSideProps = getCollectionProps;
