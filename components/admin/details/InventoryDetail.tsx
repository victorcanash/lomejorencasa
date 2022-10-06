import { ProductInventory } from '@core/types/products';

import Typography from '@mui/material/Typography';

type InventoryDetailProps = {
  inventory: ProductInventory,
  created: boolean,
};

const InventoryDetail = (props: InventoryDetailProps) => {
  const { inventory, created } = props;

  return (
    <>
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
    </>
  );
};

export default InventoryDetail;
