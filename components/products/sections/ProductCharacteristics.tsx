import Grid from '@mui/material/Grid';

import { everfreshProductId, bagsProductId } from '@lib/constants/products';
import ProductAccordion from '@components/products/ui/ProductAccordion';

type ProductCharacteristicsProps = {
  productId: number,
};

const ProductCharacteristics = (props: ProductCharacteristicsProps) => {
  const { productId } = props;

  const gridItem = (textId: string, itemsCount: number) => {
    return (
      <Grid 
        item 
        xs={12} 
        sm={6}
      >
        <ProductAccordion
          textId={textId}
          itemsCount={itemsCount}
        />
      </Grid>
    );
  };

  return (
    <Grid
      container
      spacing={1}
      mt={5}
    >
      { productId === everfreshProductId &&
        <>
          { gridItem('everfresh.details', 8) }
          { gridItem('everfresh.characteristics', 4) }
          { gridItem('everfresh.dimensions', 3) }
        </>
      }
      { productId === bagsProductId &&
        <>
          { gridItem('bags.small', 1) }
          { gridItem('bags.medium', 1) }
          { gridItem('bags.big', 1) }
        </>
      }
      { gridItem('productDetail.shipping', 3) }
      { gridItem('productDetail.refund', 2) }
    </Grid>
  );
};

export default ProductCharacteristics;
