import { useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';

import { ProductCategory, ProductCategoryGroup } from '@core/types/products';

type CategoryDetailProps = {
  category: ProductCategory | ProductCategoryGroup,
  created: boolean,
};

const CategoryDetail = (props: CategoryDetailProps) => {
  const { category, created } = props;

  const intl = useIntl();

  return (
    <>
      { created &&
        <Typography component="div" variant="body1">
          {`${intl.formatMessage({ id: 'forms.id' })}: ${category.id}`}
        </Typography>
      }
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.en' })}: ${category.name.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.es' })}: ${category.name.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.en' })}: ${category.description.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.es' })}: ${category.description.es}`}
      </Typography>
    </>
  );
};

export default CategoryDetail;
