import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import Button, { ButtonProps } from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type GoBackBtnProps = {
   onClick?: () => void,
};

const GoBackBtn = (props: ButtonProps & GoBackBtnProps) => {
  const { onClick } = props;

  const router = useRouter();
  
  const onClickDefault = () => {
    router.back();
  }

  return (
    <Button variant="contained" {...props} startIcon={<ArrowBackIcon />} onClick={onClick || onClickDefault}>
      <FormattedMessage id="app.goBackBtn" />
    </Button>
  );
};

export default GoBackBtn;
