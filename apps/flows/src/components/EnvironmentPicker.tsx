import { Box, Button, Menu, MenuItem, styled, Tooltip, Typography, useTheme } from "@mui/material"
import { useState } from "react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PublicIcon from '@mui/icons-material/Public'
import BoltIcon from '@mui/icons-material/Bolt'

import { useFlowData } from "../hooks/useFlowData"

const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing(4)};
  /* flex-direction: column; */
  /* background-color: ${theme.palette.background.paper}; */
  /* border-radius: ${theme.shape.borderRadius}; */
`)

export const EnvironmentPicker: React.FC = () => {
  const { environments, activeEnvironment, setActiveEnvironment } = useFlowData()
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null)
  const theme = useTheme()

  const open = Boolean(anchorEl)

  if (!environments || !activeEnvironment || environments.length < 2) {
    return null
  }

  return (
    <Wrapper>
      <Tooltip title="Request Data Mode">
        <Button
          size="large"
          variant="outlined"
          sx={{
            fontWeight: 700,
            letterSpacing: '0.1rem',
          }}
          onClick={ (e) => setAnchorEl(e.currentTarget) }
          startIcon={ activeEnvironment.type === 'live' ? <PublicIcon sx={{ marginRight: theme.spacing(1) }} htmlColor="#15DFD3" fontSize="small" /> : <BoltIcon sx={{ marginRight: theme.spacing(1) }} htmlColor="#F5C827" fontSize="small" /> }
          endIcon={ <ExpandMoreIcon sx={{ marginLeft: theme.spacing(1) }} /> }
        >
          { activeEnvironment.name }
        </Button>
      </Tooltip>
      <Menu
        id="environment"
        aria-labelledby="environment"
        anchorEl={ anchorEl }
        open={ open }
        onClose={ () => setAnchorEl(null) }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box 
          sx={{
            borderBottom: `1px solid ${theme.palette.grey[300]}`,
            padding: theme.spacing(1, 2, 2),
            marginBottom: theme.spacing(1),
          }
        }>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              display: 'block',
              maxWidth: '320px',
            }}
          >
            <b>Request Data Mode</b>
            <br />
            Choose if requests in the flow return schema-driven generated responses or live network responses
          </Typography>
        </Box>
        { environments.map((env) => (
          <MenuItem
            sx={{ marginTop: 0 }}
            onClick={ () => { setActiveEnvironment(env.id); setAnchorEl(null); } }
          >
            { env.name }
          </MenuItem>
        )) }
      </Menu>
    </Wrapper>
  )
}