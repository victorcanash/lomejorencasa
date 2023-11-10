export type ThemeDefaultConfig = {
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
  },
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
  link?: ThemeElement,
  breadcrumbs?: {
    separator?: ThemeElement,
  },
  paper?: ThemeElement,
  appBar?: ThemeElement,
  dialog?: ThemeElement,
  dialogTitle?: ThemeElement,
  dialogContentText?: ThemeElement,
  accordion?: ThemeElement,
  accordionSummary?: ThemeElement,
  accordionDetails?: ThemeElement,
  divider?: ThemeElement,
  backdrop?: ThemeElement,
  inputLabel?: ThemeElement,
  inputBase?: ThemeElement,
  button?: ThemeElement,
  checkbox?: ThemeElement,
  listItem?: ThemeElement,
  paginationItem?: ThemeElement,
  circularProgress?: ThemeElement,
  avatar?: ThemeElement,
  iconButton?: ThemeElement,
  rating?: {
    icon?: ThemeElement,
  },
  stepIcon?: {
    default?: ThemeElement,
    text?: ThemeElement,
  },
  stepLabel?: {
    labelContainer?: ThemeElement,
  },
  badge?: ThemeElement,
  alert?: { 
    default?: ThemeElement,
    success?: ThemeElement,
    error?: ThemeElement,
    icon?: ThemeElement,
  },
  datePicker?: {
    default?: ThemeElement,
    dayPicker?: {
      weekDayLabel?: ThemeElement,
    },
  },
};

export type ThemeCustomConfig = {
  dividers?: {
    subdivider?: ThemeElement,
    payment?: ThemeElement,
    headerDrawer?: {
      default?: ThemeElement,
      highlight?: ThemeElement,
    },
  },
  banners?: {
    maintenance?: {
      content?: ThemeElement,
      icon?: ThemeElement,
    },
    product?: {
      default?: ThemeElement,
      small?: ThemeElement,
    },
    register?: {
      discountPercentText?: ThemeElement,
    },
    home?: {
      allProducts?: {
        text?: {
          default?: ThemeElement,
          small?: ThemeElement,
        },
        btn?: ThemeElement,
      },
      seasonal?: {
        text?: {
          default?: ThemeElement,
          small?: ThemeElement,
        },
        btn?: ThemeElement,
      },
      offers?: {
        text?: {
          default?: ThemeElement,
          small?: ThemeElement,
        },
        btn?: ThemeElement,
      },
    },
  },
  navBar?: {
    shippingBar?: {
      content?: ThemeElement,
      icon?: ThemeElement,
    },
  }
  footer?: {
    transition?: ThemeElement,
    content?: ThemeElement,
    title?: ThemeElement,
    icons?: ThemeElement,
  },
  categoryList?: {
    nameText?: ThemeElement,
  },
  landingList?: {
    nameText?: ThemeElement,
    price?: {
      originText?: ThemeElement,
      currentText?: ThemeElement,
    },
  },
  landingDetail?: {
    selectLabel?: ThemeElement,
    price?: {
      originText?: ThemeElement,
      currentText?: ThemeElement,
      percentText?: ThemeElement,
    },
    bundleTitle?: ThemeElement,
  },
  reviews?: {
    verifiedText?: ThemeElement,
  },
  faq?: {
    accordionGroup?: {
      default?: ThemeElement,
      summary?: ThemeElement,
      details?: ThemeElement,
    },
    accordion?: {
      default?: ThemeElement,
      summary?: ThemeElement,
      details?: ThemeElement,
    },
  },
  button?: {
    action?: {
      primary?: ThemeElement,
      secondary?: ThemeElement,
    },
    payNow?: ThemeElement,
    acceptCookies?: ThemeElement,
  },
  forms?: {
    accordion?: {
      default?: ThemeElement,
      summary?: ThemeElement,
      details?: ThemeElement,
    },
  },
};

export type ThemeTypographies = {
  default: ThemeFontPropertyElement
  title: ThemeFontPropertyElement
  secondTitle: ThemeFontPropertyElement
  contentHead: ThemeFontPropertyElement
  content: ThemeFontPropertyElement
  secondContentHead: ThemeFontPropertyElement
  secondContent: ThemeFontPropertyElement
  input: ThemeFontPropertyElement
  button: ThemeFontPropertyElement
  homeBanner: {
    default: ThemeFontPropertyElement
    small: ThemeFontPropertyElement
  },
  price: {
    origin: ThemeFontPropertyElement
    current: ThemeFontPropertyElement
  },
};

export type ThemeElement = {
  background?: ThemeColorElement,
  backgroundColor?: ThemeColorElement,
  text?: {
    color?: ThemeColorElement,
    font?: ThemeFontElement,
  },
  fill?: ThemeColorElement,
  border?: ThemeBorderElement,
  spacing?: ThemeSpacingElement,
};

export type ThemeColorElement = {
  default?: string,
  disabled?: string,
  hover?: string,
  focus?: string,
  even?: string,
  odd?: string,
  firstChild?: string,
  lastChild?: string,
  before?: string,
};

export type ThemeBorderElement = {
  default?: ThemeBorderPropertyElement,
  disabled?: ThemeBorderPropertyElement,
  hover?: ThemeBorderPropertyElement,
  focus?: ThemeBorderPropertyElement,
  even?: ThemeBorderPropertyElement,
  odd?: ThemeBorderPropertyElement,
  firstChild?: ThemeBorderPropertyElement,
  lastChild?: ThemeBorderPropertyElement,
  before?: ThemeBorderPropertyElement,
};

export type ThemeSpacingElement = {
  default?: ThemeSpacingPropertyElement,
  disabled?: ThemeSpacingPropertyElement,
  hover?: ThemeSpacingPropertyElement,
  focus?: ThemeSpacingPropertyElement,
  even?: ThemeSpacingPropertyElement,
  odd?: ThemeSpacingPropertyElement,
  firstChild?: ThemeSpacingPropertyElement,
  lastChild?: ThemeSpacingPropertyElement,
  before?: ThemeSpacingPropertyElement,
};

export type ThemeFontElement = {
  default?: ThemeFontPropertyElement,
  disabled?: ThemeFontPropertyElement,
  hover?: ThemeFontPropertyElement,
  focus?: ThemeFontPropertyElement,
  even?: ThemeFontPropertyElement,
  odd?: ThemeFontPropertyElement,
  firstChild?: ThemeFontPropertyElement,
  lastChild?: ThemeFontPropertyElement,
  before?: ThemeFontPropertyElement,
};

export type ThemeBorderPropertyElement = {
  border?: string,
  radius?: {
    all?: string,
    topRight?: string,
    topLeft?: string,
    bottomRight?: string,
    bottomLeft?: string,
  },
};

export type ThemeSpacingPropertyElement = {
  padding?: {
    all?: string | number,
    right?: string | number,
    left?: string | number,
    top?: string | number,
    bottom?: string | number,
  },
};

export type ThemeFontPropertyElement = {
  fontSize?: string,
  fontWeight?: string,
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent',
  lineHeight?: string,
  letterSpacing?: string,
  textTransform?: string,
  textDecoration?: string,
};
