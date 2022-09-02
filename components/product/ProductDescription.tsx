import Typography from '@mui/material/Typography';

import { Product } from "@core/types/products";
import { capitalizeFirstLetter } from '@core/utils/strings';

type ProductDescriptionProps = {
  product: Product,
  detailed: boolean,
};

const ProductDescription = (props: ProductDescriptionProps) => {
  const { product, detailed } = props;

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
      
      { product.discount ?
        <>
          <Typography component={ detailed ? "h2" : "div" } variant={ detailed ? "h4" : "subtitle1"} color="error">
            {product.realPrice} €
          </Typography>
          <Typography component={ detailed ? "h3" : "span" } variant={ detailed ? "h6" : "subtitle2"}>
            Original: <s>{product.price} €</s>
          </Typography> 
          <Typography component={ detailed ? "h3" : "span" } variant={ detailed ? "h6" : "subtitle2"} color="error"> 
            {` -${product.discount.discountPercent}%`}
          </Typography> 
        </>
        :
        <Typography component={ detailed ? "h2" : "span" } variant={ detailed ? "h4" : "subtitle1"}>
          {product.realPrice} €
        </Typography>
      }
    </>
  );
};

export default ProductDescription;
