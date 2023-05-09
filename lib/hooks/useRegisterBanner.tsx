import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import RegisterBanner from '@components/banners/RegisterBanner';

const useRegisterBanner = () => {
  const { initialized } = useAppContext();
  const { isLogged } = useAuthContext();

  const router = useRouter();

  const [open, setOpen] = useState(true);
  const [activated, setActivated] = useState(false);

  const handleBanner = () => {
    setOpen(!open);
  };

  const goToRegisterPage = () => {
    router.push(pages.register.path);
  };

  useEffect(() => {
    if (!activated && initialized && !isLogged()) {
      setActivated(true);
      setTimeout(() => {
        setOpen(true);
      }, 5000);
    }
  }, [activated, initialized, isLogged]);

  const RegisterBannerComponent = () => (
    <RegisterBanner
      open={open}
      handleBanner={handleBanner}
      onClickRegister={goToRegisterPage}
    />
  );

  return {
    RegisterBanner: RegisterBannerComponent,
  };
};

export default useRegisterBanner;
