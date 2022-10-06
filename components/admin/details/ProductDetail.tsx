import { Product } from '@core/types/products';

import Typography from '@mui/material/Typography';

import { useSearchContext } from '@lib/contexts/SearchContext';

type ProductDetailProps = {
  product: Product,
  created: boolean,
};

const ProductDetail = (props: ProductDetailProps) => {
  const { product, created } = props;

  const { productCategories } = useSearchContext();

  return (
    <>
      { created &&
        <Typography component="div" variant="subtitle1">
          {`ID: ${product.id}`}
        </Typography>
      }
      <Typography component="div" variant="subtitle1">
        {`Name: ${product.name}`}
      </Typography>
      <Typography component="div" variant="subtitle1">
        {`Description: ${product.description}`}
      </Typography>
      <Typography component="div" variant="subtitle1">
        {`Category: ${productCategories.filter((item) => item.id == product.categoryId)[0]?.name}`}
      </Typography>
      <Typography component="div" variant="subtitle1">
        {`SKU: ${product.sku}`}
      </Typography>
      <Typography component="div" variant="subtitle1">
        {`Price: ${product.price}`}
      </Typography>
      { created &&
        <Typography component="div" variant="subtitle1">
          {`Real price (with discount): ${product.realPrice}`}
        </Typography>
      }
    </>
  );
};

export default ProductDetail;
