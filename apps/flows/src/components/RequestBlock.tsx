import { useEffect, useState } from 'react'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import { Button, CircularProgress, styled, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { FlowRequest } from '..'
import { useFlowData } from './useFlowData'
import { generate } from '../utilities/generate'

const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  background-color: ${theme.palette.background.paper};
  border-radius: ${theme.shape.borderRadius};
`)

const RequestHeader = styled('div')(({ theme }) => `
  padding: ${theme.spacing(3, 3, 2)};
  display: flex;
  align-items: center;
`)

const RequestContent = styled('div')(({ theme }) => `
  border-bottom: 1px solid ${theme.palette.grey[300]};
`)

const RequestFooter = styled('div')(({ theme }) => `
  padding: ${theme.spacing(3)};
`)

const NoContentText = styled(Typography)(({ theme }) => `
  padding: ${theme.spacing(0, 3, 3)};
  color: ${theme.palette.text.secondary};
  font-style: italic;
`)

const Method = styled('div')(({ theme }) => `
  padding: ${theme.spacing(0, 1.2)};
  height: 24px;
  line-height: 24px;
  border-radius: 8px;
  color: ${theme.palette.background.paper};
  background-color: #7D6FDE;
  display: inline;
  margin-right: ${theme.spacing(2)};
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
`)

const RequestBlock: React.FC<{ request: FlowRequest }> = ({ request }) => {
  const { addFlowData, data, environments } = useFlowData()
  const [ selectedTab, setSelectedTab ] = useState('Body')
  const [ loading, setLoading ] = useState(false)
  const [ showResponse, setShowResponse ] = useState(false)
  const theme = useTheme()

  const [generatedQuery, setGeneratedQuery] = useState<Record<string, unknown> | undefined>()
  const [generatedBody, setGeneratedBody] = useState<Record<string, unknown> | undefined>()
  const [generatedResponse, setGeneratedResponse] = useState<Record<string, unknown> | undefined>()

  if (request.type === 'OpenAPI') {
    return null;
  }

  const { query, body, response, headers } = request

  useEffect(() => {
    setGeneratedQuery(query && generate(query.schema, query.referenceBy, addFlowData))
    setGeneratedBody(body && generate(body.schema, body.referenceBy, addFlowData))
    setGeneratedResponse(response && generate(response.schema, response.referenceBy, addFlowData))
  }, [query, body, response])

  const onTestRequest = () => {
    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
      setShowResponse(true)
    }, Math.random() * (800 - 50) + 50)
  }

  return (
    <Wrapper>
      <RequestHeader>
        <Method>{ request.method }</Method> {environments[0].host}<b>{ request.path }</b>
      </RequestHeader>
      <RequestContent>
        <Tabs value={selectedTab} onChange={(e, tab) => setSelectedTab(tab)} sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}`}}>
          <Tab label='Body' value='Body' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab label='Query' value='Query' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab label='Headers' value='Headers' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
        </Tabs>
        { selectedTab === 'Body' && generatedBody && (
          <SyntaxHighlighter
            style={ oneLight }
            customStyle={{ padding: theme.spacing(3) }}
            language='json'
          >
            { JSON.stringify(generatedBody, null, 2) }
          </SyntaxHighlighter>
        ) }
        { selectedTab === 'Body' && !generatedBody && (
          <NoContentText>No request body</NoContentText>
        ) }
        { selectedTab === 'Query' && generatedQuery && (
          <SyntaxHighlighter
            style={ oneLight }
            customStyle={{ padding: theme.spacing(3) }}
            language='json'
          >
            { JSON.stringify(generatedQuery, null, 2) }
          </SyntaxHighlighter>
        ) }
        { selectedTab === 'Query' && !generatedQuery && (
          <NoContentText>No request query</NoContentText>
        ) }
        { selectedTab === 'Headers' && headers && (
          <SyntaxHighlighter
            style={ oneLight }
            customStyle={{ padding: theme.spacing(3) }}
            language='json'
          >
            { JSON.stringify(headers, null, 2) }
          </SyntaxHighlighter>
        ) }
        { selectedTab === 'Headers' && !headers && (
          <NoContentText>No request headers</NoContentText>
        ) }
      </RequestContent>
      <RequestFooter>
        <Button
          endIcon={ loading ? <CircularProgress size={20} color='inherit' /> : <PlayCircleFilledWhiteIcon /> }
          variant='contained'
          sx={{ fontWeight: 700, letterSpacing: '0.1rem', borderRadius: '20px', padding: theme.spacing(1, 2.5) }}
          onClick={ onTestRequest }
        >
          Test Request
        </Button>
      </RequestFooter>
      { !loading && showResponse && (
        <SyntaxHighlighter
          style={ oneLight }
          customStyle={{ padding: theme.spacing(0, 3, 3) }}
          language='json'
        >
          { JSON.stringify(generatedResponse, null, 2) }
        </SyntaxHighlighter>
      ) }
    </Wrapper>
  )
}

export default RequestBlock