import { useMemo } from 'react'

import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button'

import { convertElementToSx } from '@core/utils/themes'
import Link, { type LinkProps } from '@core/components/navigation/Link'

import { themeCustomElements } from '@lib/config/theme/elements'

interface ButtonProps {
  customtype?: 'actionPrimary' | 'actionSecondary'
}

const LinkButton = (props: MuiButtonProps & LinkProps & ButtonProps) => {
  const {
    customtype
  } = props

  const typeSx = useMemo(() => {
    if (customtype === 'actionPrimary') {
      return ((themeCustomElements.button?.action?.primary) != null)
        ? convertElementToSx(themeCustomElements.button.action.primary)
        : undefined
    } else if (customtype === 'actionSecondary') {
      return ((themeCustomElements.button?.action?.secondary) != null)
        ? convertElementToSx(themeCustomElements.button.action.secondary)
        : undefined
    }
    return undefined
  }, [customtype])

  return (
    <MuiButton
      variant="contained"
      {...props}
      component={Link}
      sx={{
        ...typeSx,
        ...props.sx
      }}
    >
      { props.children }
    </MuiButton>
  )
}

export default LinkButton
