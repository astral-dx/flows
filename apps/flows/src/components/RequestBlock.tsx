import { useEffect, useState } from 'react'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import { Button, CircularProgress, styled, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { FlowsConfig, FlowRequestReference, HTTPMethod, Json } from '..'
import { useFlowData } from '../hooks/useFlowData'
import { generate } from '../utilities/generate'
import { FlowDataInput } from './FlowDataInput'
import { mockRequest } from '../utilities/mockRequest'
import { replacePath, replace } from '../utilities/replace'

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

const buildUrlPath = (templatePath: string, pathParams: Record<string, Json>, queryParams: Record<string, Json>) => {
  const path = replacePath(templatePath, pathParams as Record<string, string>)
  const queryString = Object.keys(queryParams).length > 0 
    ? `?${Object.entries(queryParams).map((p) => `${p[0]}=${p[1]}`).join('&')}`
    : '';

  return path + queryString;
}

 /** Request Calculation order:
  *   - Generated data from schema `FlowRequest`.params (not recalculated) (done)
  *   - `FlowRequestReference`.overrides (done)
  *   - User Input
  */

 /** TODO:
  *   - Inputs for headers/bodys/url params (Track with userInput states)
  *   - Add body and header elements
  *   - CURL/Source code for requests (auto generate based on current data)
  */
const RequestBlock: React.FC<{
  config: FlowsConfig,
  requestRef: FlowRequestReference
}> = ({ config, requestRef }) => {
  const { activeEnvironment, environments, data, addFlowData } = useFlowData()
  const [ selectedTab, setSelectedTab ] = useState('Body') // TODO: Switching tabs is causing a re-render
  const [ loading, setLoading ] = useState(false)
  const [ showResponse, setShowResponse ] = useState(false)
  const theme = useTheme()
  // Requests in config should never change
  const request = config.requests.find(req => req.id === requestRef.requestId)

  // TODO: Style component error.
  if (!request) {
    return <div>Invalid Request ID</div>
  }

  // Generate starting data from FlowRequest
  const [requestHeaders, setRequestHeaders] = useState<Record<string, Json>>(generate(request.params?.headers ?? {}))
  const [requestQueryParams, setRequestQueryParams] = useState<Record<string, Json>>(generate(request.params?.query ?? {}))
  const [requestBody, setRequestBody] = useState<Record<string, Json>>(generate(request.params?.body ?? {}))
  const [requestPathParams, setRequestPathParams] = useState<Record<string, Json>>(generate(request.params?.path ?? {}))

  const [userInputHeaders, setUserInputHeaders] = useState<Record<string, Json>>({})
  const [userInputQueryParams, setUserQueryParams] = useState<Record<string, Json>>({})
  const [userInputBody, setUserInputBody] = useState<Record<string, Json>>({})
  const [userInputPathParams, setUserInputPathParams] = useState<Record<string, Json>>()

  const [responseHeaders, setResponseHeaders] = useState<Record<string, Json> | undefined>()
  const [responseBody, setResponseBody] = useState<Record<string, Json> | undefined>()
  

  // Monitor global conext to update requestParams
  useEffect(() => {
    setRequestPathParams({
      ...replace(requestRef.overrides?.path ?? {}, data) as Record<string, Json>,
      ...userInputPathParams
    })
    
    setRequestBody({
      ...replace(requestRef.overrides?.body ?? {}, data) as Record<string, Json>,
      ...userInputBody
    });

    setRequestHeaders({
      ...replace(requestRef.overrides?.headers ?? {}, data) as Record<string, Json>,
      ...userInputHeaders
    })

    setRequestQueryParams({
      ...replace(requestRef.overrides?.query ?? {}, data) as Record<string, Json>,
      ...userInputQueryParams
    })
  }, [ data, userInputPathParams, userInputBody, userInputHeaders, userInputQueryParams ]);

  const onSendRequest = async () => {
    setLoading(true)
    let body: Record<string, Json> = {}
    let headers: Record<string, Json> = {}

    if (activeEnvironment?.mockEnvironment) {
      const res = await mockRequest(request.response?.body, request.response?.headers)
      
      body = res.body
      headers = res.headers
    } else {
      // Else make request to server
      
    }
    
    addFlowData(requestRef.referenceBy, { body, headers })
    setResponseBody(body)
    setResponseHeaders(headers)
    setLoading(false)
    setShowResponse(true)
    setSelectedTab('Response')
  }

  return (
    <Wrapper>
      <RequestHeader>
        <div>
          <Method method={request.method}>{ request.method }</Method> {environments[0].host}<b>{buildUrlPath(request.path, requestPathParams, requestQueryParams) }</b>
        </div>
        <Button
          endIcon={ loading ? <CircularProgress size={20} color='inherit' /> : <PlayCircleFilledWhiteIcon /> }
          variant='contained'
          sx={{ fontWeight: 700, letterSpacing: '0.1rem', borderRadius: '20px', padding: theme.spacing(1, 2.5) }}
          onClick={ onSendRequest }
        >
          Send
        </Button>
      </RequestHeader>
      <RequestContent>
        <Tabs value={selectedTab} onChange={(_, tab) => setSelectedTab(tab)} sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}`}}>
          <Tab label='Body' value='Body' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab label='Query' value='Query' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab label='Headers' value='Headers' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab disabled={ !showResponse } label='Response' value='Response' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
        </Tabs>
        { selectedTab === 'Body' && requestBody && Object.keys(requestBody).length > 0 && (
          <FlowDataInput data={ requestBody } type={ 'generated' } />
        ) }
        { selectedTab === 'Body' && (!requestBody || Object.keys(requestBody).length === 0) && (
          <NoContentText>No request body</NoContentText>
        ) }
        { selectedTab === 'Query' && requestQueryParams && Object.keys(requestQueryParams).length > 0 && (
          <FlowDataInput data={ requestQueryParams } type={ 'generated' } />
        ) }
        { selectedTab === 'Query' && (!requestQueryParams || Object.keys(requestQueryParams).length === 0) && (
          <NoContentText>No request query</NoContentText>
        ) }
        { selectedTab === 'Headers' && requestHeaders && Object.keys(requestHeaders).length > 0 && (
          <FlowDataInput data={ requestHeaders } type={ 'generated' } />
        ) }
        { selectedTab === 'Headers' && (!requestHeaders || Object.keys(requestHeaders).length === 0) && (
          <NoContentText>No request headers</NoContentText>
        ) }
        { selectedTab === 'Response' && responseBody && (
          <FlowDataInput data={ responseBody } type={ activeEnvironment?.mockEnvironment ? 'mock-response' : 'api-response' } />
        ) }
        { selectedTab === 'Response' && !responseBody && (
          <NoContentText>No Response Body</NoContentText>
        ) }
      </RequestContent>
    </Wrapper>
  )
}

export default RequestBlock