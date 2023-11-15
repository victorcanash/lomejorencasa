import { FormattedMessage } from 'react-intl'

import { type SxProps, type Theme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import type { FormatText } from '@core/types/texts'
import type { Source } from '@core/types/multimedia'
import type { NavItem } from '@core/types/navigation'
import LinkButton from '@core/components/inputs/LinkButton'

import { pages } from '@lib/config/navigation.config'

interface LeftBannerContentProps {
  item: {
    contentText: FormatText
    source: Source
    button: NavItem
  }
  typographySx?: SxProps<Theme> | undefined
  btnSx?: SxProps<Theme> | undefined
}

const LeftBannerContent = (props: LeftBannerContentProps) => {
  const {
    item,
    typographySx,
    btnSx
  } = props

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      justifyContent="center"
      alignItems="left"
      rowSpacing={4}
      sx={{
        position: 'relative',
        width: {
          xs: '87%',
          xs_sm: '75%',
          sm: '70%',
          sm_md: '65%',
          md: '70%'
        },
        height: '100%',
        p: 2
      }}
    >
      <Grid item>
        <Typography
          component="div"
          align={item.contentText.textAlign}
          sx={typographySx}
        >
          <FormattedMessage
            id={item.contentText.id}
            values={item.contentText.values}
            defaultMessage={item.contentText.id}
          />
        </Typography>
      </Grid>
      <Grid item>
        <Grid item>
          <LinkButton
            href={item.button.path ?? pages.home.path}
            customtype="actionPrimary"
            sx={btnSx}
          >
            <FormattedMessage
              id={item.button.text.id}
              values={item.button.text.values}
              defaultMessage={item.button.text.id}
            />
          </LinkButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LeftBannerContent
