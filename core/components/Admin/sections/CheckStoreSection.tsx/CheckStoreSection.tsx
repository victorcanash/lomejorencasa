import { useState } from 'react';

import Box from '@mui/material/Box';

import type { CheckCategory } from '@core/types/admin';
import useProducts from '@core/hooks/useProducts';
import CheckCategoriesSection from './CheckCategoriesSection';
import CheckLandingsSection from './CheckLandingsSection';

const CheckStoreSection = () => {
  const { getCategoryDetails } = useProducts();

  const [selectedCheckCategory, setSelectedCheckCategory] = useState<CheckCategory | undefined>(undefined);

  const onClickSelectBtn = (checkCategory: CheckCategory) => {
    getCategoryDetails(checkCategory.category.slug)
      .then((response) => {
        setSelectedCheckCategory({
          ...checkCategory,
          landings: response.landings,
        });
      }).catch((error) => {
      });
  };

  const onClickBackInLandingsSection = () => {
    setSelectedCheckCategory(undefined);
  };

  return (
    <Box>
      { (!selectedCheckCategory) &&
        <CheckCategoriesSection
          onClickSelectBtn={onClickSelectBtn}
        />
      }
      { (selectedCheckCategory) &&
        <CheckLandingsSection
          checkCategory={selectedCheckCategory}
          onClickBack={onClickBackInLandingsSection}
        />
      }
    </Box>
  );
};

export default CheckStoreSection;
