import { useState } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

import { ManageActions } from '@core/constants/auth';
import type { User, UserAddress, UserContact } from '@core/types/user';
import { CheckoutAddresses } from '@core/types/checkout';
import { 
  manageUser as manageUserMW, 
  updateUserAddresses as updateUserAddressesMW,
  sendUserContactEmail as sendUserContactEmailMW,
} from '@core/utils/user';
import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useAuth from '@lib/hooks/useAuth';

const useUser = () => {
  const { setLoading } = useAppContext();
  const { token, setUser } = useAuthContext();

  const router = useRouter();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const { logout } = useAuth();

  const [errorMsg, setErrorMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const manageUser = async (action: ManageActions.update | ManageActions.delete, user: User) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageUserMW(action, token, user)
      .then((response: {user: User}) => {
        onManageUserSuccess(action, response.user);
      }).catch((_error: Error) => {
        const errorMsg = intl.formatMessage({ id: 'app.errors.default' });
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onManageUserSuccess = (action: ManageActions.update | ManageActions.delete, user: User) => {
    if (action == ManageActions.update) {
      setUser(user);
      setLoading(false);
      setSuccessMsg(intl.formatMessage({ id: 'settings.successes.updateUser' }));
    } else if (action == ManageActions.delete) {
      logout();
      setSuccessMsg(intl.formatMessage({ id: 'settings.successes.deleteUser' }));
    }
  };

  const updateUserAddresses = async (user: User, checkoutAddresses: CheckoutAddresses, onSuccess?: () => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    updateUserAddressesMW(token, user, checkoutAddresses)
      .then((response: {shipping: UserAddress, billing: UserAddress}) => {
        onUpdateUserAddressesSuccess(user, response.shipping, response.billing, onSuccess);
      }).catch((_error: Error) => {
        const errorMsg = intl.formatMessage({ id: 'app.errors.default' });
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onUpdateUserAddressesSuccess = (user: User, shipping: UserAddress, billing: UserAddress, onSuccess?: () => void) => {
    setUser({
      ...user,
      shipping: shipping,
      billing: billing,
    });
    if (onSuccess) {
      onSuccess();
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'checkout.successes.updateAddresses' }));
  };

  const sendUserContactEmail = async (userContact: UserContact) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    sendUserContactEmailMW(intl.locale, userContact).then(() => {
      onSendUserContactEmailSuccess(userContact);
    }).catch((_error: Error) => {
      const errorMsg = intl.formatMessage({ id: 'app.errors.default' });
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const onSendUserContactEmailSuccess = (userContact: UserContact) => {
    router.push(pages.home.path);
    enqueueSnackbar(
      intl.formatMessage({ id: 'contact.successes.default' }), 
      { variant: 'success' }
    );
  };

  return {
    manageUser,
    updateUserAddresses,
    sendUserContactEmail,
    errorMsg,
    successMsg,
  };
};

export default useUser;
