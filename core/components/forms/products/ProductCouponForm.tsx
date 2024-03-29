import { useCallback } from 'react';

import { FormFieldTypes } from '@core/constants/forms';
import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/config/theme/elements';
import useForms from '@core/hooks/useForms';
import useAuth from '@core/hooks/useAuth';
import BaseForm from '@core/components/forms/BaseForm';

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
          sx: themeCustomElements.button?.action?.secondary ?
            convertElementToSx(themeCustomElements.button.action.secondary) : undefined,
        },
      }}
      errorMsg={errorMsg}
    />
  );
};

export default ProductCouponForm;
