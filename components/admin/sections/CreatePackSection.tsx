import { useRouter } from 'next/router';

import { ManageActions } from '@core/constants/app';
import { AdminSections } from '@core/constants/admin';

import { pages } from '@lib/config/navigation.config';
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
