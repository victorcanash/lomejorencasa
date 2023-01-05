import type { NextPage } from 'next';
import Head from 'next/head';

import { FormattedMessage, useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { allProductsName } from '@core/constants/products';
import LinkButton from '@core/components/LinkButton';
import { useSearchContext } from '@lib/contexts/SearchContext';
import usePage from '@lib/hooks/usePage';
import ProTip from '@components/ui/ProTip';
import Copyright from '@components/ui/Copyright';

const Home: NextPage = () => {
  const { getHref, productCategories } = useSearchContext();

  const intl = useIntl();

  const page = usePage();

  const title = intl.formatMessage({ id: 'home.metas.title' });
  const description = intl.formatMessage({ id: 'home.metas.description' });

  const hrefExplore = () => {
    return getHref(productCategories.length > 0 ? productCategories[0].name.current : allProductsName);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h1" component="h1" gutterBottom>
        <FormattedMessage id="home.welcome" />
      </Typography>
      <Box maxWidth="sm">
        <LinkButton href={hrefExplore()}>
          <FormattedMessage id="home.explore" />
        </LinkButton>
      </Box>
      <ProTip />
      <Copyright />
    </>
  );
};

export default Home;
