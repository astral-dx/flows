import { Button, styled, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { Flow, FlowConnection, FlowsConfig } from '..'

const Wrapper = styled('div')(({ theme }) => `
  margin: ${theme.spacing(2, 0, 0)};
  display: flex;
  justify-content: flex-end;
`)

export const ConnectionBlock: React.FC<{
  config: FlowsConfig,
  connection: FlowConnection,
}> = ({ config, connection }) => {
  const theme = useTheme()
  const [ flow, setFlow ] = useState<Flow | undefined>()

  useEffect(() => {
    setFlow(config.flows.find(flow => flow.id === connection.flowId))
  }, [ connection ])

  if (!flow) {
    return null
  }

  return (
    <Wrapper>
      <Button
        href={ `/f/${config.id}/${flow.id}` }
        size='large'
        variant='contained'
        endIcon={ <ArrowForwardIcon /> }
        sx={{
          fontWeight: 700,
          letterSpacing: '0.1rem',
          borderRadius: '30px',
          padding: theme.spacing(2, 4),
        }}
      >
        { connection.label ?? flow.name }
      </Button>
    </Wrapper>
  )
}