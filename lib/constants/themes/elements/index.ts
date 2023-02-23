import colors from '@lib/constants/themes/colors';
import typographies from '@lib/constants/themes/typographies';
import type { ThemeDefaultElements, ThemeCustomElements } from '@lib/types/themes';

export const themeDefaultElements: ThemeDefaultElements = {
  default: {
    backgroundColor: {
      primary: colors.background.primary,
      secondary: colors.background.secondary,
    },
    text: {
      color: {
        primary: colors.text.black,
        secondary: colors.text.white,
        disabled: colors.text.disabled,
      },
      font: {
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
  },
  typography: {
    text: {
      font: { 
        default: typographies.default,
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
  svgIcon: {
    fill: {
      default: colors.text.black,
    },
  },
  stepIcon: {
    text: {
      font: {
        default: typographies.title,
      }
    },
    fill: {
      default: colors.text.black,
    },
  },
  badge: {
    backgroundColor: {
      default: colors.background.action,
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
        default: colors.background.footer,
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
    banner: {
      text: {
        color: {
          default: colors.text.white,
        },
        font: {
          default: typographies.homeBanner,
        },
      },
    },
    packingMachine: {
      card: {
        default: {
          border: {
            default: {
              radius: {
                all: '8px',
              },
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
    icons: {
      backgroundColor: {
        default: colors.background.third,
      },
      border: {
        default: {
          radius: { all: '100%' },
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
  button: {
    action: {
      backgroundColor: {
        default: colors.background.action,
        hover: colors.background.actionHover, 
      },
      text: {
        color: {
          default: colors.text.white,
          hover: colors.text.white,
        },
      },
    },
  },
};
