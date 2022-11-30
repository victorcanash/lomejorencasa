import { useState } from 'react';

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
              Order created successfully but an error was occurred sending the order check email
            </Typography>
          }
        </>
      }
    </>
  );
};

export default CreateFailedOrderSection;
