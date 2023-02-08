import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';

import type { UserAddress } from '@core/types/user';
import { getCountryCode } from '@core/utils/addresses';

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
        <FormattedMessage id={getCountryCode(address.country)} />
      </Typography>
    </>
  );
};

export default AddressDetail;
