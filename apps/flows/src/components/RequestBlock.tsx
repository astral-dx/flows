import { useEffect, useState } from 'react'
import _merge from 'lodash/merge'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import { Box, Button, CircularProgress, styled, Tab, Tabs, TextField, Typography, useTheme } from '@mui/material'

import { FlowsConfig, FlowRequestReference, HTTPMethod, Json, FlowRequestSchema, ReplaceData, FlowRequestProperty } from '..'
import { useFlowData } from '../hooks/useFlowData'
import { FlowDataInput } from './FlowDataInput'
import { mockRequest } from '../utilities/mockRequest'
import { replacePath, replace, schemaToReplaceData } from '../utilities/replace'
import { monospacedFontStack } from '../theme'
import { mergeFlattened } from '../utilities/mergeFlattened'

export const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  background-color: ${theme.palette.background.paper};
  border-radius: ${theme.shape.borderRadius};
`)

export const RequestHeader = styled('div')(({ theme }) => `
  padding: ${theme.spacing(3, 3, 2)};
  display: flex;
  align-items: center;
`)

export const RequestContent = styled('div')(({ theme }) => `

`)

export const NoContentText = styled(Typography)(({ theme }) => `
  padding: ${theme.spacing(0, 3, 3)};
  color: ${theme.palette.text.secondary};
  font-style: italic;
`)

export const Method = styled('div')<{ method: HTTPMethod }>(({ theme, method }) => `
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

export const TabLabel = styled(Typography)(({ theme }) => `
  padding: ${theme.spacing(2, 4)};
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 800;
  color: ${theme.palette.text.secondary};
`)

const buildUrlPath = (templatePath: string, pathParams: Record<string, Json>, queryParams: Record<string, Json>) => {
  const path = replacePath(templatePath, pathParams as Record<string, string>)
  const queryString = Object.keys(queryParams).length > 0 
    ? `?${Object.entries(queryParams).map((p) => `${p[0]}=${p[1]}`).join('&')}`
    : '';

  return path + queryString;
}

const getDefaultTab = (
  headersSchema: FlowRequestSchema | undefined,
  querySchema: FlowRequestSchema | undefined,
  bodySchema: FlowRequestSchema | FlowRequestProperty | undefined,
  pathSchema: FlowRequestSchema | undefined,
): string => {
  if (typeof pathSchema === 'object' && Object.keys(pathSchema).length > 0) {
    return 'Path'
  } else if (typeof bodySchema === 'object' && Object.keys(bodySchema).length > 0) {
    return 'Body'
  } else if (typeof querySchema === 'object' && Object.keys(querySchema).length > 0) {
    return 'Query'
  } else if (typeof headersSchema === 'object' && Object.keys(headersSchema).length > 0) {
    return 'Headers'
  } else {
    return 'Path'
  }
}

 /** Request Calculation order:
  *   - Generated data from schema `FlowRequest`.params (not recalculated) (done)
  *   - `FlowRequestReference`.overrides (done)
  *   - User Input
  */

 /** TODO:
  *   - Add body and header elements
  *   - CURL/Source code for requests (auto generate based on current data)
  */
