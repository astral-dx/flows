import { styled, Typography } from "@mui/material"
import { Flow } from ".."

const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing(7, 10, 10)};
  text-align: center;
  gap: ${theme.spacing(1)};
  background-image: linear-gradient(to right top, #7d6fde, #7162e0, #6354e1, #5547e2, #4338e2, #412fd4, #3e26c6, #3b1db8, #401b9a, #3f1a7e, #3a1963, #32194a);
  margin: ${theme.spacing(3, 0, 0)};
  border-radius: 10px;
  color: white;
`)

const Subtitle = styled(Typography)(({ theme }) => `
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 700;
`)

export const FlowTitle: React.FC<{ flow: Flow }> = ({ flow }) => {
  return (
    <Wrapper>
      <Subtitle variant="subtitle1">Developer Flow</Subtitle>
      <Typography variant="h1">{ flow.name }</Typography>
    </Wrapper>
  )
}