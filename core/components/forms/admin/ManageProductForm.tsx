import { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@core/components/inputs/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import { ManageActions } from '@core/constants/app';
import { FormFieldTypes } from '@core/constants/forms';
import type { Landing, Product, ProductCategory } from '@core/types/products';
import { useAdminContext } from '@core/contexts/AdminContext';
import useForms from '@core/hooks/useForms';
import useProducts from '@core/hooks/useProducts';
import BaseForm from '@core/components/forms/BaseForm';

type ManageProductFormProps = {
  action: ManageActions.create | ManageActions.update,
  category?: ProductCategory,
  landing: Landing,
  product?: Product,
  onSubmitSuccess?: (product: Product) => void,
  onDeleteSuccess?: () => void,
  onCancel?: () => void,
};

const ManageProductForm = (props: ManageProductFormProps) => {
  const {
    action,
    category,
    landing,
    product,
    onSubmitSuccess,
    onDeleteSuccess,
    onCancel,
  } = props;

  const { checkCategories } = useAdminContext();

  const { manageProductFormValidation, productFieldsInitValues } = useForms();
  const { manageProduct, errorMsg, successMsg } = useProducts();

  const [categoriesFromProduct, setCategoriesFromProduct] = useState<ProductCategory[]>(
    action === ManageActions.create && category ?
      [category] : product?.categories || [],
  );

  const handleSubmit = async (values: Product) => {
    const newProduct = {
      ...values,
      categories: categoriesFromProduct,
    } as Product;
    if (action == ManageActions.create) {
      if (onSubmitSuccess) {
        onSubmitSuccess(newProduct);
      }
    } else if (action == ManageActions.update) {
      manageProduct(action, newProduct, onSubmitSuccess);
    }
  };

  const handleDeleteBtn = () => {
    if (product) {
      manageProduct(ManageActions.delete, product, onDeleteSuccess);
    }
  };

  const handleCancelBtn = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleCategorySubmit = async (values: {categoryId: number}) => {
    const existsCategory = categoriesFromProduct.find((categoryItem) => categoryItem.id === values.categoryId);
    if (existsCategory) {
      return;
    }
    const addCategory = checkCategories.find((checkCategory) => checkCategory.category.id === values.categoryId)?.category;
    if (addCategory) {
      setCategoriesFromProduct([
        ...categoriesFromProduct,
        addCategory,
      ]);
    }
  };

  const handleRemoveCategoryBtn = (index: number) => {
    setCategoriesFromProduct(
      categoriesFromProduct.filter((_categoryItem, indexImg) => index !== indexImg)
    );
  };

  const maxWidth = '500px';

  return (
    <>
      <BaseForm
        maxWidth={maxWidth} 
        initialValues={{
          ...product,
          id: product?.id || -1,
          landingId: product?.landingId || landing.id,
          name: product?.name || productFieldsInitValues.name,
          description: product?.description || productFieldsInitValues.description,
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
            disabled: (categoriesFromProduct.length < 1),
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
        }}
        successMsg={successMsg}
        errorMsg={errorMsg}
      />

      <Typography component="div" variant="body1" textAlign="center" mt={2}>
        <FormattedMessage
          id="forms.categories"
        />
      </Typography>
      <BaseForm
        maxWidth={maxWidth} 
        initialValues={{
          categoryId: checkCategories[0].category.id,
        }}
        formFieldGroups={[
          {
            formFields: [
              {
                name: 'categoryId',
                type: FormFieldTypes.select,
                required: true,
                menuItems: checkCategories.map((checkcategory) => {
                  return {
                    text: {
                      id: 'forms.categoryName',
                      values: {
                        name: checkcategory.category.name.current
                      }
                    },
                    value: checkcategory.category.id,
                  };
                }),
              },
            ],
          }
        ]}
        formButtons={{
          submit: {
            text: {
              id: 'app.addBtn',
            },
            onSubmit: handleCategorySubmit,
          },
        }}
      />
      { categoriesFromProduct.map((categoryItem, index) => (
        <Box key={index}>
          <Typography component="div" variant="body1">
            {categoryItem.name.current}
          </Typography>
          <Button
            startIcon={<DeleteIcon />}
            onClick={() => handleRemoveCategoryBtn(index)}
          >
            <FormattedMessage
              id="app.removeBtn"
            />
          </Button>
        </Box>
      ))}
    </>
  );
};

export default ManageProductForm;
