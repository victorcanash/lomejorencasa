import Container from '@mui/material/Container';

import { bagsProductId } from '@lib/constants/products';
import DetailCharacteristics from '@components/products/sections/DetailCharacteristics';
import DetailReviews from '@components/products/sections/DetailReviews';

const BagsDetail = () => {

  return (
    <Container>
      <DetailCharacteristics
        productId={bagsProductId}
      />

      <DetailReviews />
    </Container>
  );
};

export default BagsDetail;
