import { Box, styled, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import DataObjectIcon from '@mui/icons-material/DataObject'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import { Flow, FlowMarkdownBlock, FlowsConfig } from '..'
import { getConfig, getFlow } from '../configs'

export const embedFlowPreviewPageLoader: LoaderFunction = ({params}) => {
  const config = getConfig(params.configId)
  const flow = getFlow(config, params.flowId)

  return { config, flow }
}

const Wrapper = styled('a')(({theme}) => `
  margin: 0;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  max-width: 320px;
  background: #f9f9f9;
  border: 2px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  transition: all 200ms ease;

  &:hover {
    cursor: pointer;
    border: 2px solid #d3d1d1;
  }
`)

const Header = styled('div')(({theme}) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  max-width: 320px;
  padding: ${theme.spacing(3)};
  color: white;
  background-image: linear-gradient(to right top, #7d6fde, #7162e0, #6354e1, #5547e2, #4338e2, #412fd4, #3e26c6, #3b1db8, #401b9a, #3f1a7e, #3a1963, #32194a);
`)

const Subtitle = styled(Typography)(({ theme }) => `
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 700;
  font-size: 0.9rem;
`)

const Content = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  padding: ${theme.spacing(3)};
`)

const Labels = styled('div')(({ theme }) => `
  display: flex;
  gap: ${theme.spacing(1)};
`)

export const EmbedFlowPreviewPage = () => {
  const { config, flow } = useLoaderData() as { config: FlowsConfig, flow: Flow }

  const [ requestCount, setRequestCount ] = useState<number | undefined>()
  const [ codeCount, setCodeCount ] = useState<number | undefined>()
  const [ readTime, setReadTime ] = useState<number | undefined>()

  useEffect(() => {
    const requestBlockCount = flow.blocks.
      filter(b => b.type === 'request')
      .length
    const codeBlockCount = flow.blocks.
      filter(b => b.type === 'code')
      .length
    const imageCount = flow.blocks.
      filter(b => b.type === 'image')
      .length
    const wordCount = flow.blocks
      .filter(b => b.type === 'markdown')
      .flatMap(b => (b as FlowMarkdownBlock).value.replace( /\n/g,' ').split(' '))
      .length

    const minutes = Math.ceil(
      (requestBlockCount * 3) // Request: 3 min
      + (codeBlockCount * 3) // Code: 3 min
      + (imageCount) // Image: 1 min
      + (wordCount / 200) // Words: 200/min
    )
    
    setRequestCount(requestBlockCount)
    setCodeCount(codeBlockCount)
    setReadTime(minutes)
  }, [ JSON.stringify(flow) ])

  return (
    <Wrapper href={ `/f/${config.id}/${flow.id}` } target="_blank">
      <Header className='header'>
        <Box display={ 'flex'} justifyContent={ 'space-between' } alignItems={ 'center' }>
          <Subtitle variant="subtitle1">Developer Flow</Subtitle>
          <OpenInNewIcon fontSize='small' />
        </Box>
        <Typography
          sx={{
            fontWeight: 900,
            marginTop: 0,
            height: '66px',
            overflow: 'hidden',
          }}
          component='h1'
          variant='h4'
        >
          { flow.name }
        </Typography>
      </Header>
      <Content>
        <Typography
          sx={{
            marginTop: 0,
            height: '80px',
            overflow: 'hidden',
          }}
          variant='body1'
        >
          { flow.description }
        </Typography>
        <Labels>
          { requestCount && requestCount > 0 && [
            <Typography sx={{ marginTop: 0 }} variant='body1'>{ requestCount }</Typography>,
            <CloudQueueIcon sx={{ position: 'relative', top: '3px' }} fontSize='small' />,
            <Typography sx={{ marginTop: 0 }} variant='body1'>&#x2022;</Typography>,
          ] }
          { codeCount && codeCount > 0 && [
            <Typography sx={{ marginTop: 0 }} variant='body1'>{ codeCount }</Typography>,
            <DataObjectIcon sx={{ position: 'relative', top: '3px' }} fontSize='small' />,
            <Typography sx={{ marginTop: 0 }} variant='body1'>&#x2022;</Typography>,
          ] }
          <Typography sx={{ marginTop: 0 }} variant='body1'>{ readTime } min read</Typography>
        </Labels>
      </Content>
    </Wrapper>
  )
}
