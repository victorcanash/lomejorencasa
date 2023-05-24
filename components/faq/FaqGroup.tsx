import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import type { NavItem } from '@core/types/navigation';
import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import { themeCustomElements } from '@lib/constants/themes/elements';

type FaqGroupProps = {
  textBaseId: string,
  questions: NavItem[],
};

const FaqGroup = (props: FaqGroupProps) => {
  const {
    textBaseId,
    questions,
  } = props;

  return (
    <Accordion
      key={textBaseId}
      defaultExpanded={textBaseId == 'packing' ? true : false}
      sx={convertElementToSx(themeCustomElements.faq.accordeon.head.title)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography 
          component="h2" 
          variant="h2"
          sx={convertElementToSx(themeCustomElements.faq.accordeon.head.title)}
        >
          <FormattedMessage id={`faq.${textBaseId}.title`} defaultMessage={`faq.${textBaseId}.title`} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={convertElementToSx(themeCustomElements.faq.accordeon.head.content)}
      >
        { questions.map((question, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography component="div" variant="body1Head">
                <FormattedMessage id={`faq.${textBaseId}.q.${question.text.id}`} values={question.text.values} />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="div" variant="body1">
                <FormattedMessage id={`faq.${textBaseId}.r.${question.text.id}`} values={question.text.values} />
              </Typography>
              { question.path &&
                <Box sx={{ mt: 2 }}>
                  <Link href={question.path || pages.home.path} variant="body1">
                    <FormattedMessage id="faq.link" />
                  </Link>
                </Box>
              }           
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default FaqGroup;
