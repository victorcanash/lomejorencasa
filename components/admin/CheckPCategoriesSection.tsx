import { Dispatch, SetStateAction, useState } from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UpdateIcon from '@mui/icons-material/Update';

import { AdminSections } from '@core/constants/admin';
import { ManageActions } from '@core/constants/auth';
import { ProductCategory } from '@core/types/products';
import { useSearchContext } from '@lib/contexts/SearchContext';
import ManagePCategoryForm from '@components/forms/products/ManagePCategoryForm';

type CheckPCategoriesSectionProps = {
  setSection: Dispatch<SetStateAction<AdminSections>>,
};

const CheckPCategoriesSection = (props: CheckPCategoriesSectionProps) => {
  const { setSection } = props;

  const { productCategories } = useSearchContext();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>(undefined);

  const handleClickBackBtn = () => {
    if (selectedCategory) {
      setSelectedCategory(undefined);
    } else {
      setSection(AdminSections.home);
    }
  }

  const onClickUpdateCategoryBtn = (category: ProductCategory) => {
    setSelectedCategory(category);
  }

  const onSuccessUpdateCategory = (category: ProductCategory) => {
    setSelectedCategory(undefined);
  }

  const onSuccessDeleteCategory = () => {
    setSelectedCategory(undefined);
  }

  return (
    <>           
      <Button
        variant="contained"
        onClick={handleClickBackBtn}
      >
        Go back
      </Button>
      
      <Divider sx={{ my: 2 }} />

      {
        !selectedCategory ?

          <>
            <Typography component="h1" variant="h5">
              Product categories
            </Typography>
            <Grid container spacing={4} py={3}>
              {productCategories?.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Typography component="div" variant="subtitle1">
                    {`ID: ${item.id}`}
                  </Typography>
                  <Typography component="div" variant="subtitle1">
                    {`Name: ${item.name}`}
                  </Typography>
                  <Typography component="div" variant="subtitle1">
                    {`Description: ${item.description}`}
                  </Typography>
                  <Button 
                    variant="contained"  
                    startIcon={<UpdateIcon />}                    
                    onClick={() => onClickUpdateCategoryBtn(item)}
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
            productCategory={selectedCategory}
            manageOnSubmit={true}
            onSubmitSuccess={onSuccessUpdateCategory}
            onDeleteSuccess={onSuccessDeleteCategory}
          />

      }
    </>
  );
};

export default CheckPCategoriesSection;
