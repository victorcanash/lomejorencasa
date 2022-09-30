import { useState } from 'react';
import { Formik, Form } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { productCategoryValidation, initProductCategoryValues } from '@core/constants/forms/products';
import { ManageActions } from '@core/constants/auth';
import { ProductCategory } from '@core/types/products';
import useProducts from '@lib/hooks/useProducts';
import ConfirmDialog from '@components/dialogs/ConfirmDialog';

type ManagePCategoryFormProps = {
  action: ManageActions.create | ManageActions.update,
  productCategory?: ProductCategory,
};

const ManagePCategoryForm = (props: ManagePCategoryFormProps) => {
  const { action, productCategory } = props;

  const { manageProductCategory, errorMsg, successMsg } = useProducts();

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleSubmit = async (values: ProductCategory) => {
    manageProductCategory(action, values);
  };

  const handleClickDeleteBtn = () => {
    handleDialog();
  };

  const onConfirmDelete = () => {
    if (productCategory) {
      manageProductCategory(ManageActions.delete, productCategory);
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
              'Create new product category' :
              'Update or delete the product category'
          }
        </Typography>

        <Formik
          initialValues={{
            id: productCategory?.id || initProductCategoryValues.id,
            name: productCategory?.name || initProductCategoryValues.name,
            description: productCategory?.description || initProductCategoryValues.description,
          } as ProductCategory}
          validationSchema={productCategoryValidation}
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
                label="Description"
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

export default ManagePCategoryForm;
