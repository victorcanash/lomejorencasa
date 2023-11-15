import { FormattedMessage } from 'react-intl'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import type { FormatText } from '@core/types/texts'

interface LandingAdvantageProps {
  icon: IconDefinition
  text: FormatText
  columnSpacing: number
}

const LandingAdvantage = (props: LandingAdvantageProps) => {
  const {
    icon,
    text,
    columnSpacing
  } = props

  return (
    <Grid item xs={12} container columnSpacing={columnSpacing}>
      <Grid item>
        <FontAwesomeIcon
          size="2xl"
          icon={icon}
        />
      </Grid>
      <Grid item>
        <Typography variant="body1Head">
          <FormattedMessage id={text.id} defaultMessage={text.id} values={text.values} />
        </Typography>
      </Grid>
    </Grid>
  )
}

export default LandingAdvantage
