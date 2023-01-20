import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Link from '@core/components/Link';
import { pages } from '@lib/constants/navigation';

const EverfreshDetail = () => {
  const list = (textId: string, itemsCount: number) => {
    const items = [] as JSX.Element[];
    for (let i = 0; i < itemsCount; i++) {
      items.push(   
        <ListItem key={i} sx={{"&:hover": {backgroundColor: "transparent", }}}>
          <ListItemText 
            primary={
              (textId == 'productDetail.shipping' && i == itemsCount -1) ?
                <Link href={pages.orderList.path} variant="body1" key={i}>
                  <FormattedMessage id={`${textId}.${i + 1}`} />
                </Link>
                :
                <Typography component="div" variant="body1" key={i}>
                  <FormattedMessage id={`${textId}.${i + 1}`} />
                </Typography>
            } 
          />
        </ListItem>
      );
    }
    return (
      <>
        <Typography component="div" variant="h1">
          <FormattedMessage id={`${textId}.title`} />
        </Typography>
        <List>
          { items }
        </List>
      </>
    );
  };

  return (
    <>
      {/* Everfresh Details & Charasteristics Section */}
      <Grid
        container
        spacing={3}
        className='animate__animated animate__fadeIn'
        mb={3}
      >
        {/* Everfresh Details */}
        <Grid 
          item 
          xs={12} 
          sm={6}
        >
          { list('everfresh.details', 6) }
        </Grid>

        {/* Charasteristics Section */}
        <Grid 
          item 
          xs={12} 
          sm={6}
        >
          { list('everfresh.characteristics', 4) }
        </Grid>
      </Grid>
      
      {/* Shipping & Everfresh Dimensions Section */}
      <Grid
        container
        spacing={3}
        className='animate__animated animate__fadeIn'
        mb={3}
      >
        {/* Shipping Section  */}
        <Grid 
          item 
          xs={12} 
          sm={6}
        >
          { list('productDetail.shipping', 3) }
        </Grid>

        {/* Everfresh Dimensions Section */}
        <Grid 
          item 
          xs={12} 
          sm={6}
        >
          { list('everfresh.dimensions', 2) }
        </Grid>
      </Grid>
    </>
  );
};

export default EverfreshDetail;
