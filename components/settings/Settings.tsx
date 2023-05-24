import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import type { User } from '@core/types/user';

import { useAuthContext } from '@lib/contexts/AuthContext';
import UserUpdateForm from '@components/forms/user/UserUpdateForm';
import UpdateEmailForm from '@components/forms/auth/UpdateEmailForm';
import UpdatePswForm from '@components/forms/auth/UpdatePswForm';

const Settings = () => {
  const { user } = useAuthContext();

  return (
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
  );
};

export default Settings;
