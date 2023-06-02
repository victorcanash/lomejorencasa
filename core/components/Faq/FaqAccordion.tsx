import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { FaqGroup  } from '@core/types/faq';
import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/navigation/Link';

import { themeCustomElements } from '@lib/config/theme/elements';

type FaqAccordionProps = {
  faqGroup: FaqGroup,
  defaultExpanded?: boolean,
};

const FaqAccordion = (props: FaqAccordionProps) => {
  const {
    faqGroup,
    defaultExpanded,
  } = props;

  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        ...themeCustomElements.faq?.accordeon?.head?.title ? convertElementToSx(themeCustomElements.faq.accordeon.head.title) : undefined,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography 
          component="h2" 
          variant="h2"
          sx={{
            ...themeCustomElements.faq?.accordeon?.head?.title ? convertElementToSx(themeCustomElements.faq.accordeon.head.title) : undefined,
          }}
        >
          <FormattedMessage id={`faq.${faqGroup.title.id}.title`} values={faqGroup.title.values} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          ...themeCustomElements.faq?.accordeon?.head?.content ? convertElementToSx(themeCustomElements.faq.accordeon.head.content) : undefined,
        }}
      >
        { faqGroup.questions.map((question, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography component="div" variant="body1Head">
                <FormattedMessage id={`faq.${faqGroup.title.id}.q.${question.text.id}`} values={question.text.values} />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="div" variant="body1">
                <FormattedMessage id={`faq.${faqGroup.title.id}.r.${question.text.id}`} values={question.text.values} />
              </Typography>
              { question.path &&
                <Box sx={{ mt: 2 }}>
                  <Link href={question.path} variant="body1">
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

export default FaqAccordion;
