import { useEffect, useState, useCallback } from 'react';

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

  const closeCollapses = useCallback(() => {
    setItems(
      items.map((current) => {
        return {
          ...current,
          open: false,
        }
      })
    );
  }, [items]);

  const handleOpen = useCallback(() => {
    closeCartDrawer();
    setOpen(!open);
    closeCollapses();
  }, [closeCartDrawer, closeCollapses, open]);

  const close = useCallback(() => {
    closeCartDrawer();
    if (open) {
      setOpen(false);
      closeCollapses();
    }
  }, [closeCartDrawer, closeCollapses, open])

  const handleCollapse = useCallback((item: NavDrawerItems) => {
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
  }, [items]);

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
