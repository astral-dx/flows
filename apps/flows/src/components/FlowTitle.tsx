import { Box, Container, styled, Typography, useTheme } from "@mui/material"
import { Flow, FlowsConfig } from ".."
import { EnvironmentPicker } from "./EnvironmentPicker"
import { FlowGraph } from "./FlowGraph"
import { FlowNavigation } from "./FlowNavigation"

const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(0, 10, 12)};
  gap: ${theme.spacing(1)};
  color: white;
  position: relative;

  & > .title-bg {
    background-image: radial-gradient(circle at bottom left, #7D6FDE, #1F22E2);
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
  }

  & > .title-bg::before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0; right: 0; bottom: 0; left: 0;
    background-image: radial-gradient(circle at bottom right, #32194A, transparent);
  }

  & > .title-bg::after {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.15) 5%, transparent 5%);
    background-position: 20px 20px;
    background-size: 30px 30px;
  }
`)

const Subtitle = styled(Typography)(({ theme }) => `
  font-weight: 900;
  font-size: 1.5rem;
`)

export const FlowTitle: React.FC<{ flow: Flow, config: FlowsConfig }> = ({ flow, config }) => {
  const theme = useTheme()

  return (
    <Wrapper>
      <div className="title-bg" />
      <Container maxWidth="md">
        <FlowNavigation config={ config } />
        <Subtitle variant="subtitle1">{ config.brand.name }</Subtitle>
        <Typography variant="h1">{ flow.name }</Typography>
        <Box display={ 'flex' } alignItems={ 'center'} justifyContent={ 'space-between' }>
          <FlowGraph flow={ flow } />
          { !!flow.blocks.find(b => b.type === 'request') && (
            <EnvironmentPicker />
          ) }
        </Box>
      </Container>
    </Wrapper>
  )
}