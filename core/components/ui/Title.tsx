import { FormattedMessage } from 'react-intl'

import Typography from '@mui/material/Typography'

import type { FormatText } from '@core/types/texts'
import Divider from '@core/components/ui/Divider'

interface TitleProps {
  type: 'h1' | 'h2'
  noMarginTop?: boolean
  texts: {
    title?: FormatText
    titleAdd?: string
  }
  divider: boolean
}

const Title = (props: TitleProps) => {
  const {
    type,
    noMarginTop,
    texts,
    divider
  } = props

  return (
    <>
      <Typography
        component={type}
        variant={type}
        align={texts.title?.textAlign}
        mt={(noMarginTop === true) ? undefined : 6}
        mb={divider ? undefined : 4}
      >
        { ((texts.title?.id) != null) &&
          <FormattedMessage id={texts.title.id} defaultMessage={texts.title.id} values={texts.title.values} />
        }
        { texts.titleAdd }
      </Typography>

      { divider &&
        <Divider mt={1} mb={4} />
      }
    </>
  )
}

export default Title
