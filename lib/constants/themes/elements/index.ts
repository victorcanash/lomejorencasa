import colors from '@lib/constants/themes/colors';
import typographies from '@lib/constants/themes/typographies';
import type { ThemeDefaultElements, ThemeCustomElements } from '@lib/types/themes';

export const themeDefaultElements: ThemeDefaultElements = {
  default: {
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
      body1: {
        text: {
          font: { 
            default: typographies.content,
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
        default: typographies.content,
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
        default: typographies.content,
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
          default: colors.text.ratingIcon,
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
      default: colors.background.actionPrimary,
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
  },
};

export const themeCustomElements: ThemeCustomElements = {
  header: {
    banners: {
      maintenance: {
        content: {
          backgroundColor: {
            default: colors.background.actionPrimary,
          },
          text: {
            color: {
              default: colors.text.white,
            },
            font: {
              default: typographies.headerBanner,
            },
          },
        },
        icon: {
          fill: {
            default: colors.text.white,
          },
        },
      },
      shipping: {
        content: {
          backgroundColor: {
            default: colors.background.third,
          },
          text: {
            font: {
              default: typographies.headerBanner,
            },
          },
        },
        icon: {
          fill: {
            default: colors.text.black,
          },
        },
      },
    },
    drawer: {
      divider: {
        border: {
          default: {
            border: `1px solid ${colors.border.dividerDrawer}`,
          },
        },
      },
    },
  },
  footer: {
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
  },
  home: {
    title: {
      h3: {
        backgroundColor: {
          default: colors.background.third,
        },
        border: {
          default: {
            radius: {
              topRight: '15px',
              topLeft: '0px',
              bottomRight: '15px',
              bottomLeft: '0px',
            },
          },
        },
      },
      h4: {
        backgroundColor: {
          default: colors.background.secondary,
        },
        border: {
          default: {
            radius: {
              topRight: '15px',
              topLeft: '0px',
              bottomRight: '15px',
              bottomLeft: '0px',
            },
          },
        },
      },
    },
    banner: {
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
    packingMachine: {
      card: {
        default: {
          border: {
            default: {
              radius: { all: '8px' },
            },
          },
        },
        first: {
          backgroundColor: {
            default: colors.background.third,
          },
        },
        second: {
          backgroundColor: {
            default: colors.background.secondary,
          },
        },
        third: {
          backgroundColor: {
            default: colors.background.tableHead,
          },
        },
      },
    },
    whyVacuumPacked: {
      description: {
        first: {
          backgroundColor: {
            default: colors.background.secondary,
          },
          border: {
            default: {
              radius: {
                topRight: '45px',
                topLeft: '0px',
                bottomRight: '45px',
                bottomLeft: '0px',
              },
            },
          },
        },
        second: {
          backgroundColor: {
            default: colors.background.third,
          },
          border: {
            default: {
              radius: {
                topRight: '0px',
                topLeft: '45px',
                bottomRight: '0px',
                bottomLeft: '45px',
              },
            },
          },
        },
      },
    },
    characteristics: {
      content: {
        backgroundColor: {
          default: colors.background.homeSection,
        },
        text: {
          color: {
            default: colors.text.white,
          },
        },
      },
      icons: {
        backgroundColor: {
          default: colors.background.third,
        },
        border: {
          default: {
            radius: { all: '100%' },
          },
        },
      },
    },
  },
  landing: {
    priceContent: {
      priceText: {
        text: {
          color: {
            default: colors.text.action,
          },
        },
      },
      // originalTxt: undefined,
      discountText: {
        text: {
          color: {
            default: colors.text.action,
          },
        },
      },
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
      // content: undefined,
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
          default: colors.background.actionPrimary,
          hover: colors.background.actionPrimaryHover, 
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
          default: colors.background.actionSecondary,
          hover: colors.background.actionSecondaryHover, 
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
    },
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
    'font-family': themeDefaultElements.default.typography.fontFamily.join(','),
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
