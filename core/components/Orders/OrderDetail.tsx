import { useRouter } from 'next/router'
import { useIntl, FormattedMessage } from 'react-intl'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { AddressTypes, type CountryOptions } from '@core/constants/addresses'
import type { Order } from '@core/types/orders'
import { convertToDate } from '@core/utils/dates'
import LinkButton from '@core/components/inputs/LinkButton'
import Button from '@core/components/inputs/Button'

import { pages } from '@lib/config/navigation.config'
import AddressDetail from '@core/components/AddressDetail'
import CartDetail from '@core/components/CartDetail'

interface OrderDetailProps {
  order: Order
  backBtn: boolean
  onClickBack?: () => void
}

const OrderDetail = (props: OrderDetailProps) => {
  const { order, backBtn, onClickBack } = props

  const router = useRouter()
  const intl = useIntl()

  return (
    <>
      {/* Order General Info */}
      <Typography component="div" variant="h3" mb={2}>
        {`${intl.formatMessage({ id: 'orders.detail.number' })}: ${order.bigbuyId}`}
      </Typography>
      <Typography component="div" variant="body1Head" mb={3}>
        {`${intl.formatMessage({ id: 'orders.detail.date' })}: ${convertToDate(order.createdAt, router.locale)}`}
      </Typography>
      <Typography component="div" variant="h3" mb={2}>
        {`${intl.formatMessage({ id: 'orders.detail.status' })}: ${order.bigbuy.tracking?.statusDescription ?? order.bigbuy.status.toUpperCase()}`}
      </Typography>
      {/* Order Tracking */}
      { ((order.bigbuy.tracking?.trackingNumber) != null)
        ? <LinkButton
          customtype="actionPrimary"
          href={`https://s.correosexpress.com/c?n=${order.bigbuy.tracking.trackingNumber}`}
          target="_blank"
          sx={{
            py: 1,
            mb: 2
          }}
        >
          <FormattedMessage id="orders.detail.correosBtn" />
        </LinkButton>
        : <Typography component="div" variant="body1Head" mb={2}>
          {`${intl.formatMessage({ id: 'orders.detail.noTrackingYet' })}`}
        </Typography>
      }
      {/* Order Payment Info */}
      { order.transaction.creditCard.cardType !== '' &&
        <Typography component="div" variant="body1Head" mb={2}>
          <FormattedMessage
            id="orders.detail.paidCard"
            values={{
              cardType: order.transaction.creditCard.cardType,
              last4: order.transaction.creditCard.last4
            }}
          />
        </Typography>
      }
      { order.transaction.paypalAccount.payerEmail !== '' &&
        <Typography component="div" variant="body1Head" mb={2}>
          <FormattedMessage id="orders.detail.paidPaypal" />
          <Box pl={0.5}>
            <Typography component="div" variant="body1">
              { order.transaction.paypalAccount.payerEmail }
            </Typography>
          </Box>
        </Typography>
      }
      {/* Order Addresses Info */}
      <Grid container mb={3}>
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
              country: order.bigbuy.shippingAddress.country as CountryOptions
            }}
          />
        </Grid>
        { order.transaction.billing.addressLine1 !== '' &&
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
                country: order.transaction.billing.country as CountryOptions
              }}
            />
          </Grid>
        }
      </Grid>
      {/* Order Products Info */}
      <Typography component="div" variant="h3" mb={3}>
        {`${intl.formatMessage({ id: 'orders.detail.products' })}:`}
      </Typography>
      <CartDetail
        page={pages.orders}
        order={order}
      />
      {/* Back Button */}
      { backBtn &&
        <Grid
          container
          sx={{
            flexWrap: 'nowrap',
            justifyContent: 'space-between'
          }}
          mt={6}
        >
          <Grid item>
            <Button customtype="back" onClick={onClickBack} />
          </Grid>
        </Grid>
      }
    </>
  )
}

export default OrderDetail
