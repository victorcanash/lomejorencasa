import Typography from '@mui/material/Typography';

import { UserAddress } from '@core/types/user';

type AddressDetailProps = {
  address: UserAddress,
};

const AddressDetail = (props: AddressDetailProps) => {
  const { address } = props;

  return (
    <>
      <Typography component="div" variant="subtitle1">
        {`${address.firstName} ${address.lastName}`}
      </Typography>
      <Typography component="div" variant="subtitle1">
        {address.addressLine1}
      </Typography>
      <Typography component="div" variant="subtitle1">
        {address.addressLine2}
      </Typography>
      <Typography component="div" variant="subtitle1">
      {`${address.postalCode} ${address.locality}`}
      </Typography>
      <Typography component="div" variant="subtitle1">
        {address.country}
      </Typography>
    </>
  );
};

export default AddressDetail;
