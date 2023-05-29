import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { FormFieldTypes } from '@core/constants/forms';

import colors from '@lib/constants/themes/colors';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@core/components/forms/BaseForm';

const CheckoutCouponForm: NextPage = () => {
  const { couponFormValidation, couponFieldsInitValues } = useForms();
  const { applyCoupon, errorMsg } = useAuth();

  const handleCouponSubmit = async (_values: { couponCode: string }) => {
    applyCoupon();
  };

  const maxWidth = '600px';

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography component="div" variant="body1Head">
            <FormattedMessage id="checkout.coupon.title" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: colors.background.primary }}>
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