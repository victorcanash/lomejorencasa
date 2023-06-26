import { useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import type { Product } from '@core/types/products';
import CheckProductDiscountDetail from './CheckProductDiscountDetail';
import CheckProductInventoryDetail from './CheckProductInventoryDetail';

type CheckProductDetailProps = {
  product: Product,
  creating?: boolean,
  onClickRemoveInventoryBtn?: (index: number) => void,
  onClickRemoveDiscountBtn?: (index: number) => void,
};

const CheckProductDetail = (props: CheckProductDetailProps) => {
  const {
    product,
    creating,
    onClickRemoveInventoryBtn,
    onClickRemoveDiscountBtn,
  } = props;

  const intl = useIntl();

  return (
    <>
      { !creating &&
        <>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.id' })}: ${product.id}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.landingIdAdmin' })}: ${product.landingId}`}
          </Typography>
        </>
      }
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.en' })}: ${product.name.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.es' })}: ${product.name.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.en' })}: ${product.description.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.es' })}: ${product.description.es}`}
      </Typography>
      { !creating &&
        <>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.lowestPrice' })}: ${product.lowestPrice}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.lowestRealPrice' })}: ${product.lowestRealPrice}`}
          </Typography>
        </>
      }
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.categories' })}:`}
        { product.categories?.map((category) => (
          <Box key={category.id} ml={2}>
            { category.name.current }
          </Box>
        ))}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.inventories' })}:`}
        { product.inventories?.map((inventory, index) => (
          <Box key={index} ml={2}>
            <CheckProductInventoryDetail
              index={index}
              productInventory={inventory}
              creating={creating}
              onClickRemoveBtn={onClickRemoveInventoryBtn}
            />
          </Box>
        ))}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.discounts' })}:`}
        { product.discounts?.map((discount, index) => (
          <Box key={index} ml={2}>
            <CheckProductDiscountDetail
              index={index}
              productDiscount={discount}
              creating={creating}
              onClickRemoveBtn={onClickRemoveDiscountBtn}
            />
          </Box>
        ))}
      </Typography>
      { !creating &&
        <Typography component="div" variant="body1">
          {`${intl.formatMessage({ id: 'forms.activeDiscountId' })}: ${product.activeDiscount ? product.activeDiscount.id : 'None'}`}
        </Typography>
      }
    </>
  );
};

export default CheckProductDetail;
