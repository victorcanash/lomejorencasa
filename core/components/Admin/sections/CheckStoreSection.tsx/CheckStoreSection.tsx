import { useState } from 'react';

import Box from '@mui/material/Box';

import type { CheckCategory } from '@core/types/admin';
import useAdminStore from '@core/hooks/useAdminStore';
import CheckCategoriesSection from './CheckCategoriesSection';
import CheckLandingsSection from './CheckLandingsSection';

const CheckStoreSection = () => {
  const { getCategoryDetails } = useAdminStore();

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
