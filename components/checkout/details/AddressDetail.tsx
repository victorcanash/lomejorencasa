import Typography from '@mui/material/Typography';

import { UserAddress } from '@core/types/user';

type AddressDetailProps = {
  address: UserAddress,
  variant: 'body1' | 'body2'
};

const AddressDetail = (props: AddressDetailProps) => {
  const { address, variant } = props;

  return (
    <>
      <Typography component="div" variant={variant}>
        {`${address.firstName} ${address.lastName}`}
      </Typography>
      <Typography component="div" variant={variant}>
        {address.addressLine1}
      </Typography>
      <Typography component="div" variant={variant}>
        {address.addressLine2}
      </Typography>
      <Typography component="div" variant={variant}>
      {`${address.postalCode} ${address.locality}`}
      </Typography>
      <Typography component="div" variant={variant}>
        {address.country}
      </Typography>
    </>
  );
};

export default AddressDetail;
