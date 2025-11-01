
/**
 * Validates if a language is supported by DeepL
 * @param langCode The language code to validate
 * @returns Boolean indicating if the language is supported
 */
export const isLanguageSupported = (langCode: string): boolean => {
  const supportedLanguages = [
    "BG", "CS", "DA", "DE", "EL", "EN", "ES", "ET", "FI", "FR", 
    "HU", "ID", "IT", "JA", "KO", "LT", "LV", "NB", "NL", "PL", 
    "PT", "RO", "RU", "SK", "SL", "SV", "TR", "UK", "ZH"
  ];
  
  return supportedLanguages.includes(langCode);
};

/**
 * Gets the list of supported languages for the UI
 * @returns Array of language objects with code and name
 */
export const getSupportedLanguages = () => [
  { code: "DE", name: "German" },
  { code: "EN", name: "English" },
  { code: "ES", name: "Spanish" },
  { code: "FR", name: "French" },
  { code: "IT", name: "Italian" },
  { code: "JA", name: "Japanese" },
  { code: "NL", name: "Dutch" },
  { code: "PL", name: "Polish" },
  { code: "PT", name: "Portuguese" },
  { code: "RU", name: "Russian" },
  { code: "ZH", name: "Chinese" }
];
