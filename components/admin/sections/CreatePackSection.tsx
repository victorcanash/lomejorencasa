import { useRouter } from 'next/router';

import { AdminSections } from '@core/constants/admin';
import { ManageActions } from '@core/constants/auth';

import { pages } from '@lib/constants/navigation';
import ManagePPackForm from '@components/forms/admin/ManagePPackForm';

const CreatePackSection = () => {
  const router = useRouter();

  const onSuccessManage = () => {
    router.push(`${pages.admin.path}?section=${AdminSections.home}`);
  }

  return (
    <>           
      <ManagePPackForm
        action={ManageActions.create}
        onSubmitSuccess={onSuccessManage}
      />
    </>
  );
};

export default CreatePackSection;
