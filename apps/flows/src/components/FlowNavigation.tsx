import { Box, Button, styled, Tooltip, useTheme } from "@mui/material"
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { FlowsConfig } from ".."

const Logo = styled('img')(({theme}) => `
  height: 25px;
`)

const NavButton = styled(Button)(({theme}) => `
  font-weight: 700;
  letter-spacing: 0.1rem;
  color: white;
  padding: ${theme.spacing(0, 2)};
  border-radius: 15px;

  &.Mui-disabled {
    color: rgba(255, 255, 255, 0.5);
  }
`)

export const FlowNavigation: React.FC<{ config: FlowsConfig }> = ({ config }) => {
  const theme = useTheme()

  return (
    <Box
      display={ 'flex' }
      gap={ theme.spacing(4) }
      justifyContent={ 'space-between' }
      padding={ theme.spacing(4, 0, 6) }
    >
      <Box
        display={ 'flex' }
        gap={ theme.spacing(4) }
      >
        <Logo src={ config.brand.logoUrl } sx={{ marginRight: theme.spacing(2) }} />
        {/* <NavButton size="small" href={ `/f/${config.id}` }>{ 'Flows' }</NavButton>
        <Tooltip title={ 'Coming Soon' }>
          <div>
            <NavButton size="small" disabled>{ 'API Explorer' }</NavButton>
          </div>
        </Tooltip> */}
      </Box>
    </Box>
  )
}