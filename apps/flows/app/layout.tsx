'use client';

import EmotionRootStyleRegistry from './EmotionRootStyleRegistry'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html>
      <head></head>
      <body>
        <EmotionRootStyleRegistry>
          <ThemeProvider theme={ theme }>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </EmotionRootStyleRegistry>
      </body>
    </html>
  )
}
