import { type ReactNode } from 'react'

import { useIntl } from 'react-intl'

import Link from '@core/components/navigation/Link'

import { pages } from '@lib/config/navigation.config'
import useAuth from '@core/hooks/useAuth'
import useCountdown from '@core/hooks/useCountdown'
import BaseForm from '@core/components/forms/BaseForm'

interface ResendActivationFormProps {
  email: string
  onClickProceedBtn?: () => void
}

const ResendActivationForm = (props: ResendActivationFormProps) => {
  const { email, onClickProceedBtn } = props

  const intl = useIntl()

  const { sendActivationEmail, errorMsg, successMsg } = useAuth()
  const { trigger, timeLeft, active } = useCountdown()

  const onSendActivationEmailSuccess = () => {
    trigger()
  }

  const handleSubmit = async () => {
    sendActivationEmail(email, onSendActivationEmailSuccess)
  }

  return (
    <BaseForm
      initialValues={{}}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.resendActivation.title'
          },
          descriptionTxt: {
            id: 'forms.resendActivation.description',
            values: {
              link: (...chunks: ReactNode[]) => (
                <Link href={pages.login.path} onClick={onClickProceedBtn}>
                  {chunks}
                </Link>
              ),
              email,
              resend: (timeLeft != null)
                ? intl.formatMessage({ id: 'forms.resendActivation.resendTime' }, { timeLeft })
                : intl.formatMessage({ id: 'forms.resendActivation.resendNow' })
            }
          }
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.resendActivation.successBtn'
          },
          onSubmit: handleSubmit,
          disabled: active
        }
      }}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  )
}

export default ResendActivationForm
