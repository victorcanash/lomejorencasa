import { FormattedMessage } from 'react-intl'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Legal = () => {
  return (
    <Container>
      <Typography variant="h2" mb={3}>
        <FormattedMessage id="legal.general.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="legal.general.description" />
      </Typography>

      <Typography variant="h2" my={3}>
        <FormattedMessage id="legal.conditions.title" />
      </Typography>
      <Typography variant="h3" mb={2}>
        <FormattedMessage id="legal.conditions.website.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="legal.conditions.website.description" />
      </Typography>
      <Typography variant="h3" mt={3} mb={2}>
        <FormattedMessage id="legal.conditions.user.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="legal.conditions.user.description" />
      </Typography>
      <Box my={1} component="ul">
        <Typography component="li" variant="body1">
          <FormattedMessage id="legal.conditions.user.1" />
        </Typography>
        <Typography component="li" variant="body1">
          <FormattedMessage id="legal.conditions.user.2" />
        </Typography>
      </Box>
      <Typography variant="body1">
        <FormattedMessage id="legal.conditions.user.comment" />
      </Typography>
      <Typography variant="h2" my={3}>
        <FormattedMessage id="legal.access.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="legal.access.description" />
      </Typography>
      <Typography variant="h2" my={3}>
        <FormattedMessage id="legal.linksPolicy.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="legal.linksPolicy.description" />
      </Typography>
      <Typography variant="h2" my={3}>
        <FormattedMessage id="legal.property.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="legal.property.description" />
      </Typography>
      <Typography variant="h2" my={3}>
        <FormattedMessage id="legal.legislation.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="legal.legislation.description" />
      </Typography>
    </Container>
  )
}

export default Legal
