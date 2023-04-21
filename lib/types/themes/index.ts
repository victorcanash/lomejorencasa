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
      body1Head: ThemeElement,
      body2Head: ThemeElement,
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
  checkbox: ThemeElement,
  listItem: ThemeElement,
  paginationItem: ThemeElement,
  circularProgress: ThemeElement,
  avatar: ThemeElement,
  iconButton: ThemeElement,
  rating: {
    icon: ThemeElement,
  }
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
    icon: ThemeElement,
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
      default: ThemeElement,
      small: ThemeElement,
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
    quantityLabel: ThemeElement,
    priceContent: {
      priceText: ThemeElement,
      //originalText: ThemeElement,
      discountText: ThemeElement,
      percentText: ThemeElement,
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
    action: {
      primary: ThemeElement,
      secondary: ThemeElement,
    },
    buyNow: ThemeElement,
  },
};
