import { Dispatch, SetStateAction } from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { AdminSections } from '@core/constants/admin';
import { ManageActions } from '@core/constants/auth';
import ManagePCategoryForm from '@components/forms/products/ManagePCategoryForm';

type CheckProductsSectionProps = {
  setSection: Dispatch<SetStateAction<AdminSections>>,
};

const CheckProductsSection = (props: CheckProductsSectionProps) => {
  const { setSection } = props;

  const handleClickBackBtn = () => {
    setSection(AdminSections.home);
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

      
    </>
  );
};

export default CheckProductsSection;
