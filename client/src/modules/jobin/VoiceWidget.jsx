import React, { useEffect, useState, useCallback, useRef } from "react";

import { BuiltInKeyword } from "@picovoice/porcupine-web";
import { usePorcupine } from "@picovoice/porcupine-react";

import porcupineModel from "./lib/porcupineModel";
import porcupineKeywords from "./lib/porcupineKeywords";
import { Button } from "@/components/ui/button";
const ACCESS_KEY = import.meta.env.VITE_PICOVOICE_ACCESS_KEY;

if (
  porcupineKeywords.length === 0 &&
  porcupineModel.publicPath.endsWith("porcupine_params_hi.pv")
) {
  for (const k in BuiltInKeyword) {
    // @ts-ignore
    porcupineKeywords.push({ builtin: k });
  }
}

export default function VoiceWidget() {
  const [keywordDetections, setKeywordDetections] = useState([]);
  const [keyword, setKeyword] = useState(porcupineKeywords[0]);

  const accessKeyRef = useRef(ACCESS_KEY);

  const {
    keywordDetection,
    isLoaded,
    isListening,
    error,
    init,
    start,
    stop,
    release,
  } = usePorcupine();

  const initEngine = useCallback(async () => {
    if (accessKeyRef.current.length === 0) {
      return;
    }

    await init(accessKeyRef.current, [keyword], porcupineModel);
  }, [init, keyword]);

  const setSelectedKeyword = (e) => {
    const selected = e.target.value;
    for (const k of porcupineKeywords) {
      if (k.label === selected || k.builtin === selected) {
        setKeyword(k);
        return;
      }
    }
  };

  useEffect(() => {
    const changeKeyword = async () => {
      await release();
      await initEngine();
    };

    changeKeyword();
  }, [initEngine, release]);

  useEffect(() => {
    if (keywordDetection !== null) {
      setKeywordDetections((oldVal) => [...oldVal, keywordDetection.label]);
      console.log("hello");
    }
  }, [keywordDetection]);

  return (
    <div className="voice-widget">
      <h3>Loaded: {JSON.stringify(isLoaded)}</h3>
      <h3>Listening: {JSON.stringify(isListening)}</h3>
      <h3>Error: {JSON.stringify(error !== null)}</h3>
      {error && <p className="error-message">{error.toString()}</p>}
      <h3>
        <label>Keyword: </label>
        <select
          value={keyword.label ?? keyword.builtin}
          onChange={(e) => setSelectedKeyword(e)}
        >
          {porcupineKeywords.map((k) => (
            <option key={k.label ?? k.builtin} value={k.label ?? k.builtin}>
              {k.label ?? k.builtin}
            </option>
          ))}
        </select>
      </h3>
      <br />
      <Button
        onClick={() => start()}
        disabled={error !== null || !isLoaded || isListening}
      >
        Start
      </Button>
      <Button
        onClick={() => stop()}
        disabled={error !== null || !isLoaded || !isListening}
      >
        Stop
      </Button>
      <Button onClick={() => release()} disabled={error !== null || !isLoaded}>
        Release
      </Button>
      <h3>Keyword Detections:</h3>
      {keywordDetections.length > 0 && (
        <ul>
          {keywordDetections.map((label, index) => (
            <li key={index}>{label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
