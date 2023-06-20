import { Fragment } from 'react';

import { FormattedMessage } from 'react-intl';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';

import type { ProductCategory, ProductCategoryGroup } from '@core/types/products';
import { useAdminContext } from '@core/contexts/AdminContext';
import Button from '@core/components/inputs/Button';
import CategoryDetail from './details/CategoryDetail';

type CheckCategoriesSectionProps = {
  onClickSelectBtn: (category: ProductCategory) => void,
  onClickCreateBtn: (isGroup: boolean, groupId?: number) => void,
  onClickUpdateBtn: (category: ProductCategory | ProductCategoryGroup) => void,
};

const CheckCategoriesSection = (props: CheckCategoriesSectionProps) => {
  const {
    onClickSelectBtn,
    onClickCreateBtn,
    onClickUpdateBtn,
  } = props;

  const {
    categoryGroups,
    categoriesWithoutGroup,
  } = useAdminContext();

  const handleClickCreateBtn = (isGroup: boolean, groupId?: number) => {
    onClickCreateBtn(isGroup, groupId);
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>
            <FormattedMessage id="admin.productCategoryGroups" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            startIcon={<CreateIcon />}
            onClick={() => handleClickCreateBtn(true)}
          >
            <FormattedMessage
              id="admin.createCategoryBtn"
            />
          </Button>
          { categoryGroups.map((checkCategoryGroup) => (
            <Fragment key={checkCategoryGroup.categoryGroup.id}>
              <CategoryDetail
                category={checkCategoryGroup.categoryGroup}
                isGroup
                onClickSelectBtn={onClickSelectBtn}
                onClickUpdateBtn={onClickUpdateBtn}
              />
              <Button
                startIcon={<CreateIcon />}
                onClick={() => handleClickCreateBtn(false, checkCategoryGroup.categoryGroup.id)}
              >
                <FormattedMessage
                  id="admin.createCategoryBtn"
                />
              </Button>
              { checkCategoryGroup.checkCategories.map((checkCategory) => (
                <Fragment key={checkCategory.category.id}>
                  <CategoryDetail
                    category={checkCategory.category}
                    onClickSelectBtn={onClickSelectBtn}
                    onClickUpdateBtn={onClickUpdateBtn}
                  />
                </Fragment>
              ))}
            </Fragment>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>
            <FormattedMessage id="admin.productCategoriesWithoutGroup" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            startIcon={<CreateIcon />}
            onClick={() => handleClickCreateBtn(false)}
          >
            <FormattedMessage
              id="admin.createCategoryBtn"
            />
          </Button>
          { categoriesWithoutGroup.map((checkCategory) => (
            <Fragment key={checkCategory.category.id}>
              <CategoryDetail
                category={checkCategory.category}
                onClickSelectBtn={onClickSelectBtn}
                onClickUpdateBtn={onClickUpdateBtn}
              />
            </Fragment>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CheckCategoriesSection;
