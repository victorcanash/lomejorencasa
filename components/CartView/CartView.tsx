import Container from '@mui/material/Container';

import { pages } from '@lib/config/navigation.config';
import CartDetail from '@core/components/CartDetail';

const CartView = () => {

  return (
    <Container>
      <CartDetail
        page={pages.cart}
      />
    </Container>
  );
};

export default CartView;
