import React, { createContext, useContext, useState } from "react"

import { FlowConstant, FlowEnvironment, Json } from ".."

export type FlowData = Record<string, Json>;

interface FlowGlobalContextInstance {
  body: Record<string, Json>;
  headers: Record<string, Json>;
}

export type FlowGlobalContext ={
  constants: Record<string, Json>
  responses?: Record<string, FlowGlobalContextInstance>
}

interface FlowDataContextValue {
  data: FlowGlobalContext;
  environments: Array<FlowEnvironment>;
  activeEnvironment?: FlowEnvironment;
  addFlowData: (ref: string, record: FlowGlobalContextInstance) => void;
  setActiveEnvironment: (envId: string) => void;
}

const FlowDataContext = createContext<FlowDataContextValue>({
  data: {
    constants: {}
  },
  environments: [],
  activeEnvironment: undefined,
  addFlowData: () => {},
  setActiveEnvironment: () => {}
})

export const FlowDataProvider: React.FC<{
  children: JSX.Element,
  constants: Array<FlowConstant>,
  environments: Array<FlowEnvironment>,
}> = ({ children, constants, environments }) => {
  const [ data, setData ] = useState<FlowGlobalContext>({
    constants: constants.reduce((acc, cur) => ({ ...acc, [cur.referenceBy]: cur.value }), {})
  })

  const [activeEnvironment, setActiveEnvironmentData] = useState(environments[0]);

  const addFlowData = (ref: string, record: FlowGlobalContextInstance) => {
    setData((d) => ({
      ...d,
      responses: {
        ...d.responses,
        [ref]: record
      }
    }))
  }

  const setActiveEnvironment = (envId: string) => {
    const env = environments.find(x => x.id === envId)

    if (!env) {
      throw new Error('Invalid evironment')
    }

    setActiveEnvironmentData(env)
  }

  return (
    <FlowDataContext.Provider value={{ data, addFlowData, environments, activeEnvironment, setActiveEnvironment }}>
      { children }
    </FlowDataContext.Provider>
  )
}

export const useFlowData = () => {
  const state = useContext(FlowDataContext)
  return state
}