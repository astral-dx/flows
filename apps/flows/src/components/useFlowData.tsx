import React, { createContext, useContext, useState } from "react"
import flatten from 'flat'

import { FlowConstant, FlowEnvironment } from ".."

export type FlowData = Record<string, unknown>

interface FlowDataContextValue {
  data: FlowData;
  environments: Array<FlowEnvironment>;
  addFlowData: (record: FlowData) => void;
}

const FlowDataContext = createContext<FlowDataContextValue>({
  data: {},
  environments: [],
  addFlowData: () => {},
})

export const FlowDataProvider: React.FC<{
  children: JSX.Element,
  constants: Array<FlowConstant>,
  environments: Array<FlowEnvironment>,
}> = ({ children, constants, environments }) => {
  const [ data, setData ] = useState<FlowData>(constants.reduce((a, c) => {
    a[c.referenceBy] = c.value
    return a
  }, {} as FlowData))

  const addFlowData = (record: FlowData) => {
      setData({
      ...data,
      ...flatten(record),
    })
  }

  return (
    <FlowDataContext.Provider value={{ data, addFlowData, environments }}>
      { children }
    </FlowDataContext.Provider>
  )
}

export const useFlowData = () => {
  const state = useContext(FlowDataContext)
  return state
}