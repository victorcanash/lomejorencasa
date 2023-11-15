import { FormattedMessage } from 'react-intl'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { type FaqGroup } from '@core/types/faq'
import { convertElementToSx } from '@core/utils/themes'
import Link from '@core/components/navigation/Link'

import { themeCustomElements } from '@lib/config/theme/elements'

interface FaqAccordionProps {
  faqGroup: FaqGroup
  defaultExpanded?: boolean
}

const FaqAccordion = (props: FaqAccordionProps) => {
  const {
    faqGroup,
    defaultExpanded
  } = props

  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        ...((themeCustomElements.faq?.accordionGroup?.default) != null)
          ? convertElementToSx(themeCustomElements.faq.accordionGroup.default)
          : undefined
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          ...((themeCustomElements.faq?.accordionGroup?.summary) != null)
            ? convertElementToSx(themeCustomElements.faq.accordionGroup.summary)
            : undefined
        }}
      >
        <Typography
          component="h2"
          variant="h3"
        >
          <FormattedMessage id={`faq.${faqGroup.title.id}.title`} values={faqGroup.title.values} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          ...((themeCustomElements.faq?.accordionGroup?.details) != null)
            ? convertElementToSx(themeCustomElements.faq.accordionGroup.details)
            : undefined
        }}
      >
        { faqGroup.questions.map((question, index) => (
          <Box key={index} mt={index > 0 ? 1 : undefined}>
            <Accordion
              sx={{
                ...((themeCustomElements.faq?.accordion?.default) != null)
                  ? convertElementToSx(themeCustomElements.faq.accordion.default)
                  : undefined
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  ...((themeCustomElements.faq?.accordion?.summary) != null)
                    ? convertElementToSx(themeCustomElements.faq.accordion.summary)
                    : undefined
                }}
              >
                <Typography component="div" variant="body1Head">
                  <FormattedMessage id={`faq.${faqGroup.title.id}.q.${question.text.id}`} values={question.text.values} />
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  ...((themeCustomElements.faq?.accordion?.details) != null)
                    ? convertElementToSx(themeCustomElements.faq.accordion.details)
                    : undefined
                }}
              >
                <Typography component="div" variant="body1">
                  <FormattedMessage id={`faq.${faqGroup.title.id}.r.${question.text.id}`} values={question.text.values} />
                </Typography>
                { (question.path != null) &&
                  <Box sx={{ mt: 2 }}>
                    <Link href={question.path} variant="body1">
                      <FormattedMessage id="faq.link" />
                    </Link>
                  </Box>
                }
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

export default FaqAccordion
