import { createBrowserRouter } from 'react-router-dom'

import { getConfig, getFlow } from '../configs'
import { FlowPage } from './FlowPage'

export const router = createBrowserRouter([
  {
    path: '/f/:configId/:collectionId/:flowId',
    element: <FlowPage />,
    loader: ({ params }) => {
      const config = getConfig(params.configId)
      const flow = getFlow(config, params.collectionId, params.flowId)

      return { config, flow }
    }
  },
])