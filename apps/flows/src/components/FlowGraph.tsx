import { useEffect, useState } from "react"
import { Icon } from '@mdi/react'
import { mdiWebhook } from '@mdi/js'
import ShortTextIcon from '@mui/icons-material/ShortText'
import HttpIcon from '@mui/icons-material/Http'

import { Flow } from ".."
import { Box, useTheme, alpha, styled } from "@mui/material"

type GraphNode = 'markdown' | 'image' | 'request' | 'code' | 'connection' | 'webhook'

const IconWrapper = styled(Box)(({ theme }) => `
  background: ${alpha(theme.palette.primary.contrastText, 0.2)};
  padding: ${theme.spacing(0.5)};
  height: 28px;
  border-radius: 14px;
  position: relative;

  & + & {
    margin-left: ${theme.spacing(2)};
  }

  & + &::before {
    display: block;
    position: absolute;
    left: -${theme.spacing(2.5)};
    top: 13px;
    content: '';
    height: 2px;
    width: ${theme.spacing(2)};
    background-color: ${alpha(theme.palette.primary.contrastText, 0.2)};
  }
`)

export const FlowGraph: React.FC<{ flow: Flow }> = ({ flow }) => {
  const [ graph, setGraph ] = useState<Array<GraphNode>>([])
  const theme = useTheme()

  useEffect(() => {
    setGraph(flow.blocks.reduce((g, block) => {
      const last = g.at(-1)
      let node = block.type

      if (['markdown', 'code', 'image'].includes(node)) { node = 'markdown' } // simplify markdown like blocks

      if (node === last) { return g } // merge sibling of the same type

      return [ ...g, node ]
    }, [] as Array<GraphNode>))
  }, [flow])

  return (
    <Box display={ 'flex' } gap={ theme.spacing(1) } marginTop={ theme.spacing(5) }>
      { graph.map((node, i) => {
        if (node === 'markdown') {
          return (
            <IconWrapper key={ i }>
              <ShortTextIcon fontSize={ 'small' } />
            </IconWrapper>
          )
        }

        if (node === 'request') {
          return (
            <IconWrapper key={ i }>
              <HttpIcon fontSize={ 'small' } />
            </IconWrapper>
          )
        }

        if (node === 'webhook') {
          return (
            <IconWrapper key={ i }>
              <Icon path={ mdiWebhook } key={ i } color={ theme.palette.primary.contrastText } size={ 0.8 } />
            </IconWrapper>
          )
        }

        return null
      }) }
    </Box>
  )
}