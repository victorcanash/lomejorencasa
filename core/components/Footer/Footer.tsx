import { type ReactNode } from 'react'

import { FormattedMessage } from 'react-intl'

import {
  faInstagram,
  faFacebook,
  faTiktok,
  faCcVisa,
  faCcMastercard,
  faCcPaypal
} from '@fortawesome/free-brands-svg-icons'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import { convertElementToSx } from '@core/utils/themes'
import Link from '@core/components/navigation/Link'

import { pages, socialPaths } from '@lib/config/navigation.config'
import { themeCustomElements } from '@lib/config/theme/elements'
import FooterIcon from '@core/components/Footer/FooterIcon'

const Footer = () => {
  return (
    <Box component="footer">
      <Box
        sx={{
          height: '300px',
          ...((themeCustomElements.footer?.transition) != null)
            ? convertElementToSx(themeCustomElements.footer.transition)
            : undefined
        }}
      />

      <Grid
        container
        px={4}
        pb={3}
        sx={{
          ...((themeCustomElements.footer?.content) != null)
            ? convertElementToSx(themeCustomElements.footer.content)
            : undefined
        }}
      >
        <Grid item xs={12} sm={6} p={2}>
          <Typography
            component="div"
            variant="h3"
            mb={2}
            sx={{
              ...((themeCustomElements.footer?.title) != null)
                ? convertElementToSx(themeCustomElements.footer.title)
                : undefined
            }}
          >
            <FormattedMessage
              id="footer.contact.title"
            />
          </Typography>
          <Typography component="div" variant="body1" mb={2}>
            <FormattedMessage
              id="footer.contact.content"
              values={{
                link: (...chunks: ReactNode[]) => (
                  <Typography component={Link} href={pages.contact.path} variant="body1" color="inherit" noLinkStyle>
                    {chunks}
                  </Typography>
                )
              }}
            />
          </Typography>
          <Grid container mt={2} columnSpacing={2}>
            <Grid item>
              <IconButton
                size="small"
                href={socialPaths.tiktok}
                target="_blank"
              >
                <FooterIcon
                  icon={faTiktok}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                href={socialPaths.instagram}
                target="_blank"
              >
                <FooterIcon
                  icon={faInstagram}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                href={socialPaths.facebook}
                target="_blank"
              >
                <FooterIcon
                  icon={faFacebook}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} p={2}>
          <Typography
            component="div"
            variant="h3"
            mb={2}
            sx={{
              ...((themeCustomElements.footer?.title) != null)
                ? convertElementToSx(themeCustomElements.footer.title)
                : undefined
            }}
          >
            <FormattedMessage
              id="footer.utility.title"
            />
          </Typography>
          <Box mb={2}>
            <Typography component={Link} href={pages.faq.path} variant="body1" color="inherit" noLinkStyle>
              <FormattedMessage
                id="footer.utility.faq"
              />
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography component={Link} href={pages.privacy.path} variant="body1" color="inherit" noLinkStyle>
              <FormattedMessage
                id="footer.utility.privacy"
              />
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography component={Link} href={pages.cookies.path} variant="body1" color="inherit" noLinkStyle>
              <FormattedMessage
                id="footer.utility.cookies"
              />
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography component={Link} href={pages.legal.path} variant="body1" color="inherit" noLinkStyle>
              <FormattedMessage
                id="footer.utility.legal"
              />
            </Typography>
          </Box>
          <Box>
            <Typography component={Link} href={pages.conditions.path} variant="body1" color="inherit" noLinkStyle>
              <FormattedMessage
                id="footer.utility.conditions"
              />
            </Typography>
          </Box>
          <Grid container mt={2} columnSpacing={2}>
            <Grid item>
              <FooterIcon
                icon={faCcVisa}
              />
            </Grid>
            <Grid item>
              <FooterIcon
                icon={faCcMastercard}
              />
            </Grid>
            <Grid item>
              <FooterIcon
                icon={faCcPaypal}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Footer
