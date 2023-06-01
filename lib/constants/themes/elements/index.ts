import type { ThemeElement } from '@core/types/themes';

import colors from '@lib/constants/themes/colors';
import typographies from '@lib/constants/themes/typographies';

export const themeDefaultElements: {
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
  paper?: ThemeElement,
  appBar?: ThemeElement,
  dialog?: ThemeElement,
  dialogTitle?: ThemeElement,
  dialogContentText?: ThemeElement,
  accordion?: ThemeElement,
  divider?: ThemeElement,
  tableRow?: {
    default?: ThemeElement,
    head?: ThemeElement,
  },
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
} = {
  palette: {
    backgroundColor: {
      primary: colors.background.primary,
      secondary: colors.background.secondary,
    },
    textColor: {
      primary: colors.text.black,
      secondary: colors.text.white,
      disabled: colors.text.disabled,
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system', 
      'BlinkMacSystemFont', 
      'Segoe UI', 
      'Oxygen',
      'Ubuntu', 
      'Cantarell', 
      'Fira Sans', 
      'Droid Sans', 
      'Helvetica Neue',
      'sans-serif',
    ],
    h1: {
      text: {
        font: { 
          default: typographies.title,
        },
        color: {
          default: colors.text.title,
        },
      },
    },
    h2: {
      text: {
        font: { 
          default: typographies.title,
        },
        color: {
          default: colors.text.title,
        },
      },
    },
    h3: {
      text: {
        font: { 
          default: typographies.secondTitle,
        },
      },
    },
    h4: {
      text: {
        font: { 
          default: typographies.secondTitle,
        },
      },
    },
    body1Head: {
      text: {
        font: { 
          default: typographies.contentHead,
        },
      },
    },
    body1: {
      text: {
        font: { 
          default: typographies.content,
        },
      },
    },
    body2Head: {
      text: {
        font: { 
          default: typographies.secondContentHead,
        },
      },
    },
    body2: {
      text: {
        font: { 
          default: typographies.secondContent,
        },
      },
    },
  },
  link: {
    text: {
      color: {
        default: colors.text.black,
      },
    },
  },
  paper: {
    backgroundColor: {
      default: colors.background.secondary,
    },
  },
  appBar: {
    backgroundColor: {
      default: colors.background.secondary,
    },
  },
  dialog: {
    backgroundColor: {
      default: colors.background.primary,
    },
  },
  dialogTitle: {
    text: {
      font: {
        default: typographies.title,
      },
    },
  },
  dialogContentText: {
    text: {
      font: {
        default: typographies.content,
      },
      color: {
        default: colors.text.black,
      },
    },
  },
  accordion: {
    backgroundColor: {
      default: colors.background.secondary,
    },
  },
  divider: {
    border: {
      default: {
        border: `2px solid ${colors.border.divider}99`,
        radius: { all: '12px' },
      },
    },
  },
  tableRow: {
    default: {
      backgroundColor: {
        even: colors.background.tableRowEven,
      },
    },
    head: {
      backgroundColor: {
        default: colors.background.tableHead,
      },
    },
  },
  backdrop: {
    backgroundColor: {
      default: `${colors.text.black}bf`,
    },
    text: {
      color: {
        default: colors.text.white,
      },
    },
  },
  inputLabel: {
    text: {
      font: {
        default: typographies.input,
      },
      color: {
        default: colors.text.black,
        focus: colors.text.black,
      },
    },
  },
  inputBase: {
    backgroundColor: {
      default: colors.background.input,
      hover: colors.background.inputHover,
      focus: colors.background.inputHover,
    },
    text: {
      font: {
        default: typographies.input,
      },
      color: {
        default: colors.text.black,
        hover: colors.text.black,
        focus: colors.text.black,
      },
    },
  },
  button: {
    backgroundColor: {
      default: colors.background.input,
      hover: colors.background.inputHover,
    },
    text: {
      font: {
        default: typographies.button,
      },
      color: {
        default: colors.text.black,
        hover: colors.text.black,
      },
    },
    border: {
      default: {
        radius: { all: '12px' },
      },
    },
  },
  checkbox: {
    text: {
      color: {
        default: colors.text.black,
      },
    },
  },
  listItem: {
    text: {
      font: {
        default: typographies.content,
      },
    },
  },
  paginationItem: {
    backgroundColor: {
      default: colors.background.secondary,
    },
  },
  circularProgress: {
    fill: {
      default: colors.background.third,
    },
  },
  avatar: {
    backgroundColor: {
      default: colors.background.third,
    },
    text: {
      color: {
        default: colors.text.black,
      },
    },
  },
  iconButton: {
    text: {
      color: {
        default: colors.text.black,
      },
    },
  },
  rating: {
    icon: {
      text: {
        color: {
          default: colors.background.ratingIcon,
        },
      },
    }
  },
  stepIcon: {
    default: {
      text: {
        font: {
          default: typographies.title,
        },
      },
      fill: {
        default: colors.text.title,
      },
    },
    text: {
      fill: {
        default: colors.background.primary,
      },
    },
  },
  stepLabel: {
    labelContainer: {
      text: {
        color: {
          default: colors.text.disabled,
        },
      },
    },
  },
  badge: {
    backgroundColor: {
      default: colors.background.action.primary.default,
    },
    text: {
      color: {
        default: colors.text.white,
      },
    },
  },
  alert: { 
    default: {
      text: {
        font: {
          default: typographies.content,
        },
      },
    },
    success: {
      backgroundColor: {
        default: colors.background.success,
      },
    },
    error: {
      backgroundColor: {
        default: colors.background.error,
      },
    },
    icon: {
      spacing: {
        default: {
          padding: {
            top: '10px',
          },
        },
      },
    },
  },
  datePicker: {
    dayPicker: {
      weekDayLabel: {
        text: {
          color: {
            default: colors.text.black,
          },
          font: {
            default: typographies.contentHead,
          },
        },
      },
    },
  },
};

