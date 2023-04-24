import { useState, ChangeEvent, useEffect, ReactNode } from 'react';
import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

import { PageTypes } from '@core/constants/navigation';
import Link from '@core/components/Link';

import { useAppContext } from '@lib/contexts/AppContext';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';

const Cookies: NextPage = () => {
  const {
    acceptedCookies,
    openCookiesBanner,
    refuseCookies,
    acceptCookies,
  } = useAppContext();

  const page = usePage();

  const [acceptedSwitch, setAcceptedSwitch] = useState(acceptedCookies);

  const handleAcceptedSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setAcceptedSwitch(checked);
    if (checked) {
      acceptCookies();
    } else {
      refuseCookies();
    }
  };

  useEffect(() => {
    setAcceptedSwitch(acceptedCookies);
  }, [acceptedCookies]);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'cookies.metas.title',
          descriptionId: 'cookies.metas.description',
          noindex: true,
          nofollow: true,
        }}
        marginTop={true}
        texts={{
          title: {
            id: 'cookies.h1',
          },
        }}
      />

      <Container>
        <Typography variant="body1">
          <FormattedMessage id="cookies.description" />
        </Typography>

        <Typography variant="h3" mt={3} mb={2}>
          <FormattedMessage id="cookies.firstParty.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="cookies.firstParty.description" />
        </Typography>

        <Typography variant="h3" mt={3} mb={2}>
          <FormattedMessage id="cookies.thirdParty.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="cookies.thirdParty.description" />
        </Typography>
        <Box my={1} component="ul">
          <Typography component="li" variant="body1">
            <FormattedMessage
              id="cookies.thirdParty.1"
              values={{
                'link': (...chunks: ReactNode[]) => (
                  <Link href="https://policies.google.com/technologies/cookies" target="_blank">
                    {chunks}
                  </Link>
                ),
              }}
            />
          </Typography>
          <Typography component="li" variant="body1">
            <FormattedMessage
              id="cookies.thirdParty.2"
              values={{
                'link': (...chunks: ReactNode[]) => (
                  <Link href="https://www.cloudinary.com/privacy/cookie-policy" target="_blank">
                    {chunks}
                  </Link>
                ),
              }}
            />
          </Typography>
          <Typography component="li" variant="body1">
            <FormattedMessage
              id="cookies.thirdParty.3"
              values={{
                'link': (...chunks: ReactNode[]) => (
                  <Link href="https://www.paypal.com/es/webapps/mpp/ua/cookie-full" target="_blank">
                    {chunks}
                  </Link>
                ),
              }}
            />
          </Typography>
          <Typography component="li" variant="body1">
            <FormattedMessage
              id="cookies.thirdParty.4"
              values={{
                'link': (...chunks: ReactNode[]) => (
                  <Link href="https://www.facebook.com/privacy/policies/cookies" target="_blank">
                    {chunks}
                  </Link>
                ),
              }}
            />
          </Typography>
        </Box>
        <Typography variant="body1">
          <FormattedMessage id="cookies.thirdParty.comment" />
        </Typography>

        <Typography variant="h3" mt={3} mb={2}>
          <FormattedMessage id="cookies.refuse.title" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="cookies.refuse.description" />
        </Typography>

        { !openCookiesBanner &&
          <Stack direction="row" spacing={1} alignItems="center" mt={3}>
            <Typography variant="body1Head">
              <FormattedMessage id="cookies.refused" />
            </Typography>
            <Switch
              checked={acceptedSwitch}
              onChange={handleAcceptedSwitchChange}
            />
            <Typography variant="body1Head">
              <FormattedMessage id="cookies.accepted" />
            </Typography>
          </Stack>
        }
      </Container>
    </>
  );
};

export default Cookies;
