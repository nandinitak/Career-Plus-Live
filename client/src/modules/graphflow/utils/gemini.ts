import { debug, userProvidedAPIKey } from "../constants";

import { GoogleGenerativeAI } from "@google/generative-ai";

interface ImportMetaEnv {
  VITE_REACT_APP_GEMINI_API_KEY: string;
}

declare global {
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}
``;

const genAI = new GoogleGenerativeAI(
  String("AIzaSyAcCM6i-Q8HXCcq4LNR7X4NHB9hNHxnqEs") as string
);

export const globalBestModelAvailable = "gemini-1.5-flash";

export type ModelForMagic = "gemini-1.5-flash" | "gemini-1.5-flash";

export const models = {
  smarter: globalBestModelAvailable as ModelForMagic,
  faster: globalBestModelAvailable as ModelForMagic,
};

const temperatures = {
  response: 0.7,
  parsing: 0.3,
};

export interface Prompt {
  role: "system" | "user" | "assistant";
  content: string;
}

export const getGeminiCompletion = async (
  prompts: Prompt[],
  model: ModelForMagic,
  temperature = temperatures.response,
  token = 1024
) => {
  console.log(`asking ${model}`, prompts);
  const Model = genAI.getGenerativeModel({
    model,
    generationConfig: {
      maxOutputTokens: token,
      temperature,
      topP: 1,
      candidateCount: 1,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
    },
  });

  const prompt = prompts
    .map(
      (entry) =>
        `${entry.role === "user" ? "User" : "Assistant"}: ${entry.content}`
    )
    .join("\n");

  const response = (await Model.generateContent(prompt)) as any;
  const data = await response;
  return data;
};

export const streamGeminiCompletion = async (
  prompts: Prompt[],
  model: ModelForMagic,
  streamFunction: (data: string, freshStream: boolean) => void,
  freshStream: boolean,
  temperature = temperatures.response,
  token = 2048
) => {
  console.log(`streaming ${model}`, prompts);

  const Model = genAI.getGenerativeModel({
    model,
    generationConfig: {
      maxOutputTokens: token,
      temperature,
      topP: 1,
      candidateCount: 1,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
    },
  });

  const prompt = prompts
    .map(
      (entry) =>
        `${entry.role === "user" ? "User" : "Assistant"}: ${entry.content}`
    )
    .join("\n");

  const response = (await Model.generateContentStream(prompt)) as any;

  try {
    for await (const chunk of response.stream) {
      const chunkText = chunk.text();
      if (chunkText?.length > 0) {
        streamFunction(chunkText, freshStream);
      }
    }
  } catch (error) {
    console.error("stream error", error);
  }

  return;
};

/* -------------------------------------------------------------------------- */

export const parseGeminiResponseToObjects = async (
  prompts: Prompt[],
  model: ModelForMagic,
  temperature = temperatures.parsing,
  token = 2048
) => {
  console.log(`parsing ${model}`, prompts);

  const Model = genAI.getGenerativeModel({
    model,
    generationConfig: {
      maxOutputTokens: token,
      temperature,
      topP: 1,
      candidateCount: 1,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
    },
  });

  const prompt = prompts
    .map(
      (entry) =>
        `${entry.role === "user" ? "User" : "Assistant"}: ${entry.content}`
    )
    .join("\n");
  try {
    const response = (await Model.generateContent(prompt)) as any;
    const data = await response;
    return data;
  } catch (error) {
    return {
      error: error,
    };
  }
};

/* -------------------------------------------------------------------------- */

export const getTextFromModelResponse = (response: any): string => {
  if (response.error) return "";
  return response.response?.text() ?? "";
};
