import { useRouter } from 'next/router'

import useAuth from '@core/hooks/useAuth'
import BaseForm from '@core/components/forms/BaseForm'

const ConfirmNewEmailForm = () => {
  const router = useRouter()
  const { updateEmail, errorMsg, successMsg } = useAuth()

  const handleSubmit = async () => {
    const updateToken = typeof router.query.token === 'string' ? router.query.token : ''
    void updateEmail(updateToken)
  }

  return (
    <BaseForm
      initialValues={{}}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.confirmNewEmail.title',
            textAlign: 'center'
          },
          descriptionTxt: {
            id: 'forms.confirmNewEmail.description',
            textAlign: 'center'
          }
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.confirmNewEmail.successBtn'
          },
          onSubmit: handleSubmit
        }
      }}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  )
}

export default ConfirmNewEmailForm
