import { SxProps, Theme } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

type LoadingBtnProps = {
  sx?: SxProps<Theme>
};

const LoadingBtn = (props: ButtonProps & LoadingBtnProps) => {
  const { sx } = props;

  return (
    <LoadingButton
      {...props}
      loading
      loadingPosition="start"
      startIcon={<SaveIcon fontSize="large" />}
      sx={sx}
    >
      { props.children }
    </LoadingButton>
  );
};

export default LoadingBtn;
