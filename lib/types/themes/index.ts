import type { ThemeElement, ThemeFontPropertyElement } from '@core/types/themes';

export type ThemeDefaultElements = {
  default: {
    backgroundColor: {
      primary: string,
      secondary: string,
    },
    text: {
      color: {
        primary: string,
        secondary: string,
        disabled: string,
      },
      font: {
        fontFamily: string[],
        h1: ThemeFontPropertyElement,
        h2: ThemeFontPropertyElement,
        h3: ThemeFontPropertyElement,
        body1: ThemeFontPropertyElement,
        body2: ThemeFontPropertyElement,
      },
    },
  },
  typography: ThemeElement,
  link: ThemeElement,
  paper: ThemeElement,
  appBar: ThemeElement,
  dialog: ThemeElement,
  dialogTitle: ThemeElement,
  divider: ThemeElement,
  tableHead: ThemeElement,
  tableRow: ThemeElement,
  backdrop: ThemeElement,
  inputLabel: ThemeElement,
  inputBase: ThemeElement,
  button: ThemeElement,
  listItem: ThemeElement,
  paginationItem: ThemeElement,
  circularProgress: ThemeElement,
  avatar: ThemeElement,
  svgIcon: ThemeElement,
  stepIcon: ThemeElement,
  badge: ThemeElement,
  alert: { 
    default: ThemeElement,
    success: ThemeElement,
    error: ThemeElement,
  },
};

export type ThemeCustomElements = {
  header: {
    drawer: {
      divider: ThemeElement,
    },
  },
  footer: {
    content: ThemeElement,
    title: ThemeElement,
  },
  home: {
    banner: ThemeElement,
    icons: ThemeElement,
  },
  button: {
    action: ThemeElement,
  },
};
