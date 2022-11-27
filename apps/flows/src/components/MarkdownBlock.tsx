import { List, ListItem, ListItemIcon, styled, Typography } from '@mui/material'
import Markdown, { Options as MarkdownOptions } from 'react-markdown'

import { replace } from '../utilities/replace'
import { useFlowData } from '../hooks/useFlowData'
import { useEffect, useState } from 'react'

const Wrapper = styled('div')(({ theme }) => `
  margin: ${theme.spacing(3, 0)};
`)

const components: MarkdownOptions['components'] = {
  h1: ({ children }) => <Typography variant='h3'>{ children }</Typography>,
  h2: ({ children }) => <Typography variant='h4'>{ children }</Typography>,
  h3: ({ children }) => <Typography variant='h5'>{ children }</Typography>,
  h4: ({ children }) => <Typography variant='h6'>{ children }</Typography>,
  h5: ({ children }) => <Typography variant='h6' sx={{ fontSize: '1.15rem' }}>{ children }</Typography>,
  h6: ({ children }) => <Typography variant='h6' sx={{ fontSize: '1rem' }}>{ children }</Typography>,
  body: ({ children }) => <Typography variant='body1'>{ children }</Typography>,
  ul: ({ children }) => <List dense>{ children }</List>,
  li: ({ children }) => <ListItem><b style={{ marginRight: '8px', userSelect: 'none' }}>-</b>{ children }</ListItem>
}

export const MarkdownBlock: React.FC<{ markdown: string }> = ({ markdown }) => {
  const { data } = useFlowData()
  const [md, setMd] = useState(replace({ $flowDataType: 'Handlebars', statement: markdown}, data) as string)

  useEffect(() => {
    setMd(replace({ $flowDataType: 'Handlebars', statement: markdown}, data) as string);
  }, [JSON.stringify(data)]);

  return (
    <Markdown components={ components }>{ md }</Markdown>
  )
}