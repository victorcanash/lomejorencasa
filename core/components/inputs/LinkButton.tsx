import { useMemo } from 'react';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import { convertElementToSx } from '@core/utils/themes';
import Link, { LinkProps } from '@core/components/navigation/Link';

import { themeCustomElements } from '@lib/constants/themes/elements';

type ButtonProps = {
  customtype?: 'actionPrimary' | 'actionSecondary',
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
    }
    return undefined;
  }, [customtype]);

  return (  
    <MuiButton
      variant="contained"
      noLinkStyle
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
