import { useState } from 'react';
import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

import { ManageActions } from '@core/constants/app';
import { AdminSections } from '@core/constants/admin';
import type { Product, ProductInventory, ProductDiscount } from '@core/types/products';
import type { Source, UploadFile } from '@core/types/multimedia';

import { pages } from '@lib/constants/navigation';
import useProducts from '@lib/hooks/useProducts';
import ManageProductForm from '@components/forms/admin/ManageProductForm';
import ManagePInventoryForm from '@components/forms/admin/ManagePInventoryForm';
import ManagePDiscountForm from '@components/forms/admin/ManagePDiscountForm';
import ProductDetail from '@components/admin/details/ProductDetail';
import InventoriesDetail from '@components/admin/details/InventoriesDetail';
import DiscountsDetail from '@components/admin/details/DiscountsDetail';
import ImagesDetail from '@components/admin/details/ImagesDetail';

const CreateProductSection = () => {
  const router = useRouter();

  const { createProduct, errorMsg, successMsg } = useProducts();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [uploadImgs, setUploadImgs] = useState<UploadFile[]>([]);
  const [inventories, setInventories] = useState<ProductInventory[]>([]);
  const [discounts, setDiscounts] = useState<ProductDiscount[]>([]);

  const onSuccessCreateProduct = (product: Product, uploadImgs?: UploadFile[]) => {
    setProduct(product);
    if (uploadImgs) {
      setUploadImgs(uploadImgs);
    }
  };

  const onSuccessCreateInventory = (inventory: ProductInventory) => {
    setInventories(current => [...current, inventory]);
  };

  const onSuccessCreateDiscount = (discount: ProductDiscount) => {
    setDiscounts(current => [...current, discount]);
  };

  const onClickDeleteInventoryBtn = (deleteIndex: number) => {
    setInventories(
      inventories.filter((_item, index) => index !== deleteIndex)
    );
  };

  const onClickDeleteDiscountBtn = (deleteIndex: number) => {
    setDiscounts(
      discounts.filter((_item, index) => index !== deleteIndex)
    );
  };

  const onClickConfirmBtn = () => {
    if (product && inventories && inventories.length > 0) {
      createProduct(product, uploadImgs, inventories, discounts, onSuccessConfirm);
    }
  };

  const onSuccessConfirm = () => {
    router.push(`${pages.admin.path}?section=${AdminSections.home}`);
  };

  return (
    <>           
      { !product ?
        <ManageProductForm
          action={ManageActions.create}
          onSubmitSuccess={onSuccessCreateProduct}
        />
        :
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h1">
            <FormattedMessage
              id="admin.createdProduct"
            />
          </Typography>
          <ProductDetail
            product={product}
            created={false}
          />
          { uploadImgs && uploadImgs.length > 0 &&
            <>
              <Typography component="div" variant="body1">
                <FormattedMessage
                  id="forms.manageProductImgs.newImgs"
                />
              </Typography>
              <ImagesDetail
                sources={uploadImgs.map((item) => { 
                  return { src: item.url } as Source; 
                })}
              />
            </>
          }

          <Divider sx={{ my: 2 }} />

          <ManagePInventoryForm
            action={ManageActions.create}
            product={product}
            manageOnSubmit={false}
            onSubmitSuccess={onSuccessCreateInventory}
          />

          { inventories && inventories.length > 0 &&
            <>
              <InventoriesDetail
                inventories={inventories}
                created={false}
                getInventoryActionComponent={(inventoryIndex: number) => {
                  return (
                    <Button 
                      variant="contained"  
                      startIcon={<DeleteIcon />}                    
                      onClick={() => onClickDeleteInventoryBtn(inventoryIndex)}
                    >
                      <FormattedMessage
                        id="app.deleteBtn"
                      />
                    </Button>
                  );
                }}
              />

              <Divider sx={{ my: 2 }} />

              <ManagePDiscountForm
                action={ManageActions.create}
                product={product}
                manageOnSubmit={false}
                onSubmitSuccess={onSuccessCreateDiscount}
              />

              { discounts && discounts.length > 0 && 
                <DiscountsDetail
                  discounts={discounts}
                  created={false}
                  getDiscountActionComponent={(discountIndex: number) => {
                    return (
                      <Button 
                        variant="contained"  
                        startIcon={<DeleteIcon />}                    
                        onClick={() => onClickDeleteDiscountBtn(discountIndex)}
                      >
                        <FormattedMessage
                          id="app.deleteBtn"
                        />
                      </Button>
                    );
                  }}
                />
              }

              <Divider sx={{ my: 2 }} />

              <Button
                variant="contained"
                onClick={onClickConfirmBtn}
                sx={{  mb: 2 }}
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
            </>
          }
        </Box>
      }
    </>
  );
};

export default CreateProductSection;
