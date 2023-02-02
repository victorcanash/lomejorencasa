import type { NextPage } from 'next';

import { PageTypes } from '@core/constants/navigation';
import { ProductProps, getProductProps } from '@lib/server/product';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import ProductDetail from '@components/products/ProductDetail';

const Product: NextPage<ProductProps> = (props) => {
  const { product } = props;

  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: product.name.current,
          descriptionId: 'productDetail.metas.description',
        }}
        marginTop={true}
      />

      <ProductDetail product={product} />
    </>
  );
}

export default Product;

export const getServerSideProps = getProductProps;
