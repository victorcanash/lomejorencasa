import { useState } from 'react';
import { Formik, Form } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { productDiscountValidation, initProductDiscountValues } from '@core/constants/forms/products';
import { ManageActions } from '@core/constants/auth';
import { ProductDiscount, Product } from '@core/types/products';
import useProducts from '@lib/hooks/useProducts';
import ConfirmDialog from '@components/dialogs/ConfirmDialog';

type ManagePDiscountFormProps = {
  action: ManageActions.create | ManageActions.update,
  product: Product,
  productDiscount?: ProductDiscount,
  manageOnSubmit: boolean,
  onSubmitSuccess?: (productDiscount: ProductDiscount) => void,
  onDeleteSuccess?: () => void,
};

const ManagePDiscountForm = (props: ManagePDiscountFormProps) => {
  const { 
    action, 
    product, 
    productDiscount,
    manageOnSubmit, 
    onSubmitSuccess, 
    onDeleteSuccess 
  } = props;

  const { manageProductDiscount, errorMsg, successMsg } = useProducts();

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleSubmit = async (values: ProductDiscount) => {
    if (manageOnSubmit) {
      manageProductDiscount(action, values, onSubmitSuccess);
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
    if (productDiscount) {
      manageProductDiscount(ManageActions.delete, productDiscount, onDeleteSuccess);
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
              'Create new product discount' :
              'Update or delete the product discount'
          }
        </Typography>

        <Formik
          initialValues={{
            id: productDiscount?.id || initProductDiscountValues.id,
            productId: product.id,
            name: productDiscount?.name || initProductDiscountValues.name,
            description: productDiscount?.description || initProductDiscountValues.description,
            discountPercent: productDiscount?.discountPercent || initProductDiscountValues.discountPercent,
            active: productDiscount?.active || initProductDiscountValues.active,
          } as ProductDiscount}
          validationSchema={productDiscountValidation}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form>

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

              {/* Discount Percent Field */}
              <TextField 
                margin="normal"
                required
                fullWidth
                id="discountPercent"
                name="discountPercent"
                autoComplete="discountPercent"
                label="Discount Percent"
                type="decimal"  
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                inputProps={{
                  min: 0,
                  inputMode: 'decimal',
                }} 
                value={props.values.discountPercent}
                onChange={props.handleChange}
                error={props.touched.discountPercent && Boolean(props.errors.discountPercent)}
                helperText={props.touched.discountPercent && props.errors.discountPercent} 
              />

              {/* Active Field */}
              <FormControlLabel 
                control={
                  <Checkbox 
                    id="active"
                    name="active"
                    checked={props.values.active}
                    onChange={props.handleChange} 
                  />
                } 
                label="Active" 
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

export default ManagePDiscountForm;
