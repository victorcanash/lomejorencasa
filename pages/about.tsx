import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { PageTypes } from '@core/constants/navigation';
import Link from '@core/components/Link';
import { pages } from '@lib/constants/navigation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';

const About: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'about.metas.title',
          descriptionId: 'about.metas.description',
        }}
        texts={{
          titleId: 'about.h1',
        }}
      />
      
      <Typography component="p" variant="body1" sx={{ mb: 2 }}>
        <FormattedMessage id="about.content" />
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography component={Link} href={pages.faq.path} variant="body1">
          <FormattedMessage 
            id="footer.utility.faq" 
          />
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography component={Link} href={pages.privacy.path} variant="body1">
          <FormattedMessage 
            id="footer.utility.privacy" 
          />
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography component={Link} href={pages.cookies.path} variant="body1">
          <FormattedMessage 
            id="footer.utility.cookies" 
          />
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography component={Link} href={pages.legal.path} variant="body1">
          <FormattedMessage 
            id="footer.utility.legal" 
          />
        </Typography>
      </Box>
      <Box>
        <Typography component={Link} href={pages.conditions.path} variant="body1">
          <FormattedMessage 
            id="footer.utility.conditions" 
          />
        </Typography>
      </Box>
    </>
  );
};

export default About;
