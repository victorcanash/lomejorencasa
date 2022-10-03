import { useState } from 'react';
import { Formik, Form } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { productInventoryValidation, initProductInventoryValues } from '@core/constants/forms/products';
import { ManageActions } from '@core/constants/auth';
import { ProductInventory, Product } from '@core/types/products';
import useProducts from '@lib/hooks/useProducts';
import ConfirmDialog from '@components/dialogs/ConfirmDialog';

type ManagePInventoryFormProps = {
  action: ManageActions.create | ManageActions.update,
  product: Product,
  productInventory?: ProductInventory,
  manageOnSubmit: boolean,
  onSubmitSuccess?: (productInventory: ProductInventory) => void,
  onDeleteSuccess?: () => void,
};

const ManagePInventoryForm = (props: ManagePInventoryFormProps) => {
  const { 
    action, 
    product, 
    productInventory,
    manageOnSubmit, 
    onSubmitSuccess, 
    onDeleteSuccess 
  } = props;

  const { manageProductInventory, errorMsg, successMsg } = useProducts();

  const [checkedSize, setCheckedSize] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);

  const handleChangeCheckboxSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedSize(event.target.checked);
  };

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleSubmit = async (values: ProductInventory) => {
    if (checkedSize) {
      values.size = undefined;
    }
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
            id: productInventory?.id || initProductInventoryValues.id,
            productId: product.id,
            quantity: productInventory?.quantity || initProductInventoryValues.quantity,
            size: productInventory?.size || initProductInventoryValues.size,
          } as ProductInventory}
          validationSchema={productInventoryValidation}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form>

              {/* Quantity Field */}
              <TextField 
                margin="normal"
                required
                fullWidth
                id="quantity"
                name="quantity"
                autoComplete="quantity"
                label="Quantity"
                type="number"  
                inputProps={{
                  min: 0,
                }} 
                value={props.values.quantity}
                onChange={props.handleChange}
                error={props.touched.quantity && Boolean(props.errors.quantity)}
                helperText={props.touched.quantity && props.errors.quantity} 
              />

              {/* Size Field */}
              <FormControlLabel 
                control={
                  <Checkbox 
                    checked={checkedSize}
                    onChange={handleChangeCheckboxSize} 
                  />
                } 
                label="Unique size" 
              />
              {
                !checkedSize &&
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="size"
                    name="size"
                    autoComplete="size"        
                    label="Size"
                    value={props.values.size || ''}
                    onChange={props.handleChange}
                    error={props.touched.size && Boolean(props.errors.size)}
                    helperText={props.touched.size && props.errors.size}
                  />
              }

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
