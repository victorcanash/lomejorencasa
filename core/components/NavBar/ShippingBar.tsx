import { useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { ThemeElement } from '@core/types/themes';
import type { FormatText } from '@core/types/texts';
import { convertElementToSx } from '@core/utils/themes';

type ShippingBarProps = {
  themeElementContent?: ThemeElement,
  themeElementIcon?: ThemeElement,
  text: FormatText,
  superSmallBreakpoint: boolean,
  smallBreakpoint: boolean,
};

const ShippingBar = (props: ShippingBarProps) => {
  const {
    themeElementContent,
    themeElementIcon,
    text,
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
        ...themeElementContent ? convertElementToSx(themeElementContent) : undefined,
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
          textAlign: text.textAlign,
        }}
        lineHeight="18px"
      >
        <FontAwesomeIcon
          size="lg"
          icon={faTruck}
          style={{
            marginRight: shippingTruckMr,
            ...themeElementIcon ? convertElementToSx(themeElementIcon) : undefined,
          }}
        />
        { text.id &&
          <FormattedMessage id={text.id} values={text.values} />
        }
      </Typography>
    </Box>
  );
};

export default ShippingBar;
