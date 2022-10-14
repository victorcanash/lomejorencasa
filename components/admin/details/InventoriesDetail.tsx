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

  return (
    <Grid container spacing={1} py={3}>
      { inventories.map((inventory, inventoryIndex) => (
        <Grid item xs={6} key={inventoryIndex}>
          { created &&
            <>
              <Typography component="div" variant="subtitle1">
                {`ID: ${inventory.id}`}
              </Typography>
              <Typography component="div" variant="subtitle1">
                {`Product ID: ${inventory.productId}`}
              </Typography>
            </>
          }
          <Typography component="div" variant="subtitle1">
            {`Quantity: ${inventory.quantity}`}
          </Typography>
          <Typography component="div" variant="subtitle1">
            {`Size: ${inventory.size || 'Unique size'}`}
          </Typography>
          { getInventoryActionComponent(inventoryIndex) }
        </Grid>
      ))}
    </Grid>
  );
};

export default InventoriesDetail;
