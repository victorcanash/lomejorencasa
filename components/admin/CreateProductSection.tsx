import { Dispatch, SetStateAction } from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { AdminSections } from '@core/constants/admin';
import { ManageActions } from '@core/constants/auth';
import ManageProductForm from '@components/forms/products/ManageProductForm';

type CreateProductSectionProps = {
  setSection: Dispatch<SetStateAction<AdminSections>>,
};

const CreateProductSection = (props: CreateProductSectionProps) => {
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

      <ManageProductForm
        action={ManageActions.create}
      />
    </>
  );
};

export default CreateProductSection;
