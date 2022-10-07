import { ProductCategory } from '@core/types/products';

import Typography from '@mui/material/Typography';

type CategoryDetailProps = {
  category: ProductCategory,
  created: boolean,
};

const CategoryDetail = (props: CategoryDetailProps) => {
  const { category, created } = props;

  return (
    <>
      { created &&
        <Typography component="div" variant="subtitle1">
          {`ID: ${category.id}`}
        </Typography>
      }
      <Typography component="div" variant="subtitle1">
        {`Name: ${category.name}`}
      </Typography>
      <Typography component="div" variant="subtitle1">
        {`Description: ${category.description}`}
      </Typography>
    </>
  );
};

export default CategoryDetail;
