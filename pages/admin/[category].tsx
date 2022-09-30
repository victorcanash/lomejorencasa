import type { NextPage } from 'next';
import Head from 'next/head';

import { CollectionProps, getCollectionProps } from '@lib/server/collection';
import usePage from '@lib/hooks/usePage';
import ProductListAdmin from '@components/admin/lists/ProductListAdmin';

const AdminSearch: NextPage<CollectionProps> = (props) => {
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
        <title>Admin search</title>
        <meta name="description" content="Admin search page" />
      </Head>

      {
        page.checked &&
          <ProductListAdmin 
            category={productCategory}
            products={products} 
            totalPages={totalPages}
            currentPage={currentPage}
            keywords={keywords}
          />
      }
    </>
  );
};

export default AdminSearch;

export const getServerSideProps = getCollectionProps;
