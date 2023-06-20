import { useIntl, FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpdateIcon from '@mui/icons-material/Update';

import type { ProductCategory, ProductCategoryGroup } from '@core/types/products';

type CategoryDetailProps = {
  category: ProductCategory | ProductCategoryGroup,
  isGroup?: boolean,
  onClickSelectBtn: (category: ProductCategory) => void,
  onClickUpdateBtn: (category: ProductCategory | ProductCategoryGroup) => void,
};

const CategoryDetail = (props: CategoryDetailProps) => {
  const {
    category,
    isGroup,
    onClickSelectBtn,
    onClickUpdateBtn,
  } = props;

  const intl = useIntl();

  const handleClickSelectBtn = () => {
    onClickSelectBtn(category as ProductCategory);
  };

  const handleClickUpdateBtn = () => {
    onClickUpdateBtn(category);
  };

  return (
    <>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.id' })}: ${category.id}`}
      </Typography>
      { !isGroup &&
        <Typography component="div" variant="body1">
          {(category as ProductCategory).categoryGroupId ?
            `${intl.formatMessage({ id: 'forms.categoryGroupId' })}: ${(category as ProductCategory).categoryGroupId}` :
            `${intl.formatMessage({ id: 'forms.withoutGroupCategoryName' })}`
          }
        </Typography>
      }
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.slug' })}: ${category.slug}`}
      </Typography>
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
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.image' })}: ${category.image}`}
      </Typography>

      { !isGroup &&
        <Button
          startIcon={<VisibilityIcon />}       
          onClick={() => handleClickSelectBtn()}
        >
          <FormattedMessage
            id="admin.selectCategoryBtn"
          />
        </Button>
      }
      <Button
        startIcon={<UpdateIcon />}       
        onClick={() => handleClickUpdateBtn()}
      >
        <FormattedMessage
          id="admin.updateCategoryBtn"
        />
      </Button>
    </>
  );
};

export default CategoryDetail;
