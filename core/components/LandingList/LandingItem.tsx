import { useMemo, useCallback } from 'react';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import type { Landing } from '@core/types/products';
import { capitalizeFirstLetter } from '@core/utils/strings';
import { convertElementToSx } from '@core/utils/themes';
import {
  getFirstLandingItem,
  getLandingConfigById,
  getLandingPathByConfig,
  getProductPriceData,
} from '@core/utils/products';
import { useProductsContext } from '@core/contexts/ProductsContext';
import useCart from '@core/hooks/useCart';
import Link from '@core/components/navigation/Link';
import CustomImage from '@core/components/multimedia/CustomImage';
import ProductPrice from '@core/components/ProductPrice';

import { pages } from '@lib/config/navigation.config';
import { landingConfigs } from '@lib/config/inventory.config';
import { themeCustomElements } from '@lib/config/theme/elements';

type LandingItemProps = {
  landing: Landing,
};

const LandingItem = (props: LandingItemProps) => {
  const {
    landing,
  } = props;

  const {
    getItemImgUrl,
  } = useProductsContext();

  const { addCartItem } = useCart(false);

  const landingPath = useMemo(() => {
    const landingConfig = getLandingConfigById(landing.id, landingConfigs);
    if (landingConfig) {
      return getLandingPathByConfig(landingConfig);
    }
    return pages.home.path;
  }, [landing.id]);

  const landingName = useMemo(() => {
    let name = landing.name?.current || '';
    if (!name) {
      const landingConfig = getLandingConfigById(landing.id, landingConfigs);
      if (landingConfig) {
        name = landingConfig.product?.name?.current ?
          landingConfig.product.name.current : landingConfig.pack?.name?.current || '';
      }
    }
    if (!name) {
      const firstItem = getFirstLandingItem(landing);
      if (firstItem?.name?.current) {
        name = firstItem.name.current;
      }
    }
    return capitalizeFirstLetter(name);
  }, [landing]);

  const landingPrice = useMemo(() => {
    let priceData = { price: 0, originPrice: 0 };
    const firstItem = getFirstLandingItem(landing);
    if (firstItem) {
      priceData = getProductPriceData(firstItem);
    }
    return priceData;
  }, [landing]);

  const onClickAddCartBtn = useCallback(() => {
    const firstItem = getFirstLandingItem(landing);
    if (firstItem) {
      addCartItem(firstItem, 1);
    }
  }, [addCartItem, landing]);

  return (
    <Card sx={{ overflow: 'visible' }}>
      <CardHeader
        sx={{
          height: '0px',
          p: 0,
          position: 'relative',
          zIndex: 1,
        }}
        action={
          <IconButton
            onClick={onClickAddCartBtn}
            sx={{
              ...themeCustomElements.button?.action?.primary ?
                convertElementToSx(themeCustomElements.button.action.primary) : undefined,
              p: '1px',
              position: 'relative',
              right: '2px',
              top: '-3px',
            }}
          >
            <AddIcon />
          </IconButton>
        }
      />
      <CardActionArea component={Link} href={landingPath}>
        <CardMedia>
          <Box>
            <CustomImage
              src={getItemImgUrl(landing)}
              width="1080"
              height="1080"
              layout="responsive" 
              objectFit="cover"
              priority
            />
          </Box>
        </CardMedia>
        
        <CardContent
          sx={{
            p: 1,
          }}
        >
          <Box>
            <Typography
              component="div"
              variant="body1"
              mb={1}
              sx={{
                ...themeCustomElements.landingList?.nameText?
                  convertElementToSx(themeCustomElements.landingList.nameText) : undefined,
                wordWrap: 'break-word',
              }}
            >
              { landingName }
            </Typography>
            <ProductPrice
              type="landingList"
              price={landingPrice.price}
              originPrice={landingPrice.originPrice}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LandingItem;
