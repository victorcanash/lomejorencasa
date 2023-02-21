import { bagsProductId } from '@lib/constants/products';
import DetailCharacteristics from '@components/products/sections/DetailCharacteristics';
import DetailReviews from '@components/products/sections/DetailReviews';

const BagsDetail = () => {

  return (
    <>
      <DetailCharacteristics
        productId={bagsProductId}
      />

      <DetailReviews />
    </>
  );
};

export default BagsDetail;
