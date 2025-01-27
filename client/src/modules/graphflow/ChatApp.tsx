import React, { createContext, useEffect, useState } from "react";

import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";

import { ChatContext } from "./components/Contexts";
import { Interchange } from "./components/Interchange";
import { newQuestionAndAnswer } from "./utils/chatUtils";
import {
  EdgeInformation,
  NodeInformation,
  RelationshipSaliency,
} from "./utils/responseProcessing";

// import the package.json file
import { Prompt } from "./utils/gemini";
import { ListDisplayFormat } from "./components/Answer";

import { userProvidedAPIKey } from "./constants";

export interface OriginRange {
  start: number;
  end: number;
  answerObjectId: string;
  nodeIds: string[];
}

export interface NodeEntityIndividual extends NodeInformation {
  // nodeLabel & id
  originRange: OriginRange;
  originText: string;
}

export interface NodeEntity {
  id: string;
  displayNodeLabel: string;
  pseudo: boolean;
  individuals: NodeEntityIndividual[];
}

export interface EdgeEntity extends EdgeInformation {
  // edgeLabel & edgePairs
  // id: string
  originRange: OriginRange;
  originText: string;
}

export interface AnswerSlideObject {
  content: string;
}

export type AnswerObjectEntitiesTarget = "originText" | "summary";

export interface SentenceInAnswer {
  originalText: string;
  offset: number;
  length: number;
}

// ! AnswerObject
export interface AnswerObject {
  id: string;
  originText: {
    content: string;
    nodeEntities: NodeEntity[];
    edgeEntities: EdgeEntity[];
  };
  summary: {
    content: string;
    nodeEntities: NodeEntity[];
    edgeEntities: EdgeEntity[];
  };
  slide: AnswerSlideObject;
  answerObjectSynced: {
    listDisplay: ListDisplayFormat;
    saliencyFilter: RelationshipSaliency;
    collapsedNodes: string[];
    sentencesBeingCorrected: SentenceInAnswer[];
  };
  complete: boolean;
}

interface ModelStatus {
  modelAnswering: boolean;
  modelParsing: boolean;
  modelAnsweringComplete: boolean;
  modelParsingComplete: boolean;
  modelError: boolean;
  modelInitialPrompts: Prompt[];
}

export interface QuestionAndAnswerSynced {
  answerObjectIdsHighlighted: string[]; // for highlight from text block to show partial graph
  answerObjectIdsHighlightedTemp: string[]; // for highlight from text block ON HOVER to show partial graph
  answerObjectIdsHidden: string[];
  highlightedCoReferenceOriginRanges: OriginRange[]; // for highlight text
  highlightedNodeIdsProcessing: string[]; // for highlight nodes when it is expanding
  saliencyFilter: RelationshipSaliency; // to filter edges
}

/* -------------------------------------------------------------------------- */

// ! QuestionAndAnswer
export interface QuestionAndAnswer {
  id: string;
  question: string;
  answer: string;
  answerObjects: AnswerObject[];
  modelStatus: ModelStatus;
  synced: QuestionAndAnswerSynced;
}

export interface PartialQuestionAndAnswer {
  id?: string;
  question?: string;
  answer?: string;
  answerObjects?: AnswerObject[];
  modelStatus?: Partial<ModelStatus>;
  synced?: Partial<QuestionAndAnswerSynced>;
}

export interface DebugModeContextType {
  debugMode: boolean;
  setDebugMode: (debugMode: boolean) => void;
}
export const DebugModeContext = createContext<DebugModeContextType>(
  {} as DebugModeContextType
);

export const ChatApp = ({ question }) => {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    QuestionAndAnswer[]
  >([]);

  const [debugMode, setDebugMode] = useState<boolean>(false);
  const [keyHidden, setKeyHidden] = useState<boolean>(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState<string>("AIzaSyAcCM6i-Q8HXCcq4LNR7X4NHB9hNHxnqEs");
  const [geminiKey, setGeminiKey] = useState<string>("AIzaSyAcCM6i-Q8HXCcq4LNR7X4NHB9hNHxnqEs");

  // componentDidMount
  useEffect(() => {
    if (questionsAndAnswers.length === 0)
      setQuestionsAndAnswers([newQuestionAndAnswer()]);
    else if (
      questionsAndAnswers[questionsAndAnswers.length - 1].answer.length > 0
    )
      setQuestionsAndAnswers((prevQuestionsAndAnswers) => [
        ...prevQuestionsAndAnswers,
        newQuestionAndAnswer(),
      ]);
  }, [questionsAndAnswers]);

  return (
    <ChatContext.Provider
      value={{
        questionsAndAnswersCount: questionsAndAnswers.length,
        setQuestionsAndAnswers,
      }}
    >
      <DebugModeContext.Provider value={{ debugMode, setDebugMode }}>
        <div className="chat-app">
          {geminiKey.length === 0 ? (
            <div className="interchange-item">
              <div className="openai-api-key-question-box question-item interchange-component">
                <textarea
                  className="question-textarea openai-api-key-textarea"
                  placeholder={`Gemini Key`}
                  rows={1}
                  value={geminiKeyInput}
                  onChange={(e) => {
                    setGeminiKeyInput(e.target.value);
                  }}
                  style={
                    geminiKeyInput.length > 0 && keyHidden
                      ? {
                          color: "transparent",
                          textShadow: "0 0 0.3rem rgba(0,0,0,0.5)",
                        }
                      : {}
                  }
                />

                <button
                  className="bar-button"
                  onClick={() => {
                    setKeyHidden(!keyHidden);
                  }}
                >
                  {keyHidden ? (
                    <VisibilityOffRoundedIcon />
                  ) : (
                    <VisibilityRoundedIcon />
                  )}
                </button>
                <button
                  className="bar-button"
                  onClick={() => {
                    setGeminiKey(geminiKeyInput);
                    userProvidedAPIKey.current = geminiKeyInput;
                  }}
                >
                  <FileUploadRoundedIcon />
                </button>
              </div>
            </div>
          ) : (
            questionsAndAnswers.map((questionAndAnswer, index) => (
              <Interchange
                key={`interchange-${questionAndAnswer.id}`}
                data={questionAndAnswer}
              />
            ))
          )}
        </div>
      </DebugModeContext.Provider>
    </ChatContext.Provider>
  );
};
