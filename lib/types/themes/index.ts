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
  link: ThemeElement,
  paper: ThemeElement,
  appBar: ThemeElement,
  dialog: ThemeElement,
  dialogTitle: ThemeElement,
  dialogContentText: ThemeElement,
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
  stepIcon: {
    default: ThemeElement,
    text: ThemeElement,
  },
  stepLabel: {
    labelContainer: ThemeElement,
  },
  badge: ThemeElement,
  alert: { 
    default: ThemeElement,
    success: ThemeElement,
    error: ThemeElement,
  },
};

export type ThemeCustomElements = {
  header: {
    banners: {
      maintenance: {
        content: ThemeElement,
        icon: ThemeElement,
      },
      shipping: {
        content: ThemeElement,
        icon: ThemeElement,
      },
    },
    drawer: {
      divider: ThemeElement,
    },
  },
  footer: {
    content: ThemeElement,
    title: ThemeElement,
  },
  home: {
    title: {
      h3: ThemeElement,
      h4: ThemeElement,
    },
    banner: {
      xl: ThemeElement,
      lg: ThemeElement,
      md: ThemeElement,
      sm: ThemeElement,
    },
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
  faq: {
    accordeon: {
      head: {
        content: ThemeElement,
        title: ThemeElement,
      },
    },
  },
  button: {
    action: ThemeElement,
  },
};
