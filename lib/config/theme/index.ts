import { createTheme, type ThemeOptions } from '@mui/material/styles'
import type {} from '@mui/x-date-pickers/themeAugmentation'

import { convertElementToSx } from '@core/utils/themes'

import { themeDefaultElements } from '@lib/config/theme/elements'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    xs_sm: true
    sm: true
    sm_md: true
    md: true
    md_lg: true
    lg: true
    lg_xl: true
    xl: true
  }

  interface TypographyVariants {
    body1Head: React.CSSProperties
    body2Head: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    body1Head: React.CSSProperties
    body2Head: React.CSSProperties
  }
};

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body1Head: true
    body2Head: true
  }
};

const themeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      xs_sm: 450,
      sm: 600,
      sm_md: 700,
      md: 900,
      md_lg: 1085,
      lg: 1200,
      lg_xl: 1350,
      xl: 1536
    }
  },

  palette: {
    mode: 'light',
    primary: {
      main: themeDefaultElements.palette.backgroundColor.primary
    },
    secondary: {
      main: themeDefaultElements.palette.backgroundColor.secondary
    },
    background: {
      default: themeDefaultElements.palette.backgroundColor.primary,
      paper: themeDefaultElements.paper?.backgroundColor?.default ?? themeDefaultElements.palette.backgroundColor.secondary
    },
    text: {
      primary: themeDefaultElements.palette.textColor.primary,
      secondary: themeDefaultElements.palette.textColor.secondary,
      disabled: themeDefaultElements.palette.textColor.disabled
    }
  },
  typography: {
    fontFamily: themeDefaultElements.typography.fontFamily.join(','),
    h1: convertElementToSx(themeDefaultElements.typography.h1),
    h2: convertElementToSx(themeDefaultElements.typography.h2),
    h3: convertElementToSx(themeDefaultElements.typography.h3),
    h4: convertElementToSx(themeDefaultElements.typography.h4),
    body1: convertElementToSx(themeDefaultElements.typography.body1),
    body2: convertElementToSx(themeDefaultElements.typography.body2),
    body1Head: convertElementToSx(themeDefaultElements.typography.body1Head),
    body2Head: convertElementToSx(themeDefaultElements.typography.body2Head)
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'underline',
          textDecorationColor: (themeDefaultElements.link != null) ? convertElementToSx(themeDefaultElements.link).color : undefined,
          ...(themeDefaultElements.link != null) ? convertElementToSx(themeDefaultElements.link) : undefined
        }
      }
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: ((themeDefaultElements.breadcrumbs?.separator) != null) ? convertElementToSx(themeDefaultElements.breadcrumbs.separator) : undefined
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: (themeDefaultElements.appBar != null) ? convertElementToSx(themeDefaultElements.appBar) : undefined
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: (themeDefaultElements.dialog != null) ? convertElementToSx(themeDefaultElements.dialog) : undefined
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: (themeDefaultElements.dialogTitle != null) ? convertElementToSx(themeDefaultElements.dialogTitle) : undefined
      }
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: (themeDefaultElements.dialogContentText != null) ? convertElementToSx(themeDefaultElements.dialogContentText) : undefined
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: (themeDefaultElements.accordion != null) ? convertElementToSx(themeDefaultElements.accordion) : undefined
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: (themeDefaultElements.accordionSummary != null) ? convertElementToSx(themeDefaultElements.accordionSummary) : undefined,
        expandIconWrapper: {
          color: ((themeDefaultElements.accordionSummary?.text?.color) != null) ? convertElementToSx(themeDefaultElements.accordionSummary).color : undefined
        }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: (themeDefaultElements.accordionDetails != null) ? convertElementToSx(themeDefaultElements.accordionDetails) : undefined
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: (themeDefaultElements.divider != null) ? convertElementToSx(themeDefaultElements.divider) : undefined
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: (themeDefaultElements.backdrop != null) ? convertElementToSx(themeDefaultElements.backdrop) : undefined
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: (themeDefaultElements.inputLabel != null) ? convertElementToSx(themeDefaultElements.inputLabel) : undefined
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: (themeDefaultElements.inputBase != null) ? convertElementToSx(themeDefaultElements.inputBase) : undefined
      }
    },
    MuiButton: {
      styleOverrides: {
        root: (themeDefaultElements.button != null) ? convertElementToSx(themeDefaultElements.button) : undefined
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          ...(themeDefaultElements.checkbox != null) ? convertElementToSx(themeDefaultElements.checkbox) : undefined,
          '&.Mui-checked': (themeDefaultElements.checkbox != null) ? convertElementToSx(themeDefaultElements.checkbox) : undefined
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: (themeDefaultElements.listItem != null) ? convertElementToSx(themeDefaultElements.listItem) : undefined
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: (themeDefaultElements.paginationItem != null) ? convertElementToSx(themeDefaultElements.paginationItem) : undefined
      }
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: (themeDefaultElements.circularProgress != null) ? convertElementToSx(themeDefaultElements.circularProgress) : undefined
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: (themeDefaultElements.avatar != null) ? convertElementToSx(themeDefaultElements.avatar) : undefined
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: (themeDefaultElements.iconButton != null) ? convertElementToSx(themeDefaultElements.iconButton) : undefined
      }
    },
    MuiRating: {
      styleOverrides: {
        icon: ((themeDefaultElements.rating?.icon) != null) ? convertElementToSx(themeDefaultElements.rating.icon) : undefined
      }
    },
    MuiStepIcon: {
      styleOverrides: {
        root: ((themeDefaultElements.stepIcon?.default) != null) ? convertElementToSx(themeDefaultElements.stepIcon.default) : undefined,
        text: ((themeDefaultElements.stepIcon?.text) != null) ? convertElementToSx(themeDefaultElements.stepIcon.text) : undefined
      }
    },
    MuiStepLabel: {
      styleOverrides: {
        labelContainer: ((themeDefaultElements.stepLabel?.labelContainer) != null) ? convertElementToSx(themeDefaultElements.stepLabel.labelContainer) : undefined
      }
    },
    MuiBadge: {
      styleOverrides: {
        badge: (themeDefaultElements.badge != null) ? convertElementToSx(themeDefaultElements.badge) : undefined
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: ((themeDefaultElements.alert?.default) != null) ? convertElementToSx(themeDefaultElements.alert.default) : undefined,
        standardSuccess: ((themeDefaultElements.alert?.success) != null) ? convertElementToSx(themeDefaultElements.alert.success) : undefined,
        standardError: ((themeDefaultElements.alert?.error) != null) ? convertElementToSx(themeDefaultElements.alert.error) : undefined,
        icon: ((themeDefaultElements.alert?.icon) != null) ? convertElementToSx(themeDefaultElements.alert.icon) : undefined
      }
    },
    MuiDayPicker: {
      styleOverrides: {
        weekDayLabel: ((themeDefaultElements.datePicker?.dayPicker?.weekDayLabel) != null) ? convertElementToSx(themeDefaultElements.datePicker.dayPicker.weekDayLabel) : undefined
      }
    }
  }
}

const theme = createTheme(themeOptions)

export default theme
