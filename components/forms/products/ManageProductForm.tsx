import { useState, useRef } from 'react';

import { Formik, Form } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
import { UploadFile } from '@core/types/upload';
import { getProductImgUrl } from '@core/utils/products';
import { useSearchContext } from '@lib/contexts/SearchContext';
import useProducts from '@lib/hooks/useProducts';
import ConfirmDialog from '@components/dialogs/ConfirmDialog';
import ImagesDetail from '@components/admin/details/ImagesDetail';

type ManageProductFormProps = {
  action: ManageActions.create | ManageActions.update,
  product?: Product,
  onSubmitSuccess?: (product: Product, uploadImgs?: UploadFile[]) => void,
  onDeleteSuccess?: () => void,
  onCancel?: () => void,
};

const ManageProductForm = (props: ManageProductFormProps) => {
  const { 
    action, 
    product, 
    onSubmitSuccess, 
    onDeleteSuccess,
    onCancel,
  } = props;

  const { productCategories } = useSearchContext();

  const { validateProductImgs, updateProduct, deleteProduct, errorMsg, successMsg } = useProducts();

  const uploadImgsInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadImgs, setUploadImgs] = useState<UploadFile[]>([]);
  const [deleteExistingImgs, setDeleteExistingImgs] = useState<number[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  // on set files to the upload input we add it in uploadFiles
  const handleChangeUploadImgsInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        setUploadImgs(current => [...current, { 
          url: URL.createObjectURL(file),
          file: file,
        }]);
      })
    }
    if (uploadImgsInputRef.current) {
      uploadImgsInputRef.current.value = '';
    }
  };

  // on click the delete button from a uploaded img we remove it from uploadImgs
  const handleClickDeleteUploadImgBtn = (uploadImgIndex: number) => {
    setUploadImgs(
      uploadImgs.filter((_item, index) => index !== uploadImgIndex)
    );
  };

  // on click the delete button from an existing img we add its index in deleteExistingImgs
  const handleClickDeleteExistingImgBtn = (deleteExistingImg: number) => {
    setDeleteExistingImgs(current => [...current, deleteExistingImg]);
  };

  // on click the discard button from an existing img we remove its index from deleteExistingImgs
  const handleClickRecoverExistingImgBtn = (deleteExistingImg: number) => {
    setDeleteExistingImgs(
      deleteExistingImgs.filter((item) => item !== deleteExistingImg)
    );
  }

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleSubmit = async (values: Product) => {
    if (action == ManageActions.create) {
      validateProductImgs(values, uploadImgs, undefined, onSubmitSuccess);
    } else if (action == ManageActions.update) {
      updateProduct(values, uploadImgs, deleteExistingImgs, onSubmitSuccess);
    }
  };

  const handleClickDeleteBtn = () => {
    handleDialog();
  };

  const onConfirmDelete = () => {
    if (product) {
      deleteProduct(product, onDeleteSuccess);
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
            lowestPrice: product?.lowestPrice || initProductValues.lowestPrice,
            lowestRealPrice: product?.lowestRealPrice || initProductValues.lowestRealPrice,
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

              { uploadImgs && uploadImgs.length > 0 &&
                <>
                  <Typography component="h3" variant="subtitle1" sx={{ mt: 2 }}>
                    New images to upload:
                  </Typography>
                  <ImagesDetail
                    imgSources={uploadImgs.map((item) => { return item.url })}
                    getImgActionComponent={(srcImgIndex: number) => {
                      return (
                        <Button variant="contained" onClick={()=>handleClickDeleteUploadImgBtn(srcImgIndex)}>
                          Remove
                        </Button>
                      )
                    }}
                  />
                </>
              }
              <Button variant="contained" component="label" sx={{ mt: 2 }}>
                Upload new image
                <input ref={uploadImgsInputRef} hidden accept="image/*" multiple type="file" onChange={handleChangeUploadImgsInput} />
              </Button>

              { product?.imageNames && product?.imageNames.length > 0 &&
                <>
                  <Typography component="h3" variant="subtitle1" sx={{ mt: 2 }}>
                    Existing images:
                  </Typography>
                  <ImagesDetail
                    imgSources={product.imageNames.map((_item, index) => { return getProductImgUrl(product, index); })}
                    getImgActionComponent={(srcImgIndex: number) => {
                      const component = deleteExistingImgs.includes(srcImgIndex) ?
                        <>
                          <Typography component="div" variant="subtitle2">
                            Will be deleted
                          </Typography>
                          <Button variant="contained" onClick={()=>handleClickRecoverExistingImgBtn(srcImgIndex)}>
                            Recover
                          </Button>
                        </>
                      :
                        <Button variant="contained" onClick={()=>handleClickDeleteExistingImgBtn(srcImgIndex)}>
                          Delete
                        </Button>
                      return component;
                    }}
                  />
                </>
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

export default ManageProductForm;
