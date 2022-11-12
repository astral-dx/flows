import { createBrowserRouter } from 'react-router-dom'

import { getConfig, getFlow } from '../configs'
import { FlowPage } from './FlowPage'
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary'

export const router = createBrowserRouter([
  {
    path: '/f/:configId/:collectionId/:flowId',
    element: <FlowPage />,
    errorElement: <ErrorBoundary />,
    loader: ({ params }) => {
      const config = getConfig(params.configId)
      const flow = getFlow(config, params.collectionId, params.flowId)

      return { config, flow }
    }
  },
])