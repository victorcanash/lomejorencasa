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
import { convertElementToSx } from '@core/utils/themes';
import { getFirstLandingItem, getProductPriceData } from '@core/utils/products';
import { useAuthContext } from '@core/contexts/AuthContext';
import colors from '@lib/constants/themes/colors';
import { themeCustomElements } from '@lib/constants/themes/elements';

type LandingPriceProps = {
  landingModel: Landing,
  selectedItem?: ProductPack | ProductInventory,
};

const LandingPrice = (props: LandingPriceProps) => {
  const {
    landingModel,
    selectedItem,
  } = props;

  const { convertPriceToString } = useAuthContext();

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
  }, [landingModel, selectedItem]);

  return (
    <Grid container columnSpacing={2} rowSpacing={0.5}>
      <Grid item>
        <Typography
          component="h2"
          variant="h2"
          sx={{
            ...themeCustomElements.landing?.priceContent?.priceText ?
              convertElementToSx(themeCustomElements.landing.priceContent.priceText) : undefined,
          }}>
          { data.price !== data.originPrice ?
            <>
              <span
                style={{ fontWeight: 500, textDecoration: 'line-through' }}
              >
                <span style={{ color: colors.text.disabled }}>
                  {`${convertPriceToString(data.originPrice)}`}
                </span>
              </span>
              {` ${convertPriceToString(data.price)}`}
            </>
            :
            <>
              {`${convertPriceToString(data.price)}`}
            </>
          }
        </Typography>
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
