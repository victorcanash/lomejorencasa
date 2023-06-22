import { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { ManageActions } from '@core/constants/app';
import type {
  Landing,
  Product,
  ProductCategory,
  ProductDiscount,
  ProductInventory,
  ProductPack,
} from '@core/types/products';
import useAdminStore from '@core/hooks/useAdminStore';
import Button from '@core/components/inputs/Button';
import ManageLandingForm from '@core/components/forms/admin/ManageLandingForm';
import ManageProductForm from '@core/components/forms/admin/ManageProductForm';
import ManagePPackForm from '@core/components/forms/admin/ManagePPackForm';
import ManagePInventoryForm from '@core/components/forms/admin/ManagePInventoryForm';
import ManagePDiscountForm from '@core/components/forms/admin/ManagePDiscountForm';
import CheckLandingDetail from '../CheckLandingDetail';
import CheckProductDetail from '../CheckProductDetail';
import CheckProductPackDetail from '../CheckProductPackDetail';

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

  const { createLanding, successMsg, errorMsg } = useAdminStore();

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

  const onSuccessCreateInventory = (inventory: ProductInventory) => {
    const newProduct = {
      ...product,
      inventories: [
        ...product?.inventories || [],
        inventory,
      ],
    } as Product;
    setProduct(newProduct);
  };

  const onCancelCreateInventory = () => {
    setProduct(undefined);
  };

  const onSuccessCreateDiscount = (discount: ProductDiscount) => {
    const newProduct = {
      ...product,
      discounts: [
        ...product?.discounts || [],
        discount,
      ],
    } as Product;
    setProduct(newProduct);
  };

  const onCancelCreateDiscount = () => {
    setProduct(undefined);
  };

  const onClickRemoveInventoryBtn = (index: number) => {
    const newProduct = {
      ...product,
      inventories: product?.inventories ? product.inventories.filter((_inventory, inventoryIndex) => inventoryIndex !== index) : [],
    } as Product;
    setProduct(newProduct);
  };

  const onClickRemoveDiscountBtn = (index: number) => {
    const newProduct = {
      ...product,
      discounts: product?.discounts ? product.discounts.filter((_discount, discountIndex) => discountIndex !== index) : [],
    } as Product;
    setProduct(newProduct);
  };

  const handleConfirmBtn = () => {
    if (landing && (product || pack)) {
      createLanding(landing, product, pack, onSubmitSuccess);
    }
  };

  return (
    <>
      {/* Views */}
      { (landing) &&
        <>
          <Typography component="div" variant="h2" textAlign="center" mt={2} mb={1}>
            <FormattedMessage
              id="admin.createdLanding"
            />
          </Typography>
          <CheckLandingDetail
            landing={landing}
            creating
          />
        </>
      }
      { (product) &&
        <>
          <Typography component="div" variant="h2" textAlign="center" mt={2} mb={1}>
            <FormattedMessage
              id="admin.createdProduct"
            />
          </Typography>
          <CheckProductDetail
            product={product}
            creating
            onClickRemoveInventoryBtn={onClickRemoveInventoryBtn}
            onClickRemoveDiscountBtn={onClickRemoveDiscountBtn}
          />
        </>
      }
      { (pack) &&
        <>
          <Typography component="div" variant="h2" textAlign="center" mt={2} mb={1}>
            <FormattedMessage
              id="admin.createdPack"
            />
          </Typography>
          <CheckProductPackDetail
            productPack={pack}
            creating
            onClickRemoveInventoryBtn={onClickRemoveInventoryBtn}
          />
        </>
      }

      {/* Create landing model */}
      { (!landing) &&
        <ManageLandingForm
          action={ManageActions.create}
          onSubmitSuccess={onSuccessCreateLanding}
          onCancel={onCancel}
        />
      }

      {/* Choose item type */}
      { (landing && !createProduct && !createPack && !product && !pack) &&
        <Box mt={2}>
          <Button
            onClick={handleChooseProductBtn}
          >
            <FormattedMessage
              id="admin.createProductBtn"
            />
          </Button>
          <Button
            onClick={handleChoosePackBtn}
          >
            <FormattedMessage
              id="admin.createPackBtn"
            />
          </Button>
        </Box>
      }

      {/* Create product model */}
      { (landing && createProduct && !createPack && !product && !pack) &&
        <Box mt={2}>
          <ManageProductForm
            action={ManageActions.create}
            category={category}
            landing={landing}
            onSubmitSuccess={onSuccessCreateProduct}
            onCancel={onCancelCreateProduct}
          />
        </Box>
      }

      {/* Create pack model */}
      { (landing && !createProduct && createPack && !product && !pack) &&
        <Box mt={2}>
          <ManagePPackForm
            action={ManageActions.create}
            landing={landing}
            onSubmitSuccess={onSuccessCreatePack}
            onCancel={onCancelCreatePack}
          />
        </Box>
      }

      {/* Create inventories */}
      { (landing && createProduct && !createPack && product && !pack) &&
        <>
          <Box mt={2}>
            <ManagePInventoryForm
              action={ManageActions.create}
              product={product}
              onSubmitSuccess={onSuccessCreateInventory}
              onCancel={onCancelCreateInventory}
            />
          </Box>
          <Box mt={2}>
            <ManagePDiscountForm
              action={ManageActions.create}
              product={product}
              onSubmitSuccess={onSuccessCreateDiscount}
              onCancel={onCancelCreateDiscount}
            />
          </Box>
        </>
      }

      {/* Confirmation */}
      { (landing && (createProduct || createPack) && (product || pack)) &&
        <Box mt={4}>
          <Button
            fullWidth
            onClick={handleConfirmBtn}
            disabled={!product?.inventories || product.inventories.length < 1}
          >
            <FormattedMessage
              id="admin.confirmBtn"
            />
          </Button>
          {
            errorMsg && errorMsg !== '' &&
              <Alert severity="error">{ errorMsg }</Alert>
          } 
          {
            successMsg && successMsg !== '' &&
              <Alert>{ successMsg }</Alert>
          }  
        </Box>
      }
    </>
  );
};

export default CreateLandingSection;
