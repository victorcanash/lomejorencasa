import { FormattedMessage, useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

import type { ProductPack } from '@core/types/products';
import Button from '@core/components/inputs/Button';
import CheckProductInventoryDetail from './CheckProductInventoryDetail';

type CheckProductPackDetailProps = {
  productPack: ProductPack,
  creating?: boolean,
  onClickRemoveInventoryBtn?: (index: number) => void,
};

const CheckProductPackDetail = (props: CheckProductPackDetailProps) => {
  const {
    productPack,
    creating,
    onClickRemoveInventoryBtn,
  } = props;

  const intl = useIntl();

  return (
    <>
      { !creating &&
        <>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.id' })}: ${productPack.id}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.landingIdAdmin' })}: ${productPack.landingId}`}
          </Typography>
        </>
      }
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.en' })}: ${productPack.name.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.es' })}: ${productPack.name.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.en' })}: ${productPack.description.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.es' })}: ${productPack.description.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.price' })}: ${productPack.price}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.image' })}: ${productPack.image}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.metaId' })}: ${productPack.metaId}`}
      </Typography>
      { !creating &&
        <>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.quantity' })}: ${productPack.quantity}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.originalPrice' })}: ${productPack.originalPrice}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'discountPercent' })}: ${productPack.discountPercent}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.inventories' })}:`}
            { productPack.inventories?.map((inventory, index) => (
              <Box key={index} ml={1}>
                <CheckProductInventoryDetail
                  index={index}
                  productInventory={inventory}
                  creating={creating}
                  onClickRemoveBtn={onClickRemoveInventoryBtn}
                />
              </Box>
            ))}
          </Typography>
        </>
      }
      { creating &&
        <Typography component="div" variant="body1">
          {`${intl.formatMessage({ id: 'forms.inventoriesIds' })}:`}
          { productPack.inventoriesIds?.map((inventoryId, index) => (
            <Box key={index} ml={1}>
              <Typography component="div" variant="body1">
                { inventoryId }
              </Typography>
              { onClickRemoveInventoryBtn &&
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => onClickRemoveInventoryBtn(index)}
                >
                  <FormattedMessage
                    id="app.removeBtn"
                  />
                </Button>
              }
            </Box>
          ))}
        </Typography>
      }
    </>
  );
};

export default CheckProductPackDetail;
