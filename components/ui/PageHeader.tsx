import Head from 'next/head';

import { FormattedMessage, useIntl } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { PageTypes } from '@core/constants/navigation';

type PageHeaderProps = {
  pageType: PageTypes,
  metas: {
    titleId?: string,
    titleAdd?: string,
    descriptionId?: string,
    descriptionAdd?: string,
  },
  marginTop?: boolean,
  texts?: {
    titleId?: string,
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

  const intl = useIntl();

  const getTitle = () => {
    let title = '';
    if (metas.titleId) {
      title = intl.formatMessage({ id: metas.titleId });
    }
    if (metas.titleAdd) {
      title += metas.titleAdd;
    }
    return title;
  };
  const getDescription = () => {
    let description = '';
    if (metas.descriptionId) {
      description = intl.formatMessage({ id: metas.descriptionId });
    }
    if (metas.descriptionAdd) {
      description += metas.descriptionAdd;
    }
    return description;
  };

  return (
    <>
      <Head>
        <title>{getTitle()}</title>
        <meta name="description" content={getDescription()} />
      </Head>

      { (pageType == PageTypes.main || 
         pageType == PageTypes.admin || 
         pageType == PageTypes.notFound || 
         pageType == PageTypes.error) &&
        <>
          { marginTop &&
            <Box sx={{height: '16px'}} />
          }
          { (texts?.titleId || texts?.titleAdd) &&
            <>
              <Container>
                <Typography component="h1" variant="h1">
                  { texts.titleId &&
                    <FormattedMessage id={texts.titleId} defaultMessage={texts.titleId} />
                  }
                  { texts.titleAdd }
                </Typography>

                <Divider sx={{ mt: 1, mb: 3 }} />
              </Container>
            </>
          }
        </>
      }
    </>
  );
};

export default PageHeader;
