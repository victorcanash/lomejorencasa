import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ff784e',
      main: '#ff5722',
      dark: '#b23c17',
      contrastText: '#fff',
    },
    secondary: {
      light: '#834bff',
      main: '#651fff',
      dark: '#4615b2',
      contrastText: '#000',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        sx: {
          backgroundColor: '#ff5722',
          color: '#fff',
        }
      },
    }
  },
});

export default theme;
