import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();
export const useSettings = () => useContext(SettingsContext);

// Provider component
export const SettingsProvider = ({ children }) => {
  const [volume, setVolume] = useState(0.5); // Default volume level (0 to 1)
  const updateVolume = (newVolume) => setVolume(newVolume);

  return (
    <SettingsContext.Provider value={{ volume, updateVolume }}>
      {children}
    </SettingsContext.Provider>
  );
};
