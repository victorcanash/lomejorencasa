import { SyntheticEvent, useState, Fragment } from 'react';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UpdateIcon from '@mui/icons-material/Update';
import CreateIcon from '@mui/icons-material/Create';

import type { ProductCategoryGroup, ProductCategory } from '@core/types/products';
import { useAdminContext } from '@core/contexts/AdminContext';
import Button from '@core/components/inputs/Button';
import CategoryDetail from '@core/components/Admin/details/CategoryDetail';
import { ManageActions } from '@core/constants/app';
import ManagePCategoryForm from '@core/components/forms/admin/ManagePCategoryForm';

type CheckStoreSectionProps = {
  getCategoryDetails: (slug: string) => Promise<void>,
};

const CheckStoreSection = (props: CheckStoreSectionProps) => {
  const {
    getCategoryDetails,
  } = props;

  const {
    categoryGroups,
    categoriesWithoutGroup,
  } = useAdminContext();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | ProductCategoryGroup | undefined>(undefined);
  const [createCategory, setCreateCategory] = useState<{
    enabled: boolean,
    isGroup: boolean,
    groupId?: number,
  }>({
    enabled: false,
    isGroup: false,
    groupId: undefined, 
  });

  const onClickUpdateBtn = (category: ProductCategory | ProductCategoryGroup) => {
    setSelectedCategory(category);
  }

  const onSuccessUpdate = () => {
    setSelectedCategory(undefined);
  }

  const onSuccessDelete = () => {
    setSelectedCategory(undefined);
  }

  const onClickCreateBtn = (isGroup: boolean, groupId?: number) => {
    setCreateCategory({ enabled: true, isGroup, groupId });
  }

  const onCancel = () => {
    setSelectedCategory(undefined);
    setCreateCategory({ enabled: false, isGroup: false, groupId: undefined });
  }

  return (
    <Box>
      { (!selectedCategory && !createCategory.enabled) &&
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
                onClick={() => onClickCreateBtn(true)}
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
                    onClick={() => onClickUpdateBtn(checkCategoryGroup.categoryGroup)}
                  >
                    <FormattedMessage
                      id="admin.updateCategoryBtn"
                    />
                  </Button>
                  <Button
                    startIcon={<CreateIcon />}
                    onClick={() => onClickCreateBtn(true, checkCategoryGroup.categoryGroup.id)}
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
                        onClick={() => onClickUpdateBtn(checkCategory.category)}
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
                onClick={() => onClickCreateBtn(false)}
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
                    onClick={() => onClickUpdateBtn(checkCategory.category)}
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
      }
      { (selectedCategory && !createCategory.enabled) &&
        <ManagePCategoryForm
          action={ManageActions.update}
          productCategory={selectedCategory}
          onSubmitSuccess={onSuccessUpdate}
          onDeleteSuccess={onSuccessDelete}
          onCancel={onCancel}
        />
      }
      { (!selectedCategory && createCategory.enabled) &&
        <ManagePCategoryForm
          action={ManageActions.create}
          initIsCategoryGroup={createCategory.isGroup}
          initCategoryGroupId={createCategory.groupId}
          onSubmitSuccess={onSuccessUpdate}
          onDeleteSuccess={onSuccessDelete}
          onCancel={onCancel}
        />
      }
    </Box>
  );
};

export default CheckStoreSection;
