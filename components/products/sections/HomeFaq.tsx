import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import { homeQuestions } from '@lib/constants/faq';
import Title from '@components/ui/Title';

const HomeFaq = () => {
  const getTextBaseId = (index: number) => {
    let textBaseId = 'packing';
    if (index == 1) {
      textBaseId = 'conservation';
    } else if (index == 2) {
      textBaseId = 'shipping';
    }
    return textBaseId;
  };

  return (
    <Container>
      <Box
        maxWidth="md"
        m="auto"
      >
        <Title
          type="h2"
          texts={{
            title: {
              id: 'faq.h1',
            },
          }}
          divider={true}
        />
        { homeQuestions.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography component="div" variant="body1">
                <FormattedMessage id={`faq.${getTextBaseId(index)}.q.${item.text.id}`} values={item.text.values} />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="div" variant="body1">
                <FormattedMessage id={`faq.${getTextBaseId(index)}.r.${item.text.id}`} values={item.text.values} />
              </Typography>
              { item.path &&
                <Box sx={{ mt: 2 }}>
                  <Link href={item.path || pages.home.path} variant="body1">
                    <FormattedMessage id="faq.link" />
                  </Link>
                </Box>
              }           
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default HomeFaq;
