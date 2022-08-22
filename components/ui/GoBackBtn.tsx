import { useRouter } from 'next/router';

import Button, { ButtonProps } from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GoBackBtn = (props: ButtonProps) => {
  const router = useRouter();
  const handleReturn = () => router.back();

  return (
    <Button {...props} startIcon={<ArrowBackIcon />} onClick={handleReturn}>
      Go back
    </Button>
  );
};
export default GoBackBtn;
