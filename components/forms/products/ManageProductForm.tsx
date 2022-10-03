import { useState } from 'react';
import { Formik, Form } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { productValidation, initProductValues } from '@core/constants/forms/products';
import { ManageActions } from '@core/constants/auth';
import { Product } from '@core/types/products';
import { useSearchContext } from '@lib/contexts/SearchContext';
import useProducts from '@lib/hooks/useProducts';
import ConfirmDialog from '@components/dialogs/ConfirmDialog';

type ManageProductFormProps = {
  action: ManageActions.create | ManageActions.update,
  product?: Product,
  manageOnSubmit: boolean,
  onSubmitSuccess?: (product: Product) => void,
  onDeleteSuccess?: () => void,
};

const ManageProductForm = (props: ManageProductFormProps) => {
  const { 
    action, 
    product, 
    manageOnSubmit, 
    onSubmitSuccess, 
    onDeleteSuccess 
  } = props;

  const { productCategories } = useSearchContext();

  const { manageProduct, errorMsg, successMsg } = useProducts();

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleSubmit = async (values: Product) => {
    if (manageOnSubmit) {
      manageProduct(action, values, onSubmitSuccess);
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
    if (product) {
      manageProduct(ManageActions.delete, product, onDeleteSuccess);
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
              'Create new product' :
              'Update or delete the product'
          }
        </Typography>

        <Formik
          initialValues={{
            id: product?.id || initProductValues.id,
            categoryId: product?.categoryId || productCategories[0].id,
            name: product?.name || initProductValues.name,
            description: product?.description || initProductValues.description,
            sku: product?.sku || initProductValues.sku,
            price: product?.price || initProductValues.price,
            realPrice: product?.realPrice || initProductValues.realPrice,
            imageNames: product?.imageNames || initProductValues.imageNames,
            inventories: product?.inventories || initProductValues.inventories,
          } as Product}
          validationSchema={productValidation}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form>

              {/* Category ID Field */}
              <InputLabel id="categpory-select-label">Category</InputLabel>
              <Select
                margin="dense"
                required
                fullWidth
                id="categoryId"
                name="categoryId"
                autoComplete="categoryId"
                labelId="category-select-label"
                label="Category"
                autoFocus
                value={props.values.categoryId}
                onChange={props.handleChange}
                error={props.touched.categoryId && Boolean(props.errors.categoryId)}
              >
                { productCategories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>

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

export default ManageProductForm;
