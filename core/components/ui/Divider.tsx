import { ReactElement } from 'react';

import MuiDivider from '@mui/material/Divider';

import type { ThemeElement } from '@core/types/themes';
import { convertElementToSx } from '@core/utils/themes';

type DividerProps = {
  children?: ReactElement,
  themeElement?: ThemeElement,
  mt?: number,
  mb?: number,
};

const Divider = (props: DividerProps) => {
  const {
    children,
    themeElement,
    mt,
    mb,
  } = props;

  return (
    <MuiDivider
      sx={{
        ...themeElement ? convertElementToSx(themeElement) : undefined,
        mt,
        mb,
      }}
    >
      {children}
    </MuiDivider>
  );
};

export default Divider;
