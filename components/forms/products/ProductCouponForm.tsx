import { useCallback } from 'react';

import { FormFieldTypes } from '@core/constants/forms';
import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/constants/themes/elements';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@components/forms/BaseForm';

type ProductCouponFormProps = {
  disabled: boolean,
};

const ProductCouponForm = (props: ProductCouponFormProps) => {
  const {
    disabled,
  } = props;

  const { couponFormValidation, couponFieldsInitValues } = useForms();
  const { applyCoupon, errorMsg } = useAuth();

  const handleCouponSubmit = useCallback(async (_values: { couponCode: string }) => {
    applyCoupon();
  }, [applyCoupon]);

  return (
    <BaseForm
      initialValues={couponFieldsInitValues}
      validationSchema={couponFormValidation}
      formFieldGroups={[
        {
          formFields: [
            {
              name: 'couponCode',
              type: FormFieldTypes.text,
              required: true,
            },
          ],
          formFieldsMb: 1,
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'cart.coupon.successBtn',
          },
          disabled: disabled,
          onSubmit: handleCouponSubmit,
          sx: convertElementToSx(themeCustomElements.button.action.secondary),
        },
      }}
      errorMsg={errorMsg}
    />
  );
};

export default ProductCouponForm;
