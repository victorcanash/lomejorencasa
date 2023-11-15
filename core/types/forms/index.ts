import { type FormEventHandler, type MutableRefObject } from 'react'

import { type FormikProps, type FormikHelpers } from 'formik'

import { type SxProps, type Theme } from '@mui/material/styles'

import { type FormFieldTypes } from '@core/constants/forms'
import type { FormatText } from '@core/types/texts'
import type { NavItem } from '@core/types/navigation'

/* Element Single */

export interface FormField {
  name: string
  type: FormFieldTypes
  required?: boolean
  autoFocus?: boolean
  autoComplete?: string
  disabled?: boolean
  min?: number
  max?: number
  adornment?: {
    value: string
    position: 'start' | 'end'
  }
  menuItems?: Array<{
    text?: FormatText
    value: string | number
  }>
}

interface FormButton {
  text: FormatText
  onClick: () => void
  disabled?: boolean
  sx?: SxProps<Theme>
}

interface FormSubmit {
  text: FormatText
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>, dirty: boolean) => Promise<void>
  disabled?: boolean
  sx?: SxProps<Theme>
}

/* Element Groups */

interface FormFieldGroup {
  avatarIcon?: JSX.Element
  avatarBgColor?: string
  titleTxt?: FormatText
  descriptionTxt?: FormatText
  formFields?: FormField[]
  formFieldsMb?: number
  extraElements?: JSX.Element
}

interface FormButtons {
  submit: FormSubmit
}

type FormButtonsNormal = FormButtons & {
  delete?: FormButton & {
    confirm?: {
      enabled: boolean
    }
  }
  cancel?: FormButton
}

export interface FormBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formikRef?: MutableRefObject<FormikProps<any> | null>
  maxWidth?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: any
  enableReinitialize?: boolean
  validateOnMount?: boolean
  onChange?: FormEventHandler<HTMLFormElement>
  formFieldGroups?: FormFieldGroup[]
  formButtons?: FormButtonsNormal
  successMsg?: string
  errorMsg?: string
  linksItems?: NavItem[]
}
