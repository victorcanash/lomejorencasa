import { useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import type { Product } from '@core/types/products';

import { getAllProductImgsUrl } from '@lib/utils/products';
import { useSearchContext } from '@lib/contexts/SearchContext';
import Carousel from '@components/ui/Carousel';

type ProductDetailProps = {
  product: Product,
  created: boolean,
};

const ProductDetail = (props: ProductDetailProps) => {
  const { product, created } = props;

  const { productCategories } = useSearchContext();

  const intl = useIntl();

  return (
    <>
      { created &&
        <Typography component="div" variant="body1">
          {`${intl.formatMessage({ id: 'forms.id' })}: ${product.id}`}
        </Typography>
      }
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.en' })}: ${product.name.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.es' })}: ${product.name.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.en' })}: ${product.description.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.es' })}: ${product.description.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.category' })}: ${productCategories.filter((item) => item.id == product.categoryId)[0]?.name.current}`}
      </Typography>
     
      { created &&
        <>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.lowestRealPrice' })}: ${product.lowestRealPrice}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.activeDiscountId' })}: ${product.activeDiscount ? product.activeDiscount.id : 'None'}`}
          </Typography>
          <Box sx={{width: "360px"}}>
            <Carousel 
              imgSources={getAllProductImgsUrl(product)} 
            />
          </Box>
        </>
      }
    </>
  );
};

export default ProductDetail;
