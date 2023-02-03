import { useIntl, FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { AddressTypes } from '@core/constants/addresses'
import type { Order } from '@core/types/orders';
import type { UserAddress } from '@core/types/user';

import CartDetail from '@components/cart/CartDetail';
import AddressDetail from '@components/checkout/details/AddressDetail';
import GoBackBtn from '@components/ui/GoBackBtn';

type OrderDetailProps = {
  order: Order,
  backBtn: boolean,
};

const OrderDetail = (props: OrderDetailProps) => {
  const { order, backBtn } = props;

  const intl = useIntl();

  return (
    <>
      <Typography component="h1" variant="h1" className='animate__animated animate__fadeInLeft' mb={1}>
        {`${intl.formatMessage({ id: "orderDetail.number" })}: ${order.id}`}
      </Typography>

      <Typography component="div" variant="body1" pt={2}>
        {`${intl.formatMessage({ id: "orderDetail.status" })}: ${order.bigbuy.status}`}
      </Typography>

      <Grid container spacing={1} py={3}>
        <Grid item xs={12} sm={6}>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: "orderDetail.date" })}: ${new Date(order.createdAt).toLocaleDateString()}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          { order.braintree.creditCard.cardType != '' &&
            <Typography component="div" variant="body1">
              <FormattedMessage 
                id="orderDetail.paidCard" 
                values={{
                  cardType: order.braintree.creditCard.cardType,
                  last4: order.braintree.creditCard.last4,
                }}
              />
            </Typography>
          }
          { order.braintree.paypalAccount.payerEmail != '' &&
            <Typography component="div" variant="body1">
              <FormattedMessage 
                id="orderDetail.paidPaypal" 
                values={{
                  payerEmail: order.braintree.paypalAccount.payerEmail,
                }}
              />
            </Typography>
          }
        </Grid>
      </Grid>

      <Grid container spacing={1} pb={3}>
        <Grid item xs={6}>
          <Typography component="div" variant="body1">
            <FormattedMessage 
              id="forms.shipping" 
            />
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
            <Typography component="div" variant="body1">
              <FormattedMessage 
                id="forms.billing" 
              />
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

      <Typography component="div" variant="body1" mb={2}>
        {`${intl.formatMessage({ id: "orderDetail.products" })}:`}
      </Typography>
      <CartDetail
        items={order.bigbuy.products}
        totalPrice={Number(order.braintree.amount)}
        showEmptyItems={true}
      />

      { backBtn &&
        <Grid
          container
          sx={{
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
          }}
          mt={3}
        >
          <Grid item>
            <GoBackBtn />
          </Grid>
        </Grid>
      }
    </>
  );
};

export default OrderDetail;
