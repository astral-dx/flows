import { useEffect, useState } from 'react'

import { FlowRequest } from '../..'
import { useFlowData } from '../useFlowData/useFlowData'
import { generate } from '../../utilities/generate'

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
      <pre>{ JSON.stringify(data, null, 2) }</pre>
      <pre>{ JSON.stringify(generatedQuery, null, 2) }</pre>
      <pre>{ JSON.stringify(generatedBody, null, 2) }</pre>
      <pre>{ JSON.stringify(generatedResponse, null, 2) }</pre>
    </>
  )
}

export default RequestBlock