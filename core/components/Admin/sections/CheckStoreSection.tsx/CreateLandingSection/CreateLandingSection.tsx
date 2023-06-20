import { useState } from 'react';

import Box from '@mui/material/Box';

import { ManageActions } from '@core/constants/app';
import type { Landing } from '@core/types/products';
import ManageLandingForm from '@core/components/forms/admin/ManageLandingForm';

enum CreateLandingSubsections {
  landingForm = 'landingForm',
  chooseItemType = 'chooseItemType',
  productForm = 'productForm',
  packsForm = 'packForm',
  confirmAll = 'allData',
};

type CreateLandingSectionProps = {
  onSubmitSuccess: (landing: Landing) => void,
  onCancel: () => void,
};

const CreateLandingSection = (props: CreateLandingSectionProps) => {
  const { 
    onSubmitSuccess, 
    onCancel,
  } = props;

  const [section, setSection] = useState(CreateLandingSubsections.landingForm);
  const [landing, setLanding] = useState<Landing | undefined>(undefined);

  const onSuccessCreateLanding = (newLanding: Landing) => {
    setLanding(newLanding);
    setSection(CreateLandingSubsections.chooseItemType);
  };

  const onCancelCreateLanding = () => {
    onCancel();
  };

  return (
    <>
      { section === CreateLandingSubsections.landingForm &&
        <ManageLandingForm
          action={ManageActions.create}
          onSubmitSuccess={onSuccessCreateLanding}
          onCancel={onCancelCreateLanding}
        />
      }
      { section === CreateLandingSubsections.chooseItemType && 
        <Box>
          
        </Box>
      }
    </>
  );
};

export default CreateLandingSection;
