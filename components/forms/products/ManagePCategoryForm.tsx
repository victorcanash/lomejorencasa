import { useState } from 'react';

import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { ManageActions } from '@core/constants/auth';
import { ProductCategory } from '@core/types/products';
import useProducts from '@lib/hooks/useProducts';
import useForms from '@lib/hooks/useForms';
import ConfirmDialog from '@components/dialogs/ConfirmDialog';

type ManagePCategoryFormProps = {
  action: ManageActions.create | ManageActions.update,
  productCategory?: ProductCategory,
  manageOnSubmit: boolean,
  onSubmitSuccess?: (productCategory: ProductCategory) => void,
  onDeleteSuccess?: () => void,
  onCancel?: () => void,
};

const ManagePCategoryForm = (props: ManagePCategoryFormProps) => {
  const { 
    action, 
    productCategory, 
    manageOnSubmit, 
    onSubmitSuccess, 
    onDeleteSuccess,
    onCancel, 
  } = props;

  const intl = useIntl();

  const { manageProductCategory, errorMsg, successMsg } = useProducts();
  const { manageCategoryFormValidation, categoryFieldsInitValues } = useForms();

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleSubmit = async (values: ProductCategory) => {
    if (manageOnSubmit) {
      manageProductCategory(action, values, onSubmitSuccess);
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
    if (productCategory) {
      manageProductCategory(ManageActions.delete, productCategory, onDeleteSuccess);
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
                id="forms.createCategory.title" 
              />
              :
              <FormattedMessage 
                id="forms.updateCategory.title" 
              />
          }
        </Typography>

        <Formik
          initialValues={{
            id: productCategory?.id || -1,
            name: productCategory?.name || categoryFieldsInitValues.name,
            description: productCategory?.description || categoryFieldsInitValues.description,
          } as ProductCategory}
          validationSchema={manageCategoryFormValidation}
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {
                  action == ManageActions.create ?
                    <FormattedMessage 
                      id="forms.createCategory.successBtn" 
                    />
                    :
                    <FormattedMessage 
                      id="forms.updateCategory.successBtn" 
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

export default ManagePCategoryForm;
