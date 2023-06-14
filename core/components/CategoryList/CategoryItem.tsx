import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import type { ProductCategory } from '@core/types/products';
import { convertElementToSx } from '@core/utils/themes';
import {
  getCategoryPathByConfig,
  getCategoryConfigById,
} from '@core/utils/products';
import { useProductsContext } from '@core/contexts/ProductsContext';
import Link from '@core/components/navigation/Link';
import CustomImage from '@core/components/multimedia/CustomImage';

import { pages } from '@lib/config/navigation.config';
import { categoryConfigs } from '@lib/config/inventory.config';
import { themeCustomElements } from '@lib/config/theme/elements';

type CategoryItemProps = {
  category: ProductCategory,
};

const CategoryItem = (props: CategoryItemProps) => {
  const {
    category,
  } = props;

  const {
    getItemImgUrl,
  } = useProductsContext();

  const categoryPath = useMemo(() => {
    const landingConfig = getCategoryConfigById(category.id, categoryConfigs);
    if (landingConfig) {
      return getCategoryPathByConfig(landingConfig);
    }
    return pages.home.path;
  }, [category.id]);

  return (
    <Link href={categoryPath} underline="none">
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
        }}
      >
        <Avatar
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CustomImage
            alt={category.name.current}
            src={getItemImgUrl(category)}          
            layout="fill" 
          />
        </Avatar>
      </Box>
      <Typography
        component="div"
        variant="body1Head"
        m="auto"
        mt={1}
        sx={{
          ...themeCustomElements.categoryList?.nameText?
            convertElementToSx(themeCustomElements.categoryList.nameText) : undefined,
          wordWrap: 'break-word',
        }}
      >
        { category.name.current }
      </Typography>
    </Link>
  );
};

export default CategoryItem;
