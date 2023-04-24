import { ReactNode } from 'react';
import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import envConfig from '@core/config/env.config';
import { PageTypes } from '@core/constants/navigation';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';

const Conditions: NextPage = () => {
  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'conditions.metas.title',
          descriptionId: 'conditions.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'conditions.h1',
          },
        }}
      />

      <Container>
        <Typography variant="h2" mb={3}>
          <FormattedMessage id="conditions.general.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.general.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.user.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.user.description" />
        </Typography>
        <Box my={1} component="ul">
          <Typography component="li" variant="body1">
            <FormattedMessage id="conditions.user.1" />
          </Typography>
          <Typography component="li" variant="body1">
            <FormattedMessage id="conditions.user.2" />
          </Typography>
          <Typography component="li" variant="body1">
            <FormattedMessage id="conditions.user.3" />
          </Typography>
        </Box>
        <Typography variant="body1">
          <FormattedMessage id="conditions.user.comment" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.acquisition.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.acquisition.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.availability.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.availability.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.prices.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.prices.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.delivery.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.delivery.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.fixErrors.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.fixErrors.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.refunds.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.refunds.description" />
        </Typography>
        <Typography variant="h3" mt={3} mb={2}>
          <FormattedMessage id="conditions.refunds.withdrawalRight.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.refunds.withdrawalRight.description" />
        </Typography>
        <Link href={pages.contact.path}>
          {`${envConfig.NEXT_PUBLIC_APP_URL}${pages.contact.path}`}
        </Link>
        <Typography variant="h3" mt={3} mb={2}>
          <FormattedMessage id="conditions.refunds.errors.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.refunds.errors.description" />
        </Typography>
        <Typography variant="h3" mt={3} mb={2}>
          <FormattedMessage id="conditions.refunds.guarantee.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.refunds.guarantee.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.disclaimer.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.disclaimer.1.description" />
        </Typography>
        <Box my={1} component="ul">
          <Typography component="li" variant="body1">
            <FormattedMessage id="conditions.disclaimer.1.1" />
          </Typography>
          <Typography component="li" variant="body1">
            <FormattedMessage id="conditions.disclaimer.1.2" />
          </Typography>
          <Typography component="li" variant="body1">
            <FormattedMessage id="conditions.disclaimer.1.3" />
          </Typography>
        </Box>
        <Typography variant="body1">
          <FormattedMessage id="conditions.disclaimer.2.description" />
        </Typography>
        <Box my={1} component="ul">
          <Typography component="li" variant="body1">
            <FormattedMessage id="conditions.disclaimer.2.1" />
          </Typography>
          <Typography component="li" variant="body1">
            <FormattedMessage id="conditions.disclaimer.2.2" />
          </Typography>
          <Typography component="li" variant="body1">
            <FormattedMessage id="conditions.disclaimer.2.3" />
          </Typography>
          <Typography component="li" variant="body1">
            <FormattedMessage id="conditions.disclaimer.2.4" />
          </Typography>
          <Typography component="li" variant="body1">
            <FormattedMessage id="conditions.disclaimer.2.5" />
          </Typography>
        </Box>
        <Typography variant="body1">
          <FormattedMessage id="conditions.disclaimer.3.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.notifications.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.notifications.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.resignation.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.resignation.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.nullity.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.nullity.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.agreement.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.agreement.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.dataProtection.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.dataProtection.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.legislation.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="conditions.legislation.description" />
        </Typography>

        <Typography variant="h2" my={3}>
          <FormattedMessage id="conditions.claim.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage
            id="conditions.claim.description"
            values={{
              'link': (...chunks: ReactNode[]) => (
                <Link href="https://ec.europa.eu/consumers/odr/" target="_blank">
                  {chunks}
                </Link>
              ),
            }}
          />
        </Typography>
      </Container>
    </>
  );
};

export default Conditions;
