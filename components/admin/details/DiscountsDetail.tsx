import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { ProductDiscount } from '@core/types/products';

type DiscountsDetailProps = {
  discounts: ProductDiscount[],
  created: boolean,
  getDiscountActionComponent: (discountIndex: number) => JSX.Element,
};

const DiscountsDetail = (props: DiscountsDetailProps) => {
  const { 
    discounts, 
    created,
    getDiscountActionComponent,
  } = props;

  return (
    <Grid container spacing={1} py={3}>
      { discounts.map((discount, discountIndex) => (
        <Grid item xs={6} key={discountIndex}>
          { created &&
            <>
              <Typography component="div" variant="subtitle1">
                {`ID: ${discount.id}`}
              </Typography>
              <Typography component="div" variant="subtitle1">
                {`Product ID: ${discount.productId}`}
              </Typography>
            </>
          }
          <Typography component="div" variant="subtitle1">
            {`Name: ${discount.name}`}
          </Typography>
          <Typography component="div" variant="subtitle1">
            {`Description: ${discount.description}`}
          </Typography>
          <Typography component="div" variant="subtitle1">
            {`Discount percent: ${discount.discountPercent} %`}
          </Typography>
          <Typography component="div" variant="subtitle1">
            {`Active: ${discount.active}`}
          </Typography>
          { getDiscountActionComponent(discountIndex) }
        </Grid>
      ))}
    </Grid>
  );
};

export default DiscountsDetail;
