import { forwardRef } from 'react';

import { FormattedMessage } from 'react-intl';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import { FormFieldTypes } from '@core/constants/forms';

import type { FormButtonsCheckout } from '@lib/types/forms';
import useForms from '@lib/hooks/useForms';
import BaseForm from '@components/forms/BaseForm';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type CheckoutEmailDialogProps = {
  open: boolean,
  handleDialog: () => void,
  onSend: (email: string) => void,
};

const CheckoutEmailDialog = (props: CheckoutEmailDialogProps) => {
  const { 
    open,
    handleDialog,
    onSend, 
  } = props;

  const { checkoutConfirmFormValidation, userFieldsInitValues } = useForms();

  const handleBack = () => {
    handleDialog();
  }

  const handleSubmit = async (values: { email: string }) => {
    handleDialog();
    onSend(values.email)
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialog}
      aria-describedby="checkout-email-dialog"
    >
      <DialogTitle>
        <FormattedMessage id="dialogs.checkoutEmail.title" />
      </DialogTitle>
      <DialogContent>
        <BaseForm
          initialValues={{
            email: userFieldsInitValues.email,
          }}
          validationSchema={checkoutConfirmFormValidation}
          formFieldGroups={[
            {
              descriptionTxt: {
                id: 'dialogs.checkoutEmail.content',
              },
              formFields: [
                {
                  name: 'email',
                  type: FormFieldTypes.text,
                  required: true,
                }
              ],
            }
          ]}
          formButtons={{
            submit: {
              text: { 
                id: 'dialogs.checkoutEmail.sendBtn',
              },
              onSubmit: handleSubmit,
            },
            back: {
              text: { 
                id: 'dialogs.checkoutEmail.cancelBtn',
              },
              onClick: handleBack,
            },
          } as FormButtonsCheckout}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutEmailDialog;
