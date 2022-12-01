import { createTheme, ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#91002e',
    },
    secondary: {
      main: '#3d0043',
    },
    background: {
      default: '#282c34',
      //paper: '#2d2d2d',
      paper: '#91002e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      disabled: '#bdbdbd',
    },
    divider: '#ffffff',
  },
  typography: {
    fontFamily: [
      '-apple-system', 
      'BlinkMacSystemFont', 
      'Segoe UI', 
      'Roboto', 
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
