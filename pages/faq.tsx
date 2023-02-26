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
import type { NavItem } from '@core/types/navigation';
import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { questions } from '@lib/constants/faq';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';

const Faq: NextPage = () => {
  const page = usePage();

  const questionElements = (textBaseId: string, questions: NavItem[]) => {
    const items = [] as JSX.Element[];
    for (let i = 0; i < questions.length; i++) {
      items.push(
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography component="div" variant="body1">
              <FormattedMessage id={`faq.${textBaseId}.q.${questions[i].text.id}`} values={questions[i].text.values} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div" variant="body1">
              <FormattedMessage id={`faq.${textBaseId}.r.${questions[i].text.id}`} values={questions[i].text.values} />
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
    return (
      <Accordion
        key={textBaseId}
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
          { items }
        </AccordionDetails>
      </Accordion>
    );
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
          title: {
            id: 'faq.h1',
          },
        }}
      /> 
      <Container>
        { questionElements('packing', questions.packing) }
        { questionElements('conservation', questions.conservation) }
        { questionElements('shipping', questions.shipping) }
      </Container>
    </>
  );
};

export default Faq;
