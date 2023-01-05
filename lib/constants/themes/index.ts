import { createTheme, ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#F1F4ED',
    },
    secondary: {
      main: '#ecf7dc',
    },
    background: {
      default: '#F1F4ED',
      paper: '#ecf7dc',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: '#000000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '15px',
          lineHeight: '18px',
          fontWeight: '700',
          textTransform: 'none',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#ecf7dc',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '15px',
          lineHeight: '1.5em',
          fontWeight: '300',
          '&.Mui-focused': {
            color: '#000000',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#ecf7dc',
          },
          '&.Mui-focused': {
            backgroundColor: '#ecf7dc',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#d7e4c5',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: '#000000',
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          fill: '#d1e7b1',
          fontSize: '25px',
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: '20px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          border: '1px solid #b0b0b0',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'underline',
          color: '#000000',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: '15px',
          lineHeight: '20px',     
        },
        standardSuccess: {
          backgroundColor: 'rgb(209 255 209)',
        },
        standardError: {
          backgroundColor: 'rgb(255 199 199)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#F1F4ED',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '25px',
          lineHeight: '28px',
          fontWeight: '500',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: '-0.33px',
        },
      },
    },
  },
  typography: {
    // Page title
    h1: {
      fontSize: '25px',
      lineHeight: '28px',
      fontWeight: '500',
    },
    // Navbar title
    subtitle1: {
      fontSize: '30px',
      lineHeight: '33px',
      fontWeight: '800',
    },
    // Page content
    body1: {
      fontSize: '15px',
      lineHeight: '18px',
      fontWeight: '300',
    },
    // Page content 2
    body2: {
      fontSize: '13px',
      lineHeight: '16px',
      fontWeight: '300',
    },
    fontFamily: [
      'Roboto',
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
    ].join(','),
  },
};

const theme = createTheme(themeOptions);

export default theme;
