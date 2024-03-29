import { useState } from 'react';

import type { Order } from '@core/types/orders';

import SendFailedOrderEmailForm from '@core/components/forms/admin/SendFailedOrderEmailForm';
import OrderDetail from '@core/components/Orders/OrderDetail';

const SendFailedOrderEmailSection = () => {
  const [order, setOrder] = useState<undefined | Order>(undefined)
  const [sent, setSent] = useState(false)

  const onSuccessCreate = (order: Order) => {
    setOrder(order);
    setSent(true);
  };

  return (
    <>   
      { !sent ?     
        <SendFailedOrderEmailForm
          onSubmitSuccess={onSuccessCreate}
        />
        :
        <>
          { order &&
            <OrderDetail 
              order={order} 
              backBtn={false}
            />
          }
        </>
      }
    </>
  );
};

export default SendFailedOrderEmailSection;
