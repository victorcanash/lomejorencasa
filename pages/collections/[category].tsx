import type { NextPage } from 'next';
import Head from 'next/head';

import usePage from '@lib/hooks/usePage';
import useProductCategory from '@lib/hooks/useProductCategory';
import { CollectionProps, getCollectionProps } from '@lib/server/collection';
import ProductList from '@components/product/ProductList';

const Search: NextPage<CollectionProps> = (props) => {
  const { 
    products, 
    currentPage, 
    totalPages, 
    categoryName, 
    sortBy, 
    order, 
    keywords 
  } = props;

  const page = usePage();

  const productCategory = useProductCategory(categoryName);

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
      />
    </>
  );
};

export default Search;

export const getServerSideProps = getCollectionProps;
