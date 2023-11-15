import { FormattedMessage, useIntl } from 'react-intl'

import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'

import type { ProductDiscount } from '@core/types/products'
import Button from '@core/components/inputs/Button'

interface CheckProductDiscountDetailProps {
  index: number
  productDiscount: ProductDiscount
  creating?: boolean
  onClickRemoveBtn?: (index: number) => void
}

const CheckProductDiscountDetail = (props: CheckProductDiscountDetailProps) => {
  const {
    index,
    productDiscount,
    creating,
    onClickRemoveBtn
  } = props

  const intl = useIntl()

  return (
    <>
      { !(creating ?? false) &&
        <>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.id' })}: ${productDiscount.id}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.productId' })}: ${productDiscount.productId}`}
          </Typography>
        </>
      }
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.en' })}: ${productDiscount.name.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.es' })}: ${productDiscount.name.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.en' })}: ${productDiscount.description.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.es' })}: ${productDiscount.description.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.discountPercent' })}: ${productDiscount.discountPercent} %`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.active' })}: ${productDiscount.active}`}
      </Typography>

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

export default CheckProductDiscountDetail
