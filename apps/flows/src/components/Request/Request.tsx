import { FlowRequest } from '../..'
import { generate } from './generate'

const Request: React.FC<{ request: FlowRequest }> = ({ request }) => {
  const { query, body, response } = request

  const generatedQuery = query && generate(query.schema)
  const generatedBody = body && generate(body.schema)
  const generatedResponse = response && generate(response.schema)

  return (
    <>
      <pre>{ JSON.stringify(generatedQuery, null, 2) }</pre>
      <pre>{ JSON.stringify(generatedBody, null, 2) }</pre>
      <pre>{ JSON.stringify(generatedResponse, null, 2) }</pre>
    </>
  )
}

export default Request