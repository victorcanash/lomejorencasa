import { useState } from 'react';

import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

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

  const intl = useIntl();

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
              <FormattedMessage 
                id="forms.createInventory.title" 
              />
              :
              <FormattedMessage 
                id="forms.updateInventory.title" 
              />
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
                label={intl.formatMessage({ id: "forms.sku" })}
                value={props.values.sku}
                onChange={props.handleChange}
                error={props.touched.sku && Boolean(props.errors.sku)}
                helperText={props.touched.sku && props.errors.sku}
              />

              {/* Name EN Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="name.en"
                name="name.en"
                autoComplete="name.en"        
                label={intl.formatMessage({ id: "forms.name.en" })}
                value={props.values.name.en}
                onChange={props.handleChange}
                error={props.touched.name?.en && Boolean(props.errors.name?.en)}
                helperText={props.touched.name?.en && props.errors.name?.en}
              />

              {/* Name ES Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="name.es"
                name="name.es"
                autoComplete="name.es"        
                label={intl.formatMessage({ id: "forms.name.es" })}
                value={props.values.name.es}
                onChange={props.handleChange}
                error={props.touched.name?.es && Boolean(props.errors.name?.es)}
                helperText={props.touched.name?.es && props.errors.name?.es}
              />

              {/* Description EN Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="description.en"
                name="description.en"
                autoComplete="description.en"        
                label={intl.formatMessage({ id: "forms.description.en" })}
                value={props.values.description.en}
                onChange={props.handleChange}
                error={props.touched.description?.en && Boolean(props.errors.description?.en)}
                helperText={props.touched.description?.en && props.errors.description?.en}
              />

              {/* Description ES Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="description.es"
                name="description.es"
                autoComplete="description.es"        
                label={intl.formatMessage({ id: "forms.description.es" })}
                value={props.values.description.es}
                onChange={props.handleChange}
                error={props.touched.description?.es && Boolean(props.errors.description?.es)}
                helperText={props.touched.description?.es && props.errors.description?.es}
              />

              {/* Price Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                name="price"
                autoComplete="price"
                label={intl.formatMessage({ id: "forms.price" })}
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
                    <FormattedMessage 
                      id="forms.createInventory.successBtn" 
                    />
                    :
                    <FormattedMessage 
                      id="forms.updateInventory.successBtn" 
                    />
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
                    <FormattedMessage 
                      id="forms.deleteBtn" 
                    />
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
                    <FormattedMessage 
                      id="app.cancelBtn" 
                    />
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
