import { createContext } from 'react'
import { QuestionAndAnswer } from '../ChatApp'

import { ModelForMagic } from '../utils/gemini'

export interface ChatContextType {
  questionsAndAnswersCount: number
  setQuestionsAndAnswers: (
    questionsAndAnswers:
      | QuestionAndAnswer[]
      | ((prev: QuestionAndAnswer[]) => QuestionAndAnswer[]),
  ) => void
}
export const ChatContext = createContext<ChatContextType>({} as ChatContextType)

/* -------------------------------------------------------------------------- */

export interface FlowContextType {
  metaPressed: boolean
  model: ModelForMagic
  selectedComponents: {
    nodes: string[]
    edges: string[]
  }
  initialSelectItem: {
    selected: boolean
    type: 'node' | 'edge'
    id: string
  }
  doSetNodesEditing: (nodeIds: string[], editing: boolean) => void
  doSetEdgesEditing: (edgeIds: string[], editing: boolean) => void
  selectNodes: (nodeIds: string[]) => void
  setModel: (model: ModelForMagic) => void
}
export const FlowContext = createContext<FlowContextType>({} as FlowContextType)
