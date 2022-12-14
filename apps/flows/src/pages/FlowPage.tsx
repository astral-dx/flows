import {Container, CssBaseline, Link, styled, ThemeProvider} from '@mui/material'
import {Suspense, lazy} from 'react'
import {LoaderFunction, useLoaderData} from 'react-router-dom'

import {Flow, FlowsConfig} from '..'
import {CodeBlock} from '../components/CodeBlock'
import {ConnectionBlock} from '../components/ConnectionBlock'
import {FlowTitle} from '../components/FlowTitle'
import {MarkdownBlock} from '../components/MarkdownBlock'
import {FlowDataProvider} from '../hooks/useFlowData'
import {getConfig, getFlow} from '../configs'
import {ImageBlock} from "../components/ImageBlock";
import { EnvironmentPicker } from '../components/EnvironmentPicker'
import { WebhookBlock } from '../components/WebhookBlock'
import { makeTheme, monospacedFontStack } from '../theme'

const RequestBlock = lazy(() => import('../components/RequestBlock'))

export const flowPageLoader: LoaderFunction = ({params}) => {
  const config = getConfig(params.configId)
  const flow = getFlow(config, params.flowId)

  return {config, flow}
}

const BlocksWrapper = styled('div')(({theme}) => `
  margin-top: ${theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
`)

const Footer = styled('div')(({theme}) => `
  border-top: 1px solid ${theme.palette.grey[300]};
  padding: ${theme.spacing(8)};
  margin-top: ${theme.spacing(8)};
  display: flex;
  justify-content: center;
`)

const AstralLink = styled(Link)(({theme}) => `
  display: flex;
  align-items: center;
  font-weight: 800;
  text-decoration: none;
`)

const Logo = styled('img')(({theme}) => `
  height: 25px;
  margin-right: ${theme.spacing(1)};
`)

export const FlowPage = () => {
  const {config, flow} = useLoaderData() as { config: FlowsConfig, flow: Flow }

  console.log({ config, flow })

  return (
    <FlowDataProvider constants={config.constants} environments={config.environments}>
      <ThemeProvider theme={ makeTheme(config.brand) }>
        <CssBaseline />
        <FlowTitle flow={ flow } config={ config } />
        <Container maxWidth="md">
          <BlocksWrapper>
            {flow.blocks.map((block, i) => (
              <div key={flow.id + i}>
                {block.type === 'request' && (
                  <Suspense fallback={<div>Loading...</div>}>
                    <RequestBlock config={config} requestRef={block.value}/>
                  </Suspense>
                )}
                {block.type === 'markdown' && (
                  <MarkdownBlock markdown={block.value}/>
                )}
                {block.type === 'code' && (
                  <CodeBlock snippets={block.value}/>
                )}
                {block.type === 'connection' && (
                  <ConnectionBlock config={config} connection={block.value}/>
                )}
                {block.type === 'image' && (
                  <ImageBlock image={block.value} />
                )}
                {block.type === 'webhook' && (
                  <WebhookBlock webhook={block.value} />
                )}
              </div>
            ))}
          </BlocksWrapper>
          <Footer>
            <AstralLink href="https://astraldx.com">
              <Logo src="/astral.svg"/> Built with Astral DX
            </AstralLink>
          </Footer>
        </Container>
      </ThemeProvider>
    </FlowDataProvider>
  )
}
