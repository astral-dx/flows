import { styled, Typography } from '@mui/material'
import { Suspense, lazy } from 'react';

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
      <Suspense fallback={<div>Loading...</div>}>
        <Request />
      </Suspense>
    </>
  )
}
