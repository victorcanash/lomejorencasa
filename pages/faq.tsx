import type { NextPage } from 'next';
import Head from 'next/head';

import { FormattedMessage, useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { pages } from '@core/config/navigation.config';
import Link from '@core/components/Link';
import { questions } from '@lib/constants/faq';
import usePage from '@lib/hooks/usePage';

const Faq: NextPage = () => {
  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'faq.metas.title' });
  const description = intl.formatMessage({ id: 'faq.metas.description' });

  const questionElements = () => {
    const items = [] as JSX.Element[];
    for (let i = 0; i < questions.length; i++) {
      items.push(
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography component="div" variant="body1">
              <FormattedMessage id={`faq.q.${questions[i].textId}`} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div" variant="body1" sx={{ mb: 2 }}>
              <FormattedMessage id={`faq.r.${questions[i].textId}`} />
            </Typography>
            { questions[i].path &&
              <Link href={questions[i].path || pages.home.path}>
                <FormattedMessage id="faq.link" />
              </Link>
            }           
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
        { questionElements() }
      </div>
    </>
  );
};

export default Faq;
