import { useEffect, useState } from 'react';

import { Drawers, loggedUserDrawerItems, unloggedUserDrawerItems } from '@lib/constants/header';
import { DrawerItem } from '@core/types/header';
import { capitalizeFirstLetter } from '@core/utils/strings';
import { useSearchContext } from '@lib/contexts/SearchContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const useDrawer = (drawer: Drawers) => {
  const { productCategories, getHref } = useSearchContext();
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
      productCategories.forEach((productCategory) => {
        categoriesItems.push({
          textId: capitalizeFirstLetter(productCategory.name.current),
          path: getHref(productCategory.name.current)
        });
      });
      setItems(categoriesItems);
    }
  }, [drawer, getHref, isLogged, productCategories]);

  return {
    items,
    open,
    setOpen
  };
};

export default useDrawer;
