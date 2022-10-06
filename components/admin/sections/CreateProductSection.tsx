import { useState } from 'react';
import { useRouter } from 'next/router';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

import { pages } from '@core/config/navigation.config';
import { AdminSections } from '@core/constants/admin';
import { ManageActions } from '@core/constants/auth';
import { Product, ProductInventory, ProductDiscount } from '@core/types/products';
import useProducts from '@lib/hooks/useProducts';
import ManageProductForm from '@components/forms/products/ManageProductForm';
import ManagePInventoryForm from '@components/forms/products/ManagePInventoryForm';
import ManagePDiscountForm from '@components/forms/products/ManagePDiscountForm';
import ProductDetail from '@components/admin/details/ProductDetail';
import InventoryDetail from '@components/admin/details/InventoryDetail';
import DiscountDetail from '@components/admin/details/DiscountDetail';

const CreateProductSection = () => {
  const router = useRouter();

  const { createAllProduct, errorMsg, successMsg } = useProducts();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [inventories, setInventories] = useState<ProductInventory[]>([]);
  const [discounts, setDiscounts] = useState<ProductDiscount[]>([]);

  const onClickConfirmBtn = () => {
    if (product && inventories && inventories.length > 0) {
      createAllProduct(product, inventories, discounts, onSuccessManage);
    }
  }

  const onSuccessManage = () => {
    router.push(`${pages.admin.path}?section=${AdminSections.home}`);
  }

  const onSuccessCreateProduct = (product: Product) => {
    setProduct(product);
  }

  const onSuccessCreateInventory = (inventory: ProductInventory) => {
    if (inventory.size) {
      // Then cannot be an inventory with unique size
      setInventories(
        inventories.filter(item => item.size)
      );
      setInventories(current => [...current, inventory]);
    } else { 
      // Inventory with unique size
      setInventories([inventory]);
    }
  }

  const onSuccessCreateDiscount = (discount: ProductDiscount) => {
    setDiscounts(current => [...current, discount]);
  }

  const onClickDeleteInventoryBtn = (deleteIndex: number) => {
    setInventories(
      inventories.filter((item, index) => index !== deleteIndex)
    );
  }

  const onClickDeleteDiscountBtn = (deleteIndex: number) => {
    setDiscounts(
      discounts.filter((item, index) => index !== deleteIndex)
    );
  }

  return (
    <>           
      {
        !product &&
          <ManageProductForm
            action={ManageActions.create}
            manageOnSubmit={false}
            onSubmitSuccess={onSuccessCreateProduct}
          />
      }
      
      {
        product &&
          <Container maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Created product
            </Typography>
            <ProductDetail
              product={product}
              created={false}
            />

            <Divider sx={{ my: 2 }} />

            <ManagePInventoryForm
              action={ManageActions.create}
              product={product}
              manageOnSubmit={false}
              onSubmitSuccess={onSuccessCreateInventory}
            />

            {
              inventories && inventories.length > 0 &&
                <>
                  <Grid container spacing={1} py={3}>
                    {inventories?.map((item, index) => (
                      <Grid item xs={6} key={index}>
                        <InventoryDetail
                          inventory={item}
                          created={false}
                        />
                        <Button 
                          variant="contained"  
                          startIcon={<DeleteIcon />}                    
                          onClick={() => onClickDeleteInventoryBtn(index)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    ))}
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <ManagePDiscountForm
                    action={ManageActions.create}
                    product={product}
                    manageOnSubmit={false}
                    onSubmitSuccess={onSuccessCreateDiscount}
                  />

                  {
                    discounts && discounts.length > 0 && 
                      <>
                        <Grid container spacing={1} py={3}>
                          {discounts?.map((item, index) => (
                            <Grid item xs={6} key={index}>
                              <DiscountDetail
                                discount={item}
                                created={false}
                              />
                              <Button 
                                variant="contained"  
                                startIcon={<DeleteIcon />}                    
                                onClick={() => onClickDeleteDiscountBtn(index)}
                              >
                                Delete
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                      </>
                  }

                  <Divider sx={{ my: 2 }} />

                  <Button
                    variant="contained"
                    onClick={onClickConfirmBtn}
                    sx={{  mb: 2 }}
                  >
                    Confirm creation
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
          </Container>
      }
    </>
  );
};

export default CreateProductSection;
