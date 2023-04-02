import Box from '@mui/material/Box';

import { pages } from '@lib/constants/navigation';
import useCart from '@lib/hooks/useCart';
import BaseForm from '@components/forms/BaseForm';
import CartDetail from '@components/cart/CartDetail';

const CheckoutOrderForm = () => {
  const { breakdown } = useCart();

  return (
    <BaseForm
      maxWidth="800px"
      initialValues={{}}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'checkout.order',
            textAlign: 'center',
          },
          extraElements:
            <Box mt={2}>
              <CartDetail
                page={pages.checkout}
                breakdown={breakdown}
                showEmptyItems={false}
              />
            </Box>
          ,
        }
      ]}
    />
  );
};

export default CheckoutOrderForm;
