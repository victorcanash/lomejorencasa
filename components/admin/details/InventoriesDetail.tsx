import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { ProductInventory } from '@core/types/products';

type InventoriesDetailProps = {
  inventories: ProductInventory[],
  created: boolean,
  getInventoryActionComponent: (inventoryIndex: number) => JSX.Element,
  onClickRefreshBigbuyBtn?: (productId: number) => void,
};

const InventoriesDetail = (props: InventoriesDetailProps) => {
  const { 
    inventories, 
    created,
    getInventoryActionComponent,
    onClickRefreshBigbuyBtn,
  } = props;

  const handleClickRefreshBigbuyBtn = (productId: number) => {
    if (onClickRefreshBigbuyBtn) {
      onClickRefreshBigbuyBtn(productId)
    }
  };

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
            {`SKU: ${inventory.sku}`}
          </Typography>
          <Typography component="div" variant="subtitle1">
            {`Name: ${inventory.name}`}
          </Typography>
          <Typography component="div" variant="subtitle1">
            {`Description: ${inventory.description}`}
          </Typography>
          <Typography component="div" variant="subtitle1">
            {`Price: ${inventory.price}`}
          </Typography>
          { created &&
            <>
              <Typography component="div" variant="subtitle1">
                {`Real price (with discount): ${inventory.realPrice}`}
              </Typography>
              <Button 
                variant="contained"                    
                onClick={() => handleClickRefreshBigbuyBtn(inventory.productId)}
              >
                Refresh bigbuy data
              </Button> 
              <Typography component="div" variant="subtitle1">
                {`Bigbuy id: ${inventory.bigbuy.id}`}
              </Typography>
              <Typography component="div" variant="subtitle1">
                {`Bigbuy name: ${inventory.bigbuy.name}`}
              </Typography>
              <Typography component="div" variant="subtitle1">
                {`Bigbuy description: ${inventory.bigbuy.description}`}
              </Typography>
              <Typography component="div" variant="subtitle1">
                {`Bigbuy price: ${inventory.bigbuy.price}`}
              </Typography>
              <Typography component="div" variant="subtitle1">
                {`Bigbuy quantity: ${inventory.bigbuy.quantity}`}
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
