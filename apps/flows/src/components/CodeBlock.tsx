import { styled, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { FlowCodeSnippet } from '..'
import { replace } from '../utilities/replace'
import { useFlowData } from '../hooks/useFlowData'

const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  background-color: ${theme.palette.background.paper};
  border-radius: ${theme.shape.borderRadius};
`)

const TabLabel = styled(Typography)(({ theme }) => `
  padding: ${theme.spacing(2, 4)};
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 800;
  color: ${theme.palette.text.secondary};
`)

export const CodeBlock: React.FC<{ snippets: Array<FlowCodeSnippet> }> = ({ snippets }) => {
  const { data } = useFlowData()
  const theme = useTheme()
  const [ snippet, setSnippet ] = useState(snippets[0])
  const [ code, setCode ] = useState(snippets[0].code)
  const [ seed ] = useState(Date.now())

  useEffect(() => {
    setCode(replace({ type: 'handlebars', statement: snippet.code }, data, seed) as string)
  }, [JSON.stringify(data)]);

  return (
    <Wrapper>
      { snippets.length < 2 && (
        <TabLabel variant="caption" sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}` }}>
          { snippet.language }
        </TabLabel>
      ) }
      { snippets.length >= 2 && (
        <Tabs
          sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}` }}
          value={snippet.language}
          onChange={(e, lang) => setSnippet(snippets.find((s) => s.language === lang) || snippet)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <TabLabel variant="caption">Language</TabLabel>
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
        { code }
      </SyntaxHighlighter>
    </Wrapper>
  )
}