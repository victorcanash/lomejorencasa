import { createTheme, ThemeOptions } from '@mui/material/styles';

import colors from '@lib/constants/themes/colors';
import typographies from '@lib/constants/themes/typographies';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    xs_sm: true;
    sm: true;
    sm_md: true;
    md: true;
    lg: true;
    xl: true;
  }

  /*interface TypographyVariants {
    home_h1: React.CSSProperties;
    home_h2: React.CSSProperties;
    home_h3: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    home_h1: React.CSSProperties;
    home_h2: React.CSSProperties;
    home_h3: React.CSSProperties;
  }*/
};

const themeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      xs_sm: 450,
      sm: 600,
      sm_md: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: colors.background.primary,
    },
    secondary: {
      main: colors.background.secondary,
    },
    background: {
      default: colors.background.primary,
      paper: colors.background.secondary,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.appBar.primary,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: typographies.input.fontSize,
          fontWeight: typographies.input.fontWeight,
          lineHeight: typographies.input.lineHeight,
          color: colors.text.input.primary,
          '&.Mui-focused': {
            color: colors.text.input.focus,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: typographies.input.fontSize,
          fontWeight: typographies.input.fontWeight,
          lineHeight: typographies.input.lineHeight,
          color: colors.text.input.primary,
          backgroundColor: colors.background.input.primary,
          '&:hover': {
            color: colors.text.input.hover,
            backgroundColor: colors.background.input.hover,
          },
          '&.Mui-focused': {
            color: colors.text.input.focus,
            backgroundColor: colors.background.input.focus,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: typographies.button.fontSize,
          fontWeight: typographies.button.fontWeight,
          lineHeight: typographies.button.lineHeight,
          textTransform: 'none',
          color: colors.text.button.primary,
          backgroundColor: colors.background.button.primary,
          '&:hover': {
            color: colors.text.button.hover,
            backgroundColor: colors.background.button.hover,
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          color: colors.text.backdrop.primary,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: colors.fill.circularProgress,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.avatar.primary,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: colors.fill.svgIcon,
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          fontSize: typographies.stepIcon.fontSize,
          fontWeight: typographies.stepIcon.fontWeight,
          lineHeight: typographies.stepIcon.lineHeight,
          fill: colors.fill.stepIcon,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          border: `1px solid ${colors.border.divider.primary}`,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'underline',
          color: colors.text.link.primary,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: typographies.alert.fontSize,
          fontWeight: typographies.alert.fontWeight,
          lineHeight: typographies.alert.lineHeight,
        },
        standardSuccess: {
          backgroundColor: colors.background.alert.success,
        },
        standardError: {
          backgroundColor: colors.background.alert.error,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.background.dialog.primary,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: typographies.dialog.title.fontSize,
          fontWeight: typographies.dialog.title.fontWeight,
          lineHeight: typographies.dialog.title.lineHeight,
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.pagination.primary,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: typographies.listItem.fontSize,
          fontWeight: typographies.listItem.fontWeight,
          lineHeight: typographies.listItem.lineHeight,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        root: {
          color: colors.text.badge.primary,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.table.head,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: typographies.letterSpacing,
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: typographies.h1.fontSize,
      fontWeight: typographies.h1.fontWeight,
      lineHeight: typographies.h1.lineHeight,
    },
    h2: {
      fontSize: typographies.h2.fontSize,
      fontWeight: typographies.h2.fontWeight,
      lineHeight: typographies.h2.lineHeight,
    },
    body1: {
      fontSize: typographies.body1.fontSize,
      fontWeight: typographies.body1.fontWeight,
      lineHeight: typographies.body1.lineHeight,
    },
    body2: {
      fontSize: typographies.body2.fontSize,
      fontWeight: typographies.body2.fontWeight,
      lineHeight: typographies.body2.lineHeight,
    },
    fontFamily: typographies.fontFamily.join(','),
  },
};

const theme = createTheme(themeOptions);

export default theme;
