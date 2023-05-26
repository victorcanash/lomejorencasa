import { useCallback } from 'react';
// import Head from 'next/head';
import { useRouter } from 'next/router';

import { NextSeo } from 'next-seo';
import { useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import envConfig from '@core/config/env.config';
import { PageTypes } from '@core/constants/navigation';
import type { FormatText } from '@core/types/texts';

import Title from '@components/ui/Title';

type PageHeaderProps = {
  pageType: PageTypes,
  metas: {
    titleId?: string,
    titleAdd?: string,
    descriptionId?: string,
    descriptionAdd?: string,
    noindex?: boolean,
    nofollow?: boolean,
  },
  marginTop?: boolean,
  texts?: {
    title?: FormatText,
    titleAdd?: string,
  },
};

const PageHeader = (props: PageHeaderProps) => {
  const {
    pageType,
    metas,
    marginTop,
    texts,
  } = props;

  const router = useRouter();
  const intl = useIntl();

  const getTitle = useCallback(() => {
    let title = '';
    if (metas.titleId) {
      title = intl.formatMessage({ id: metas.titleId });
    }
    if (metas.titleAdd) {
      title += metas.titleAdd;
    }
    return title;
  }, [intl, metas.titleAdd, metas.titleId]);

  const getDescription = useCallback(() => {
    let description = '';
    if (metas.descriptionId) {
      description = intl.formatMessage({ id: metas.descriptionId });
    }
    if (metas.descriptionAdd) {
      description += metas.descriptionAdd;
    }
    return description;
  }, [intl, metas.descriptionAdd, metas.descriptionId]);

  return (
    <>
      <NextSeo
        title={getTitle()}
        description={getDescription()}
        noindex={metas.noindex}
        nofollow={metas.nofollow}
        openGraph={{
          type: 'website',
          locale: 'es_ES',
          title: getTitle(),
          description: getDescription(),
          url: `${envConfig.APP_URL}${router.asPath}`,
          /*images: [
            {
              url: `https://${envConfig.NEXT_PUBLIC_APP_URL}/logo_lg.png`,
              width: 1000,
              height: 750,
            },
          ],*/
          siteName: getTitle(),
        }}
      />

      { (pageType == PageTypes.main || 
         pageType == PageTypes.admin || 
         pageType == PageTypes.notFound || 
         pageType == PageTypes.error) &&
        <>
          { marginTop &&
            <Box sx={{height: '20px'}} />
          }
          { (texts?.title?.id || texts?.titleAdd) &&
            <Container>
              <Title
                type="h1"
                noMarginTop={true}
                texts={texts}
                divider={true}
              />
            </Container>
          }
        </>
      }
    </>
  );
};

export default PageHeader;
