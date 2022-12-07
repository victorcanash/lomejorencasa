import { useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';

import { ProductCategory } from '@core/types/products';

type CategoryDetailProps = {
  category: ProductCategory,
  created: boolean,
};

const CategoryDetail = (props: CategoryDetailProps) => {
  const { category, created } = props;

  const intl = useIntl();

  return (
    <>
      { created &&
        <Typography component="div" variant="subtitle1">
          {`${intl.formatMessage({ id: 'forms.id' })}: ${category.id}`}
        </Typography>
      }
      <Typography component="div" variant="subtitle1">
        {`${intl.formatMessage({ id: 'forms.name' })}: ${category.name}`}
      </Typography>
      <Typography component="div" variant="subtitle1">
        {`${intl.formatMessage({ id: 'forms.description' })}: ${category.description}`}
      </Typography>
    </>
  );
};

export default CategoryDetail;
