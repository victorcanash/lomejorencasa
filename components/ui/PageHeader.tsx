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
    titleId: string,
    descriptionId: string,
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

  const title = intl.formatMessage({ id: metas.titleId });
  const description = intl.formatMessage({ id: metas.descriptionId });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      { (pageType == PageTypes.main || 
         pageType == PageTypes.admin || 
         pageType == PageTypes.notFound || 
         pageType == PageTypes.error) &&
        <>
          { marginTop &&
            <Box sx={{height: '16px'}} />
          }
          { texts?.titleId &&
            <>
              <Container>
                <Typography component="h1" variant="h1" className='animate__animated animate__fadeInLeft'>
                  <FormattedMessage id={texts.titleId} defaultMessage={texts.titleId} />{texts.titleAdd}
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
