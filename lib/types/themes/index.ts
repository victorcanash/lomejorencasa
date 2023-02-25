import type { ThemeElement } from '@core/types/themes';

export type ThemeDefaultElements = {
  default: {
    palette: {
      backgroundColor: {
        primary: string,
        secondary: string,
      },
      textColor: {
        primary: string,
        secondary: string,
        disabled: string,
      },
    }
    typography: {
      fontFamily: string[],
      h1: ThemeElement,
      h2: ThemeElement,
      h3: ThemeElement,
      h4: ThemeElement,
      body1: ThemeElement,
      body2: ThemeElement,
    },
  },
  typography: ThemeElement,
  link: ThemeElement,
  paper: ThemeElement,
  appBar: ThemeElement,
  dialog: ThemeElement,
  dialogTitle: ThemeElement,
  accordion: ThemeElement,
  divider: ThemeElement,
  tableRow: {
    default: ThemeElement,
    head: ThemeElement,
  },
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
    packingMachine: {
      card: {
        default: ThemeElement,
        first: ThemeElement,
        second: ThemeElement,
        third: ThemeElement,
      },
    },
    whyVacuumPacked: {
      description: {
        first: ThemeElement,
        second: ThemeElement,
      },
    },
    characteristics: {
      content: ThemeElement,
      icons: ThemeElement,
    },
  },
  landing: {
    priceContent: {
      priceText: ThemeElement,
      //originalText: ThemeElement,
      discountText: ThemeElement,
    },
    accordion: {
      default: ThemeElement,
      head: ThemeElement,
      //content: ThemeElement,
    },
  },
  button: {
    action: ThemeElement,
  },
};
