import { CopyBlock, dracula } from 'react-code-blocks'

import { FlowCodeSnippet } from '../..'
import { replace } from '../../utilities/replace'
import { useFlowData } from '../useFlowData/useFlowData'

export const CodeBlock: React.FC<{ snippets: Array<FlowCodeSnippet> }> = ({ snippets }) => {
  const { data } = useFlowData()

  return (
    <pre>
      { snippets.map((snippet) => (
        <CopyBlock
          text={ replace(snippet.code, data) }
          language={ snippet.language }
          theme={ dracula }
        />
      )) }
      {/* <div /> */}
    </pre>
  )
}