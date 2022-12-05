import { useState } from 'react';
import { Formik, Form } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { ManageActions } from '@core/constants/auth';
import { ProductInventory, Product } from '@core/types/products';
import useProducts from '@lib/hooks/useProducts';
import useForms from '@lib/hooks/useForms';
import ConfirmDialog from '@components/dialogs/ConfirmDialog';

type ManagePInventoryFormProps = {
  action: ManageActions.create | ManageActions.update,
  product: Product,
  productInventory?: ProductInventory,
  manageOnSubmit: boolean,
  onSubmitSuccess?: (productInventory: ProductInventory) => void,
  onDeleteSuccess?: () => void,
  onCancel?: () => void,
};

const ManagePInventoryForm = (props: ManagePInventoryFormProps) => {
  const { 
    action, 
    product, 
    productInventory,
    manageOnSubmit, 
    onSubmitSuccess, 
    onDeleteSuccess,
    onCancel,
  } = props;

  const { manageProductInventory, errorMsg, successMsg } = useProducts();
  const { manageInventoryFormValidation, inventoryFieldsInitValues } = useForms();

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleSubmit = async (values: ProductInventory) => {
    if (manageOnSubmit) {
      manageProductInventory(action, values, onSubmitSuccess);
    } else {
      if (onSubmitSuccess) {
        onSubmitSuccess(values);
      }
    }
  };

  const handleClickDeleteBtn = () => {
    handleDialog();
  };

  const onConfirmDelete = () => {
    if (productInventory) {
      manageProductInventory(ManageActions.delete, productInventory, onDeleteSuccess);
    }
  }

  const handleCancelBtn = () => {
    if (onCancel) {
      onCancel();
    }
  }

  return (
    <Container maxWidth="xs">

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography component="h1" variant="h5">
          {
            action == ManageActions.create ?
              'Create new product inventory' :
              'Update or delete the product inventory'
          }
        </Typography>

        <Formik
          initialValues={{
            id: productInventory?.id || -1,
            productId: product.id,
            sku: productInventory?.sku || inventoryFieldsInitValues.sku,
            name: productInventory?.name || inventoryFieldsInitValues.name,
            description: productInventory?.description || inventoryFieldsInitValues.description,
            price: productInventory?.price || inventoryFieldsInitValues.price,
            realPrice: productInventory?.realPrice || 0,
            bigbuy: {
              id: productInventory?.bigbuy.id || 0,
              name: productInventory?.bigbuy.name || '',
              description: productInventory?.bigbuy.description || '',
              price: productInventory?.bigbuy.price || 0,
              quantity: productInventory?.bigbuy.quantity || 0,
            },
            product: productInventory?.product || {} as Product,
          } as ProductInventory}
          validationSchema={manageInventoryFormValidation}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form>

               {/* SKU Field */}
               <TextField
                margin="normal"
                required
                fullWidth
                id="sku"
                name="sku"
                autoComplete="sku"        
                label="SKU"
                value={props.values.sku}
                onChange={props.handleChange}
                error={props.touched.sku && Boolean(props.errors.sku)}
                helperText={props.touched.sku && props.errors.sku}
              />

              {/* Name Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                autoComplete="name"        
                label="Name"
                value={props.values.name}
                onChange={props.handleChange}
                error={props.touched.name && Boolean(props.errors.name)}
                helperText={props.touched.name && props.errors.name}
              />

              {/* Description Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                name="description"
                autoComplete="description"        
                label="Description"
                value={props.values.description}
                onChange={props.handleChange}
                error={props.touched.description && Boolean(props.errors.description)}
                helperText={props.touched.description && props.errors.description}
              />

              {/* Price Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                name="price"
                autoComplete="price"
                label="Price"
                type="decimal"  
                InputProps={{
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }}
                inputProps={{
                  min: 0,
                  inputMode: 'decimal',
                }} 
                value={props.values.price}
                onChange={props.handleChange}
                error={props.touched.price && Boolean(props.errors.price)}
                helperText={props.touched.price && props.errors.price} 
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {
                  action == ManageActions.create ?
                    'Create' :
                    'Update'
                }
              </Button>

              {
                action == ManageActions.update &&
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    onClick={handleClickDeleteBtn}
                  >
                    Delete
                  </Button>
              }

              {
                onCancel &&
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    onClick={handleCancelBtn}
                  >
                    Cancel
                  </Button>
              }

              {
                errorMsg && errorMsg !== '' &&
                  <Alert severity="error">{ errorMsg }</Alert>
              } 
              {
                successMsg && successMsg !== '' &&
                  <Alert>{ successMsg }</Alert>
              }       

            </Form>
          )}
        </Formik>

      </Box>

      <ConfirmDialog
        open={openDialog}
        handleDialog={handleDialog}
        onConfirm={onConfirmDelete}
      />

    </Container>
  );
};

export default ManagePInventoryForm;
