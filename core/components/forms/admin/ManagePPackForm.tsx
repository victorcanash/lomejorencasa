import { useState } from 'react'

import { useIntl, FormattedMessage } from 'react-intl'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import { ManageActions } from '@core/constants/app'
import { FormFieldTypes } from '@core/constants/forms'
import type { ProductPack, Landing } from '@core/types/products'
import Button from '@core/components/inputs/Button'

import useForms from '@core/hooks/useForms'
import useAdminStore from '@core/hooks/useAdminStore'
import BaseForm from '@core/components/forms/BaseForm'
import ManagePPackInventoryForm from '@core/components/forms/admin/ManagePPackInventoryForm'

interface ManagePPackFormProps {
  action: ManageActions.create | ManageActions.update
  landing: Landing
  productPack?: ProductPack
  onSubmitSuccess?: (productPack: ProductPack) => void
  onDeleteSuccess?: () => void
  onCancel?: () => void
}

const ManagePPackForm = (props: ManagePPackFormProps) => {
  const {
    action,
    landing,
    productPack,
    onSubmitSuccess,
    onDeleteSuccess,
    onCancel
  } = props

  const intl = useIntl()

  const { managePackFormValidation, packFieldsInitValues } = useForms()
  const { manageProductPack, errorMsg, successMsg } = useAdminStore()

  const [inventoriesIds, setInventoriesIds] = useState<number[]>(productPack?.inventoriesIds ?? [])

  const onSuccessCreatePackInventory = (inventoryId: number) => {
    setInventoriesIds(current => [...current, inventoryId])
  }

  const onClickDeletePackInventoryBtn = (deleteIndex: number) => {
    setInventoriesIds(
      inventoriesIds.filter((_item, index) => index !== deleteIndex)
    )
  }

  const handleSubmit = async (values: ProductPack) => {
    const newPack: ProductPack = {
      ...values,
      inventoriesIds
    }
    if (action === ManageActions.create) {
      if (onSubmitSuccess != null) {
        onSubmitSuccess(newPack)
      }
    } else if (action === ManageActions.update) {
      void manageProductPack(action, landing, newPack, onSubmitSuccess)
    }
  }

  const handleDeleteBtn = () => {
    if (productPack != null) {
      void manageProductPack(ManageActions.delete, landing, productPack, onDeleteSuccess)
    }
  }

  const handleCancelBtn = () => {
    if (onCancel != null) {
      onCancel()
    }
  }

  const maxWidth = '500px'

  return (
    <>
      <BaseForm
        maxWidth={maxWidth}
        initialValues={{
          ...productPack,
          id: productPack?.id ?? -1,
          landingId: productPack?.landingId ?? landing.id,
          name: productPack?.name ?? packFieldsInitValues.name,
          description: productPack?.description ?? packFieldsInitValues.description,
          price: productPack?.price ?? packFieldsInitValues.price,
          image: productPack?.image ?? packFieldsInitValues.image,
          metaId: productPack?.metaId ?? packFieldsInitValues.metaId
        }}
        validationSchema={managePackFormValidation}
        enableReinitialize={true}
        formFieldGroups={[
          {
            titleTxt: {
              id: action === ManageActions.create
                ? 'forms.createPack.title'
                : 'forms.updatePack.title'
            },
            formFields: [
              {
                name: 'name.en',
                type: FormFieldTypes.text,
                required: true,
                autoFocus: true
              },
              {
                name: 'name.es',
                type: FormFieldTypes.text,
                required: true
              },
              {
                name: 'description.en',
                type: FormFieldTypes.text,
                required: true
              },
              {
                name: 'description.es',
                type: FormFieldTypes.text,
                required: true
              },
              {
                name: 'price',
                type: FormFieldTypes.decimal,
                required: true,
                adornment: {
                  value: '€',
                  position: 'end'
                }
              },
              {
                name: 'image',
                type: FormFieldTypes.text
              },
              {
                name: 'metaId',
                type: FormFieldTypes.text
              }
            ]
          }
        ]}
        formButtons={{
          submit: {
            text: {
              id: action === ManageActions.create
                ? 'forms.createPack.successBtn'
                : 'forms.updatePack.successBtn'
            },
            onSubmit: handleSubmit,
            disabled: (inventoriesIds.length < 1)
          },
          delete: action === ManageActions.update
            ? {
                text: {
                  id: 'app.deleteBtn'
                },
                onClick: handleDeleteBtn,
                confirm: {
                  enabled: true
                }
              }
            : undefined,
          cancel: {
            text: {
              id: 'app.cancelBtn'
            },
            onClick: handleCancelBtn
          }
        }}
        successMsg={successMsg}
        errorMsg={errorMsg}
      />

      <Box mt={3} />

      {/* Order Products */}
      <ManagePPackInventoryForm
        onSubmitSuccess={onSuccessCreatePackInventory}
      />
      { inventoriesIds.length > 0 &&
        <Box
          sx={{
            maxWidth,
            margin: 'auto'
          }}
        >
          <Typography component="h3" variant="body1" mt={3}>
            {`${intl.formatMessage({
 id: action === ManageActions.create
                ? 'forms.createPack.inventories'
: 'forms.updatePack.inventories'
            })}:`}
          </Typography>
          <Grid container spacing={1} pt={2} pb={5}>
            { inventoriesIds.map((item, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Typography component="div" variant="body1">
                  {`${intl.formatMessage({ id: 'forms.inventoryId' })}: ${item}`}
                </Typography>
                <Button
                  onClick={() => { onClickDeletePackInventoryBtn(index) }}
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
  )
}

export default ManagePPackForm
