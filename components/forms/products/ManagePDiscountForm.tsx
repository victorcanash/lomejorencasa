import { useState } from 'react';

import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { ManageActions } from '@core/constants/auth';
import { ProductDiscount, Product } from '@core/types/products';
import useProducts from '@lib/hooks/useProducts';
import useForms from '@lib/hooks/useForms';
import ConfirmDialog from '@components/dialogs/ConfirmDialog';

type ManagePDiscountFormProps = {
  action: ManageActions.create | ManageActions.update,
  product: Product,
  productDiscount?: ProductDiscount,
  manageOnSubmit: boolean,
  onSubmitSuccess?: (productDiscount: ProductDiscount) => void,
  onDeleteSuccess?: () => void,
  onCancel?: () => void,
};

const ManagePDiscountForm = (props: ManagePDiscountFormProps) => {
  const { 
    action, 
    product, 
    productDiscount,
    manageOnSubmit, 
    onSubmitSuccess, 
    onDeleteSuccess,
    onCancel,
  } = props;

  const intl = useIntl();

  const { manageProductDiscount, errorMsg, successMsg } = useProducts();
  const { manageDiscountFormValidation, discountFieldsInitValues } = useForms();

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

        <Typography component="h1" variant="h1">
          {
            action == ManageActions.create ?
              <FormattedMessage 
                id="forms.createDiscount.title" 
              />
              :
              <FormattedMessage 
                id="forms.updateDiscount.title" 
              />
          }
        </Typography>

        <Formik
          initialValues={{
            id: productDiscount?.id || -1,
            productId: product.id,
            name: productDiscount?.name || discountFieldsInitValues.name,
            description: productDiscount?.description || discountFieldsInitValues.description,
            discountPercent: productDiscount?.discountPercent || discountFieldsInitValues.discountPercent,
            active: productDiscount?.active || discountFieldsInitValues.active,
          } as ProductDiscount}
          validationSchema={manageDiscountFormValidation}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form>

              {/* Name EN Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="name.en"
                name="name.en"
                autoComplete="name.en"        
                label={intl.formatMessage({ id: "forms.name.en" })}
                autoFocus
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

              {/* Discount Percent Field */}
              <TextField 
                margin="normal"
                required
                fullWidth
                id="discountPercent"
                name="discountPercent"
                autoComplete="discountPercent"
                label={intl.formatMessage({ id: "forms.discountPercent" })}
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
                label={intl.formatMessage({ id: "forms.active" })}
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
                      id="forms.createDiscount.successBtn" 
                    />
                    :
                    <FormattedMessage 
                      id="forms.updateDiscount.successBtn" 
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
                      id="app.deleteBtn" 
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

export default ManagePDiscountForm;
