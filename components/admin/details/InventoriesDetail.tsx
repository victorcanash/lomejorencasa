import { useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { ProductInventory } from '@core/types/products';

type InventoriesDetailProps = {
  inventories: ProductInventory[],
  created: boolean,
  getInventoryActionComponent: (inventoryIndex: number) => JSX.Element,
};

const InventoriesDetail = (props: InventoriesDetailProps) => {
  const { 
    inventories, 
    created,
    getInventoryActionComponent,
  } = props;

  const intl = useIntl();

  return (
    <Grid container spacing={1} py={3}>
      { inventories.map((inventory, inventoryIndex) => (
        <Grid item xs={6} key={inventoryIndex}>
          { created &&
            <>
              <Typography component="div" variant="body1">
                {`${intl.formatMessage({ id: 'forms.id' })}: ${inventory.id}`}
              </Typography>
              <Typography component="div" variant="body1">
                {`${intl.formatMessage({ id: 'forms.productId' })}: ${inventory.productId}`}
              </Typography>
            </>
          }
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.sku' })}: ${inventory.sku}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.name.en' })}: ${inventory.name.en}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.name.es' })}: ${inventory.name.es}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.description.en' })}: ${inventory.description.en}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.description.es' })}: ${inventory.description.es}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.price' })}: ${inventory.price}`}
          </Typography>
          <Typography component="div" variant="body1">
              {`${intl.formatMessage({ id: 'forms.quantity' })}: ${inventory.quantity}`}
          </Typography>
          { created &&
            <>
              <Typography component="div" variant="body1">
                {`${intl.formatMessage({ id: 'forms.realPrice' })}: ${inventory.realPrice}`}
              </Typography>
              <Typography component="div" variant="body1">
                {`Bigbuy ${intl.formatMessage({ id: 'forms.id' })}: ${inventory.bigbuy.id}`}
              </Typography>
              <Typography component="div" variant="body1">
                {`Bigbuy ${intl.formatMessage({ id: 'forms.name' })}: ${inventory.bigbuy.name}`}
              </Typography>
              <Typography component="div" variant="body1">
                {`Bigbuy ${intl.formatMessage({ id: 'forms.description' })}: ${inventory.bigbuy.description}`}
              </Typography>
              <Typography component="div" variant="body1">
                {`Bigbuy ${intl.formatMessage({ id: 'forms.price' })}: ${inventory.bigbuy.price}`}
              </Typography>
              <Typography component="div" variant="body1">
                {`Bigbuy ${intl.formatMessage({ id: 'forms.quantity' })}: ${inventory.bigbuy.quantity}`}
              </Typography>
            </>
          }
          { getInventoryActionComponent(inventoryIndex) }
        </Grid>
      ))}
    </Grid>
  );
};

export default InventoriesDetail;
