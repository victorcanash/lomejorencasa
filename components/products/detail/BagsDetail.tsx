import { bagsProductId } from '@lib/constants/products';
import ProductCharacteristics from '@components/products/sections/ProductCharacteristics';
import ProductReviews from '@components/products/sections/ProductReviews';

const BagsDetail = () => {

  return (
    <>
      <ProductCharacteristics
        productId={bagsProductId}
      />

      <ProductReviews />
    </>
  );
};

export default BagsDetail;
