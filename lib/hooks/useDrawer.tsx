import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Drawers, loggedUserDrawerItems, unloggedUserDrawerItems } from '@core/constants/header';
import { DrawerItem } from '@core/types/header';
import { capitalizeFirstLetter } from '@core/utils/strings';
import { useAppContext } from '@lib/contexts/AppContext';
import { useSearchContext } from '@lib/contexts/SearchContext';
import useAuth from '@lib/hooks/useAuth';

const useDrawer = (drawer: Drawers) => {
  const { categories } = useAppContext();

  const { getHref } = useSearchContext();

  const { isLogged } = useAuth();

  const router = useRouter();

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
  }, [categories, drawer, getHref, router.asPath, isLogged]);

  return {
    items,
    open,
    setOpen
  };
};

export default useDrawer;
