import { type ReactNode, useState } from 'react'

import { FormFieldTypes } from '@core/constants/forms'
import { ContactTypes } from '@core/constants/contact'
import type { User, UserContact } from '@core/types/user'
import { getContactTypeName } from '@core/utils/contact'
import Link from '@core/components/navigation/Link'

import { pages } from '@lib/config/navigation.config'
import { useAuthContext } from '@core/contexts/AuthContext'
import useForms from '@core/hooks/useForms'
import useUser from '@core/hooks/useUser'
import BaseForm from '@core/components/forms/BaseForm'

const UserResolutionsForm = () => {
  const { user, isLogged } = useAuthContext()

  const {
    userResolutionFormValidation,
    userFieldsInitValues,
    orderFieldsInitValues
  } = useForms()
  const { sendUserContactEmail, errorMsg, successMsg } = useUser()

  const [acceptPolicy, setAcceptPolicy] = useState(!!isLogged())

  const maxWidth = '500px'

  const handleSubmit = async (values: UserContact) => {
    void sendUserContactEmail(values)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    if (event.target.name === 'acceptPolicy') {
      setAcceptPolicy(event.target.checked)
    }
  }

  return (
    <BaseForm
      maxWidth={maxWidth}
      initialValues={{
        type: ContactTypes.refundOrder,
        email: user.email ?? userFieldsInitValues.email,
        firstName: (user as User)?.firstName !== '' ? (user as User)?.firstName : userFieldsInitValues.firstName,
        orderId: orderFieldsInitValues.bigbuyId,
        comments: userFieldsInitValues.comments,
        acceptPolicy: !!isLogged()
      }}
      validationSchema={userResolutionFormValidation}
      enableReinitialize={true}
      onChange={handleChange}
      formFieldGroups={[
        {
          descriptionTxt: {
            id: 'resolutions.description',
            values: {
              contactLink: (...chunks: ReactNode[]) => (
                <Link href={pages.contact.path}>
                  {chunks}
                </Link>
              )
            }
          },
          formFields: [
            {
              name: 'type',
              type: FormFieldTypes.select,
              required: true,
              menuItems: Object.keys(ContactTypes).filter((value) => getContactTypeName(value) !== ContactTypes.normal).map((typeKey) => {
                return {
                  text: {
                    id: `forms.selectContactType.${typeKey}`
                  },
                  value: getContactTypeName(typeKey)
                }
              })
            },
            {
              name: 'firstName',
              type: FormFieldTypes.text,
              required: true,
              disabled: isLogged()
            },
            {
              name: 'email',
              type: FormFieldTypes.text,
              required: true,
              disabled: isLogged()
            },
            {
              name: 'orderId',
              type: FormFieldTypes.text,
              required: true
            },
            {
              name: 'comments',
              type: FormFieldTypes.multiline,
              required: true
            },
            {
              name: 'acceptPolicy',
              type: FormFieldTypes.checkbox,
              disabled: isLogged()
            }
          ]
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'app.sendBtn'
          },
          onSubmit: handleSubmit,
          disabled: !acceptPolicy
        }
      }}
      linksItems={[
        {
          text: {
            id: 'resolutions.contactLink'
          },
          path: pages.contact.path
        }
      ]}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  )
}

export default UserResolutionsForm
