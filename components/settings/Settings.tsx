import Container from '@mui/material/Container';

import type { User } from '@core/types/user';

import { useAuthContext } from '@lib/contexts/AuthContext';
import Divider from '@core/components/ui/Divider';
import UserUpdateForm from '@core/components/forms/user/UserUpdateForm';
import UpdateEmailForm from '@core/components/forms/auth/UpdateEmailForm';
import UpdatePswForm from '@core/components/forms/auth/UpdatePswForm';

const Settings = () => {
  const { user } = useAuthContext();

  return (
    <Container>
      <UserUpdateForm />

      { !(user as User)?.authProvider &&
        <>
          <Divider mb={3} mt={5} />

          <UpdateEmailForm />

          <Divider mb={3} mt={5} />

          <UpdatePswForm />
        </>
      }
    </Container>
  );
};

export default Settings;
