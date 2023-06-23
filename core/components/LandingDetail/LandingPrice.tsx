import { useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
} from '@fortawesome/free-brands-svg-icons';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import type { Landing, ProductInventory, ProductPack } from '@core/types/products';
import { useProductsContext } from '@core/contexts/ProductsContext';
import ProductPrice from '@core/components/ProductPrice';

type LandingPriceProps = {
  landingModel: Landing,
  selectedItem?: ProductPack | ProductInventory,
};

const LandingPrice = (props: LandingPriceProps) => {
  const {
    landingModel,
    selectedItem,
  } = props;

  const { getFirstLandingItem, getProductPriceData } = useProductsContext();

  const data = useMemo(() => {
    let priceData = { price: 0, originPrice: 0 };
    if (selectedItem) {
      priceData = getProductPriceData(selectedItem);
    } else {
      const firstItem = getFirstLandingItem(landingModel);
      if (firstItem) {
        priceData = getProductPriceData(firstItem);
      }
    }
    return priceData;
  }, [getFirstLandingItem, getProductPriceData, landingModel, selectedItem]);

  return (
    <Grid container columnSpacing={2} rowSpacing={0.5}>
      <Grid item>
        <ProductPrice
          type="landingDetail"
          price={data.price}
          originPrice={data.originPrice}
        />
      </Grid>
      <Grid item sx={{ mt: '3px' }}>
        <Typography variant="body2">
          <FormattedMessage id="productDetail.price.iva" />
        </Typography>
      </Grid>
      <Grid item sx={{ display: 'flex', mb: 0.5 }}>
        <Box>
          <FontAwesomeIcon 
            size="2xl" 
            icon={faCcVisa}
          />
        </Box>
        <Box ml={1}>
          <FontAwesomeIcon 
            size="2xl" 
            icon={faCcMastercard}
          />
        </Box>
        <Box ml={1}>
          <FontAwesomeIcon 
            size="2xl" 
            icon={faCcPaypal}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LandingPrice;
