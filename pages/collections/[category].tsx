import type { NextPage } from 'next';
import Head from 'next/head';

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

  const page = usePage();

  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search page" />
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
