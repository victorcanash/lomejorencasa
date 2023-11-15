import { FormattedMessage } from 'react-intl'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import LinkButton from '@core/components/inputs/LinkButton'

import { pages } from '@lib/config/navigation.config'

const AboutView = () => {
  return (
    <Container>
      <Typography variant="body1" sx={{ mb: 4 }}>
        <FormattedMessage id="about.content" />
      </Typography>

      <LinkButton
        href={pages.contact.path}
        customtype="actionPrimary"
      >
        <FormattedMessage
          id="about.contactBtn"
        />
      </LinkButton>
    </Container>
  )
}

export default AboutView
