import { FormFieldTypes } from '@core/constants/forms';

import type { FormButtonsNormal } from '@lib/types/forms';
import useForms from '@lib/hooks/useForms';
import BaseForm from '@components/forms/BaseForm';

type ManagePPackInventoryFormProps = {
  onSubmitSuccess: (id: number) => void,
};

const ManagePPackInventoryForm = (props: ManagePPackInventoryFormProps) => {
  const { onSubmitSuccess } = props;

  const { managePackInventoryFormValidation, packInventoryFieldsInitValues } = useForms();

  const handleSubmit = async (values: { id: number }) => {
    onSubmitSuccess(values.id)
  };

  return (
    <BaseForm 
      initialValues={packInventoryFieldsInitValues}
      validationSchema={managePackInventoryFormValidation}
      formFieldGroups={[
        {
          titleTxt: {
            id: 'forms.createPackInventory.title',
          },
          formFields: [
            {
              name: 'id',
              type: FormFieldTypes.numeric,
              required: true,
            }
          ],
        }
      ]}
      formButtons={{
        submit: {
          text: {
            id: 'forms.createPackInventory.successBtn',
          },
          onSubmit: handleSubmit,
        },
      } as FormButtonsNormal}
    />
  );
};

export default ManagePPackInventoryForm;
