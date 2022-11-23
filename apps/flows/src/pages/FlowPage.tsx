import { Container, styled } from '@mui/material'
import { Suspense, lazy } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'

import { Flow, FlowsConfig } from '..'
import { CodeBlock } from '../components/CodeBlock'
import { ConnectionBlock } from '../components/ConnectionBlock'
import { FlowTitle } from '../components/FlowTitle'
import { MarkdownBlock } from '../components/MarkdownBlock'
import { FlowDataProvider } from '../components/useFlowData'
import { getConfig, getFlow } from '../configs'

const RequestBlock = lazy(() => import('../components/RequestBlock'))

export const flowPageLoader: LoaderFunction = ({ params }) => {
  const config = getConfig(params.configId)
  const flow = getFlow(config, params.flowId)

  return { config, flow }
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

export const FlowPage = () => {
  const { config, flow } = useLoaderData() as { config: FlowsConfig, flow: Flow }

  return (
    <FlowDataProvider constants={ config.constants } environments={ config.environments }>
      <Container maxWidth="md">
        <FlowTitle flow={ flow } />
        <BlocksWrapper>
          { flow.blocks.map((block, i) => (
            <div key={ flow.id + i }>
              { block.type === 'request' && (
                <Suspense fallback={<div>Loading...</div>}>
                  <RequestBlock config={ config } requestRef={ block.value } />
                </Suspense>
              ) }
              { block.type === 'markdown' && (
                <MarkdownBlock markdown={ block.value } />
              ) }
              { block.type === 'code' && (
                <CodeBlock snippets={ block.value } />
              ) }
              { block.type === 'connection' && (
                <ConnectionBlock config={ config } connection={ block.value } />
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
