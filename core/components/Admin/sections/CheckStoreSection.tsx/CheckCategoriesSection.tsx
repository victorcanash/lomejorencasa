import { Fragment } from 'react';

import { FormattedMessage } from 'react-intl';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UpdateIcon from '@mui/icons-material/Update';
import CreateIcon from '@mui/icons-material/Create';

import type { ProductCategory, ProductCategoryGroup } from '@core/types/products';
import { useAdminContext } from '@core/contexts/AdminContext';
import Button from '@core/components/inputs/Button';
import CategoryDetail from '@core/components/Admin/details/CategoryDetail';

type CheckCategoriesSectionProps = {
  onClickCreateBtn: (isGroup: boolean, groupId?: number) => void,
  onClickUpdateBtn: (category: ProductCategory | ProductCategoryGroup) => void,
};

const CheckCategoriesSection = (props: CheckCategoriesSectionProps) => {
  const {
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

  const handleClickUpdateBtn = (category: ProductCategory | ProductCategoryGroup) => {
    onClickUpdateBtn(category);
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
                key={checkCategoryGroup.categoryGroup.id}
                category={checkCategoryGroup.categoryGroup}
                created={true}
              />
              <Button
                startIcon={<UpdateIcon />}
                onClick={() => handleClickUpdateBtn(checkCategoryGroup.categoryGroup)}
              >
                <FormattedMessage
                  id="admin.updateCategoryBtn"
                />
              </Button>
              <Button
                startIcon={<CreateIcon />}
                onClick={() => handleClickCreateBtn(true, checkCategoryGroup.categoryGroup.id)}
              >
                <FormattedMessage
                  id="admin.createCategoryBtn"
                />
              </Button>
              { checkCategoryGroup.checkCategories.map((checkCategory) => (
                <Fragment key={checkCategory.category.id}>
                  <CategoryDetail
                    key={checkCategory.category.id}
                    category={checkCategory.category}
                    created={true}
                  />
                  <Button
                    startIcon={<UpdateIcon />}       
                    onClick={() => handleClickUpdateBtn(checkCategory.category)}
                  >
                    <FormattedMessage
                      id="admin.updateCategoryBtn"
                    />
                  </Button>
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
                key={checkCategory.category.id}
                category={checkCategory.category}
                created={true}
              />
              <Button
                startIcon={<UpdateIcon />}       
                onClick={() => handleClickUpdateBtn(checkCategory.category)}
              >
                <FormattedMessage
                  id="admin.updateCategoryBtn"
                />
              </Button>
            </Fragment>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CheckCategoriesSection;
