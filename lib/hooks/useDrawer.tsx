import { useEffect, useState } from 'react';

import type { DrawerItem } from '@core/types/header';
import { 
  mainDrawerItems, 
  loggedUserDrawerItems, 
  unloggedUserDrawerItems, 
  infoDrawerItems,
  signOutDrawerItem,
} from '@lib/constants/header';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useDrawer = () => {
  const { isLogged } = useAuthContext();

  const [items, setItems] = useState<DrawerItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isLogged()) {
      setItems(mainDrawerItems.concat(loggedUserDrawerItems, infoDrawerItems));
      setItems(items => [...items, signOutDrawerItem])
    } else {
      setItems(mainDrawerItems.concat(unloggedUserDrawerItems, infoDrawerItems));
    }
  }, [isLogged]);

  return {
    items,
    open,
    setOpen
  };
};

export default useDrawer;
