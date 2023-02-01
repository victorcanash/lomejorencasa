import { FormikHelpers } from 'formik';

import { FormFieldTypes } from '@core/constants/forms';
import type { FormatText } from '@core/types/texts';

export type FormField = {
  name: string,
  type: FormFieldTypes,
  required?: boolean,
  autoFocus?: boolean,
  autoComplete?: string,
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

export type FormButton = {
  text: FormatText,
  onClick: () => void,
  disabled?: boolean,
};

export type FormSubmit = {
  text: FormatText,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>, dirty: boolean) => Promise<void>,
  disabled?: boolean,
};