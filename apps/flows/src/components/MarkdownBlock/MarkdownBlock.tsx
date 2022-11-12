import Markdown from 'react-markdown'

import { replace } from '../../utilities/replace'
import { useFlowData } from '../useFlowData/useFlowData'

export const MarkdownBlock: React.FC<{ markdown: string }> = ({ markdown }) => {
  const { data } = useFlowData()

  return (
    <Markdown>{ replace(markdown, data) }</Markdown>
  )
}