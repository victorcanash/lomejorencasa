import { useProductsContext } from '@lib/contexts/ProductsContext';
import DetailCharacteristics from '@components/products/sections/DetailCharacteristics';
import DetailReviews from '@components/products/sections/DetailReviews';

const BagsDetail = () => {
  const { bagsProduct } = useProductsContext();

  return (
    <>
      { bagsProduct &&
        <>
          <DetailCharacteristics
            product={bagsProduct}
          />

          <DetailReviews />
        </>
      }
    </>
  );
};

export default BagsDetail;
