import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import { useProductsContext } from '@lib/contexts/ProductsContext';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ProductDetail from '@components/products/detail';

const Everfresh: NextPage = () => {
  const { everfreshProduct } = useProductsContext();

  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'everfresh.metas.title',
          descriptionId: 'everfresh.metas.description',
        }}
        marginTop={true}
      />

      <ProductDetail 
        product={everfreshProduct}
      />
    </>
  );
};

export default Everfresh;
