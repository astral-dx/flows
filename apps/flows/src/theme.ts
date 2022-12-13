
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { HTTPMethod } from '.';

declare module '@mui/material' {
  interface Palette {
    methods: Record<HTTPMethod, string>
  }

  interface PaletteOptions {
    methods?: Record<HTTPMethod, string>
  }
}

const defaultTheme = createTheme();

export const monospacedFontStack = [
  'ui-monospace', 
  '"Menlo"',
  '"Monaco"', 
  '"Cascadia Mono"',
  '"Segoe UI Mono"', 
  '"Roboto Mono"', 
  '"Oxygen Mono"', 
  '"Ubuntu Monospace"', 
  '"Source Code Pro"',
  '"Fira Mono"', 
  '"Droid Sans Mono"', 
  '"Courier New"',
  'monospace',
].join(',')

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
      // main: '#7D6FDE',
      main: '#282a40', // lendflow primary

    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: 'rgb(250, 250, 250)',
    },
    methods: {
      GET: '#6FDE6F',
      POST: '#7D6FDE',
      PUT: '#DA6FDE',
      PATCH: '#DE986F',
      DELETE: '#DE6F6F',
      HEAD: '#6FCCDE',
      OPTIONS: '#6FDEB7',
      TRACE: '#DE6F9A',
      CONNECT: '#DEDC6F'
    }
  },
})
