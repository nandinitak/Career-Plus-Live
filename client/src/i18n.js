import LocalizedStrings from "react-localization";

// Import translations
import en from "./locales/en.json";
import pa from "./locales/pa.json";

// Initialize localization with translations
const strings = new LocalizedStrings({
  en,
  pa,
});

// Export the `strings` object for use in components
export default strings;
