import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Product, ProductInventory } from "@core/types/products";
import { capitalizeFirstLetter } from '@core/utils/strings';

type ProductDescriptionProps = {
  product: Product,
  detailed: boolean,
  selectedInventory: ProductInventory | undefined,
};

const ProductDescription = (props: ProductDescriptionProps) => {
  const { product, detailed, selectedInventory } = props;
  
  return (
    <Box>
      <Typography component={ detailed ? "h1" : "div" } variant={ detailed ? "h1" : "body1" }>
        {capitalizeFirstLetter(product.name.current)}
      </Typography>

      { detailed &&
        <Typography component="h2" variant="body1">
          {capitalizeFirstLetter(product.description.current)}
        </Typography>
      }
      
      { product.activeDiscount ?
        <>
          <Typography component={ detailed ? "h2" : "div" } variant={ detailed ? "h1" : "body1"} color="error">
            {selectedInventory ? selectedInventory.realPrice : product.lowestRealPrice} €
          </Typography>
          <Typography component={ detailed ? "span" : "span" } variant={ detailed ? "body1" : "body2"}>
            <FormattedMessage id="productDetail.original" />: <s>{selectedInventory ? selectedInventory.price : product.lowestPrice} €</s>
          </Typography> 
          <Typography component={ detailed ? "span" : "span" } variant={ detailed ? "body1" : "body2"} color="error"> 
            {` -${product.activeDiscount.discountPercent}%`}
          </Typography> 
        </>
        :
        <Typography component={ detailed ? "h2" : "span" } variant={ detailed ? "h1" : "body1"}>
          {selectedInventory ? selectedInventory.realPrice : product.lowestRealPrice} €
        </Typography>
      }
    </Box>
  );
};

export default ProductDescription;
