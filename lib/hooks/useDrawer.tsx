import { useEffect, useState } from 'react';

import { Drawers, loggedUserDrawerItems, unloggedUserDrawerItems } from '@core/constants/header';
import { DrawerItem } from '@core/types/header';
import { capitalizeFirstLetter } from '@core/utils/strings';
import { useSearchContext } from '@lib/contexts/SearchContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useDrawer = (drawer: Drawers) => {
  const { categories, getHref } = useSearchContext();
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
    } else if (drawer == Drawers.categoriesDrawer) {
      const categoriesItems = [] as DrawerItem[];
      categories.forEach((category) => {
        categoriesItems.push({
          text: capitalizeFirstLetter(category.name),
          path: getHref(category.name)
        });
      });
      setItems(categoriesItems);
    }
  }, [categories, drawer, getHref, isLogged]);

  return {
    items,
    open,
    setOpen
  };
};

export default useDrawer;
