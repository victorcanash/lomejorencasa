import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useIntl, FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { AddressTypes } from '@core/constants/addresses'
import type { Order } from '@core/types/orders';
import type { UserAddress } from '@core/types/user';

//import CartDetail from '@components/cart/CartDetail';
import AddressDetail from '@components/addresses/AddressDetail';
import BackBtn from '@components/ui/BackBtn';

type OrderDetailProps = {
  order: Order,
  backBtn: boolean,
  onClickBack?: () => void,
};

const OrderDetail = (props: OrderDetailProps) => {
  const { order, backBtn, onClickBack } = props;

  const router = useRouter();
  const intl = useIntl();

  const convertToDate = useCallback((date: Date | string) => {
    return new Date(date).toLocaleDateString(router.locale)
  }, [router.locale]);

  return (
    <>
      <Typography component="div" variant="h3">
        {`${intl.formatMessage({ id: "orderDetail.number" })}: ${order.bigbuyId}`}
      </Typography>

      <Typography component="div" variant="body1Head" mt={3}>
        {`${intl.formatMessage({ id: "orderDetail.status" })}: ${order.bigbuy.status}`}
      </Typography>

      <Typography component="div" variant="body1Head" mt={3}>
        {`${intl.formatMessage({ id: "orderDetail.date" })}: ${convertToDate(order.createdAt)}`}
      </Typography>

      { order.transaction.creditCard.cardType != '' &&
        <Typography component="div" variant="body1Head" mt={3}>
          <FormattedMessage 
            id="orderDetail.paidCard" 
            values={{
              cardType: order.transaction.creditCard.cardType,
              last4: order.transaction.creditCard.last4,
            }}
          />
        </Typography>
      }
      { order.transaction.paypalAccount.payerEmail != '' &&
        <Typography component="div" variant="body1Head" mt={3}>
          <FormattedMessage 
            id="orderDetail.paidPaypal" 
            values={{
              payerEmail: order.transaction.paypalAccount.payerEmail,
            }}
          />
        </Typography>
      }

      <Grid container mt={3}>
        <Grid item xs={6}>
          <AddressDetail 
            address={{
              id: 0,
              userId: 0,
              type: AddressTypes.shipping,
              firstName: order.bigbuy.shippingAddress.firstName,
              lastName: order.bigbuy.shippingAddress.lastName,
              addressLine1: order.bigbuy.shippingAddress.address,
              addressLine2: undefined,
              postalCode: order.bigbuy.shippingAddress.postcode,
              locality: order.bigbuy.shippingAddress.town,
              country: order.bigbuy.shippingAddress.country,
            } as UserAddress}
          />
        </Grid>
        { order.transaction.billing.addressLine1 != '' &&
          <Grid item xs={6}>
            <AddressDetail 
              address={{
                id: 0,
                userId: 0,
                type: AddressTypes.billing,
                firstName: order.transaction.billing.firstName,
                lastName: order.transaction.billing.lastName,
                addressLine1: order.transaction.billing.addressLine1,
                addressLine2: order.transaction.billing.addressLine2,
                postalCode: order.transaction.billing.postalCode,
                locality: order.transaction.billing.locality,
                country: order.transaction.billing.country,
              } as UserAddress}
            />
          </Grid>
        }
      </Grid>

      <Typography component="div" variant="body1Head" mt={3}>
        {`${intl.formatMessage({ id: "orderDetail.products" })}:`}
      </Typography>
      {/*<CartDetail
        items={order.items || []}
        totalPrice={Number(order.transaction.amount)}
        showEmptyItems={true}
      />*/}

      { backBtn &&
        <Grid
          container
          sx={{
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
          }}
          mt={4}
        >
          <Grid item>
            <BackBtn onClick={onClickBack} />
          </Grid>
        </Grid>
      }
    </>
  );
};

export default OrderDetail;
