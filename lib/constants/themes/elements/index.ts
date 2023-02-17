import type { ThemeDefaultElements, ThemeCustomElements } from '@lib/types/themes';

export const themeDefaultElements: ThemeDefaultElements = {
  default: {
    backgroundColor: {
      primary: '#F1F4ED',
      secondary: '#E5ECDC',
    },
    text: {
      color: {
        primary: '#000000',
        secondary: '#000000',
        disabled: 'grey',
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
          fontSize: '24px',
          fontWeight: '800',
          lineHeight: '28px',
        },
        h2: {
          fontSize: '24px',
          fontWeight: '800',
          lineHeight: '28px',
        },
        h3: {
          fontSize: '20px',
          fontWeight: '700',
          lineHeight: '26px',
        },
        body1: {
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '28px',
        },
        body2: {
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '28px',
        },
      },
    },
  },
  typography: {
    text: {
      font: { 
        default: {
          textAlign: 'left',
          lineHeight: '26px',
          letterSpacing: '-0.33px',   
        },
      },
    },
  },
  link: {
    text: {
      color: {
        default: '#000000',
      },
    },
  },
  paper: {
    backgroundColor: {
      default: '#E5ECDC',
    },
  },
  appBar: {
    backgroundColor: {
      default: '#E5ECDC',
    },
  },
  dialog: {
    backgroundColor: {
      default: '#F1F4ED',
    },
  },
  dialogTitle: {
    text: {
      font: {
        default: {
          fontSize: '25px',
          fontWeight: '500',
          lineHeight: '28px',
        },
      },
    },
  },
  divider: {
    border: {
      default: '1px solid #B0B0B0',
    },
  },
  tableHead: {
    backgroundColor: {
      default: '#A7AC93',
    },
  },
  tableRow: {
    backgroundColor: {
      even: '#ECF7DC',
    },
    border: {
      lastChild: '0',
    },
  },
  backdrop: {
    text: {
      color: {
        default: '#FFFFFF',
      },
    },
  },
  inputLabel: {
    text: {
      font: {
        default: {
          fontSize: '15px',
          fontWeight: '300',
          lineHeight: '1.5em',
        }
      },
      color: {
        default: '#000000',
        focus: '#000000',
      },
    },
  },
  inputBase: {
    backgroundColor: {
      default: '#FFFFFF',
      hover: '#E5ECDC',
      focus: '#E5ECDC',
    },
    text: {
      font: {
        default: {
          fontSize: '15px',
          fontWeight: '300',
          lineHeight: '1.5em',
        }
      },
      color: {
        default: '#000000',
        hover: '#000000',
        focus: '#000000',
      },
    },
  },
  button: {
    backgroundColor: {
      default: '#FFFFFF',
      hover: '#ECF7DC',
    },
    text: {
      font: {
        default: {
          fontSize: '16px',
          fontWeight: '700',
        },
      },
      color: {
        default: '#000000',
        hover: '#000000',
      },
    },
  },
  listItem: {
    text: {
      font: {
        default: {
          fontSize: '17px',
          fontWeight: '400',
          lineHeight: '19px',
        },
      },
    },
  },
  paginationItem: {
    backgroundColor: {
      default: '#E5ECDC',
    },
  },
  circularProgress: {
    fill: {
      default: '#FFFFFF',
    },
  },
  avatar: {
    backgroundColor: {
      default: '#D7E4C5',
    },
  },
  svgIcon: {
    fill: {
      default: '#000000',
    },
  },
  stepIcon: {
    text: {
      font: {
        default: {
          fontSize: '25px',
          fontWeight: '300',
          lineHeight: '18px',
        }
      }
    },
    fill: {
      default: '#D1E7B1',
    },
  },
  badge: {
    backgroundColor: {
      default: '#D20D0D',
    },
    text: {
      color: {
        default: '#FFFFFF',
      },
    },
  },
  alert: { 
    default: {
      text: {
        font: {
          default: {
            fontSize: '15px',
            fontWeight: '300',
            lineHeight: '20px',
          }
        },
      },
    },
    success: {
      backgroundColor: {
        default: 'rgb(209 255 209)',
      },
    },
    error: {
      backgroundColor: {
        default: 'rgb(255 199 199)',
      },
    },
  },
};

export const themeCustomElements: ThemeCustomElements = {
  header: {
    drawer: {
      divider: {
        border: {
          default: '1px solid #ECF7DC',
        },
      },
    },
  },
  footer: {
    content: {
      backgroundColor: {
        default: '#30343C',
      }
    },
    title: {
      text: {
        font: {
          default: {
            fontSize: '20px',
            fontWeight: '700',
          },
        },
      },
    },
  },
  home: {
    banner: {
      text: {
        font: {
          default: {
            fontSize: '28px',
            fontWeight: '900',
            lineHeight: '28px',
          },
        },
      },
    },
    icons: {
      backgroundColor: {
        default: '#E5ECDC',
      },
    },
  },
  button: {
    action: {
      backgroundColor: {
        default: '#6F9C7D',
        hover: '#A0D2AF', 
      },
      text: {
        color: {
          default: '#FFFFFF',
          hover: '#000000',
        },
        font: {
          default: {
            fontSize: '16px',
            fontWeight: '700',
          },
        },
      },
    },
  },
};
