import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Link from '@core/components/Link';
import { pages } from '@lib/constants/navigation';

const EverfreshDetail = () => {
  const list = (textId: string, itemsCount: number) => {
    const items = [] as JSX.Element[];
    for (let i = 0; i < itemsCount; i++) {
      items.push(   
        <AccordionDetails key={i}>
          <Typography component="div" variant="body1">
            <FormattedMessage id={`${textId}.${i + 1}`} />
          </Typography>       
        </AccordionDetails>
      );
      if (textId == 'productDetail.shipping' && i == itemsCount -1) {
        items.push(
          <AccordionDetails key={`${i}.link`}>
            <Link href={pages.orderList.path} variant="body1">
              <FormattedMessage id={`${textId}.${i + 1}.link`} />
            </Link>
          </AccordionDetails>
        );
      }  
    }
    return (
      <Accordion key={textId}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography component="div" variant="body1">
            <FormattedMessage id={`${textId}.title`} />
          </Typography>
        </AccordionSummary>
        { items }
      </Accordion>
    );
  };

  return (
    <>
      <Grid
        container
        className='animate__animated animate__fadeIn'
        spacing={1}
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
