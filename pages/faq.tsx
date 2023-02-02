import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { PageTypes } from '@core/constants/navigation';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import { questions } from '@lib/constants/faq';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';

const Faq: NextPage = () => {
  const page = usePage();

  const questionElements = () => {
    const items = [] as JSX.Element[];
    for (let i = 0; i < questions.length; i++) {
      items.push(
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography component="div" variant="body1">
              <FormattedMessage id={`faq.q.${questions[i].text.id}`} values={questions[i].text.values} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div" variant="body1">
              <FormattedMessage id={`faq.r.${questions[i].text.id}`} values={questions[i].text.values} />
            </Typography>
            { questions[i].path &&
              <Box sx={{ mt: 2 }}>
                <Link href={questions[i].path || pages.home.path} variant="body1">
                  <FormattedMessage id="faq.link" />
                </Link>
              </Box>
            }           
          </AccordionDetails>
        </Accordion>
      );
    }
    return items;
  };

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'faq.metas.title',
          descriptionId: 'faq.metas.description',
        }}
        marginTop={true}
        texts={{
          titleId: 'faq.h1',
        }}
      />
      
      <Container>
        { questionElements() }
      </Container>
    </>
  );
};

export default Faq;
