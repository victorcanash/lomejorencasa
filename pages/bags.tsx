import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import { BagProps, getBagProps } from '@lib/server/bag';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ProductDetail from '@components/products/detail';

const Bags: NextPage<BagProps> = (props) => {
  const { product } = props;

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

      <ProductDetail product={product} />
    </>
  );
}

export default Bags;

export const getServerSideProps = getBagProps;
