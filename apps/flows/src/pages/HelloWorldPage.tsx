import { styled, Typography } from '@mui/material'
import { Suspense, lazy } from 'react';

import { config } from '../configs/rideshareco'

const Request = lazy(() => import('../components/Request/Request'))

const Text = styled(Typography)`
  color: red;
`

export const HelloWorldPage = () => {
  return (
    <>
      <Text variant="h1">
        Hello World!
      </Text>
      { config.collections.map(collection => collection.flows.map(flow => flow.steps.map(step => step.blocks.map(block => (
        <>
          { block.type === 'request' && (
            <Suspense fallback={<div>Loading...</div>}>
              <Request request={ block.value } />
            </Suspense>
          ) }
        </>
      ))))) }
      
    </>
  )
}
