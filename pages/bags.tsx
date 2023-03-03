import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import { useProductsContext } from '@lib/contexts/ProductsContext';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ProductDetail from '@components/products/detail';

const Bags: NextPage = () => {
  const { bagsProduct } = useProductsContext();

  const page = usePage();
  
  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'bags.metas.title',
          descriptionId: 'bags.metas.description',
        }}
        marginTop={true}
      />

      { bagsProduct &&
        <ProductDetail 
          product={bagsProduct}
        />
      }
    </>
  );
};

export default Bags;
