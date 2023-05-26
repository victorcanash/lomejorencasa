import { useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/constants/themes/elements';

type ShippingBarProps = {
  superSmallBreakpoint: boolean,
  smallBreakpoint: boolean,
};

const ShippingBar = (props: ShippingBarProps) => {
  const {
    superSmallBreakpoint,
    smallBreakpoint,
  } = props;

  const shippingTruckMr = useMemo(() => {
    if (superSmallBreakpoint) {
      return '0px';
    } else if (smallBreakpoint) {
      return '2px';
    }
    return '5px';
  }, [smallBreakpoint, superSmallBreakpoint]);

  return (
    <Box
      sx={{
        ...themeCustomElements.navBar?.shippingBar?.content ?
          convertElementToSx(themeCustomElements.navBar?.shippingBar?.content) : undefined,
        p: '5px',
        px: superSmallBreakpoint ? '1px' : undefined,
      }}
    >
      <Typography
        variant={smallBreakpoint ? 'body2Head': 'body1Head'}
        textAlign="center"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        lineHeight="18px"
      >
        <FontAwesomeIcon
          size="lg"
          icon={faTruck}
          style={{
            marginRight: shippingTruckMr,
            ...themeCustomElements.navBar?.shippingBar?.icon ?
              convertElementToSx(themeCustomElements.navBar?.shippingBar?.icon) : undefined,
          }}
        />
        <FormattedMessage id="header.banners.shipping" />
      </Typography>
    </Box>
  );
};

export default ShippingBar;
