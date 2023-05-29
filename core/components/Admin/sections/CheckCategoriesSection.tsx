import { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UpdateIcon from '@mui/icons-material/Update';

import { ManageActions } from '@core/constants/app';
import type { ProductCategory } from '@core/types/products';

import { useSearchContext } from '@lib/contexts/SearchContext';
import ManagePCategoryForm from '@core/components/forms/admin/ManagePCategoryForm';
import CategoryDetail from '@core/components/Admin/details/CategoryDetail';

const CheckCategoriesSection = () => {
  const { productCategories } = useSearchContext();

  const [selected, setSelected] = useState<ProductCategory | undefined>(undefined);

  const onClickUpdateBtn = (category: ProductCategory) => {
    setSelected(category);
  }

  const onSuccessUpdate = (_category: ProductCategory) => {
    setSelected(undefined);
  }

  const onSuccessDelete = () => {
    setSelected(undefined);
  }

  const onCancel = () => {
    setSelected(undefined);
  }

  return (
    <>           
      { !selected ?
        <>
          <Typography component="h1" variant="h1">
            <FormattedMessage
              id="admin.productCategories"
            />
          </Typography>
          <Grid container spacing={4} py={3}>
            {productCategories?.map((item, index) => (
              <Grid item xs={6} key={index}>
                <CategoryDetail 
                  category={item}
                  created={true}
                />
                <Button 
                  variant="contained"  
                  startIcon={<UpdateIcon />}                    
                  onClick={() => onClickUpdateBtn(item)}
                >
                  <FormattedMessage
                    id="admin.updateCategoryBtn"
                  />
                </Button>
              </Grid>
            ))}
          </Grid>
        </>
        :
        <ManagePCategoryForm
          action={ManageActions.update}
          productCategory={selected}
          onSubmitSuccess={onSuccessUpdate}
          onDeleteSuccess={onSuccessDelete}
          onCancel={onCancel}
        />
      }
    </>
  );
};

export default CheckCategoriesSection;