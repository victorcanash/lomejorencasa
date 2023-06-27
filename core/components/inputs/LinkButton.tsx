import { useMemo } from 'react';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import { convertElementToSx } from '@core/utils/themes';
import Link, { LinkProps } from '@core/components/navigation/Link';

import { themeCustomElements } from '@lib/config/theme/elements';

type ButtonProps = {
  customtype?: 'actionPrimary' | 'actionSecondary' | 'banner',
};

const LinkButton = (props: MuiButtonProps & LinkProps & ButtonProps) => {
  const {
    customtype,
  } = props;

  const typeSx = useMemo(() => {
    if (customtype === 'actionPrimary') {
      return themeCustomElements.button?.action?.primary ?
        convertElementToSx(themeCustomElements.button.action.primary) : undefined;
    } else if (customtype === 'actionSecondary') {
      return themeCustomElements.button?.action?.secondary ?
        convertElementToSx(themeCustomElements.button.action.secondary) : undefined;
    } else if (customtype === 'banner') {
      return themeCustomElements.button?.banner ?
        convertElementToSx(themeCustomElements.button.banner) : undefined;
    }
    return undefined;
  }, [customtype]);

  return (  
    <MuiButton
      variant="contained"
      {...props}
      component={Link}
      sx={{
        ...typeSx,
        ...props.sx,
      }}
    >
      { props.children }
    </MuiButton>
  );
};

export default LinkButton;
