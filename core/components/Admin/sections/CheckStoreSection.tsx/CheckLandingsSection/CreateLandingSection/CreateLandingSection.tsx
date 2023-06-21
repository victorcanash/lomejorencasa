import { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ManageActions } from '@core/constants/app';
import type { Landing, Product, ProductCategory, ProductPack } from '@core/types/products';
import Button from '@core/components/inputs/Button';
import ManageLandingForm from '@core/components/forms/admin/ManageLandingForm';
import ManageProductForm from '@core/components/forms/admin/ManageProductForm';
import ManagePPackForm from '@core/components/forms/admin/ManagePPackForm';
import CheckLandingDetail from '../CheckLandingDetail';

type CreateLandingSectionProps = {
  category: ProductCategory,
  onSubmitSuccess: (landing: Landing) => void,
  onCancel: () => void,
};

const CreateLandingSection = (props: CreateLandingSectionProps) => {
  const {
    category,
    onSubmitSuccess, 
    onCancel,
  } = props;

  const [landing, setLanding] = useState<Landing | undefined>(undefined);
  const [createProduct, setCreateProduct] = useState(false);
  const [createPack, setCreatePack] = useState(false);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [pack, setPack] = useState<ProductPack | undefined>(undefined);

  const onSuccessCreateLanding = (newLanding: Landing) => {
    setLanding(newLanding);
  };

  const handleChooseProductBtn = () => {
    setCreateProduct(true);
  };

  const handleChoosePackBtn = () => {
    setCreatePack(true);
  };

  const onSuccessCreateProduct = (newProduct: Product) => {
    setProduct(newProduct);
  };

  const onSuccessCreatePack = (newPack: ProductPack) => {
    setPack(newPack);
  };

  const onCancelCreateProduct = () => {
    setCreateProduct(false);
  };

  const onCancelCreatePack = () => {
    setCreatePack(false);
  };

  return (
    <>
      {/* Create landing model */}
      { (!landing) &&
        <ManageLandingForm
          action={ManageActions.create}
          category={category}
          onSubmitSuccess={onSuccessCreateLanding}
          onCancel={onCancel}
        />
      }

      {/* Choose item type */}
      { (landing && !createProduct && !createPack && !product && !pack) &&
        <Box>
          <Typography component="div" variant="body1" textAlign="center" mt={2}>
            <FormattedMessage
              id="admin.createdLanding"
            />
          </Typography>
          <CheckLandingDetail
            landing={landing}
            creating
          />
          <Button
            onClick={handleChooseProductBtn}
          >
            <FormattedMessage
              id="admin.createProduct"
            />
          </Button>
          <Button
            onClick={handleChoosePackBtn}
          >
            <FormattedMessage
              id="admin.createPack"
            />
          </Button>
        </Box>
      }

      {/* Create product model */}
      { (landing && createProduct && !createPack && product && !pack) &&
        <ManageProductForm
          action={ManageActions.create}
          landing={landing}
          onSubmitSuccess={onSuccessCreateProduct}
          onCancel={onCancelCreateProduct}
        />
      }

      {/* Create pack model */}
      { (landing && !createProduct && createPack && !product && pack) &&
        <ManagePPackForm
          action={ManageActions.create}
          //category={category}
          onSubmitSuccess={onSuccessCreatePack}
          onCancel={onCancelCreatePack}
        />
      }
    </>
  );
};

export default CreateLandingSection;
