import { useEffect, useState } from 'react';

import { Drawers, appDrawerItems, loggedUserDrawerItems, unloggedUserDrawerItems } from '@lib/constants/header';
import { DrawerItem } from '@core/types/header';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useDrawer = (drawer: Drawers) => {
  const { isLogged } = useAuthContext();

  const [items, setItems] = useState<DrawerItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (drawer == Drawers.userDrawer) {
      if (isLogged()) {
        setItems(loggedUserDrawerItems);
      } else {
        setItems(unloggedUserDrawerItems);
      }
    } else if (drawer == Drawers.appDrawer) {
      setItems(appDrawerItems);
    }
  }, [drawer, isLogged]);

  return {
    items,
    open,
    setOpen
  };
};

export default useDrawer;