const RequestBlock: React.FC<{
  config: FlowsConfig,
  requestRef: FlowRequestReference
}> = ({ config, requestRef }) => {
  const { activeEnvironment, environments, data, addFlowData } = useFlowData()
  const [ loading, setLoading ] = useState(false)
  const [ seed ] = useState(Date.now().toString())
  const theme = useTheme()
  // Requests in config should never change
  const request = config.requests.find(req => req.id === requestRef.requestId)

  // TODO: Style component error.
  if (!request) {
    return <div>Invalid Request ID</div>
  }

  const [headersSchema] = useState<FlowRequestSchema | undefined>(_merge(request.params?.headers, requestRef.params?.headers))
  const [querySchema] = useState<FlowRequestSchema | undefined>(_merge(request.params?.query, requestRef.params?.query))
  const [bodySchema] = useState<FlowRequestSchema | FlowRequestProperty | undefined>(_merge(request.params?.body, requestRef.params?.body))
  const [pathSchema] = useState<FlowRequestSchema | undefined>(_merge(request.params?.path, requestRef.params?.path))
  const [responseBodySchema] = useState<FlowRequestSchema | FlowRequestProperty | undefined>(_merge(request.response?.body, requestRef.response?.body))
  const [responseHeadersSchema] = useState<FlowRequestSchema | undefined>(_merge(request.response?.headers, requestRef.response?.headers))

  const [headerTemplate] = useState<ReplaceData>(schemaToReplaceData(headersSchema) ?? {})
  const [queryTemplate] = useState<ReplaceData>(schemaToReplaceData(querySchema) ?? {})
  const [bodyTemplate] = useState<ReplaceData>(schemaToReplaceData(bodySchema) ?? {})
  const [pathTemplate] = useState<ReplaceData>(schemaToReplaceData(pathSchema) ?? {})

  // Generate starting data from FlowRequest
  const [requestHeaders, setRequestHeaders] = useState<Record<string, Json>>(replace(headerTemplate, data, seed) as Record<string, Json>)
  const [requestQuery, setRequestQueryParams] = useState<Record<string, Json>>(replace(queryTemplate, data, seed) as Record<string, Json>)
  const [requestBody, setRequestBody] = useState<Record<string, Json>>(replace(bodyTemplate, data, seed) as Record<string, Json>)
  const [requestPath, setRequestPathParams] = useState<Record<string, Json>>(replace(pathTemplate, data, seed) as Record<string, Json>)

  const [userInputHeaders, setUserInputHeaders] = useState<Record<string, Json>>({})
  const [userInputQueryParams, setUserInputQueryParams] = useState<Record<string, Json>>({})
  const [userInputBody, setUserInputBody] = useState<Record<string, Json>>({})
  const [userInputPathParams, setUserInputPathParams] = useState<Record<string, Json>>({})

  const [responseHeaders, setResponseHeaders] = useState<Record<string, Json> | undefined>()
  const [responseBody, setResponseBody] = useState<Record<string, Json> | undefined>()

  const [ selectedRequestTab, setSelectedRequestTab ] = useState(
    getDefaultTab(headersSchema, querySchema, bodySchema, pathSchema)
  )
  const [ selectedResponseTab, setSelectedResponseTab ] = useState(
    getDefaultTab(responseHeadersSchema, undefined, responseBodySchema, undefined)
  )

  // Monitor global context to update requestParams
  useEffect(() => {
    setRequestPathParams(mergeFlattened(
      replace(pathTemplate, data, seed) as Record<string, Json>,
      userInputPathParams
    ))
    
    setRequestBody(mergeFlattened(
      replace(bodyTemplate, data, seed) as Record<string, Json>,
      userInputBody
    ))

    setRequestHeaders(mergeFlattened(
      replace(headerTemplate, data, seed) as Record<string, Json>,
      userInputHeaders
    ))

    setRequestQueryParams(mergeFlattened(
      replace(queryTemplate, data, seed) as Record<string, Json>,
      userInputQueryParams
    ))
  }, [ data, userInputPathParams, userInputBody, userInputHeaders, userInputQueryParams ]);

  useEffect(() => {
    addFlowData(requestRef.referenceBy, { request: {
      headers: requestHeaders,
      query: requestQuery,
      body: requestBody,
      path: requestPath,
    } })
  }, [ requestHeaders, requestQuery, requestBody, requestPath ])

  const onSendRequest = async () => {
    setLoading(true)
    let body: Record<string, Json> = {}
    let headers: Record<string, Json> = {}

    if (activeEnvironment?.type === 'mock') {
      const responseBodyTemplate = schemaToReplaceData(responseBodySchema) ?? {}
      const responseHeadersTemplate = schemaToReplaceData(responseHeadersSchema) ?? {}

      const res = await mockRequest(responseBodyTemplate, responseHeadersTemplate, data, seed)
      
      body = res.body
      headers = res.headers
    } else {
      try {
        const url = environments[0].host + buildUrlPath(request.path, requestPath, requestQuery);

        await fetch(url, {
          method: request.method,
          headers: requestHeaders as Record<string, string>,
          body: JSON.stringify(requestBody)
        })
      } catch (error) {
        console.error(error);
      }
    }
    
    addFlowData(requestRef.referenceBy, { response: { body, headers } })
    setResponseBody(body)
    setResponseHeaders(headers)
    setLoading(false)
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
          value={ environments[0].host + buildUrlPath(request.path, requestPath, requestQuery) }
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
        <Tabs value={selectedRequestTab} onChange={(_, tab) => setSelectedRequestTab(tab)} sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}`}}>
          <TabLabel variant="caption">Request</TabLabel>
          <Tab label='Path' value='Path' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab label='Body' value='Body' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab label='Query' value='Query' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab label='Headers' value='Headers' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
        </Tabs>
        <Box sx={{ maxHeight: '300px', overflow: 'scroll' }}>
          { selectedRequestTab === 'Path' && requestPath && Object.keys(requestPath).length > 0 && (
            <FlowDataInput
              data={ requestPath }
              type={ 'generated' }
              onChange={(key, val) => setUserInputPathParams((d) => mergeFlattened(d, { [key]: val }))}
            />
          ) }
          { selectedRequestTab === 'Path' && (!requestPath || Object.keys(requestPath).length === 0) && (
            <NoContentText>No path parameters</NoContentText>
          ) }
          { selectedRequestTab === 'Body' && requestBody && Object.keys(requestBody).length > 0 && (
            <FlowDataInput
              data={ requestBody }
              type={ 'generated' }
              onChange={(key, val) => setUserInputBody((d) => mergeFlattened(d, { [key]: val }))}
            />
          ) }
          { selectedRequestTab === 'Body' && (!requestBody || Object.keys(requestBody).length === 0) && (
            <NoContentText>No request body</NoContentText>
          ) }
          { selectedRequestTab === 'Query' && requestQuery && Object.keys(requestQuery).length > 0 && (
            <FlowDataInput
              data={ requestQuery }
              type={ 'generated' }
              onChange={(key, val) => setUserInputQueryParams((d) => mergeFlattened(d, { [key]: val }))}
            />
          ) }
          { selectedRequestTab === 'Query' && (!requestQuery || Object.keys(requestQuery).length === 0) && (
            <NoContentText>No request query</NoContentText>
          ) }
          { selectedRequestTab === 'Headers' && requestHeaders && Object.keys(requestHeaders).length > 0 && (
            <FlowDataInput
              data={ requestHeaders }
              type={ 'generated' }
              onChange={(key, val) => setUserInputHeaders((d) => mergeFlattened(d, { [key]: val }))}
            />
          ) }
          { selectedRequestTab === 'Headers' && (!requestHeaders || Object.keys(requestHeaders).length === 0) && (
            <NoContentText>No request headers</NoContentText>
          ) }
        </Box>
        <Tabs value={selectedResponseTab} onChange={(_, tab) => setSelectedResponseTab(tab)} sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}`}}>
          <TabLabel variant="caption">Response</TabLabel>
          <Tab label='Body' value='Body' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab label='Headers' value='Headers' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
        </Tabs>
        <Box sx={{ maxHeight: '300px', overflow: 'scroll' }}>
          { selectedResponseTab === 'Body' && responseBody && (
            <FlowDataInput
              data={ responseBody }
              type={ activeEnvironment?.type === 'mock' ? 'mock-response' : 'api-response' }
              disabled
            />
          ) }
          { selectedResponseTab === 'Body' && !responseBody && (
            <NoContentText>No Response Body</NoContentText>
          ) }
          { selectedResponseTab === 'Headers' && responseHeaders && (
            <FlowDataInput
              data={ responseHeaders }
              type={ activeEnvironment?.type === 'mock' ? 'mock-response' : 'api-response' }
              disabled
            />
          ) }
          { selectedResponseTab === 'Headers' && !responseBody && (
            <NoContentText>No Response Headers</NoContentText>
          ) }
        </Box>
      </RequestContent>
    </Wrapper>
  )
}

export default RequestBlock