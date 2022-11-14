import { createBrowserRouter } from 'react-router-dom'

import { getConfig, getFlowStep } from '../configs'
import { FlowStepPage, flowStepPageLoader } from './FlowStepPage'
import { ErrorBoundary } from '../components/ErrorBoundary'

export const router = createBrowserRouter([
  {
    path: '/f/:configId/:collectionId/:flowId',
    element: <FlowStepPage />,
    errorElement: <ErrorBoundary />,
    loader: flowStepPageLoader,
  },
  {
    path: '/f/:configId/:collectionId/:flowId/:stepId',
    element: <FlowStepPage />,
    errorElement: <ErrorBoundary />,
    loader: flowStepPageLoader,
  }
])