import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import { themeCustomElements } from '@lib/constants/themes/elements';

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
      if ((textId == 'productDetail.shipping' || textId == 'productDetail.refund') 
          && i == itemsCount -1) {
        items.push(
          <AccordionDetails key={`${i}.link`}>
            <Link
              href={textId == 'productDetail.shipping' ? pages.orderList.path : pages.contact.path} 
              variant="body1"
            >
              <FormattedMessage id={`${textId}.${i + 1}.link`} />
            </Link>
          </AccordionDetails>
        );
      }  
    }
    return items;
  };

  return (
    <Accordion sx={convertElementToSx(themeCustomElements.landing.accordion.default)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={convertElementToSx(themeCustomElements.landing.accordion.head)}
      >
        <Typography component="div" variant="body1">
          <FormattedMessage id={`${textId}.title`} />
        </Typography>
      </AccordionSummary>
      <Box mt={1} /*sx={convertElementToSx(themeCustomElements.landing.accordion.content)}*/>     
        { items() }
      </Box>
    </Accordion>
  );
};

export default ProductAccordion;
