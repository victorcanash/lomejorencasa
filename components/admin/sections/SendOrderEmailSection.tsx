import { useState } from 'react';

import type { Order } from '@core/types/orders';

import SendOrderEmailForm from '@components/forms/admin/SendOrderEmailForm';
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

export default SendOrderEmailSection;
