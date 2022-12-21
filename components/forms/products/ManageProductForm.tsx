import { useState, useRef } from 'react';

import { Formik, Form } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { ManageActions } from '@core/constants/auth';
import { Product } from '@core/types/products';
import { UploadFile } from '@core/types/upload';
import { getProductImgUrl } from '@core/utils/products';
import { useSearchContext } from '@lib/contexts/SearchContext';
import useProducts from '@lib/hooks/useProducts';
import useForms from '@lib/hooks/useForms';
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

  const intl = useIntl();

  const { validateProductImgs, updateProduct, deleteProduct, errorMsg, successMsg } = useProducts();
  const { manageProductFormValidation, productFieldsInitValues } = useForms();

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
              <FormattedMessage 
                id="forms.createProduct.title" 
              />
              :
              <FormattedMessage 
                id="forms.updateProduct.title" 
              />
          }
        </Typography>

        <Formik
          initialValues={{
            id: product?.id || -1,
            categoryId: product?.categoryId || productCategories[0].id,
            name: product?.name || productFieldsInitValues.name,
            description: product?.description || productFieldsInitValues.description,
            lowestPrice: product?.lowestPrice || 0,
            lowestRealPrice: product?.lowestRealPrice || 0,
            imageNames: product?.imageNames || [],
            inventories: product?.inventories || [],
          } as Product}
          validationSchema={manageProductFormValidation}
          onSubmit={handleSubmit}
        >
          {props => (
            <Form>

              {/* Category ID Field */}
              <InputLabel id="categpory-select-label">
                <FormattedMessage 
                  id="forms.category" 
                />
              </InputLabel>
              <Select
                margin="dense"
                required
                fullWidth
                id="categoryId"
                name="categoryId"
                autoComplete="categoryId"
                labelId="category-select-label"
                label={intl.formatMessage({ id: "forms.category" })}
                autoFocus
                value={props.values.categoryId}
                onChange={props.handleChange}
                error={props.touched.categoryId && Boolean(props.errors.categoryId)}
              >
                { productCategories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name.current}
                  </MenuItem>
                ))}
              </Select>

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

              { uploadImgs && uploadImgs.length > 0 &&
                <>
                  <Typography component="h3" variant="subtitle1" sx={{ mt: 2 }}>
                    <FormattedMessage 
                      id="forms.manageProductImgs.newImgs" 
                    />
                  </Typography>
                  <ImagesDetail
                    imgSources={uploadImgs.map((item) => { return item.url })}
                    getImgActionComponent={(srcImgIndex: number) => {
                      return (
                        <Button variant="contained" onClick={()=>handleClickDeleteUploadImgBtn(srcImgIndex)}>
                          <FormattedMessage 
                            id="app.removeBtn" 
                          />
                        </Button>
                      )
                    }}
                  />
                </>
              }
              <Button variant="contained" component="label" sx={{ mt: 2 }}>
                <FormattedMessage 
                  id="forms.manageProductImgs.upload" 
                />
                <input ref={uploadImgsInputRef} hidden accept="image/*" multiple type="file" onChange={handleChangeUploadImgsInput} />
              </Button>

              { product?.imageNames && product?.imageNames.length > 0 &&
                <>
                  <Typography component="h3" variant="subtitle1" sx={{ mt: 2 }}>
                    <FormattedMessage 
                      id="forms.manageProductImgs.existingImgs" 
                    />
                  </Typography>
                  <ImagesDetail
                    imgSources={product.imageNames.map((_item, index) => { return getProductImgUrl(product, index); })}
                    getImgActionComponent={(srcImgIndex: number) => {
                      const component = deleteExistingImgs.includes(srcImgIndex) ?
                        <>
                          <Typography component="div" variant="subtitle2">
                            <FormattedMessage 
                              id="forms.manageProductImgs.deleted" 
                            />
                          </Typography>
                          <Button variant="contained" onClick={()=>handleClickRecoverExistingImgBtn(srcImgIndex)}>
                            <FormattedMessage 
                              id="forms.recoverBtn" 
                            />
                          </Button>
                        </>
                      :
                        <Button variant="contained" onClick={()=>handleClickDeleteExistingImgBtn(srcImgIndex)}>
                          <FormattedMessage 
                            id="forms.deleteBtn" 
                          />
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
                    <FormattedMessage 
                      id="forms.createProduct.successBtn" 
                    />
                    :
                    <FormattedMessage 
                      id="forms.updateProduct.successBtn" 
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

export default ManageProductForm;
