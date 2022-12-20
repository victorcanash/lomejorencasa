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

              {/* Name Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                autoComplete="name"        
                label={intl.formatMessage({ id: "forms.name" })}
                autoFocus
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
                label={intl.formatMessage({ id: "forms.description" })}
                value={props.values.description}
                onChange={props.handleChange}
                error={props.touched.description && Boolean(props.errors.description)}
                helperText={props.touched.description && props.errors.description}
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
