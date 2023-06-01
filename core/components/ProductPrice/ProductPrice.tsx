import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { convertElementToSx } from '@core/utils/themes';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { useAuthContext } from '@core/contexts/AuthContext';

type ProductPriceProps = {
  price: number,
  originPrice: number,
};

const ProductPrice = (props: ProductPriceProps) => {
  const {
    price,
    originPrice,
  } = props;

  const { convertPriceToString } = useAuthContext();

  return (
    <Typography
      component="h2"
      variant="h2"
      sx={{
        ...themeCustomElements.landing?.price?.currentText ?
          convertElementToSx(themeCustomElements.landing.price.currentText) : undefined,
      }}>
      { price !== originPrice ?
        <>
          <Box
            component="span"
            sx={{
              ...themeCustomElements.landing?.price?.originText ?
                convertElementToSx(themeCustomElements.landing.price.originText) : undefined,
              color: themeCustomElements.landing?.price?.currentText ?
                convertElementToSx(themeCustomElements.landing.price.currentText).color : undefined,
            }}
          >
            <Box
              component="span"
              sx={{
                color: themeCustomElements.landing?.price?.originText ?
                  convertElementToSx(themeCustomElements.landing.price.originText).color : undefined,
              }}
            >
              {`${convertPriceToString(originPrice)}`}
            </Box>
          </Box>
          {` ${convertPriceToString(price)}`}
        </>
        :
        <>
          {`${convertPriceToString(price)}`}
        </>
      }
    </Typography>
  );
};

export default ProductPrice;
