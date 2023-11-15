import { FormattedMessage } from 'react-intl'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Link from '@core/components/navigation/Link'
import Title from '@core/components/ui/Title'

import { pages } from '@lib/config/navigation.config'
import blogsConfig from '@lib/config/blogs.config'

const BlogsList = () => {
  return (
    <Container>
      <Box
        m="auto"
      >
        <Title
          type="h2"
          texts={{
            title: {
              id: 'blogsList.title'
            }
          }}
          divider={true}
        />

        { blogsConfig.map((blog, index) => (
          <Typography key={index} component="h3" variant="h3" mb={2}>
            <Link href={blog.path ?? pages.home.path}>
              <FormattedMessage id={blog.text.id} values={blog.text.values} />
            </Link>
          </Typography>
        ))}
      </Box>
    </Container>
  )
}

export default BlogsList
