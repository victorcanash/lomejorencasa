import { useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import type { FormatText } from '@core/types/texts';
import type { NavItem } from '@core/types/navigation';
import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/Link';
import CustomImage from '@core/components/CustomImage';

import { themeCustomElements } from '@lib/constants/themes/elements';

type CharacteristicsGroupProps = {
  title: FormatText,
  elements: FormatText[],
  link?: NavItem,
  source?: Source,
};

const CharacteristicsGroup = (props: CharacteristicsGroupProps) => {
  const {
    title,
    elements,
    link,
    source,
  } = props;

  const items = useMemo(() => {
    const jsxElements = [] as JSX.Element[];
    for (let i = 0; i < elements.length; i++) {
      jsxElements.push(
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
      jsxElements.push(
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
    return jsxElements;
  }, [elements, link?.path, link?.text.id, link?.text.textAlign, link?.text.values]);

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
          { source ?
            <Grid container justifyContent="space-between">
              <Grid item>
                { items }
              </Grid>
              <Box
                component="span"
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '350px',
                  p: '8px 16px 16px',
                }}
              >
                <CustomImage
                  src={source.src}
                  alt={source.alt}
                  width={source.width || '1080'}
                  height={source.height || '1080'}
                  layout="responsive" 
                  objectFit="cover"
                  priority={source.priority || false}
                  style={{ borderRadius: '10px' }}
                />
              </Box>
            </Grid>
            :
            <>
              { items }
            </>
          }
        </Box>
      </Accordion>
    </Grid>
  );
};

export default CharacteristicsGroup;
