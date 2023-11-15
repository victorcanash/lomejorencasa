import { FormattedMessage, useIntl } from 'react-intl'

import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'

import type { ProductInventory } from '@core/types/products'
import Button from '@core/components/inputs/Button'

interface CheckProductInventoryDetailProps {
  index: number
  productInventory: ProductInventory
  creating?: boolean
  onClickRemoveBtn?: (index: number) => void
}

const CheckProductInventoryDetail = (props: CheckProductInventoryDetailProps) => {
  const {
    index,
    productInventory,
    creating,
    onClickRemoveBtn
  } = props

  const intl = useIntl()

  return (
    <>
      { !(creating ?? false) &&
        <>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.id' })}: ${productInventory.id}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.productId' })}: ${productInventory.productId}`}
          </Typography>
        </>
      }
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.sku' })}: ${productInventory.sku}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.en' })}: ${productInventory.name.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.es' })}: ${productInventory.name.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.en' })}: ${productInventory.description.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.es' })}: ${productInventory.description.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.price' })}: ${productInventory.price}`}
      </Typography>
      <Typography component="div" variant="body1">
          {`${intl.formatMessage({ id: 'forms.quantity' })}: ${productInventory.quantity}`}
      </Typography>
      <Typography component="div" variant="body1">
          {`${intl.formatMessage({ id: 'forms.image' })}: ${productInventory.image}`}
      </Typography>
      <Typography component="div" variant="body1">
          {`${intl.formatMessage({ id: 'forms.metaId' })}: ${productInventory.metaId}`}
      </Typography>
      { !(creating ?? false) &&
        <>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.realPrice' })}: ${productInventory.realPrice}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`Bigbuy ${intl.formatMessage({ id: 'forms.id' })}: ${productInventory.bigbuy.id}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`Bigbuy ${intl.formatMessage({ id: 'forms.name' })}: ${productInventory.bigbuy.name}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`Bigbuy ${intl.formatMessage({ id: 'forms.description' })}: ${productInventory.bigbuy.description}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`Bigbuy ${intl.formatMessage({ id: 'forms.price' })}: ${productInventory.bigbuy.price}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`Bigbuy ${intl.formatMessage({ id: 'forms.quantity' })}: ${productInventory.bigbuy.quantity}`}
          </Typography>
        </>
      }

      { (creating ?? false) && (onClickRemoveBtn != null) &&
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => { onClickRemoveBtn(index) }}
        >
          <FormattedMessage
            id="app.removeBtn"
          />
        </Button>
      }
    </>
  )
}

export default CheckProductInventoryDetail
