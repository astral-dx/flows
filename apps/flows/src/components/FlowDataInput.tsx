import { InputAdornment, styled, TextField, Tooltip, useTheme } from "@mui/material"
import _get from 'lodash/get'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import BoltIcon from '@mui/icons-material/Bolt'
import PublicIcon from '@mui/icons-material/Public'
import PublicOffIcon from '@mui/icons-material/PublicOff'
import flatten from 'flat'

import { monospacedFontStack } from "../theme"
import { FlowData } from "../hooks/useFlowData"
import { lazy } from "react"

const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  margin: ${theme.spacing(2, 3, 3)};
`)

const MonacoEditor = lazy(() => import('@monaco-editor/react'));

export type FlowDataInputType = 'static' | 'generated' | 'api-response' | 'mock-response'

interface FlowDataInputParams {
  data: FlowData
  type: FlowDataInputType
  onChange?: (key: string, val: any) => void
  onDeleteKey?: (keys: string) => void
  disabled?: boolean
  showSource?: boolean;
}

// TODO: Add button to clear user input/revert back (will need to remove key from userInput data in RequestBlock)
export const FlowDataInput: React.FC<FlowDataInputParams> = ({ data, type, onChange, showSource, disabled = false, onDeleteKey }) => {
  const theme = useTheme();

  const handleChange = (key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(key, event.target.value);
    }
  };

  const onSourceChange = (value?: string) => {
    if (!value) {
      return;
    }
    
    try {
      const oldVal = flatten(data) as Record<string, unknown>;
      const newVal = flatten(JSON.parse(value)) as Record<string, unknown>;

      for (let key in { ...newVal, ...oldVal }) {
        if (key in newVal === false) {
          if (onDeleteKey) {
            onDeleteKey(key);
          }
        } else if (newVal[key] !== oldVal[key]) {
          if (onChange) {
            onChange(key, newVal[key]);
          }
        }
      }
    } catch (e) {

    }
  }
  
  return (
    <Wrapper>
      { !showSource && Object.keys(flatten(data)).map((key, i) => (
        <TextField
          InputProps={{
            sx: {
              fontFamily: monospacedFontStack,
              marginTop: theme.spacing(1),
              paddingLeft: theme.spacing(1.25),
              fontSize: '14px',
              '> input': { padding: theme.spacing(1.5, 1.5, 1.5, 0.75) },
              '> .Mui-disabled': { color: theme.palette.text.primary, WebkitTextFillColor: theme.palette.text.primary },
            },
            startAdornment: (
              <InputAdornment
                sx={{
                  '> p': { color: theme.palette.text.disabled, fontFamily: monospacedFontStack, fontSize: '14px', margin: 0 },
                }}
                position={ 'start' }
              >
                { type === 'static' && (
                  <Tooltip title={ 'Static' }>
                    <RemoveCircleIcon htmlColor="#15DFD3" fontSize={ 'small' } sx={{ marginRight: theme.spacing(1) }} />
                  </Tooltip>
                ) }
                { type === 'generated' && (
                  <Tooltip title={ 'Generated' }>
                    <BoltIcon htmlColor="#F5C827" fontSize={ 'small' } sx={{ marginRight: theme.spacing(1) }} />
                  </Tooltip>
                ) }
                { type === 'api-response' && (
                  <Tooltip title={ 'API Response' }>
                    <PublicIcon htmlColor="#10D777" fontSize={ 'small' } sx={{ marginRight: theme.spacing(1) }} />
                  </Tooltip>
                ) }
                { type === 'mock-response' && (
                  <Tooltip title={ 'Mock API Response' }>
                    <PublicOffIcon htmlColor="#10D777" fontSize={ 'small' } sx={{ marginRight: theme.spacing(1) }} />
                  </Tooltip>
                ) }
                { key }
              </InputAdornment>
            ),
          }}
          margin={ 'none' }
          key={ i }
          value={ _get(data, key) }
          onChange={ (e) => handleChange(key, e) }
          disabled={ disabled }
        />
      ))}
      { !showSource && (
        <MonacoEditor
          value={JSON.stringify(data, null, 2)}
          height="200px"
          language="json"
          onChange={onSourceChange}
          options={{
            scrollBeyondLastLine: false,
            minimap: {
              enabled: false
            }
          }}
        />
      )}
    </Wrapper>
  )
}