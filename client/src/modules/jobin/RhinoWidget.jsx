import { useState } from "react";
import { useRhino } from "@picovoice/rhino-react";

import rhinoModel from "./lib/rhinoModel";
import rhinoContext from "./lib/rhinoContext";
const ACCESS_KEY = import.meta.env.VITE_PICOVOICE_ACCESS_KEY;
export default function VoiceWidget() {
  const [accessKey, setAccessKey] = useState(ACCESS_KEY);

  const {
    inference,
    contextInfo,
    isLoaded,
    isListening,
    error,
    init,
    process,
    release,
  } = useRhino();

  const rhnInit = async () => {
    await init(accessKey, rhinoContext, rhinoModel);
  };

  const rhnProcess = async () => {
    await process();
  };

  const rhnRelease = async () => {
    await release();
  };

  return (
    <div className="voice-widget">
      <h2>VoiceWidget</h2>
      <h3>
        <label>
          GenKey obtained from{" "}
          <input
            type="text"
            name="accessKey"
            onChange={(value) => setAccessKey(value.target.value)}
            disabled={isLoaded}
          />
        </label>
        <button
          className="start-button"
          onClick={() => rhnInit()}
          disabled={isLoaded || accessKey.length === 0}
        >
          Init Model
        </button>
      </h3>
      <h3>Model Loaded: {JSON.stringify(isLoaded)}</h3>
      <h3>Listening: {JSON.stringify(isListening)}</h3>
      <h3>Error: {JSON.stringify(error !== null)}</h3>
      {error && accessKey && <p className="error-message">{error.message}</p>}

      <br />
      <button
        onClick={() => rhnProcess()}
        disabled={error !== null || !isLoaded || isListening}
      >
        Process
      </button>
      <button
        onClick={() => rhnRelease()}
        disabled={error !== null || !isLoaded || isListening}
      >
        Release
      </button>

      <h3>Inference:</h3>
      {inference && <pre>{JSON.stringify(inference, null, 2)}</pre>}
      <hr />
      <h3>Context Info:</h3>
      <pre>{contextInfo}</pre>
    </div>
  );
}
