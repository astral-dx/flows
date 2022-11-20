import { InputAdornment, styled, TextField, Tooltip, useTheme } from "@mui/material"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import BoltIcon from '@mui/icons-material/Bolt'
import PublicIcon from '@mui/icons-material/Public'
import PublicOffIcon from '@mui/icons-material/PublicOff'

import { monospacedFontStack } from "../theme"
import { FlowData } from "./useFlowData"
import { Schema } from "../utilities/generate"

const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  margin: ${theme.spacing(2, 3, 3)};
`)

export type FlowDataInputType = 'static' | 'generated' | 'api-response' | 'mock-response'

export const FlowDataInput: React.FC<{ data: FlowData, type: FlowDataInputType }> = ({ data, type }) => {
  const theme = useTheme();

  return (
    <Wrapper>
      { Object.keys(data).map((key, i) => {
        const value = data[key]

        return (
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
            value={ value }
            disabled
          />
        )
      }) }
    </Wrapper>
  )
}