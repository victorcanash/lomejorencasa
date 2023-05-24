import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import blogs from '@lib/constants/blogs';
import Title from '@components/ui/Title';

const BlogsList = () => {

  return (
    <Container>
      <Box 
        maxWidth="md"
        m="auto"
      >
        <Title
          type="h2"
          texts={{
            title: {
              id: 'blogsList.title',
            },
          }}
          divider={true}
        />

        { blogs.map((blog, index) => (
          <Typography key={index} component="h3" variant="h3" mb={2}>
            <Link href={blog.path || pages.home.path}>
              <FormattedMessage id={blog.text.id} values={blog.text.values} />
            </Link>
          </Typography>
        ))}
      </Box>
    </Container>
  );
};

export default BlogsList;
