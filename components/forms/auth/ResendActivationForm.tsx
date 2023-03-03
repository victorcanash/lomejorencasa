import { ReactNode } from 'react';

import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';

import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import type { FormButtonsNormal } from '@lib/types/forms';
import useAuth from '@lib/hooks/useAuth';
import useCountdown from '@lib/hooks/useCountdown';
import BaseForm from '@components/forms/BaseForm';

type ResendActivationFormProps = {
  email: string,
  onClickProceedBtn?: () => void,
};

const ResendActivationForm = (props: ResendActivationFormProps) => {
  const { email, onClickProceedBtn } = props;

  const { sendActivationEmail, errorMsg, successMsg } = useAuth();
  const { trigger, timeLeft, active } = useCountdown();

  const onSendActivationEmailSuccess = () => {
    trigger();
  };

  const handleSubmit = async () => {
    sendActivationEmail(email, onSendActivationEmailSuccess);
  };

  return (
    <BaseForm
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.resendActivation.title',
          },
          descriptionTxt: {
            id: 'forms.resendActivation.description',
            values: {
              'link': (...chunks: ReactNode[]) => (
                <Link href={pages.login.path} onClick={onClickProceedBtn}>
                  {chunks}
                </Link>
              ),
              email,
            },
          },
          extraElements: 
            <Typography component="h3" variant="body1" sx={{ mt: 2 }}>
              <FormattedMessage 
                id="forms.resendActivation.received" 
              />
              {" "}
              { timeLeft ?
                <FormattedMessage 
                  id="forms.resendActivation.resendTime"
                  values={{ timeLeft }}
                />
                :
                <FormattedMessage 
                  id="forms.resendActivation.resendNow"
                />
              }
            </Typography>
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.resendActivation.successBtn',
          },
          onSubmit: handleSubmit,
          disabled: active,
        },
      } as FormButtonsNormal}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  );
};

export default ResendActivationForm;
