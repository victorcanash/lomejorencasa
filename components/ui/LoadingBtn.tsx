import { SxProps, Theme } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import colors from '@lib/constants/themes/colors';

type LoadingBtnProps = {
  sx?: SxProps<Theme>
};

const LoadingBtn = (props: ButtonProps & LoadingBtnProps) => {
  const { sx } = props;

  return (
    <Button
      disabled={true}
      {...props}
      startIcon={<CircularProgress size={24} sx={{ color: colors.text.black }} />}
      sx={sx}
    >
      { props.children }
    </Button>
  );
};

export default LoadingBtn;
