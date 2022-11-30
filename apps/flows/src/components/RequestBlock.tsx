import { useEffect, useState } from 'react'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import SendIcon from '@mui/icons-material/Send'
import { Button, CircularProgress, IconButton, InputAdornment, styled, Tab, Tabs, TextField, Typography, useTheme } from '@mui/material'

import { FlowsConfig, FlowRequestReference, HTTPMethod, Json } from '..'
import { useFlowData } from '../hooks/useFlowData'
import { generate } from '../utilities/generate'
import { FlowDataInput } from './FlowDataInput'
import { mockRequest } from '../utilities/mockRequest'
import { replacePath, replace } from '../utilities/replace'
import { monospacedFontStack } from '../theme'

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
  /* gap: ${theme.spacing(2)}; */
`)

const RequestContent = styled('div')(({ theme }) => `

`)

const NoContentText = styled(Typography)(({ theme }) => `
  padding: ${theme.spacing(0, 3, 3)};
  color: ${theme.palette.text.secondary};
  font-style: italic;
`)

const Method = styled('div')<{ method: HTTPMethod }>(({ theme, method }) => `
  box-sizing: border-box;
  padding: ${theme.spacing(1.3, 2, 1.3, 2.5)};
  width: 89px;
  text-align: center;
  flex-shrink: 0;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 22px;
  color: ${theme.palette.methods[method]};
  border: 1px solid ${theme.palette.methods[method]};
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  background-color: white;
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
  const [ seed ] = useState(Date.now())
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
  const [userInputQueryParams, setUserInputQueryParams] = useState<Record<string, Json>>({})
  const [userInputBody, setUserInputBody] = useState<Record<string, Json>>({})
  const [userInputPathParams, setUserInputPathParams] = useState<Record<string, Json>>()

  const [responseHeaders, setResponseHeaders] = useState<Record<string, Json> | undefined>()
  const [responseBody, setResponseBody] = useState<Record<string, Json> | undefined>()
  

  // Monitor global context to update requestParams
  useEffect(() => {
    // TODO: Should be able to calculate where requestHeaders, requestQueryParams, requestBody, requestPathParams
    //    Since we keep userInput data, we should be able to record if its generated/grabbed from global data/user input
    setRequestPathParams({
      ...replace(requestRef.overrides?.path ?? {}, data, seed) as Record<string, Json>,
      ...userInputPathParams
    })
    
    setRequestBody({
      ...replace(requestRef.overrides?.body ?? {}, data, seed) as Record<string, Json>,
      ...userInputBody
    });

    setRequestHeaders({
      ...replace(requestRef.overrides?.headers ?? {}, data, seed) as Record<string, Json>,
      ...userInputHeaders
    })

    setRequestQueryParams({
      ...replace(requestRef.overrides?.query ?? {}, data, seed) as Record<string, Json>,
      ...userInputQueryParams
    })
  }, [ data, userInputPathParams, userInputBody, userInputHeaders, userInputQueryParams ]);

  const onSendRequest = async () => {
    setLoading(true)
    let body: Record<string, Json> = {}
    let headers: Record<string, Json> = {}

    if (activeEnvironment?.type === 'mock') {
      const res = await mockRequest(request.response?.body, request.response?.headers)
      
      body = res.body
      headers = res.headers
    } else {
      // Make request to server
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
        <Method method={request.method}>{ request.method }</Method>
        <TextField
          InputProps={{
            sx: {
              fontFamily: monospacedFontStack,
              marginTop: 0,
              borderRadius: 0,
              paddingLeft: theme.spacing(1.25),
              fontSize: '14px',
              backgroundColor: 'white',
              '> input': { padding: theme.spacing(1.5, 1.5, 1.5, 0.75), cursor: 'text' },
              '> fieldset': { borderLeft: 'none', borderRight: 'none' },
              '> input.Mui-disabled': { color: theme.palette.text.primary, WebkitTextFillColor: theme.palette.text.primary },
            }
          }}
          margin={ 'none' }
          value={ environments[0].host + buildUrlPath(request.path, requestPathParams, requestQueryParams) }
          disabled
          fullWidth
        />
        <Button
          endIcon={ loading ? <CircularProgress size={20} color='inherit' /> : <PlayCircleFilledWhiteIcon /> }
          variant={ 'outlined' }
          sx={{
            fontWeight: 700,
            letterSpacing: '0.1rem',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: '22px',
            borderBottomRightRadius: '22px',
            padding: theme.spacing(1.1, 2.5, 1.1, 2),
            flexShrink: 0,
            backgroundColor: 'white',
          }}
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
          <FlowDataInput
            data={ requestBody }
            type={ 'generated' }
            onChange={(key, val) => setUserInputBody((d) => ({ ...d, [key]: val }))}
          />
        ) }
        { selectedTab === 'Body' && (!requestBody || Object.keys(requestBody).length === 0) && (
          <NoContentText>No request body</NoContentText>
        ) }
        { selectedTab === 'Query' && requestQueryParams && Object.keys(requestQueryParams).length > 0 && (
          <FlowDataInput
            data={ requestQueryParams }
            type={ 'generated' }
            onChange={(key, val) => setUserInputQueryParams((d) => ({ ...d, [key]: val }))}
          />
        ) }
        { selectedTab === 'Query' && (!requestQueryParams || Object.keys(requestQueryParams).length === 0) && (
          <NoContentText>No request query</NoContentText>
        ) }
        { selectedTab === 'Headers' && requestHeaders && Object.keys(requestHeaders).length > 0 && (
          <FlowDataInput
            data={ requestHeaders }
            type={ 'generated' }
            onChange={(key, val) => setUserInputHeaders((d) => ({ ...d, [key]: val }))}
          />
        ) }
        { selectedTab === 'Headers' && (!requestHeaders || Object.keys(requestHeaders).length === 0) && (
          <NoContentText>No request headers</NoContentText>
        ) }
        { selectedTab === 'Response' && responseBody && (
          <FlowDataInput
            data={ responseBody }
            type={ activeEnvironment?.type === 'mock' ? 'mock-response' : 'api-response' }
            disabled
          />
        ) }
        { selectedTab === 'Response' && !responseBody && (
          <NoContentText>No Response Body</NoContentText>
        ) }
      </RequestContent>
    </Wrapper>
  )
}

export default RequestBlock