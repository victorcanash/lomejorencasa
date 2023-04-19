import type { NextPage } from 'next';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import { PageTypes } from '@core/constants/navigation';
import type { User } from '@core/types/user';

import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import UserUpdateForm from '@components/forms/user/UserUpdateForm';
import UpdateEmailForm from '@components/forms/auth/UpdateEmailForm';
import UpdatePswForm from '@components/forms/auth/UpdatePswForm';

const Settings: NextPage = () => { 
  const { initialized } = useAppContext();
  const { user } = useAuthContext();

  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'settings.metas.title',
          descriptionId: 'settings.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'settings.h1',
          },
        }}
      />

      { initialized && page.checked &&
        <Container>  
          <UserUpdateForm />

          { !(user as User)?.authProvider &&
            <>
              <Divider sx={{ mb: 3, mt: 5 }} />

              <UpdateEmailForm />

              <Divider sx={{ mb: 3, mt: 5 }} />

              <UpdatePswForm />
            </>
          }
        </Container>
      }
    </>
  );
};

export default Settings;
