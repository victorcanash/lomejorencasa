import { useState } from 'react';

import Typography from '@mui/material/Typography';

import type { Order } from '@core/types/orders';

import SendOrderEmailForm from '@core/components/forms/admin/SendOrderEmailForm';
import OrderDetail from '@components/orders/OrderDetail';

const SendOrderEmailSection = () => {
  const [order, setOrder] = useState<undefined | Order>(undefined)
  const [sent, setSent] = useState(false)

  const onSuccessCreate = (order: Order) => {
    setOrder(order);
    setSent(true);
  };

  return (
    <>   
      { !sent ?     
        <SendOrderEmailForm
          onSubmitSuccess={onSuccessCreate}
        />
        :
        <>
          { (order?.transaction && order?.bigbuy) ?
            <OrderDetail
              order={order}
              backBtn={false}
            />
            :
            <Typography component="div" variant="h3" mb={3}>
              {'Success'}
            </Typography>
          }
        </>
      }
    </>
  );
};

export default SendOrderEmailSection;
