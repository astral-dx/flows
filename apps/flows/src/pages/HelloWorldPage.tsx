import { styled, Typography } from "@mui/material"

const Text = styled(Typography)`
  color: red;
`

export const HelloWorldPage = () => {
  return (
    <Text variant="h1">
      Hello World!
    </Text>
  )
}
