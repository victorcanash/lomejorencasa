import { FormattedMessage } from 'react-intl'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import EngineeringIcon from '@mui/icons-material/Engineering'

import envConfig from '@core/config/env.config'
import { Environments } from '@core/constants/app'
import type { ThemeElement } from '@core/types/themes'
import type { FormatText } from '@core/types/texts'
import { convertElementToSx } from '@core/utils/themes'
import HideOnScroll from '@core/components/animations/HideOnScroll'

interface MaintenanceBannerProps {
  themeElementContent?: ThemeElement
  themeElementIcon?: ThemeElement
  text: FormatText
}

const MaintenanceBanner = (props: MaintenanceBannerProps) => {
  const {
    themeElementContent,
    themeElementIcon,
    text
  } = props

  return (
    <>
      { envConfig.APP_ENV === Environments.development &&
        <HideOnScroll direction="up">
          <Grid
            container
            wrap="nowrap"
            alignItems="center"
            justifyContent="center"
            sx={{
              ...(themeElementContent != null) ? convertElementToSx(themeElementContent) : undefined,
              position: 'fixed',
              bottom: '0px',
              py: '0px',
              px: '12px',
              zIndex: (theme) => theme.zIndex.drawer + 1
            }}
          >
            <Grid item mr={1}>
              <EngineeringIcon
                sx={{
                  ...(themeElementIcon != null) ? convertElementToSx(themeElementIcon) : undefined,
                  fontSize: 30,
                  mt: '5px'
                }}
              />
            </Grid>
            { (text.id != null) &&
              <Grid item>
                <Typography
                  component="div"
                  variant="body1Head"
                  textAlign={text.textAlign}
                >
                  <FormattedMessage id={text.id} values={text.values} />
                </Typography>
              </Grid>
            }
          </Grid>
        </HideOnScroll>
      }
    </>
  )
}

export default MaintenanceBanner
