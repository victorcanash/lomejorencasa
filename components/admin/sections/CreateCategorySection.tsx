import { useRouter } from 'next/router';

import { pages } from '@lib/constants/navigation';
import { AdminSections } from '@core/constants/admin';
import { ManageActions } from '@core/constants/auth';
import ManagePCategoryForm from '@components/forms/products/ManagePCategoryForm';

const CreateCategorySection = () => {
  const router = useRouter();

  const onSuccessManage = () => {
    router.push(`${pages.admin.path}?section=${AdminSections.home}`);
  }

  return (
    <>           
      <ManagePCategoryForm
        action={ManageActions.create}
        manageOnSubmit={true}
        onSubmitSuccess={onSuccessManage}
      />
    </>
  );
};

export default CreateCategorySection;
