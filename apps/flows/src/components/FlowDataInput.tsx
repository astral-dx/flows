import { Box, InputAdornment, styled, TextField, Tooltip, useTheme } from "@mui/material"
import _get from 'lodash/get'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import BoltIcon from '@mui/icons-material/Bolt'
import PublicIcon from '@mui/icons-material/Public'
import PublicOffIcon from '@mui/icons-material/PublicOff'
import flatten from 'flat'
// @ts-ignore
import themes from 'monaco-themes'

import { monospacedFontStack } from "../theme"
import { FlowData } from "../hooks/useFlowData"
import { lazy, Suspense, useEffect, useState } from "react"
import { editor } from "monaco-editor"
import { useMonaco } from "@monaco-editor/react"

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
  requestDataDisplayMode: 'json' | 'textFields';
}

// TODO: Add button to clear user input/revert back (will need to remove key from userInput data in RequestBlock)
export const FlowDataInput: React.FC<FlowDataInputParams> = ({ data, type, onChange, requestDataDisplayMode, disabled = false, onDeleteKey }) => {
  const theme = useTheme();
  const monaco = useMonaco();
  const [editor, setEditor] = useState<editor.ICodeEditor | undefined>(undefined);

  const handleChange = (key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(key, event.target.value);
    }
  };

  useEffect(() => {
    if (editor) {
      editor.setValue(JSON.stringify(data, null, 2));
    }
  }, [data])

  const onEditorMount = (edit: editor.ICodeEditor) => {
    monaco?.editor.defineTheme('astral', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: { 'editor.background': '#FAFAFA' },
    });

    monaco?.editor.setTheme('astral');

    edit.onDidBlurEditorWidget((e) => {
      try {
        const oldVal = flatten(data) as Record<string, unknown>;
        const newVal = flatten(JSON.parse(edit.getValue())) as Record<string, unknown>;
  
        for (let key in { ...newVal, ...oldVal }) {
          if (newVal[key] !== oldVal[key] && onChange && oldVal[key]) {
            onChange(key, newVal[key]);
          }
        }
      } catch (e) {
        edit.setValue(JSON.stringify(data, null, 2));
      }
    })

    setEditor(edit);
  }
  
  return (
    <>
      { requestDataDisplayMode === 'textFields' && (
        <Wrapper>
        { Object.keys(flatten(data)).map((key, i) => (
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
      </Wrapper>
    ) }
    { requestDataDisplayMode === 'json' && (
      <Suspense>
        <MonacoEditor
          value={JSON.stringify(data, null, 2)}
          height="200px"
          language="json"
          onMount={onEditorMount}
          options={{
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            readOnly: disabled,
          }}
        />
      </Suspense>
    )}
    </>
  )
}