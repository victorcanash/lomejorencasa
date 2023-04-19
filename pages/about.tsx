import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { PageTypes } from '@core/constants/navigation';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';

import { pages } from '@lib/constants/navigation';
import { themeCustomElements } from '@lib/constants/themes/elements';
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
        marginTop={true}
        texts={{
          title: {
            id: 'about.h1',
          },
        }}
      />
      
      <Container>
        <Typography variant="body1" sx={{ mb: 4 }}>
          <FormattedMessage id="about.content" />
        </Typography>

        <LinkButton
          href={pages.contact.path}
          sx={convertElementToSx(themeCustomElements.button.action.primary)}
        >
          <FormattedMessage
            id="about.contactBtn"
          />
        </LinkButton>
      </Container>
    </>
  );
};

export default About;
