import type { NextPage } from 'next';
import Head from 'next/head';

import { FormattedMessage, useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import usePage from '@lib/hooks/usePage';

const Faq: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'faq.metas.title' });
  const description = intl.formatMessage({ id: 'faq.metas.description' });

  const questions = () => {
    const items = [];
    for (let i = 0; i < 19; i++) {
      items.push(
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <FormattedMessage id={`faq.q${i + 1}`} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      );
    }
    return items;
  };


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h1" component="h1" gutterBottom>
        <FormattedMessage id="faq.h1" />
      </Typography>

      <Divider sx={{ mt: 1, mb: 3 }} />
      
      <div>
        { questions() }
      </div>
    </>
  );
};

export default Faq;
