import { createBrowserRouter } from 'react-router-dom'

import { FlowPage, flowPageLoader } from './FlowPage'
import { ErrorBoundary } from '../components/ErrorBoundary'

export const router = createBrowserRouter([
  {
    path: '/f/:configId/:flowId',
    element: <FlowPage />,
    errorElement: <ErrorBoundary />,
    loader: flowPageLoader,
  },
])