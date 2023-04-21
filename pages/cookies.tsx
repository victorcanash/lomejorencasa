import { useState, ChangeEvent, useEffect } from 'react';
import type { NextPage } from 'next';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

import { PageTypes } from '@core/constants/navigation';

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
          <FormattedMessage id="cookies.content" />
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
