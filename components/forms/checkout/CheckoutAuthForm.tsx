import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { FormFieldTypes } from '@core/constants/forms';
import type { AuthLogin } from '@core/types/auth';

import { pages } from '@lib/config/navigation.config';
import colors from '@lib/constants/themes/colors';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@components/forms/BaseForm';

const CheckoutAuthForm: NextPage = () => {
  const { loginFormValidation, userFieldsInitValues } = useForms();
  const { login, errorMsg } = useAuth();

  const handleLoginSubmit = async (values: AuthLogin) => {
    login(values, false);
  };

  const maxWidth = '600px';

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography component="div" variant="body1Head">
            <FormattedMessage id="checkout.auth.title" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: colors.background.primary }}>
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