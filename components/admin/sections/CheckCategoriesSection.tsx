import { useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UpdateIcon from '@mui/icons-material/Update';

import { ManageActions } from '@core/constants/auth';
import { ProductCategory } from '@core/types/products';
import { useSearchContext } from '@lib/contexts/SearchContext';
import ManagePCategoryForm from '@components/forms/products/ManagePCategoryForm';
import CategoryDetail from '@components/admin/details/CategoryDetail';

const CheckCategoriesSection = () => {
  const { productCategories } = useSearchContext();

  const [selected, setSelected] = useState<ProductCategory | undefined>(undefined);

  const onClickUpdateBtn = (category: ProductCategory) => {
    setSelected(category);
  }

  const onSuccessUpdate = (category: ProductCategory) => {
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
          <Typography component="h1" variant="h5">
            Product categories
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
                  Update
                </Button>
              </Grid>
            ))}
          </Grid>
        </>

      :

        <ManagePCategoryForm
          action={ManageActions.update}
          productCategory={selected}
          manageOnSubmit={true}
          onSubmitSuccess={onSuccessUpdate}
          onDeleteSuccess={onSuccessDelete}
          onCancel={onCancel}
        />

      }
    </>
  );
};

export default CheckCategoriesSection;
