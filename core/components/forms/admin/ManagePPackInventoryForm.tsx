import { FormFieldTypes } from '@core/constants/forms';

import useForms from '@core/hooks/useForms';
import BaseForm from '@core/components/forms/BaseForm';

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
      }}
    />
  );
};

export default ManagePPackInventoryForm;
