import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

import type { FormatText } from '@core/types/texts'

import BaseForm from '@core/components/forms/BaseForm'

interface ActivationFormProps {
  successMsg: string
  errorMsg: string
}

const ActivationForm = (props: ActivationFormProps) => {
  const { successMsg, errorMsg } = props

  const getDescriptionTxt = () => {
    let descriptionTxt: FormatText | undefined
    if (successMsg !== '') {
      descriptionTxt = {
        id: 'activation.successes.default'
      }
    } else if (errorMsg !== '') {
      if (errorMsg.includes('was already activated')) {
        descriptionTxt = {
          id: 'activation.errors.alreadyActivated'
        }
      } else if (errorMsg.includes('locked out')) {
        descriptionTxt = {
          id: 'activation.errors.lockedOut'
        }
      } else if (errorMsg.includes('Token is missing or has expirated')) {
        descriptionTxt = {
          id: 'activation.errors.invalidToken'
        }
      } else {
        descriptionTxt = {
          id: 'activation.errors.default'
        }
      }
    }
    if (descriptionTxt != null) {
      descriptionTxt.textAlign = 'center'
    }
    return descriptionTxt
  }

  return (
    <BaseForm
      formFieldGroups={[
        {
          avatarIcon: (successMsg !== '')
            ? <CheckCircleIcon fontSize="large" />
            : <ErrorIcon fontSize="large" />,
          avatarBgColor: 'transparent',
          titleTxt: {
            id: 'forms.activation.title',
            textAlign: 'center'
          },
          descriptionTxt: getDescriptionTxt()
        }
      ]}
    />
  )
}

export default ActivationForm
