import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';
import { capitalizeFirstLetter } from '@core/utils/strings';

import { CollectionProps, getCollectionProps } from '@core/serverPages/collection';
import usePage from '@core/hooks/usePage';
import PageHeader from '@core/components/pages/PageHeader';
//import ProductList from '@components/products/collection';

const Search: NextPage<CollectionProps> = (props) => {
  const { 
    //products, 
    //currentPage, 
    //totalPages, 
    productCategory,  
    //keywords 
  } = props;

  const _page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'productList.metas.title',
          descriptionId: 'productList.metas.description',
        }}
        marginTop={true}
        texts={{
          title: {
            id: productCategory?.name ? undefined : 'productList.allCategories',
          },
          titleAdd: productCategory?.name ? capitalizeFirstLetter(productCategory.name.current) : undefined,
        }}
      />

      {/*<ProductList 
        category={productCategory}
        products={products} 
        totalPages={totalPages}
        currentPage={currentPage}
        keywords={keywords}
      />*/}
    </>
  );
};

export default Search;

export const getServerSideProps = getCollectionProps;
