import type { NextPage } from 'next';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';

import { CollectionProps, getCollectionProps } from '@lib/server/collection';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
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
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'productList.metas.title',
          descriptionId: 'productList.metas.description',
        }}
        marginTop={true}
      />

      <Container>
        <ProductList 
          category={productCategory}
          products={products} 
          totalPages={totalPages}
          currentPage={currentPage}
          keywords={keywords}
        />
      </Container>
    </>
  );
};

export default Search;

export const getServerSideProps = getCollectionProps;
