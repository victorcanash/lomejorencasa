import { Dispatch, SetStateAction, useState } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

import { AdminSections } from '@core/constants/admin';
import { ManageActions } from '@core/constants/auth';
import { Product, ProductInventory, ProductDiscount } from '@core/types/products';
import { useSearchContext } from '@lib/contexts/SearchContext';
import useProducts from '@lib/hooks/useProducts';
import ManageProductForm from '@components/forms/products/ManageProductForm';
import ManagePInventoryForm from '@components/forms/products/ManagePInventoryForm';
import ManagePDiscountForm from '@components/forms/products/ManagePDiscountForm';

type CreateProductSectionProps = {
  setSection: Dispatch<SetStateAction<AdminSections>>,
};

const CreateProductSection = (props: CreateProductSectionProps) => {
  const { setSection } = props;

  const { productCategories } = useSearchContext();

  const { createAllProduct, errorMsg, successMsg } = useProducts();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [productInventories, setProductInventories] = useState<ProductInventory[]>([]);
  const [productDiscounts, setProductDiscounts] = useState<ProductDiscount[]>([]);

  const handleClickBackBtn = () => {
    setSection(AdminSections.home);
  }

  const handleClickConfirmBtn = () => {
    if (product && productInventories && productInventories.length > 0) {
      createAllProduct(product, productInventories, productDiscounts, onSuccessManage);
    }
  }

  const onSuccessManage = () => {
    setSection(AdminSections.home);
  }

  const onSuccessCreateProduct = (product: Product) => {
    setProduct(product);
  }

  const onSuccessCreatePInventory = (productInventory: ProductInventory) => {
    if (productInventory.size) {
      // Then cannot be an inventory with unique size
      setProductInventories(
        productInventories.filter(item => item.size)
      );
      setProductInventories(current => [...current, productInventory]);
    } else { 
      // Inventory with unique size
      setProductInventories([productInventory]);
    }
  }

  const onSuccessCreatePDiscount = (productDiscount: ProductDiscount) => {
    setProductDiscounts(current => [...current, productDiscount]);
  }

  const onClickDeletePInventoryBtn = (deleteIndex: number) => {
    setProductInventories(
      productInventories.filter((item, index) => index !== deleteIndex)
    );
  }

  const onClickDeletePDiscountBtn = (deleteIndex: number) => {
    setProductDiscounts(
      productDiscounts.filter((item, index) => index !== deleteIndex)
    );
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
            <Typography component="div" variant="subtitle1">
              {`Name: ${product.name}`}
            </Typography>
            <Typography component="div" variant="subtitle1">
              {`Description: ${product.description}`}
            </Typography>
            <Typography component="div" variant="subtitle1">
              {`Category: ${productCategories.filter((item) => item.id == product.categoryId)[0]?.name}`}
            </Typography>
            <Typography component="div" variant="subtitle1">
              {`SKU: ${product.sku}`}
            </Typography>
            <Typography component="div" variant="subtitle1">
              {`Price: ${product.price}`}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <ManagePInventoryForm
              action={ManageActions.create}
              product={product}
              manageOnSubmit={false}
              onSubmitSuccess={onSuccessCreatePInventory}
            />

            {
              productInventories && productInventories.length > 0 &&
                <>
                  <Grid container spacing={1} py={3}>
                    {productInventories?.map((item, index) => (
                      <Grid item xs={6} key={index}>
                        <Typography component="div" variant="subtitle1">
                          {`Quantity: ${item.quantity}`}
                        </Typography>
                        <Typography component="div" variant="subtitle1">
                          {`Size: ${item.size || 'Unique size'}`}
                        </Typography>
                        <Button 
                          variant="contained"  
                          startIcon={<DeleteIcon />}                    
                          onClick={() => onClickDeletePInventoryBtn(index)}
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
                    onSubmitSuccess={onSuccessCreatePDiscount}
                  />

                  {
                    productDiscounts && productDiscounts.length > 0 && 
                      <>
                        <Grid container spacing={1} py={3}>
                          {productDiscounts?.map((item, index) => (
                            <Grid item xs={6} key={index}>
                              <Typography component="div" variant="subtitle1">
                                {`Name: ${item.name}`}
                              </Typography>
                              <Typography component="div" variant="subtitle1">
                                {`Description: ${item.description}`}
                              </Typography>
                              <Typography component="div" variant="subtitle1">
                                {`Discount percent: ${item.discountPercent} %`}
                              </Typography>
                              <Typography component="div" variant="subtitle1">
                                {`Active: ${item.active}`}
                              </Typography>
                              <Button 
                                variant="contained"  
                                startIcon={<DeleteIcon />}                    
                                onClick={() => onClickDeletePDiscountBtn(index)}
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
                    onClick={handleClickConfirmBtn}
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
