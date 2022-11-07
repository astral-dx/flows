import { styled, Typography } from '@mui/material'
import { Suspense, lazy } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Flow, FlowsConfig } from '..';
import { FlowDataProvider } from '../components/useFlowData/useFlowData';

const Request = lazy(() => import('../components/Request/Request'))

const Text = styled(Typography)`
  color: red;
`

export const FlowPage = () => {
  const { config, flow } = useLoaderData() as { config: FlowsConfig, flow: Flow }

  return (
    <FlowDataProvider constants={ config.constants }>
      <>
        { flow.steps.map(step => step.blocks.map(block => (
          <>
            { block.type === 'request' && (
              <Suspense fallback={<div>Loading...</div>}>
                <Request request={ block.value } />
              </Suspense>
            ) }
          </>
        ))) }
      </>
    </FlowDataProvider>
  )
}
