import { type ReactNode } from 'react'

import { FormattedMessage } from 'react-intl'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Link from '@core/components/navigation/Link'

const Cookies = () => {
  return (
    <Container>
      <Typography variant="body1">
        <FormattedMessage id="cookies.description" />
      </Typography>

      <Typography variant="h3" mt={3} mb={2}>
        <FormattedMessage id="cookies.firstParty.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="cookies.firstParty.description" />
      </Typography>

      <Typography variant="h3" mt={3} mb={2}>
        <FormattedMessage id="cookies.thirdParty.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="cookies.thirdParty.description" />
      </Typography>
      <Box my={1} component="ul">
        <Typography component="li" variant="body1">
          <FormattedMessage
            id="cookies.thirdParty.1"
            values={{
              link: (...chunks: ReactNode[]) => (
                <Link href="https://policies.google.com/technologies/cookies" target="_blank">
                  {chunks}
                </Link>
              )
            }}
          />
        </Typography>
        <Typography component="li" variant="body1">
          <FormattedMessage
            id="cookies.thirdParty.2"
            values={{
              link: (...chunks: ReactNode[]) => (
                <Link href="https://www.cloudinary.com/privacy/cookie-policy" target="_blank">
                  {chunks}
                </Link>
              )
            }}
          />
        </Typography>
        <Typography component="li" variant="body1">
          <FormattedMessage
            id="cookies.thirdParty.3"
            values={{
              link: (...chunks: ReactNode[]) => (
                <Link href="https://www.paypal.com/es/webapps/mpp/ua/cookie-full" target="_blank">
                  {chunks}
                </Link>
              )
            }}
          />
        </Typography>
        <Typography component="li" variant="body1">
          <FormattedMessage
            id="cookies.thirdParty.4"
            values={{
              link: (...chunks: ReactNode[]) => (
                <Link href="https://www.facebook.com/privacy/policies/cookies" target="_blank">
                  {chunks}
                </Link>
              )
            }}
          />
        </Typography>
      </Box>
      <Typography variant="body1">
        <FormattedMessage id="cookies.thirdParty.comment" />
      </Typography>

      <Typography variant="h3" mt={3} mb={2}>
        <FormattedMessage id="cookies.refuse.title" />
      </Typography>
      <Typography variant="body1">
        <FormattedMessage id="cookies.refuse.description" />
      </Typography>
    </Container>
  )
}

export default Cookies
