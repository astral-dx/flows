import { Container, styled } from '@mui/material'
import { Suspense, lazy } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'

import { Flow, FlowCollection, FlowsConfig, FlowStep } from '..'
import { CodeBlock } from '../components/CodeBlock'
import { ConnectionBlock } from '../components/ConnectionBlock'
import { FlowTitle } from '../components/FlowTitle'
import { MarkdownBlock } from '../components/MarkdownBlock'
import { StepTitle } from '../components/StepTitle'
import { FlowDataProvider } from '../components/useFlowData'
import { getConfig, getFlowStep } from '../configs'

const RequestBlock = lazy(() => import('../components/RequestBlock'))

export const flowStepPageLoader: LoaderFunction = ({ params }) => {
  const config = getConfig(params.configId)
  const { collection, flow, step } = getFlowStep(config, params.collectionId, params.flowId, params.stepId)

  return { config, collection, flow, step }
}

const BlocksWrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
`)

const Footer = styled('div')(({ theme }) => `
  border-top: 1px solid ${theme.palette.grey[300]};
  padding: ${theme.spacing(10)};
  text-align: center;
`)

const Logo = styled('img')(({ theme }) => `
  height: 30px;
`)

export const FlowStepPage = () => {
  const { config, collection, flow, step } = useLoaderData() as { config: FlowsConfig, collection: FlowCollection, flow: Flow, step: FlowStep }

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
              { block.type === 'connection' && (
                <ConnectionBlock
                  config={ config }
                  collection={ collection }
                  flow={ flow }
                  steps={ flow.steps }
                  connection={ block.value }
                />
              ) }
            </div>
          )) }
        </BlocksWrapper>
        <Footer>
          <a href="https://astraldx.com">
            <Logo src="/astral.svg" />
          </a>
        </Footer>
      </Container>
    </FlowDataProvider>
  )
}
