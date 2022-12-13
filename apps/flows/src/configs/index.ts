import { Flow, FlowsConfig } from '..'
import { config as rideshareco } from './rideshareco'
import { config as lendflow } from './lendflow'

const getConfig = (configId: string | undefined): FlowsConfig | undefined => {
  if (configId === 'rideshareco') {
    return rideshareco
  } else if (configId === 'lendflow') {
    return lendflow
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