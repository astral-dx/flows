import { useEffect, useState } from 'react'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import { Button, CircularProgress, styled, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { FlowsConfig, FlowRequest, FlowRequestReference, HTTPMethod } from '..'
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

const RequestBlock: React.FC<{
  config: FlowsConfig,
  requestRef: FlowRequestReference
}> = ({ config, requestRef }) => {
  const { addFlowData, data, environments } = useFlowData()
  const [ selectedTab, setSelectedTab ] = useState('Body')
  const [ loading, setLoading ] = useState(false)
  const [ showResponse, setShowResponse ] = useState(false)
  const theme = useTheme()

  const [ request, setRequest ] = useState<FlowRequest | undefined>(undefined)

  const [generatedParamsHeaders, setGeneratedParamsHeaders] = useState<Record<string, unknown> | undefined>()
  const [generatedParamsQuery, setGeneratedParamsQuery] = useState<Record<string, unknown> | undefined>()
  const [generatedParamsBody, setGeneratedParamsBody] = useState<Record<string, unknown> | undefined>()
  const [generatedParamsPath, setGeneratedParamsPath] = useState<Record<string, unknown> | undefined>()

  const [generatedResponseHeaders, setGeneratedResponseHeaders] = useState<Record<string, unknown> | undefined>()
  const [generatedResponseBody, setGeneratedResponseBody] = useState<Record<string, unknown> | undefined>()

  useEffect(() => {
    setRequest(config.requests.find(req => req.id === requestRef.requestId))
  }, [config, requestRef])

  useEffect(() => {
    /*
     * Feels like we should have a giant function that generates all data and takes into account overrides
     */
    if (request && request.params) {
      const { params } = request

      setGeneratedParamsHeaders(
        params.headers && generate(params.headers, `${requestRef.referenceBy}.params.headers`, addFlowData)
      )
      setGeneratedParamsQuery(
        params.query && generate(params.query, `${requestRef.referenceBy}.params.query`, addFlowData)
      )
      setGeneratedParamsBody(
        params.body && generate(params.body, `${requestRef.referenceBy}.params.body`, addFlowData)
      )
      setGeneratedParamsPath(
        params.path && generate(params.path, `${requestRef.referenceBy}.params.path`, addFlowData)
      )
    }

    if (request && request.response) {
      const { response } = request
      
      setGeneratedResponseHeaders(
        response.headers && generate(response.headers, `${requestRef.referenceBy}.response.headers`, addFlowData)
      )
      setGeneratedResponseBody(
        response.body && generate(response.body, `${requestRef.referenceBy}.response.body`, addFlowData)
      )
    }
  }, [ request ])

  const onTestRequest = () => {
    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
      setShowResponse(true)
      setSelectedTab('Response')
    }, Math.random() * (800 - 50) + 50)
  }

  if (!request) {
    return null
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
        { selectedTab === 'Body' && generatedParamsBody && (
          <FlowDataInput data={ generatedParamsBody } type={ 'generated' } />
        ) }
        { selectedTab === 'Body' && !generatedParamsBody && (
          <NoContentText>No request body</NoContentText>
        ) }
        { selectedTab === 'Query' && generatedParamsQuery && (
          <FlowDataInput data={ generatedParamsQuery } type={ 'generated' } />
        ) }
        { selectedTab === 'Query' && !generatedParamsQuery && (
          <NoContentText>No request query</NoContentText>
        ) }
        { selectedTab === 'Headers' && generatedParamsHeaders && (
          <FlowDataInput data={ generatedParamsHeaders } type={ 'generated' } />
        ) }
        { selectedTab === 'Headers' && !generatedParamsHeaders && (
          <NoContentText>No request headers</NoContentText>
        ) }
        { selectedTab === 'Response' && generatedResponseBody && (
          <FlowDataInput data={ generatedResponseBody } type={ 'mock-response' } />
        ) }
        { selectedTab === 'Response' && !generatedResponseBody && (
          <NoContentText>No Response Body</NoContentText>
        ) }
      </RequestContent>
    </Wrapper>
  )
}

export default RequestBlock