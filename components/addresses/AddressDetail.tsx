import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { AddressTypes } from '@core/constants/addresses';
import type { UserAddress } from '@core/types/user';
import { getCountryCode } from '@core/utils/addresses';

type AddressDetailProps = {
  address: UserAddress,
};

const AddressDetail = (props: AddressDetailProps) => {
  const { address } = props;

  return (
    <>
      <Typography component="div" variant="body1Head">
        <FormattedMessage
          id={address.type === AddressTypes.shipping ? 'forms.shipping' : 'forms.billing'}
        />
      </Typography>
      <Box mt={1} pl={0.5}>
        <Typography component="div" variant="body1">
          {`${address.firstName} ${address.lastName}`}
        </Typography>
        <Typography component="div" variant="body1">
          {address.addressLine1}
        </Typography>
        <Typography component="div" variant="body1">
          {address.addressLine2}
        </Typography>
        <Typography component="div" variant="body1">
        {`${address.postalCode} ${address.locality}`}
        </Typography>
        <Typography component="div" variant="body1">
          <FormattedMessage id={getCountryCode(address.country)} />
        </Typography>
      </Box>
    </>
  );
};

export default AddressDetail;
