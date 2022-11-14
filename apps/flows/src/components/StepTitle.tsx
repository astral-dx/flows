import { styled, Typography } from "@mui/material"
import { FlowStep } from ".."

const Wrapper = styled('div')(({ theme }) => `
  margin-bottom: ${theme.spacing(2)};
  padding-bottom: ${theme.spacing(5)};
  border-bottom: 1px solid ${theme.palette.grey[300]};
`)

const Subtitle = styled(Typography)(({ theme }) => `
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 700;
`)

export const StepTitle: React.FC<{ step: FlowStep }> = ({ step }) => {
  return (
    <Wrapper>
      <Typography variant="h2">{ step.name }</Typography>
      { step.description  && (
        <Typography variant="body1">{ step.description }</Typography>
      ) }
    </Wrapper>
  )
}