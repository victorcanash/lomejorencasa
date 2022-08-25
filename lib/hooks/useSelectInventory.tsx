import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Product, ProductInventory } from "@core/types/products";

const useSelectInventory = (product: Product) => {
  const router = useRouter();

  const [selectedInventory, setSelectedInventory] = useState<ProductInventory | undefined>(undefined);
  const [loadedSelect, setLoadedSelect] = useState(false);

  useEffect(() => {
    if (!loadedSelect) {
      if (product.inventories.length <= 1) {
        setSelectedInventory(product.inventories[0]);
      } 
      setLoadedSelect(true);
    }
  }, [loadedSelect, product.inventories, router.asPath]);

  const handleSelectChange = (size: string) => {
    setSelectedInventory(product.inventories.find(item => item.size === size));
  }

  return {
    selectedInventory,
    handleSelectChange,
    loadedSelect,
  }
};

export default useSelectInventory;
