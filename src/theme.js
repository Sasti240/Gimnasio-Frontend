import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',     
      light: '#484848',    
      dark: '#000000',     
      contrastText: '#FFFFFF' 
    },
    secondary: {
      main: '#9E9E9E',     
      light: '#E0E0E0',    
      dark: '#616161',     
      contrastText: '#212121'
    },
    background: {
      default: '#FAFAFA',  
      paper: '#FFFFFF'     
    },
    text: {
      primary: '#212121',  
      secondary: '#757575', 
      disabled: '#BDBDBD'  
    },
    divider: '#E0E0E0'    
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      color: '#212121'
    },
    h2: {
      fontWeight: 600,
      color: '#212121'
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.5px'
    },
    body1: {
      color: '#424242'
    }
  },
  shape: {
    borderRadius: 8       
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 22px'
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }
});

export default theme;