import { Button, CircularProgress, styled, Tab, Tabs, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'

import { FlowWebhook, Json } from "..";
import { useFlowData } from "../hooks/useFlowData";
import { replace } from "../utilities/replace";
import { monospacedFontStack } from '../theme'
import { Method, NoContentText, RequestContent, RequestHeader, TabLabel, Wrapper } from "./RequestBlock";
import { FlowDataInput } from "./FlowDataInput";

export const WebhookBlock: React.FC<{
  webhook: FlowWebhook
}> = ({ webhook }) => {
  const { data, requestDataDisplayMode } = useFlowData()
  const theme = useTheme()

  const [ webhookUrl, setWebhookUrl ] = useState<string>('');
  const [ webhookBody, setWebhookBody ] = useState<Record<string, Json>>(replace(webhook.params?.body ?? {}, data, Date.now().toString()) as Record<string, Json>)
  const [ webhookQueryParams, setWebhookQueryParams ] = useState<Record<string, string>>(replace(webhook.params?.query ?? {}, data, Date.now().toString()) as Record<string, string>)
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ selectedTab, setSelectedTab ] = useState('Body')

  const onSendWebhook = async () => {
    setLoading(true);

    // Build URL
    const url = new URL(webhookUrl);

    Object.entries(webhookQueryParams).forEach(([key, val]) => {
      url.searchParams.set(key, val);
    });

    try {
      await fetch(url, {
        method: webhook.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookBody)
      })
    } catch (error) {
      console.error(error);
    }
    
    setLoading(false);
  };

  return (
    <Wrapper>
      <RequestHeader>
        <Method method={webhook.method}>{ webhook.method }</Method>
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
          margin="none"
          value={ webhookUrl }
          fullWidth
          placeholder="Webhook URL"
          onChange={ (e) => setWebhookUrl(e.target.value) }
        />
        <Button
          endIcon={ loading ? <CircularProgress size={20} color='inherit' /> : <PlayCircleFilledWhiteIcon /> }
          variant="outlined"
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
          onClick={ onSendWebhook }
        >
          Send
        </Button>
      </RequestHeader>
      <RequestContent>
        <Tabs value={selectedTab} onChange={(_, tab) => setSelectedTab(tab)} sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}`}}>
          <TabLabel variant="caption">Request</TabLabel>
          <Tab label='Body' value='Body' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
          <Tab label='Query' value='Query' sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
        </Tabs>
        { selectedTab === 'Body' && webhookBody && Object.keys(webhookBody).length > 0 && (
          <FlowDataInput
            data={ webhookBody }
            type={ 'generated' }
            requestDataDisplayMode={ requestDataDisplayMode }
            onChange={(d) => setWebhookBody(d)}
          />
        ) }
        { selectedTab === 'Body' && (!webhookBody || Object.keys(webhookBody).length === 0) && (
          <NoContentText>No request body</NoContentText>
        ) }
        { selectedTab === 'Query' && webhookQueryParams && Object.keys(webhookQueryParams).length > 0 && (
          <FlowDataInput
            data={ webhookQueryParams }
            type={ 'generated' }
            requestDataDisplayMode={ requestDataDisplayMode }
            onChange={(d) => setWebhookQueryParams(d as Record<string, string>)}
          />
        ) }
        { selectedTab === 'Query' && (!webhookQueryParams || Object.keys(webhookQueryParams).length === 0) && (
          <NoContentText>No request query</NoContentText>
        ) }
      </RequestContent>
    </Wrapper>
  )
};