import { Flow, FlowsConfig } from '..'
import { config as rideshareco } from './rideshareco'
import { config as lendflow } from './lendflow'
import { config as cacheflow } from './cacheflow'

const getConfig = (configId: string | undefined): FlowsConfig | undefined => {
  if (configId === 'rideshareco') {
    return rideshareco
  } else if (configId === 'lendflow') {
    return lendflow
  } else if (configId === 'cacheflow') {
    return cacheflow
  }

  return undefined
}

const getFlow = (
  config: FlowsConfig | undefined,
  flowId: string | undefined,
): Flow | undefined => {
  if (!config || !flowId) {
    return undefined
  }

  return config.flows.find((flow) => flow.id === flowId)
}

export  {
  getConfig,
  getFlow,
}