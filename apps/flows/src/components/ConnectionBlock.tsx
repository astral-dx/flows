import { Button, styled, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { Flow, FlowCollection, FlowConnection, FlowsConfig, FlowStep } from '..'

const Wrapper = styled('div')(({ theme }) => `
  margin: ${theme.spacing(5, 0)};
  display: flex;
  justify-content: flex-end;
`)

export const ConnectionBlock: React.FC<{
  config: FlowsConfig,
  collection: FlowCollection,
  flow: Flow,
  steps: Array<FlowStep>,
  connection: FlowConnection,
}> = ({ config, collection, flow, steps, connection }) => {
  const theme = useTheme()
  const [ step, setStep ] = useState<FlowStep | undefined>()

  useEffect(() => {
    setStep(steps.find(s => s.id === connection.stepId))
  }, [ steps, connection ])

  return (
    <Wrapper>
      <Button
        href={ `/f/${config.id}/${collection.id}/${flow.id}/${step?.id ?? ''}` }
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
        { connection.label ?? step?.name }
      </Button>
    </Wrapper>
  )
}