import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'

import { ManageActions } from '@core/constants/app'
import { FormFieldTypes } from '@core/constants/forms'
import type { Landing } from '@core/types/products'
import useForms from '@core/hooks/useForms'
import useAdminStore from '@core/hooks/useAdminStore'
import BaseForm from '@core/components/forms/BaseForm'

interface ManageLandingFormProps {
  action: ManageActions.create | ManageActions.update
  landing?: Landing
  onSubmitSuccess?: (landing: Landing) => void
  onDeleteSuccess?: () => void
  onCancel?: () => void
}

const ManageLandingForm = (props: ManageLandingFormProps) => {
  const {
    action,
    landing,
    onSubmitSuccess,
    onDeleteSuccess,
    onCancel
  } = props

  const { manageLandingFormValidation, landingFieldsInitValues } = useForms()
  const { manageLanding, errorMsg, successMsg } = useAdminStore()

  const [images, setImages] = useState<string[]>(landing?.images ?? [])
  const [tutorialSources, setTutorialSources] = useState<string[]>(landing?.tutorialSources ?? [])

  const handleSubmit = async (values: Landing) => {
    const newLanding: Landing = {
      ...landing,
      ...values,
      images,
      tutorialSources
    }
    if (action === ManageActions.create) {
      if (onSubmitSuccess != null) {
        onSubmitSuccess(newLanding)
      }
    } else if (action === ManageActions.update) {
      void manageLanding(action, newLanding, onSubmitSuccess)
    }
  }

  const handleDeleteBtn = () => {
    if (landing != null) {
      void manageLanding(ManageActions.delete, landing, onDeleteSuccess)
    }
  }

  const handleCancelBtn = () => {
    if (onCancel != null) {
      onCancel()
    }
  }

  const handleImageSubmit = async (values: { image: string }) => {
    setImages([
      ...images,
      values.image
    ])
  }

  const handleRemoveImgBtn = (index: number) => {
    setImages(
      images.filter((_image, indexImg) => index !== indexImg)
    )
  }

  const handleTutorialSrcSubmit = async (values: { tutorialSource: string }) => {
    setTutorialSources([
      ...tutorialSources,
      values.tutorialSource
    ])
  }

  const handleRemoveTutorialSrcBtn = (index: number) => {
    setTutorialSources(
      tutorialSources.filter((_tutorialSource, indexImg) => index !== indexImg)
    )
  }

  const maxWidth = '500px'

  return (
    <>
      <BaseForm
        maxWidth={maxWidth}
        initialValues={{
          id: landing?.id ?? -1,
          slug: landing?.slug ?? landingFieldsInitValues.slug,
          name: landing?.name ?? landingFieldsInitValues.name,
          description: landing?.description ?? landingFieldsInitValues.description,
          images: landing?.images ?? [],
          tutorialSources: landing?.tutorialSources ?? []
        }}
        validationSchema={manageLandingFormValidation}
        enableReinitialize={true}
        formFieldGroups={[
          {
            titleTxt: {
              id: action === ManageActions.create
                ? 'admin.createLandingBtn'
                : 'admin.updateLandingBtn'
            },
            formFields: [
              {
                name: 'name.en',
                type: FormFieldTypes.text,
                required: true
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
                name: 'slug',
                type: FormFieldTypes.text,
                required: true
              }
            ]
          }
        ]}
        formButtons={{
          submit: {
            text: {
              id: action === ManageActions.create
                ? 'forms.createProduct.successBtn'
                : 'forms.updateProduct.successBtn'
            },
            onSubmit: handleSubmit
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

      <Typography component="div" variant="body1" textAlign="center" mt={2}>
        <FormattedMessage
          id="forms.images"
        />
      </Typography>
      <BaseForm
        maxWidth={maxWidth}
        initialValues={{
          image: ''
        }}
        formFieldGroups={[
          {
            formFields: [
              {
                name: 'image',
                type: FormFieldTypes.text,
                required: true
              }
            ]
          }
        ]}
        formButtons={{
          submit: {
            text: {
              id: 'app.addBtn'
            },
            onSubmit: handleImageSubmit
          }
        }}
      />
      { images.map((image, index) => (
        <Box key={index}>
          <Typography component="div" variant="body1">
            {image}
          </Typography>
          <Button
            startIcon={<DeleteIcon />}
            onClick={() => { handleRemoveImgBtn(index) }}
          >
            <FormattedMessage
              id="app.removeBtn"
            />
          </Button>
        </Box>
      ))}

      <Typography component="div" variant="body1" textAlign="center" mt={2}>
        <FormattedMessage
          id="forms.tutorialSources"
        />
      </Typography>
      <BaseForm
        maxWidth={maxWidth}
        initialValues={{
          tutorialSource: ''
        }}
        formFieldGroups={[
          {
            formFields: [
              {
                name: 'tutorialSource',
                type: FormFieldTypes.text,
                required: true
              }
            ]
          }
        ]}
        formButtons={{
          submit: {
            text: {
              id: 'app.addBtn'
            },
            onSubmit: handleTutorialSrcSubmit
          }
        }}
      />
      { tutorialSources.map((tutorialSource, index) => (
        <Box key={index}>
          <Typography component="div" variant="body1">
            {tutorialSource}
          </Typography>
          <Button
            startIcon={<DeleteIcon />}
            onClick={() => { handleRemoveTutorialSrcBtn(index) }}
          >
            <FormattedMessage
              id="app.removeBtn"
            />
          </Button>
        </Box>
      ))}
    </>
  )
}

export default ManageLandingForm
