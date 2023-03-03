import { useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { FormFieldTypes } from '@core/constants/forms';
import { ManageActions } from '@core/constants/auth';
import type { ProductPack } from '@core/types/products';

import type { FormButtonsNormal } from '@lib/types/forms';
import useForms from '@lib/hooks/useForms';
import useProducts from '@lib/hooks/useProducts';
import BaseForm from '@components/forms/BaseForm';
import ManagePPackInventoryForm from '@components/forms/admin/ManagePPackInventoryForm';

type ManagePPackFormProps = {
  action: ManageActions.create | ManageActions.update,
  productPack?: ProductPack,
  onSubmitSuccess?: (productPack: ProductPack) => void,
  onDeleteSuccess?: () => void,
  onCancel?: () => void,
};

const ManagePPackForm = (props: ManagePPackFormProps) => {
  const { 
    action,
    productPack,
    onSubmitSuccess, 
    onDeleteSuccess,
    onCancel, 
  } = props;

  const intl = useIntl();

  const { managePackFormValidation, packFieldsInitValues } = useForms();
  const { manageProductPack, errorMsg, successMsg } = useProducts();

  const [inventoryIds, setInventoryIds] = useState<number[]>(productPack?.inventoriesIds || []);

  const onSuccessCreatePackInventory = (inventoryId: number) => {
    setInventoryIds(current => [...current, inventoryId]);
  };

  const onClickDeletePackInventoryBtn = (deleteIndex: number) => {
    setInventoryIds(
      inventoryIds.filter((_item, index) => index !== deleteIndex)
    );
  };

  const handleSubmit = async (values: ProductPack) => {
    if (inventoryIds && inventoryIds.length > 0) {
      manageProductPack(action, {
        ...values,
        inventoriesIds: inventoryIds,
      }, onSubmitSuccess);
    }
  };

  const handleDeleteBtn = () => {
    if (productPack) {
      manageProductPack(ManageActions.delete, productPack, onDeleteSuccess);
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
          id: productPack?.id || -1,
          name: productPack?.name || packFieldsInitValues.name,
          description: productPack?.description || packFieldsInitValues.description,
          price: productPack?.price || packFieldsInitValues.price,
          quantity: productPack?.quantity || 0,
          originalPrice: productPack?.originalPrice || 0,
          inventories: productPack?.inventories || [],
          inventoriesIds: productPack?.inventoriesIds || [],
        } as ProductPack}
        validationSchema={managePackFormValidation}
        enableReinitialize={true}
        formFieldGroups={[
          {
            titleTxt: {
              id: action == ManageActions.create ? 
                'forms.createPack.title' : 'forms.updatePack.title',
            },
            formFields: [
              {
                name: 'name.en',
                type: FormFieldTypes.text,
                required: true,
                autoFocus: true,
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
              },
              {
                name: 'price',
                type: FormFieldTypes.decimal,
                required: true,
                adornment: {
                  value: '€',
                  position: 'end',
                },
              }
            ],
          }
        ]}
        formButtons={{
          submit: {
            text: { 
              id: action == ManageActions.create ?
                'forms.createPack.successBtn' : 'forms.updatePack.successBtn',
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

      {/* Order Products */}
      <ManagePPackInventoryForm
        onSubmitSuccess={onSuccessCreatePackInventory}
      />
      { inventoryIds && inventoryIds.length > 0 &&
        <Box
          sx={{
            maxWidth: maxWidth,
            margin: 'auto',
          }}
        >
          <Typography component="h3" variant="body1" mt={3}>
            {`${intl.formatMessage({ id: action == ManageActions.create ?
                'forms.createPack.inventories' : 'forms.updatePack.inventories' 
            })}:`}
          </Typography>
          <Grid container spacing={1} pt={2} pb={5}>
            { inventoryIds.map((item, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Typography component="div" variant="body1">
                  {`${intl.formatMessage({ id: "forms.inventoryId" })}: ${item}`}
                </Typography>
                <Button 
                  variant="contained"
                  onClick={() => onClickDeletePackInventoryBtn(index)}
                >
                  <FormattedMessage 
                    id="app.deleteBtn" 
                  />
                </Button> 
              </Grid>
            ))}
          </Grid>
        </Box>
      }
    </>
  );
};

export default ManagePPackForm;
