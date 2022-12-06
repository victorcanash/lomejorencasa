import { FormattedMessage } from 'react-intl';

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
    <>
      <Typography component={ detailed ? "h1" : "div" } variant={ detailed ? "h4" : "subtitle1" }>
        {capitalizeFirstLetter(product.name)}
      </Typography>

      { detailed &&
        <Typography component="h2" variant="h6">
          {capitalizeFirstLetter(product.description)}
        </Typography>
      }
      
      { product.activeDiscount ?
        <>
          <Typography component={ detailed ? "h2" : "div" } variant={ detailed ? "h4" : "subtitle1"} color="error">
            {selectedInventory ? selectedInventory.realPrice : product.lowestRealPrice} €
          </Typography>
          <Typography component={ detailed ? "h3" : "span" } variant={ detailed ? "h6" : "subtitle2"}>
            <FormattedMessage id="productDetail.original" />: <s>{selectedInventory ? selectedInventory.price : product.lowestPrice} €</s>
          </Typography> 
          <Typography component={ detailed ? "h3" : "span" } variant={ detailed ? "h6" : "subtitle2"} color="error"> 
            {` -${product.activeDiscount.discountPercent}%`}
          </Typography> 
        </>
        :
        <Typography component={ detailed ? "h2" : "span" } variant={ detailed ? "h4" : "subtitle1"}>
          {selectedInventory ? selectedInventory.realPrice : product.lowestRealPrice} €
        </Typography>
      }
    </>
  );
};

export default ProductDescription;
