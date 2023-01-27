import { useEffect, useState } from 'react';

import type { DrawerItems } from '@core/types/navigation';

import { 
  mainDrawerItems, 
  loggedDrawerItems, 
  unloggedDrawerItems,
} from '@lib/constants/navigation';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useDrawer = () => {
  const { isLogged } = useAuthContext();

  const [items, setItems] = useState<DrawerItems[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    closeCollapses();
  };

  const close  = () => {
    if (open) {
      setOpen(false);
      closeCollapses();
    }
  }

  const handleCollapse = (item: DrawerItems) => {
    setItems(
      items.map((current) => {
        if (current.text == item.text) {
          return { 
            ...current, 
            open: !current.open 
          };
        } else {
          return current;
        }
      })
    );
  };

  const closeCollapses = () => {
    setItems(
      items.map((current) => {
        return {
          ...current,
          open: false,
        }
      })
    );
  };

  useEffect(() => {
    if (isLogged()) {
      setItems(mainDrawerItems.concat(loggedDrawerItems));
    } else {
      setItems(mainDrawerItems.concat(unloggedDrawerItems));
    }
  }, [isLogged]);

  return {
    items,
    open,
    handleOpen,
    close,
    handleCollapse,
  };
};

export default useDrawer;
