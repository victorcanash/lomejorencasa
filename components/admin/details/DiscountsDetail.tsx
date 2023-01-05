import { useIntl } from 'react-intl';

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

  const intl = useIntl();

  return (
    <Grid container spacing={1} py={3}>
      { discounts.map((discount, discountIndex) => (
        <Grid item xs={6} key={discountIndex}>
          { created &&
            <>
              <Typography component="div" variant="body1">
                {`${intl.formatMessage({ id: 'forms.id' })}: ${discount.id}`}
              </Typography>
              <Typography component="div" variant="body1">
                {`${intl.formatMessage({ id: 'forms.productId' })}: ${discount.productId}`}
              </Typography>
            </>
          }
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.name.en' })}: ${discount.name.en}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.name.es' })}: ${discount.name.es}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.description.en' })}: ${discount.description.en}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.description.es' })}: ${discount.description.es}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.discountPercent' })}: ${discount.discountPercent} %`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.active' })}: ${discount.active}`}
          </Typography>
          { getDiscountActionComponent(discountIndex) }
        </Grid>
      ))}
    </Grid>
  );
};

export default DiscountsDetail;
