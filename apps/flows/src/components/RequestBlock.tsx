import { useEffect, useState } from 'react'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import { Button, CircularProgress, styled, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { FlowRequest, HTTPMethod } from '..'
import { useFlowData } from './useFlowData'
import { generate } from '../utilities/generate'
import { FlowDataInput } from './FlowDataInput'

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
  justify-content: space-between;
`)

const RequestContent = styled('div')(({ theme }) => `

`)

const NoContentText = styled(Typography)(({ theme }) => `
  padding: ${theme.spacing(0, 3, 3)};
  color: ${theme.palette.text.secondary};
  font-style: italic;
`)

const Method = styled('div')<{ method: HTTPMethod }>(({ theme, method }) => `
  padding: ${theme.spacing(0, 1.2)};
  height: 24px;
  line-height: 24px;
  border-radius: 8px;
  color: ${theme.palette.background.paper};
  background-color: ${theme.palette.methods[method]};
  display: inline-block;
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
      setSelectedTab('Response')
    }, Math.random() * (800 - 50) + 50)
  }

  return (
    <Wrapper>
      <RequestHeader>
        <div>
          <Method method={request.method}>{ request.method }</Method> {environments[0].host}<b>{ request.path }</b>
        </div>
        <Button
          endIcon={ loading ? <CircularProgress size={20} color='inherit' /> : <PlayCircleFilledWhiteIcon /> }
          variant='contained'
          sx={{ fontWeight: 700, letterSpacing: '0.1rem', borderRadius: '20px', padding: theme.spacing(1, 2.5) }}
          onClick={ onTestRequest }
        >
          Send
        </Button>
      </RequestHeader>
      <RequestContent>
        <Tabs value={selectedTab} onChange={(e, tab) => setSelectedTab(tab)} sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}`}}>
          <Tab label='Body' value='Body' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab label='Query' value='Query' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab label='Headers' value='Headers' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab disabled={ !showResponse } label='Response' value='Response' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
        </Tabs>
        { selectedTab === 'Body' && generatedBody && (
          <FlowDataInput data={ generatedBody } type={ 'generated' } />
        ) }
        { selectedTab === 'Body' && !generatedBody && (
          <NoContentText>No request body</NoContentText>
        ) }
        { selectedTab === 'Query' && generatedQuery && (
          <FlowDataInput data={ generatedQuery } type={ 'generated' } />
        ) }
        { selectedTab === 'Query' && !generatedQuery && (
          <NoContentText>No request query</NoContentText>
        ) }
        { selectedTab === 'Headers' && headers && (
          <FlowDataInput data={ headers } type={ 'static' } />
        ) }
        { selectedTab === 'Headers' && !headers && (
          <NoContentText>No request headers</NoContentText>
        ) }
        { selectedTab === 'Response' && generatedResponse && (
          <FlowDataInput data={ generatedResponse } type={ 'mock-response' } />
        ) }
        { selectedTab === 'Response' && !generatedResponse && (
          <NoContentText>No Response Body</NoContentText>
        ) }
      </RequestContent>
    </Wrapper>
  )
}

export default RequestBlock