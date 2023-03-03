import { useState, useRef } from 'react';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { FormFieldTypes } from '@core/constants/forms';
import { ManageActions } from '@core/constants/auth';
import type { Product } from '@core/types/products';
import type { Source, UploadFile } from '@core/types/multimedia';

import type { FormButtonsNormal } from '@lib/types/forms';
import { useSearchContext } from '@lib/contexts/SearchContext';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import useForms from '@lib/hooks/useForms';
import useProducts from '@lib/hooks/useProducts';
import BaseForm from '@components/forms/BaseForm';
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
  const { getProductDetailImgsUrl } = useProductsContext();

  const { manageProductFormValidation, productFieldsInitValues } = useForms();
  const { validateProductImgs, updateProduct, deleteProduct, errorMsg, successMsg } = useProducts();

  const uploadImgsInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadImgs, setUploadImgs] = useState<UploadFile[]>([]);
  const [deleteExistingImgs, setDeleteExistingImgs] = useState<number[]>([]);

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
  };

  const handleSubmit = async (values: Product) => {
    if (action == ManageActions.create) {
      validateProductImgs(values, uploadImgs, undefined, onSubmitSuccess);
    } else if (action == ManageActions.update) {
      updateProduct(values, uploadImgs, deleteExistingImgs, onSubmitSuccess);
    }
  };

  const handleDeleteBtn = () => {
    if (product) {
      deleteProduct(product, onDeleteSuccess);
    }
  };

  const handleCancelBtn = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const maxWidth = '500px';

  return (
    <>
      <BaseForm
        maxWidth={maxWidth} 
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
        enableReinitialize={true}
        formFieldGroups={[
          {
            titleTxt: {
              id: action == ManageActions.create ? 
                'forms.createProduct.title' : 'forms.updateProduct.title',
            },
            formFields: [
              {
                name: 'categoryId',
                type: FormFieldTypes.select,
                required: true,
                menuItems: productCategories.map((category) => {
                  return {
                    text: {
                      id: "forms.categoryName",
                      values: {
                        name: category.name.current
                      }
                    },
                    value: category.id,
                  };
                }),
              },
              {
                name: 'name.en',
                type: FormFieldTypes.text,
                required: true,
              },
              {
                name: 'name.es',
                type: FormFieldTypes.text,
                required: true,
              },
              {
                name: 'description.en',
                type: FormFieldTypes.text,
                required: true,
              },
              {
                name: 'description.es',
                type: FormFieldTypes.text,
                required: true, 
              }
            ],
          }
        ]}
        formButtons={{
          submit: {
            text: { 
              id: action == ManageActions.create ?
                'forms.createProduct.successBtn' : 'forms.updateProduct.successBtn',
            },
            onSubmit: handleSubmit,
          },
          delete: action == ManageActions.update ? 
            { 
              text: {
                id: 'app.deleteBtn',
              },
              onClick: handleDeleteBtn,
              confirm: {
                enabled: true,
              },
            } : undefined,
          cancel: {
            text: {
              id: 'app.cancelBtn',
            },
            onClick: handleCancelBtn,
          },
        } as FormButtonsNormal}
        successMsg={successMsg}
        errorMsg={errorMsg}
      />

      <Box mt={3} />

      { uploadImgs && uploadImgs.length > 0 &&
        <Box 
          sx={{
            maxWidth: maxWidth, 
            margin: 'auto',
          }} 
          mb={2}
        >
          <Typography component="h3" variant="body1">
            <FormattedMessage 
              id="forms.manageProductImgs.newImgs" 
            />
          </Typography>
          <ImagesDetail
            sources={uploadImgs.map((item) => { 
              return { src: item.url } as Source;
            })}
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
        </Box>
      }

      <Box
        sx={{
          maxWidth: maxWidth,
          margin: 'auto',
        }}  
        mb={2}
      >
        <Button 
          variant="contained" 
          fullWidth
          component="label" 
        >
          <FormattedMessage 
            id="forms.manageProductImgs.upload" 
          />
          <input 
            ref={uploadImgsInputRef} 
            hidden 
            accept="image/*" 
            multiple 
            type="file" 
            onChange={handleChangeUploadImgsInput} 
          />
        </Button>
      </Box>

      { product?.imageNames && product?.imageNames.length > 0 &&
        <Box
          sx={{
            maxWidth: maxWidth,
            margin: 'auto',
          }}
        >
          <Typography component="h3" variant="body1">
            <FormattedMessage 
              id="forms.manageProductImgs.existingImgs" 
            />
          </Typography>
          <ImagesDetail
            sources={getProductDetailImgsUrl(product).map((item) => { 
              return { src: item } as Source;
            })}
            getImgActionComponent={(srcImgIndex: number) => {
              const component = deleteExistingImgs.includes(srcImgIndex) ?
                <>
                  <Typography component="div" variant="body2">
                    <FormattedMessage 
                      id="forms.manageProductImgs.deleted" 
                    />
                  </Typography>
                  <Button variant="contained" onClick={()=>handleClickRecoverExistingImgBtn(srcImgIndex)}>
                    <FormattedMessage 
                      id="app.recoverBtn" 
                    />
                  </Button>
                </>
              :
                <Button variant="contained" onClick={()=>handleClickDeleteExistingImgBtn(srcImgIndex)}>
                  <FormattedMessage 
                    id="app.deleteBtn" 
                  />
                </Button>
              return component;
            }}
          />
        </Box>
      }
    </>
  );
};

export default ManageProductForm;
