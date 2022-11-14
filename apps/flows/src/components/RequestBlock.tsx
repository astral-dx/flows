import { useEffect, useState } from 'react'

import { FlowRequest } from '..'
import { useFlowData } from './useFlowData'
import { generate } from '../utilities/generate'

const RequestBlock: React.FC<{ request: FlowRequest }> = ({ request }) => {
  const { addFlowData, data } = useFlowData()

  const { query, body, response } = request

  const [generatedQuery, setGeneratedQuery] = useState<Record<string, unknown> | undefined>()
  const [generatedBody, setGeneratedBody] = useState<Record<string, unknown> | undefined>()
  const [generatedResponse, setGeneratedResponse] = useState<Record<string, unknown> | undefined>()

  useEffect(() => {
    setGeneratedQuery(query && generate(query.schema, query.referenceBy, addFlowData))
    setGeneratedBody(body && generate(body.schema, body.referenceBy, addFlowData))
    setGeneratedResponse(response && generate(response.schema, response.referenceBy, addFlowData))
  }, [query, body, response])

  return (
    <>
      <div>{ JSON.stringify(data, null, 2) }</div>
      <div>{ JSON.stringify(generatedQuery, null, 2) }</div>
      <div>{ JSON.stringify(generatedBody, null, 2) }</div>
      <div>{ JSON.stringify(generatedResponse, null, 2) }</div>
    </>
  )
}

export default RequestBlock