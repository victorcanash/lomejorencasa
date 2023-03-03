import { useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';

import { ProductPack } from '@core/types/products';
import Grid from '@mui/material/Grid';
import InventoriesDetail from './InventoriesDetail';

type PackDetailProps = {
  pack: ProductPack,
  created: boolean,
};

const PackDetail = (props: PackDetailProps) => {
  const { pack, created } = props;

  const intl = useIntl();

  return (
    <>
      { created &&
        <Typography component="div" variant="body1">
          {`${intl.formatMessage({ id: 'forms.id' })}: ${pack.id}`}
        </Typography>
      }
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.en' })}: ${pack.name.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.es' })}: ${pack.name.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.en' })}: ${pack.description.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.es' })}: ${pack.description.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.price' })}: ${pack.price}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.quantity' })}: ${pack.quantity}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.originalPrice' })}: ${pack.originalPrice}`}
      </Typography>
      <Typography component="h3" variant="body1">
        {`${intl.formatMessage({ id: 'forms.createPack.inventories' })}:`}
      </Typography>
      { !created ?
        <Grid container spacing={1} py={3}>
          { pack.inventories.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Typography component="div" variant="body1">
                {`${intl.formatMessage({ id: "forms.inventoryId" })}: ${item.id}`}
              </Typography>
            </Grid>
          ))}
        </Grid>
        :
        <InventoriesDetail
          inventories={pack.inventories}
          created={true}
        />
      }
    </>
  );
};

export default PackDetail;
