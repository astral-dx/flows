import { styled, Typography } from '@mui/material'
import { Suspense, lazy } from 'react';

const CodeSplitTest = lazy(() => import('../components/CodeSplitTest'));

const Text = styled(Typography)`
  color: red;
`

export const HelloWorldPage = () => {
  return (
    <Text variant="h1">
      Hello World!

      <Suspense fallback={<div>Loading...</div>}>
        <CodeSplitTest />
      </Suspense>
    </Text>
  )
}
