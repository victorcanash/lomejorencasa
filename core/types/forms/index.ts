import { MutableRefObject } from 'react';

import { FormikProps, FormikHelpers } from 'formik';

import { SxProps, Theme } from '@mui/material/styles';

import { FormFieldTypes } from '@core/constants/forms';
import type { FormatText } from '@core/types/texts';
import type { NavItem } from '@core/types/navigation';

{/* Element Single */}

export type FormField = {
  name: string,
  type: FormFieldTypes,
  required?: boolean,
  autoFocus?: boolean,
  autoComplete?: string,
  disabled?: boolean,
  min?: number,
  max?: number,
  adornment?: {
    value: string,
    position: 'start' | 'end',
  },
  menuItems?: {
    text?: FormatText,
    value: string | number,
  }[],
};

type FormButton = {
  text: FormatText,
  onClick: () => void,
  disabled?: boolean,
  sx?: SxProps<Theme>,
};

type FormSubmit = {
  text: FormatText,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>, dirty: boolean) => Promise<void>,
  disabled?: boolean,
  sx?: SxProps<Theme>,
};

{/* Element Groups */}

type FormFieldGroup = {
  avatarIcon?: JSX.Element,
  avatarBgColor?: string,
  titleTxt?: FormatText,
  descriptionTxt?: FormatText,
  formFields?: FormField[],
  formFieldsMb?: number,
  extraElements?: JSX.Element,
};

type FormButtons = {
  submit: FormSubmit,
};

type FormButtonsNormal = FormButtons & {
  delete?: FormButton & {
    confirm?: {
      enabled: boolean,
    },
  },
  cancel?: FormButton,
};

export type FormBase = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formikRef?: MutableRefObject<FormikProps<any> | null>,
  maxWidth?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: any,
  enableReinitialize?: boolean,
  validateOnMount?: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (event: any) => void,
  formFieldGroups?: FormFieldGroup[],
  formButtons?: FormButtonsNormal,
  successMsg?: string,
  errorMsg?: string,
  linksItems?: NavItem[],
};
