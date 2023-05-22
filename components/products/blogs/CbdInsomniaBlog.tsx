import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Link from '@core/components/Link';
import CustomImage from '@core/components/CustomImage';

import { cbdBlogImgIds } from '@lib/constants/multimedia';

const CbdInsomniaBlog = () => {

  return (
    <Container>
      <Typography variant="h2" mb={3}>
        <FormattedMessage id="cbdBlog.intro.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="cbdBlog.intro.description.1" />
      </Typography>
      <Box
        sx={{
          m: 'auto',
          mt: 3,
          mb: 3,
          maxWidth: '600px',
        }} 
      >
        <CustomImage
          src={cbdBlogImgIds[0]}
          alt="cbd"
          width="5737"
          height="3825"
          layout="responsive"
          objectFit="cover"
        />
      </Box>
      <Typography variant="body1">
        <FormattedMessage id="cbdBlog.intro.description.2" />
      </Typography>

      <Typography variant="h2" my={3}>
        <FormattedMessage id="cbdBlog.insomnia.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="cbdBlog.insomnia.description" />
      </Typography>

      <Typography variant="h2" my={3}>
        <FormattedMessage id="cbdBlog.benefits.title" />
      </Typography>
      <Grid container>
        <Grid item xs={12} sm_md={6}>
          <Typography variant="body1">
            <FormattedMessage id="cbdBlog.benefits.description" />
          </Typography>
        </Grid>
        <Grid item xs={12} sm_md={6}>
          <Box
            sx={{
              m: 'auto',
              mt: {
                xs: 3,
                md: 1,
              },
              maxWidth: '300px',
            }} 
          >
            <Link href="https://www.sensitivecbd.com/" target="_blank">
              <CustomImage
                src={cbdBlogImgIds[1]}
                alt="cbd"
                width="300"
                height="300"
                layout="responsive"
                objectFit="cover"
              />
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h2" my={3}>
        <FormattedMessage id="cbdBlog.studies.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="cbdBlog.studies.description" />
      </Typography>

      <Typography variant="h2" my={3}>
        <FormattedMessage id="cbdBlog.packed.title" />
      </Typography>
      <Typography variant="body1" mb={3}>
        <FormattedMessage id="cbdBlog.packed.description.1" />
      </Typography>
      <Typography variant="body1" mb={3}>
        <FormattedMessage id="cbdBlog.packed.description.2" />
      </Typography>
      <Grid container>
        <Grid item xs={12} sm_md={6} mt={-3}>
          <Box
            sx={{
              m: 'auto',
              maxWidth: '300px',
              textAlign: 'center',
              mb: {
                xs: 3,
                sm_md: 'auto',
              },
            }} 
          >
            <Link href="https://www.sensitivecbd.com/" target="_blank">
              <CustomImage
                src={cbdBlogImgIds[2]}
                alt="cbd"
                width="693"
                height="520"
                layout="responsive"
                objectFit="cover"
              />
            </Link>
            <Box>
              <Link href="https://www.sensitivecbd.com/" variant="body1Head" target="_blank">
                <FormattedMessage id="cbdBlog.packed.link" />
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm_md={6}>
          <Typography variant="body1">
            <FormattedMessage id="cbdBlog.packed.description.3" />
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h2" my={3}>
        <FormattedMessage id="cbdBlog.conclusion.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="cbdBlog.conclusion.description" />
      </Typography>

      <Typography variant="h2" my={3}>
        <FormattedMessage id="cbdBlog.sources.title" />
      </Typography>
      <Box mb={1} component="ul">
        <Typography component="li" variant="body1">
          <FormattedMessage id="cbdBlog.sources.1" />
        </Typography>
        <Typography component="li" variant="body1">
          <FormattedMessage id="cbdBlog.sources.2" />
        </Typography>
        <Typography component="li" variant="body1">
          <FormattedMessage id="cbdBlog.sources.3" />
        </Typography>
        <Typography component="li" variant="body1">
          <FormattedMessage id="cbdBlog.sources.4" />
        </Typography>
      </Box>
      <Typography variant="body1">
        <FormattedMessage id="cbdBlog.sources.comment" />
      </Typography>
      <Box mt={3}>
        <Link href="https://www.sensitivecbd.com/cbd-para-dormir/" variant="body1Head" target="_blank">
          <FormattedMessage id="cbdBlog.sources.link.relatedBlog" />
        </Link>
      </Box>
      <Box mt={3}>
        <Link href="https://www.sensitivecbd.com/ultimas-noticias/" variant="body1Head" target="_blank">
          <FormattedMessage id="cbdBlog.sources.link.moreInfo" />
        </Link>
      </Box>
    </Container>
  );
};

export default CbdInsomniaBlog;
