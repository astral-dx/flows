import { Container, styled } from '@mui/material'
import { Suspense, lazy } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'

import { Flow, FlowsConfig, FlowStep } from '..'
import { CodeBlock } from '../components/CodeBlock'
import { FlowTitle } from '../components/FlowTitle'
import { MarkdownBlock } from '../components/MarkdownBlock'
import { StepTitle } from '../components/StepTitle'
import { FlowDataProvider } from '../components/useFlowData'
import { getConfig, getFlowStep } from '../configs'

const RequestBlock = lazy(() => import('../components/RequestBlock'))

export const flowStepPageLoader: LoaderFunction = ({ params }) => {
  const config = getConfig(params.configId)
  const { flow, step } = getFlowStep(config, params.collectionId, params.flowId, params.stepId)

  return { config, flow, step }
}

const BlocksWrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
`)

export const FlowStepPage = () => {
  const { config, flow, step } = useLoaderData() as { config: FlowsConfig, flow: Flow, step: FlowStep }

  return (
    <FlowDataProvider constants={ config.constants } environments={ config.environments }>
      <Container maxWidth="md">
        <FlowTitle flow={ flow } />
        <StepTitle step={ step } />
        <BlocksWrapper>
          { step.blocks.map((block, i) => (
            <div key={ step.id + i }>
              { block.type === 'request' && (
                <Suspense fallback={<div>Loading...</div>}>
                  <RequestBlock request={ block.value } />
                </Suspense>
              ) }
              { block.type === 'markdown' && (
                <MarkdownBlock markdown={ block.value } />
              ) }
              { block.type === 'code' && (
                <CodeBlock snippets={ block.value } />
              ) }
            </div>
          )) }
        </BlocksWrapper>
      </Container>
    </FlowDataProvider>
  )
}
