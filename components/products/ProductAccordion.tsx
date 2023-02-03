import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';

type ProductAccordionProps = {
  textId: string,
  itemsCount: number,
};

const ProductAccordion = (props: ProductAccordionProps) => {
  const { 
    textId, 
    itemsCount
  } = props;

  const items = () => {
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
    return items;
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography component="div" variant="body1">
          <FormattedMessage id={`${textId}.title`} />
        </Typography>
      </AccordionSummary>
      { items() }
    </Accordion>
  );
};

export default ProductAccordion;
