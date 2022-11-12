import { CopyBlock, dracula } from 'react-code-blocks'

import { FlowCodeSnippet } from '../..'
import { replace } from '../../utilities/replace'
import { useFlowData } from '../useFlowData/useFlowData'

export const CodeBlock: React.FC<{ snippets: Array<FlowCodeSnippet> }> = ({ snippets }) => {
  const { data } = useFlowData()

  return (
    <CopyBlock
      text={ replace(snippets[0].code, data) }
      language={ snippets[0].language }
      theme={ dracula }
    />
  )
}