import { useRef, useState, useEffect } from 'react';

import { Storages } from '@core/constants/storage';
import { CookiesConsentKey, CookiesConsentValues } from '@core/constants/cookies';
import { getStorageItem, setStorageItem } from '@core/utils/storage';
import CookiesDialog from '@components/dialogs/CookiesDialog';

const useCookies = () => {
  const firstRenderRef = useRef(false);

  const [openCookiesDialog, setOpenCookiesDialog] = useState(false);

  const handleCookiesDialog = () => {
    setOpenCookiesDialog(!openCookiesDialog);
  };

  const onRefuseCookies = () => {
    setStorageItem(Storages.local, CookiesConsentKey, CookiesConsentValues.refused);
  };

  const onAcceptCookies = () => {
    setStorageItem(Storages.local, CookiesConsentKey, CookiesConsentValues.accepted);
  };

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      if (!getStorageItem(Storages.local, CookiesConsentKey)) {
        setOpenCookiesDialog(true);
      } else {
        setOpenCookiesDialog(false);
      }
    }    
  }, []);

  const CookiesConsent = () => (
    <CookiesDialog
      open={openCookiesDialog}
      handleDialog={handleCookiesDialog}
      onRefuse={onRefuseCookies}
      onAccept={onAcceptCookies}
    />
  )

  return {
    CookiesConsent,
  };
};

export default useCookies;
