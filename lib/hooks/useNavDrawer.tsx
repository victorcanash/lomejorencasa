import { useEffect, useState } from 'react';

import type { NavDrawerItems } from '@core/types/navigation';

import { 
  mainNavDrawerItems, 
  loggedNavDrawerItems, 
  unloggedNavDrawerItems,
} from '@lib/constants/navigation';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const useNavDrawer = () => {
  const { isLogged } = useAuthContext();
  const { closeDrawer: closeCartDrawer } = useCartContext();

  const [items, setItems] = useState<NavDrawerItems[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    closeCartDrawer();
    setOpen(!open);
    closeCollapses();
  };

  const close  = () => {
    closeCartDrawer();
    if (open) {
      setOpen(false);
      closeCollapses();
    }
  }

  const handleCollapse = (item: NavDrawerItems) => {
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
      setItems(mainNavDrawerItems.concat(loggedNavDrawerItems));
    } else {
      setItems(mainNavDrawerItems.concat(unloggedNavDrawerItems));
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

export default useNavDrawer;
