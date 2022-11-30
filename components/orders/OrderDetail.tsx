import { Fragment } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { AddressTypes } from '@core/constants/addresses'
import { Order } from '@core/types/orders';
import { UserAddress } from '@core/types/user';
import OrderItemDetail from '@components/orders/OrderItemDetail';
import AddressDetail from '@components/checkout/details/AddressDetail';
import GoBackBtn from '@components/ui/GoBackBtn';

type OrderDetailProps = {
  order: Order,
  backBtn: boolean,
};

const OrderDetail = (props: OrderDetailProps) => {
  const { order, backBtn } = props;

  return (
    <>
      <Typography variant="h5" component="h1" className='animate__animated animate__fadeInLeft' mb={1}>
        {`Order number: ${order.id}`}
      </Typography>

      <Typography component="div" variant="subtitle1" pt={2}>
        {`Status: ${order.bigbuy.status}`}
      </Typography>

      <Grid container spacing={1} py={3}>
        <Grid item xs={12} sm={6}>
          <Typography component="div" variant="subtitle1">
            {`Order date: ${new Date(order.createdAt).toLocaleDateString()}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          { order.braintree.creditCard.cardType != '' &&
            <Typography component="div" variant="subtitle1">
              {`Paid with ${order.braintree.creditCard.cardType} ....${order.braintree.creditCard.last4}`}
            </Typography>
          }
          { order.braintree.paypalAccount.payerEmail != '' &&
            <Typography component="div" variant="subtitle1">
              {`Paid with Paypal ${order.braintree.paypalAccount.payerEmail}`}
            </Typography>
          }
        </Grid>
      </Grid>

      <Grid container spacing={1} pb={3}>
        <Grid item xs={6}>
          <Typography component="div" variant="subtitle1">
            Shipping address
          </Typography>
          <Box mt={1}>
            <AddressDetail 
              address={{
                id: 0,
                userId: 0,
                type: AddressTypes.SHIPPING,
                firstName: order.bigbuy.shipping.firstName,
                lastName: order.bigbuy.shipping.lastName,
                addressLine1: order.bigbuy.shipping.addressLine1,
                addressLine2: order.bigbuy.shipping.addressLine2,
                postalCode: order.bigbuy.shipping.postalCode,
                locality: order.bigbuy.shipping.locality,
                country: order.bigbuy.shipping.country,
              } as UserAddress}
              variant="body2"
            />
          </Box>
        </Grid>
        { order.braintree.billing.addressLine1 != '' &&
          <Grid item xs={6}>
            <Typography component="div" variant="subtitle1">
              Billing address
            </Typography>
            <Box mt={1}>
              <AddressDetail 
                address={{
                  id: 0,
                  userId: 0,
                  type: AddressTypes.BILLING,
                  firstName: order.braintree.billing.firstName,
                  lastName: order.braintree.billing.lastName,
                  addressLine1: order.braintree.billing.addressLine1,
                  addressLine2: order.braintree.billing.addressLine2,
                  postalCode: order.braintree.billing.postalCode,
                  locality: order.braintree.billing.locality,
                  country: order.braintree.billing.country,
                } as UserAddress}
                variant="body2"
              />
            </Box>
          </Grid>
        }
      </Grid>

      <Typography component="div" variant="subtitle1">
        Products:
      </Typography>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <Box mt={1} className='animate__animated animate__fadeIn'>
        {order.bigbuy.products.map((item) => (
          <Fragment key={item.id}>
            <OrderItemDetail 
              orderItem={item} 
            />
            <Divider sx={{ my: 3 }} />
          </Fragment>
        ))}
      </Box>
      
      <Typography
        component="div"
        variant='h6'
        align='right'
        className='animate__animated animate__fadeInUp'
      >
        Total: {Number(order.braintree.amount).toFixed(2)} €
      </Typography>

      { backBtn &&
        <GoBackBtn />
      }
    </>
  );
};

export default OrderDetail;
