import type { NextPage } from 'next';

import { FormFieldTypes } from '@core/constants/forms';

import type { FormButtonsNormal } from '@lib/types/forms';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@components/forms/BaseForm';

const CheckoutCouponForm: NextPage = () => {
  const { couponFormValidation } = useForms();
  const { applyCoupon, errorMsg } = useAuth();

  const handleCouponSubmit = async (_values: { couponCode: string }) => {
    applyCoupon();
  };

  const maxWidth = '600px';

  return (
    <>
      <BaseForm
        maxWidth={maxWidth}
        initialValues={{
          couponCode: '',
        }}
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
        } as FormButtonsNormal}
        errorMsg={errorMsg}
      />
    </>
  );
};

export default CheckoutCouponForm;