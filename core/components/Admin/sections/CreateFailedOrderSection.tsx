import { useState } from 'react'

import { FormattedMessage } from 'react-intl'

import Typography from '@mui/material/Typography'

import type { Order } from '@core/types/orders'

import CreateFailedOrderForm from '@core/components/forms/admin/CreateFailedOrderForm'
import OrderDetail from '@core/components/Orders/OrderDetail'

const CreateFailedOrderSection = () => {
  const [order, setOrder] = useState<undefined | Order>(undefined)
  const [created, setCreated] = useState(false)

  const onSuccessCreate = (order?: Order) => {
    setOrder(order)
    setCreated(true)
  }

  return (
    <>
      { !created
        ? <CreateFailedOrderForm
          onSubmitSuccess={onSuccessCreate}
        />
        : <>
          { (order != null)
            ? <OrderDetail
              order={order}
              backBtn={false}
            />
            : <Typography variant="h1" component="h1">
              <FormattedMessage
                id="forms.createFailedOrder.createdWithoutEmail"
              />
            </Typography>
          }
        </>
      }
    </>
  )
}

export default CreateFailedOrderSection
