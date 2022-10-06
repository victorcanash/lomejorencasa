import { ProductDiscount } from '@core/types/products';

import Typography from '@mui/material/Typography';

type DiscountDetailProps = {
  discount: ProductDiscount,
  created: boolean,
};

const DiscountDetail = (props: DiscountDetailProps) => {
  const { discount, created } = props;

  return (
    <>
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
    </>
  );
};

export default DiscountDetail;
