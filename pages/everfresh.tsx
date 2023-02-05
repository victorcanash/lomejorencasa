import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';

import { EverfreshProps, getEverfreshProps } from '@lib/server/everfresh';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ProductDetail from '@components/products/detail';

const Everfresh: NextPage<EverfreshProps> = (props) => {
  const { product } = props;

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

      <ProductDetail product={product} />
    </>
  );
}

export default Everfresh;

export const getServerSideProps = getEverfreshProps;
