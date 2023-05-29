import { useEffect, useState } from 'react';

import type { NavDrawerItem } from '@core/types/navigation';

import navDrawerConfig from '@lib/config/navDrawer.config';
import { useAuthContext } from '@core/contexts/AuthContext';
import { useCartContext } from '@core/contexts/CartContext';

const useNavDrawer = () => {
  const { isLogged } = useAuthContext();
  const { closeDrawer: closeCartDrawer } = useCartContext();

  const [items, setItems] = useState<NavDrawerItem[]>([]);
  const [open, setOpen] = useState(false);

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

  const handleOpen = () => {
    closeCartDrawer();
    setOpen(!open);
    closeCollapses();
  };

  const close = () => {
    closeCartDrawer();
    if (open) {
      setOpen(false);
      closeCollapses();
    }
  };

  const handleCollapse = (item: NavDrawerItem) => {
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

  useEffect(() => {
    if (isLogged()) {
      setItems(navDrawerConfig.main.concat(navDrawerConfig.logged));
    } else {
      setItems(navDrawerConfig.main.concat(navDrawerConfig.unlogged));
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
