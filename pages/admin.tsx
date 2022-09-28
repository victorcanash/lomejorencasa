import type { NextPage } from 'next';
import Head from "next/head";

import { CollectionProps, getCollectionProps } from '@lib/server/collection';
import { useAppContext } from '@lib/contexts/AppContext';
import usePage from '@lib/hooks/usePage';
import ProductListAdmin from '@components/admin/ProductListAdmin';

const Admin: NextPage<CollectionProps> = (props) => {
  const { 
    products, 
    currentPage, 
    totalPages, 
    productCategory,  
    keywords 
  } = props;

  const { loading } = useAppContext();

  const page = usePage();

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Admin page" />
      </Head>

      {
        !loading &&
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

export default Admin;

export const getServerSideProps = getCollectionProps;
