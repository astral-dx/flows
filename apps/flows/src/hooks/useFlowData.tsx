import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react"
import _merge from 'lodash/merge'

import { FlowConstant, FlowEnvironment, Json } from ".."

export type FlowData = Record<string, Json>;

interface FlowGlobalContextInstance {
  request?: {
    body?: Record<string, Json>;
    headers?: Record<string, Json>;
    query?: Record<string, Json>;
    path?: Record<string, Json>;
  }
  response?: {
    body?: Record<string, Json>;
    headers?: Record<string, Json>;
  }
}

export type FlowGlobalContext ={
  constants: Record<string, Json>
  ref?: Record<string, FlowGlobalContextInstance>
}

interface FlowDataContextValue {
  data: FlowGlobalContext;
  environments: Array<FlowEnvironment>;
  activeEnvironment?: FlowEnvironment;
  addFlowData: (ref: string, record: FlowGlobalContextInstance) => void;
  setActiveEnvironment: (envId: string) => void;
  requestDataDisplayMode: 'json' | 'textFields';
  setRequestDataDisplayMode: Dispatch<SetStateAction<'json' | 'textFields'>>;
}

const FlowDataContext = createContext<FlowDataContextValue>({
  data: {
    constants: {}
  },
  environments: [],
  activeEnvironment: undefined,
  addFlowData: () => {},
  setActiveEnvironment: () => {},
  requestDataDisplayMode: 'textFields',
  setRequestDataDisplayMode: () => {},
})

export const FlowDataProvider: React.FC<{
  children: JSX.Element,
  constants: Array<FlowConstant>,
  environments: Array<FlowEnvironment>,
}> = ({ children, constants, environments }) => {
  const [ data, setData ] = useState<FlowGlobalContext>({
    constants: constants.reduce((acc, cur) => ({ ...acc, [cur.referenceBy]: cur.value }), {})
  })

  const [requestDataDisplayMode, setRequestDataDisplayMode] = useState<'json' | 'textFields'>('textFields')

  const [activeEnvironment, setActiveEnvironmentData] = useState(environments[0])

  const addFlowData = (ref: string, record: FlowGlobalContextInstance) => {
    setData((d) => ({
      ...d,
      ref: {
        ...d.ref,
        [ref]: _merge(d.ref ? d.ref[ref] || {} : {}, record),
      }
    }))
  }

  const setActiveEnvironment = (envId: string) => {
    const env = environments.find(x => x.id === envId)

    if (!env) {
      throw new Error('Invalid environment')
    }

    setActiveEnvironmentData(env)
  }

  return (
    <FlowDataContext.Provider value={{ data, addFlowData, environments, activeEnvironment, setActiveEnvironment, requestDataDisplayMode, setRequestDataDisplayMode }}>
      { children }
    </FlowDataContext.Provider>
  )
}

export const useFlowData = () => {
  const state = useContext(FlowDataContext)
  return state
}