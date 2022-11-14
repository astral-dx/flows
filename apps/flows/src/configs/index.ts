import { Flow, FlowCollection, FlowsConfig, FlowStep } from '..'
import { config as rideshareco } from './rideshareco'

const getConfig = (configId: string | undefined): FlowsConfig | undefined => {
  if (configId === 'rideshareco') {
    return rideshareco
  }

  return undefined
}

const getFlowStep = (
  config: FlowsConfig | undefined,
  collectionId: string | undefined,
  flowId: string | undefined,
  stepId: string | undefined,
): {
  collection: FlowCollection | undefined,
  flow: Flow | undefined,
  step: FlowStep | undefined,
} => {
  if (!config || !collectionId || !flowId) {
    return {
      collection: undefined,
      flow: undefined,
      step: undefined,
    }
  }

  const collection = config.collections.find((collection) => collection.id === collectionId)

  if (!collection) {
    return {
      collection: undefined,
      flow: undefined,
      step: undefined,
    }
  }

  const flow = collection.flows.find((flow) => flow.id === flowId)
  let step = flow ? flow.steps.find((step) => step.id === stepId) : undefined

  if (flow && !step) {
    step = flow.steps[0]
  }

  return { collection, flow, step }
  
}

export  {
  getConfig,
  getFlowStep,
}