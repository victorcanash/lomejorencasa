import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import type { FormatText } from '@core/types/texts';
import type { NavItem } from '@core/types/navigation';
import type { Product } from '@core/types/products';
import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { useProductsContext } from '@lib/contexts/ProductsContext';

type DetailCharacteristicsProps = {
  product: Product,
};

const DetailCharacteristics = (props: DetailCharacteristicsProps) => {
  const { product } = props;

  const { isEverfreshProduct, isBagsProduct } = useProductsContext();

  const characteristicsGroup = (
    title: FormatText,
    elements: FormatText[],
    link?: NavItem,
  ) => {
    const items = [] as JSX.Element[];
    for (let i = 0; i < elements.length; i++) {
      items.push(
        <AccordionDetails key={i}>
          <Typography 
            component="div" 
            variant="body1" 
            align={elements[i].textAlign}
          >
            <FormattedMessage id={elements[i].id} values={elements[i].values} defaultMessage={elements[i].id} />
          </Typography>
        </AccordionDetails>    
      );
    }
    if (link?.text.id && link?.path) {
      items.push(
        <AccordionDetails key={elements.length}>
          <Link
            href={link.path}
            variant="body1"
            align={link.text.textAlign}
          >
            <FormattedMessage id={link.text.id} values={link.text.values} defaultMessage={link.text.id} />
          </Link>
        </AccordionDetails>
      );
    }
    return (
      <Grid 
        item 
        xs={12} 
        sm={6}
      >
        <Accordion sx={convertElementToSx(themeCustomElements.landing.accordion.default)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={convertElementToSx(themeCustomElements.landing.accordion.head)}
          >
            <Typography component="div" variant="body1Head" align={title.textAlign}>
              <FormattedMessage id={title.id} values={title.values} defaultMessage={title.id} />
            </Typography>
          </AccordionSummary>
          <Box mt={1}>
            { items }
          </Box>
        </Accordion>
      </Grid>
    );
  };

  return (
    <Container id="characteristics">
      <Grid
        container
        spacing={1}
        mt={2.5}
      >
        { isEverfreshProduct(product) &&
          <>
            { characteristicsGroup(
                {
                  id: 'everfresh.details.title', 
                },
                [
                  { id: 'everfresh.details.1' }, { id: 'everfresh.details.2' }, { id: 'everfresh.details.3' }, { id: 'everfresh.details.4' }, { id: 'everfresh.details.5' }, { id: 'everfresh.details.6' }, { id: 'everfresh.details.7' }, { id: 'everfresh.details.8' }, { id: 'everfresh.details.9' }
                ]
              ) 
            }
            { characteristicsGroup(
                {
                  id: 'everfresh.characteristics.title',
                },
                [
                  { id: 'everfresh.characteristics.1' }, { id: 'everfresh.characteristics.2' }, { id: 'everfresh.characteristics.3' }, { id: 'everfresh.characteristics.4' }
                ]
              ) 
            }
            { characteristicsGroup(
                {
                  id: 'everfresh.dimensions.title',
                },
                [
                  { id: 'everfresh.dimensions.1' }, { id: 'everfresh.dimensions.2' }, { id: 'everfresh.dimensions.3' }
                ]
              ) 
            }
          </>
        }
        { isBagsProduct(product) &&
          <>
            { characteristicsGroup(
                {
                  id: 'bags.details.title',
                },
                [
                  { id: 'bags.details.1' }
                ]
              ) 
            }
            { characteristicsGroup(
                {
                  id: 'bags.small.title',
                },
                [
                  { id: 'bags.small.1' }
                ]
              ) 
            }
            { characteristicsGroup(
                {
                  id: 'bags.medium.title',
                },
                [
                  { id: 'bags.medium.1' }
                ]
              ) 
            }
            { characteristicsGroup(
                {
                  id: 'bags.big.title',
                },
                [
                  { id: 'bags.big.1' }
                ]
              ) 
            }
          </>
        }
        { characteristicsGroup(
            {
              id: 'productDetail.shipping.title',
            },
            [
              { id: 'productDetail.shipping.1' }, { id: 'productDetail.shipping.2' }, { id: 'productDetail.shipping.3' }
            ],
            {
              path: pages.orderList.path,
              text: {
                id: 'productDetail.shipping.link',
              },
            }
          ) 
        }
        { characteristicsGroup(
            {
              id: 'productDetail.refund.title',
            },
            [
              { id: 'productDetail.refund.1' }, { id: 'productDetail.refund.2' }
            ],
            {
              path: pages.contact.path,
              text: {
                id: 'productDetail.refund.link',
              },
            }
          ) 
        }
      </Grid>
    </Container>
  );
};

export default DetailCharacteristics;
