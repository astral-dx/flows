import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'

import { router } from './pages/router'
import { theme } from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <RouterProvider router={ router } />
    </ThemeProvider>
  </React.StrictMode>
)
