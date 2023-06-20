import { useState, useCallback, Fragment } from 'react';

import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';

import { ManageActions } from '@core/constants/app';
import type { Landing, ProductCategory } from '@core/types/products';
import Button from '@core/components/inputs/Button';
import Divider from '@core/components/ui/Divider';
import LandingDetail from './details/LandingDetail';
import CreateLandingSection from './CreateLandingSection';

type CheckLandingsSectionProps = {
  productCategory: ProductCategory,
  landings: Landing[],
  onClickBack: () => void,
};

const CheckLandingsSection = (props: CheckLandingsSectionProps) => {
  const {
    productCategory,
    landings,
    onClickBack,
  } = props;
  const [createLanding, setCreateLanding] = useState(false);
  const [updateLanding, setUpdateLanding] = useState<Landing | undefined>(undefined);

  const handleClickBack = useCallback(() => {
    onClickBack();
  }, [onClickBack]);

  const handleClickCreateBtn = () => {
    setCreateLanding(true);
  };

  const onClickUpdateBtn = (landing: Landing) => {
    setUpdateLanding(landing);
  };

  const onSuccessCreate = () => {
    setCreateLanding(false);
  };

  const onSuccessUpdate = () => {
    setUpdateLanding(undefined);
  };

  const onSuccessDelete = () => {
    setUpdateLanding(undefined);
  };

  const onCancel = () => {
    setUpdateLanding(undefined);
    setCreateLanding(false);
  };

  return (
    <>
      <Typography component="div" variant="h2">
        {productCategory.name.current}
      </Typography>
      <Typography component="div" variant="h3">
        {productCategory.description.current}
      </Typography>
      <Button customtype="back" onClick={handleClickBack}>
        <FormattedMessage id="admin.productCategoriesBack" />
      </Button>
      <Divider mt={1} mb={4} />

      <Button
        startIcon={<CreateIcon />}
        onClick={() => handleClickCreateBtn()}
      >
        <FormattedMessage
          id="admin.createCategoryBtn"
        />
      </Button>

      { landings.map((landing) => (
        <Fragment key={landing.id}>
          <LandingDetail
            landing={landing}
            onClickUpdateBtn={onClickUpdateBtn}
          />
        </Fragment>
      ))}

      {/* updateLanding &&
        <CreateLandingSection
          landing={updateLanding}
          onSubmitSuccess={onSuccessUpdate}
          onDeleteSuccess={onSuccessDelete}
          onCancel={onCancel}
        />
      */}
      { createLanding &&
        <CreateLandingSection
          onSubmitSuccess={onSuccessCreate}
          onCancel={onCancel}
        />
      }
    </>
  );
};

export default CheckLandingsSection;
