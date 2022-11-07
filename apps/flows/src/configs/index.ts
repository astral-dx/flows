import { Flow, FlowsConfig } from '..'
import { config as rideshareco } from './rideshareco'

const getConfig = (configId: string | undefined): FlowsConfig | undefined => {
  if (configId === 'rideshareco') {
    return rideshareco
  }

  return undefined
}

const getFlow = (
  config: FlowsConfig | undefined,
  collectionId: string | undefined,
  flowId: string | undefined,
): Flow | undefined => {
  if (!config || !collectionId || !flowId) {
    return undefined
  }

  const collection = config.collections.find((collection) => collection.id === collectionId)

  if (collection) {
    return collection.flows.find((flow) => flow.id == flowId)
  }
}

export  {
  getConfig,
  getFlow,
}