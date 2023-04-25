import { useState } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

import { ManageActions } from '@core/constants/app';
import { ContactTypes } from '@core/constants/contact';
import type { User, UserContact } from '@core/types/user';
import {
  manageUser as manageUserMW,
  sendUserContactEmail as sendUserContactEmailMW,
} from '@core/utils/user';

import { pages } from '@lib/constants/navigation';
import snackbarConfig from '@lib/constants/snackbar';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const useUser = () => {
  const { setLoading } = useAppContext();
  const { token, setUser, setToken, removeUser, isLogged } = useAuthContext();
  const { removeCart } = useCartContext();

  const router = useRouter();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

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
      setToken('');
      removeUser();
      removeCart();
      setLoading(false);
      setSuccessMsg(intl.formatMessage({ id: 'settings.successes.deleteUser' }));
    }
  };

  const sendUserContactEmail = async (userContact: UserContact) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    sendUserContactEmailMW(
      isLogged() ? token : '',
      intl.locale,
      userContact,
    ).then(() => {
      onSendUserContactEmailSuccess(userContact);
    }).catch((error: Error) => {
      let errorMsg = error.message;
      if (errorMsg.includes('orderBigbuyId field')) {
        errorMsg = intl.formatMessage({ id: 'resolutions.errors.orderId' });
      } else {
        errorMsg = intl.formatMessage({ id: 'app.errors.default' });
      }
      setErrorMsg(errorMsg);
      setLoading(false);
    });
  };

  const onSendUserContactEmailSuccess = (userContact: UserContact) => {
    router.push(pages.home.path);
    enqueueSnackbar(
      intl.formatMessage({
        id: userContact.type === ContactTypes.normal ?
          'contact.successes.default' : 'resolutions.successes.default'
      }),
      { variant: 'success', autoHideDuration: snackbarConfig.durations.long }
    );
  };

  return {
    manageUser,
    sendUserContactEmail,
    errorMsg,
    successMsg,
  };
};

export default useUser;
