import Box from '@mui/material/Box';

import { pages } from '@lib/config/navigation.config';
import BaseForm from '@core/components/forms/BaseForm';
import CartDetail from '@core/components/CartDetail';

const CheckoutOrderForm = () => {

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
              />
            </Box>
          ,
        }
      ]}
    />
  );
};

export default CheckoutOrderForm;
