import { useState } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

import { ManageActions } from '@core/constants/auth';
import { ContactTypes, maxContactFiles } from '@core/constants/contact';
import type { User, UserAddress, UserContact } from '@core/types/user';
import type { UploadFile } from '@core/types/multimedia';
import type { CheckoutAddresses } from '@core/types/checkout';
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
  const { token, user, setUser, isLogged } = useAuthContext();

  const router = useRouter();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const { logout } = useAuth();

  const [errorMsg, setErrorMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const manageUser = async (action: ManageActions.update | ManageActions.delete, newUser: User) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageUserMW(action, token, newUser)
      .then((response: {user: User}) => {
        onManageUserSuccess(action, response.user);
      }).catch((_error: Error) => {
        const errorMsg = intl.formatMessage({ id: 'app.errors.default' });
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onManageUserSuccess = (action: ManageActions.update | ManageActions.delete, newUser: User) => {
    if (action == ManageActions.update) {
      setUser(newUser);
      setLoading(false);
      setSuccessMsg(intl.formatMessage({ id: 'settings.successes.updateUser' }));
    } else if (action == ManageActions.delete) {
      logout();
      setSuccessMsg(intl.formatMessage({ id: 'settings.successes.deleteUser' }));
    }
  };

  const updateUserAddresses = async (checkoutAddresses: CheckoutAddresses, onSuccess?: () => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    if (isLogged()) {
      updateUserAddressesMW(token, user as User, checkoutAddresses)
        .then((response: {shipping: UserAddress, billing: UserAddress}) => {
          onUpdateUserAddressesSuccess(response.shipping, response.billing, onSuccess);
        }).catch((_error: Error) => {
          const errorMsg = intl.formatMessage({ id: 'app.errors.default' });
          setErrorMsg(errorMsg);
          setLoading(false);
        });
    } else {
      onUpdateUserAddressesSuccess(checkoutAddresses.shipping, checkoutAddresses.billing, onSuccess);
    }
  };

  const onUpdateUserAddressesSuccess = (shipping: UserAddress, billing: UserAddress, onSuccess?: () => void) => {
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

  const sendUserContactEmail = async (userContact: UserContact, uploadImgs: UploadFile[]) => {
    if (userContact.type === ContactTypes.refundOrder) {
      if (uploadImgs.length <= 0) {
        setSuccessMsg('');
        setErrorMsg(intl.formatMessage({ id: 'contact.errors.validateProductImgs' }));
        return;
      } else if (uploadImgs.length > maxContactFiles) {
        uploadImgs.splice(uploadImgs.length, uploadImgs.length - maxContactFiles);
      }
    } else {
      uploadImgs = [];
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    sendUserContactEmailMW(intl.locale, userContact, uploadImgs.map((item) => { return item.file; })).then(() => {
      onSendUserContactEmailSuccess(userContact);
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('orderBigbuyId field')) {
        errorMsg = intl.formatMessage({ id: 'contact.errors.orderId' });
      } else {
        errorMsg = intl.formatMessage({ id: 'app.errors.default' });
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const onSendUserContactEmailSuccess = (_userContact: UserContact) => {
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
