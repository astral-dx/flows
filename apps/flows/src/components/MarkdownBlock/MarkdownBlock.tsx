import { replace } from "../../utilities/replace"
import { useFlowData } from "../useFlowData/useFlowData"

export const MarkdownBlock: React.FC<{ markdown: string }> = ({ markdown }) => {
  const { data } = useFlowData()

  return (
    <pre>{ replace(markdown, data) }</pre>
  )
}