export const themeCustomElements: {
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
  },
  navBar: {
    logo: {
      width: {
        small: string,
        default: string,
      },
    },
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
  landing?: {
    selectLabel?: ThemeElement,
    price?: {
      originText?: ThemeElement,
      currentText?: ThemeElement,
      percentText?: ThemeElement,
    },
    bundleTitle?: ThemeElement,
    accordion?: { 
      default?: ThemeElement,
      head?: ThemeElement,
    },
  },
  faq?: {
    accordeon?: {
      head?: {
        content?: ThemeElement,
        title?: ThemeElement,
      },
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
} = {
  dividers: {
    subdivider: {
      border: {
        default: {
          border: `1px solid ${colors.border.divider}99`,
        },
      },
    },
    payment: {
      border: {
        default: {
          border: 'none',
        },
      },
    },
    headerDrawer: {
      default: {
        border: {
          default: {
            border: `1px solid ${colors.border.dividerDrawer}`,
          },
        },
      },
      highlight: {
        border: {
          default: {
            border: `4px solid ${colors.border.dividerDrawer}`,
          },
        },
      },
    },
  },
  banners: {
    maintenance: {
      content: {
        backgroundColor: {
          default: colors.background.action.primary.default,
        },
        text: {
          color: {
            default: colors.text.white,
          },
        },
      },
      icon: {
        fill: {
          default: colors.text.white,
        },
      },
    },
    product: {
      default: {
        text: {
          color: {
            default: colors.text.white,
          },
          font: {
            default: typographies.homeBanner.default,
          },
        },
      },
      small: {
        text: {
          color: {
            default: colors.text.white,
          },
          font: {
            default: typographies.homeBanner.small,
          },
        }, 
      },
    },
  },
  navBar: {
    logo: {
      width: {
        small: '126px',
        default: '146px',
      },
    },
    shippingBar: {
      content: {
        backgroundColor: {
          default: colors.background.third,
        },
      },
    },
  },
  footer: {
    transition: {
      background: {
        default: `linear-gradient(0deg, ${colors.background.footerContent} 7%, ${colors.background.footerGradient} 53%, ${colors.background.primary} 98%)`,
      },
    },
    content: {
      backgroundColor: {
        default: colors.background.footerContent,
      }, 
      text: {
        color: {
          default: colors.text.footer,
        },
      },
    },
    title: {
      text: {
        color: {
          default: colors.text.footer,
        },
      },
    },
    icons: {
      text: {
        color: {
          default: colors.text.white,
        },
      },
    },
  },
  landing: {
    selectLabel: {
      text: {
        color: {
          default: colors.text.black,
        },
        font: {
          default: {
            fontSize: '20px',
          },
        },
      }
    },
    price: {
      originText: {
        text: {
          color: {
            default: colors.text.disabled,
          },
          font: {
            default: typographies.price.origin,
          },
        },
      },
      currentText: {
        text: {
          color: {
            default: colors.text.action,
          },
          font: {
            default: typographies.price.current,
          },
        },
      },
      percentText: {
        backgroundColor: {
          default: colors.background.third,
        },
        border: {
          default: {
            radius: {
              all: '45px',
            },
          },
        },
        spacing: {
          default: {
            padding: {
              top: '5px',
              bottom: '5px',
              right: '10px',
              left: '10px',
            },
          },
        },
      },
    },
    bundleTitle: {
      text: {
        color: {
          default: colors.text.black,
        },
        font: {
          default: {
            fontSize: '20px',
          },
        },
      }
    },
    accordion: {
      default: {
        border: {
          default: {
            radius: {
              topRight: '25px',
              topLeft: '6px',
              bottomRight: '6px',
              bottomLeft: '6px',
            },
          },
          firstChild: {
            radius: {
              topRight: '25px',
              topLeft: '6px',
              bottomRight: '6px',
              bottomLeft: '6px',
            },
          },
          lastChild: {
            radius: {
              topRight: '25px',
              topLeft: '6px',
              bottomRight: '6px',
              bottomLeft: '6px',
            },
          },
        },
      },
      head: {
        backgroundColor: {
          default: colors.background.third,
        },
        border: {
          default: {
            radius: {
              topRight: '25px',
              topLeft: '6px',
              bottomRight: '0px',
              bottomLeft: '0px',
            },
          },
        },
      },
    }
  },
  faq: {
    accordeon: {
      head: {
        content: {
          backgroundColor: {
            default: colors.background.faqAccordeonHeadContent,
          },
        },
        title: {
          backgroundColor: {
            default: colors.background.third,
          },
          text: {
            color: {
              default: colors.text.black,
            },
            font: { 
              default: typographies.secondTitle,
            },
          },
        },
      },
    },
  },
  button: {
    action: {
      primary: {
        backgroundColor: {
          default: colors.background.action.primary.default,
          hover: colors.background.action.primary.hover, 
        },
        text: {
          font: {
            default: {
              textAlign: 'center',
            },
          },
          color: {
            default: colors.text.white,
            hover: colors.text.white,
          },
        },
        spacing: {
          default: {
            padding: {
              top: 2,
              bottom: 2,
            },
          },
        },
      },
      secondary: {
        backgroundColor: {
          default: colors.background.action.secondary.default,
          hover: colors.background.action.secondary.hover, 
        },
        text: {
          font: {
            default: {
              textAlign: 'center',
            },
          },
          color: {
            default: colors.text.white,
            hover: colors.text.white,
          },
        },
      },
    },
    payNow: {
      backgroundColor: {
        default: colors.background.buyNow.default,
        hover: colors.background.buyNow.hover,
      },
      text: {
        font: {
          default: {
            textAlign: 'center',
          },
        },
        color: {
          default: colors.text.white,
          hover: colors.text.white,
        },
      },
      spacing: {
        default: {
          padding: {
            top: 2,
            bottom: 2,
          },
        },
      },
    },
    acceptCookies: {
      backgroundColor: {
        default: colors.background.action.secondary.default,
        hover: colors.background.action.secondary.hover, 
      },
      text: {
        font: {
          default: {
            textAlign: 'center',
          },
        },
        color: {
          default: colors.text.black,
          hover: colors.text.black,
        },
      },
      spacing: {
        default: {
          padding: {
            top: 1.5,
            bottom: 1.5,
          },
        },
      },
    }
  },
};

export const paypalHostedFieldsStyle = {
  'input': {
    'transition': 'color 160ms linear',
    '-webkit-transition': 'color 160ms linear',
    'font-size-adjustfont-size': typographies.content.fontSize,
    'font-weight': typographies.content.fontWeight,
    'line-height': typographies.content.lineHeight,
    'text-align': typographies.default.textAlign,
    'letter-spacing': typographies.default.letterSpacing,
    'font-family': themeDefaultElements.typography.fontFamily.join(','),
    'color': colors.text.black,
    'padding': '16.5px 14px',
  },
  ':hover': {
    'color': colors.text.black,
  },
  ':focus': {
    'color': colors.text.black,
  },
  '.invalid': {         
    'color': colors.text.action,
  },
};

export const paypalHostedFieldsSx = {
  height: '56px',
  backgroundColor: colors.background.input,
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: colors.background.inputHover,
    border: `1px solid ${colors.text.black}`,
  },
  '&.Mui-focused': {
    backgroundColor: colors.background.inputHover,
    border: `0px solid ${colors.text.black}`,
  },
};
