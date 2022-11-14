
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const defaultTheme = createTheme();

// Create a theme instance
export const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      marginTop: defaultTheme.spacing(3),
      fontWeight: 900,
      fontSize: '3.5rem',
    },
    h2: {
      marginTop: defaultTheme.spacing(3),
      fontWeight: 900,
      fontSize: '2.5rem',
    },
    h3: {
      marginTop: defaultTheme.spacing(3),
      fontWeight: 700,
      fontSize: '2rem',
    },
    h4: {
      marginTop: defaultTheme.spacing(3),
      fontWeight: 700,
      fontSize: '1.66rem',
    },
    h5: {
      marginTop: defaultTheme.spacing(3),
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    h6: {
      marginTop: defaultTheme.spacing(3),
      fontWeight: 700,
      fontSize: '1.33rem',
    },
    body1: {
      marginTop: defaultTheme.spacing(3),
      lineHeight: 1.66,
    }
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
})
