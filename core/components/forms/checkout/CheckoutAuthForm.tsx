import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { FormFieldTypes } from '@core/constants/forms';
import type { AuthLogin } from '@core/types/auth';
import { convertElementToSx } from '@core/utils/themes';
import useForms from '@core/hooks/useForms';
import useAuth from '@core/hooks/useAuth';
import BaseForm from '@core/components/forms/BaseForm';

import { themeCustomElements } from '@lib/config/theme/elements';
import { pages } from '@lib/config/navigation.config';

const CheckoutAuthForm: NextPage = () => {
  const { loginFormValidation, userFieldsInitValues } = useForms();
  const { login, errorMsg } = useAuth();

  const handleLoginSubmit = async (values: AuthLogin) => {
    login(values, false);
  };

  const maxWidth = '600px';

  return (
    <>
      <Accordion
        sx={{
          ...themeCustomElements.forms?.accordion?.default ?
            convertElementToSx(themeCustomElements.forms.accordion.default) : undefined,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            ...themeCustomElements.forms?.accordion?.summary ?
              convertElementToSx(themeCustomElements.forms.accordion.summary) : undefined,
          }}
        >
          <Typography component="div" variant="body1Head">
            <FormattedMessage id="checkout.auth.title" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            ...themeCustomElements.forms?.accordion?.details ?
              convertElementToSx(themeCustomElements.forms.accordion.details) : undefined,
          }}
        >
          <BaseForm
            maxWidth={maxWidth}
            initialValues={{
              email: userFieldsInitValues.email,
              password: userFieldsInitValues.password,
              remember: userFieldsInitValues.remember,
            } as AuthLogin}
            validationSchema={loginFormValidation}
            formFieldGroups={[
              {
                descriptionTxt: {
                  id: 'checkout.auth.description',
                },
                formFields: [
                  {
                    name: 'email',
                    type: FormFieldTypes.text,
                    required: true,
                  },
                  {
                    name: 'password',
                    type: FormFieldTypes.password,
                    required: true,
                  },
                  {
                    name: 'remember',
                    type: FormFieldTypes.checkbox,
                  }
                ],
              }
            ]}
            formButtons={{
              submit: {
                text: {
                  id: 'forms.login.successBtn',
                },
                onSubmit: handleLoginSubmit,
              },
            }}
            errorMsg={errorMsg}
            linksItems={[
              {
                text: {
                  id: 'forms.login.forgotLink',
                },
                path: pages.forgot.path,
              },
              {
                text: {
                  id: 'forms.login.registerLink',
                },
                path: pages.register.path,
              }
            ]}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CheckoutAuthForm;