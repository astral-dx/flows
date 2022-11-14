import { styled, Typography } from "@mui/material"
import { Flow } from ".."

const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing(10)};
  text-align: center;
  gap: ${theme.spacing(3)};
  background-color: rgba(0, 0, 0, 0.025);
  margin: ${theme.spacing(5, 0, 10)};
  border-radius: ${theme.shape.borderRadius};
`)

const Subtitle = styled(Typography)(({ theme }) => `
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 700;
`)

const Graph = styled('div')(({ theme }) => `
  height: 20px;
  width: 500px;
  border-radius: 10px;
  background-color: ${theme.palette.grey[300]};
  margin: ${theme.spacing(5, 3, 3)};
`)


export const FlowTitle: React.FC<{ flow: Flow }> = ({ flow }) => {
  return (
    <Wrapper>
      <Subtitle variant="subtitle1">Developer Flow</Subtitle>
      <Typography variant="h1">{ flow.name }</Typography>
      <Graph />
    </Wrapper>
  )
}