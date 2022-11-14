import { styled, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { FlowCodeSnippet } from '..'
import { replace } from '../utilities/replace'
import { useFlowData } from './useFlowData'

const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
`)

export const CodeBlock: React.FC<{ snippets: Array<FlowCodeSnippet> }> = ({ snippets }) => {
  const { data } = useFlowData()
  const theme = useTheme()
  const [ snippet, setSnippet ] = useState(snippets[0])

  return (
    <Wrapper>
      { snippets.length < 2 && (
        <Typography variant='caption' sx={{ textTransform: 'capitalize', fontWeight: 700, color: theme.palette.text.secondary }}>
          { snippet.language }
        </Typography>
      ) }
      { snippets.length >= 2 && (
        <Tabs
          value={snippet.language}
          onChange={(e, lang) => setSnippet(snippets.find((s) => s.language === lang) || snippet)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          { snippets.map(({ language }) => (
            <Tab
              key={ language }
              value={ language }
              label={ language }
              sx={{ fontWeight: 700, textTransform: 'capitalize' }}
            />
          ))}
        </Tabs>
      ) }
      <SyntaxHighlighter
        style={ oneLight }
        customStyle={{ padding: theme.spacing(3) }}
        showLineNumbers
        language={ snippet.language }
      >
        { replace(snippet.code, data) }
      </SyntaxHighlighter>
    </Wrapper>
  )
}