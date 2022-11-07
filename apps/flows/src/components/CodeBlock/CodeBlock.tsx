import { FlowCodeSnippet } from "../.."
import { replace } from "../../utilities/replace"
import { useFlowData } from "../useFlowData/useFlowData"

export const CodeBlock: React.FC<{ snippets: Array<FlowCodeSnippet> }> = ({ snippets }) => {
  const { data } = useFlowData()

  return (
    <pre>
      { snippets.map((snippet) => (
        <span>{ replace(snippet.code, data) }</span>
      )) }
    </pre>
  )
}