import { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';

import { Order } from '@core/types/orders';
import CreateFailedOrderForm from '@components/forms/orders/CreateFailedOrderForm';
import OrderDetail from '@components/orders/OrderDetail';

const CreateFailedOrderSection = () => {
  const [order, setOrder] = useState<undefined | Order>(undefined)
  const [created, setCreated] = useState(false)

  const onSuccessCreate = (order?: Order) => {
    setOrder(order);
    setCreated(true);
  };

  return (
    <>   
      { !created ?     
        <CreateFailedOrderForm
          onSubmitSuccess={onSuccessCreate}
        />
        :
        <>
          { order ?
            <OrderDetail 
              order={order} 
              backBtn={false}
            />
            :
            <Typography variant="h5" component="h1">
              <FormattedMessage
                id="forms.createFailedOrder.createdWithoutEmail"
              />
            </Typography>
          }
        </>
      }
    </>
  );
};

export default CreateFailedOrderSection;
