import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { FormFieldTypes } from '@core/constants/forms';
import { convertElementToSx } from '@core/utils/themes';
import useForms from '@core/hooks/useForms';
import useAuth from '@core/hooks/useAuth';
import BaseForm from '@core/components/forms/BaseForm';

import { themeCustomElements } from '@lib/config/theme/elements';

const CheckoutCouponForm: NextPage = () => {
  const { couponFormValidation, couponFieldsInitValues } = useForms();
  const { applyCoupon, errorMsg } = useAuth();

  const handleCouponSubmit = async (_values: { couponCode: string }) => {
    applyCoupon();
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
            <FormattedMessage id="checkout.coupon.title" />
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
            initialValues={couponFieldsInitValues}
            validationSchema={couponFormValidation}
            formFieldGroups={[
              {
                descriptionTxt: {
                  id: 'checkout.coupon.description',
                },
                formFields: [
                  {
                    name: 'couponCode',
                    type: FormFieldTypes.text,
                    required: true,
                  },
                ],
              }
            ]}
            formButtons={{
              submit: {
                text: {
                  id: 'checkout.coupon.successBtn',
                },
                onSubmit: handleCouponSubmit,
              },
            }}
            errorMsg={errorMsg}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CheckoutCouponForm;