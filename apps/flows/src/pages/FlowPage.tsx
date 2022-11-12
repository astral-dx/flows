import { Suspense, lazy } from 'react'
import { useLoaderData } from 'react-router-dom'

import { Flow, FlowsConfig } from '..'
import { CodeBlock } from '../components/CodeBlock/CodeBlock'
import { MarkdownBlock } from '../components/MarkdownBlock/MarkdownBlock'
import { FlowDataProvider } from '../components/useFlowData/useFlowData'

const RequestBlock = lazy(() => import('../components/RequestBlock/RequestBlock'))

export const FlowPage = () => {
  const { config, flow } = useLoaderData() as { config: FlowsConfig, flow: Flow }

  return (
    <FlowDataProvider constants={ config.constants }>
      <>
        { flow.steps.map(step => step.blocks.map((block, i) => (
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
        ))) }
      </>
    </FlowDataProvider>
  )
}
