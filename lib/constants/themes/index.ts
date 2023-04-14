import { createTheme, ThemeOptions } from '@mui/material/styles';

import { convertElementToSx } from '@core/utils/themes';

import { themeDefaultElements } from '@lib/constants/themes/elements';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    xs_sm: true;
    sm: true;
    sm_md: true;
    md: true;
    md_lg: true;
    lg: true;
    lg_xl: true;
    xl: true;
  }

  interface TypographyVariants {
    body1Head: React.CSSProperties;
    body2Head: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    body1Head: React.CSSProperties;
    body2Head: React.CSSProperties;
  }
};

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body1Head: true;
    body2Head: true;
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
      xl: 1536,
    },
  },

  palette: {
    primary: {
      main: themeDefaultElements.default.palette.backgroundColor.primary,
    },
    secondary: {
      main: themeDefaultElements.default.palette.backgroundColor.secondary,
    },
    background: {
      default: themeDefaultElements.default.palette.backgroundColor.primary,
      paper: themeDefaultElements.paper.backgroundColor?.default || themeDefaultElements.default.palette.backgroundColor.secondary,
    },
    text: {
      primary: themeDefaultElements.default.palette.textColor.primary,
      secondary: themeDefaultElements.default.palette.textColor.secondary,
      disabled: themeDefaultElements.default.palette.textColor.disabled,
    },
  },
  typography: {
    fontFamily: themeDefaultElements.default.typography.fontFamily.join(','),
    h1: convertElementToSx(themeDefaultElements.default.typography.h1),
    h2: convertElementToSx(themeDefaultElements.default.typography.h2),
    h3: convertElementToSx(themeDefaultElements.default.typography.h3),
    h4: convertElementToSx(themeDefaultElements.default.typography.h4),
    body1: convertElementToSx(themeDefaultElements.default.typography.body1),
    body2: convertElementToSx(themeDefaultElements.default.typography.body2),
    body1Head: convertElementToSx(themeDefaultElements.default.typography.body1Head),
    body2Head: convertElementToSx(themeDefaultElements.default.typography.body2Head),
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'underline',
          ...convertElementToSx(themeDefaultElements.link),
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.appBar),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: convertElementToSx(themeDefaultElements.dialog),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.dialogTitle),
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.dialogContentText),
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.accordion),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.divider),
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.tableRow.default),
        head: convertElementToSx(themeDefaultElements.tableRow.head),
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.backdrop),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.inputLabel),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.inputBase),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.button),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          ...convertElementToSx(themeDefaultElements.checkbox),
          '&.Mui-checked': convertElementToSx(themeDefaultElements.checkbox),
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: convertElementToSx(themeDefaultElements.listItem),
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.paginationItem),
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.circularProgress),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.avatar),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.iconButton),
      },
    },
    MuiRating: {
      styleOverrides: {
        icon: convertElementToSx(themeDefaultElements.rating.icon),
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.stepIcon.default),
        text: convertElementToSx(themeDefaultElements.stepIcon.text),
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        labelContainer: convertElementToSx(themeDefaultElements.stepLabel.labelContainer),
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: convertElementToSx(themeDefaultElements.badge),
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: convertElementToSx(themeDefaultElements.alert.default),
        standardSuccess: convertElementToSx(themeDefaultElements.alert.success),
        standardError: convertElementToSx(themeDefaultElements.alert.error),
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
