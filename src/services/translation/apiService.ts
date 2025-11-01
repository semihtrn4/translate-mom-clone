
// DeepL API endpoint (using the free API endpoint)
const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

/**
 * Gets the DeepL API key from localStorage or returns the default one
 * @returns The DeepL API key
 */
export const getDeepLApiKey = () => {
  const storedKey = localStorage.getItem('deepl_api_key');
  // If there's no stored key, use the default one
  return storedKey || "585cfc6c-ff54-47cd-a2c3-3e8e449e559d";
};

/**
 * Sets the DeepL API key in localStorage
 * @param apiKey The DeepL API key to store
 */
export const setDeepLApiKey = (apiKey: string) => {
  localStorage.setItem('deepl_api_key', apiKey);
};

/**
 * Tests the DeepL API connection with the current API key
 * @returns Promise that resolves to true if connection is successful
 */
export const testDeepLConnection = async (): Promise<boolean> => {
  try {
    const apiKey = getDeepLApiKey();
    
    if (!apiKey) {
      return false;
    }
    
    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `DeepL-Auth-Key ${apiKey}`
      },
      body: JSON.stringify({
        text: ["Hello"],
        target_lang: "FR"
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error("DeepL connection test failed:", error);
    return false;
  }
};

// Import getRealisticMockTranslation directly instead of using require
import { getRealisticMockTranslation } from './mockService';

/**
 * Makes an API call to DeepL to translate the provided texts
 * @param textsToTranslate Array of texts to translate
 * @param targetLang Target language code
 * @returns Translation response or null if the call fails
 */
export const callDeepLAPI = async (
  textsToTranslate: string[],
  targetLang: string
): Promise<any | null> => {
  try {
    const apiKey = getDeepLApiKey();
    
    if (!apiKey) {
      console.error("No DeepL API key found");
      throw new Error("DeepL API key is not set. Please set your API key first.");
    }
    
    // Validate input
    if (!textsToTranslate || textsToTranslate.length === 0) {
      console.error("No texts to translate");
      throw new Error("No texts to translate");
    }

    console.log(`Translating ${textsToTranslate.length} segments to ${targetLang} using DeepL API`);
    console.log("Texts to translate:", textsToTranslate);
    
    // Check for empty texts and filter them out
    const validTexts = textsToTranslate.filter(text => text && text.trim() !== '');
    if (validTexts.length === 0) {
      console.error("All texts are empty");
      throw new Error("All texts are empty");
    }
    
    // Mock response for testing in development
    // This uses direct import instead of require for ES modules compatibility
    if (process.env.NODE_ENV === 'development') {
      console.log("Using mock translation service in development mode");
      return getMockTranslationResponse(validTexts, targetLang);
    }
    
    // Use try-catch specifically for the fetch operation
    try {
      const response = await fetch(DEEPL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `DeepL-Auth-Key ${apiKey}`
        },
        body: JSON.stringify({
          text: validTexts,
          target_lang: targetLang
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("DeepL API error response:", errorText);
        
        if (response.status === 401 || response.status === 403) {
          throw new Error("Authorization failed. Please check your DeepL API key.");
        } else if (response.status === 429) {
          throw new Error("DeepL API quota exceeded. Please try again later.");
        } else {
          throw new Error(`DeepL API error: ${response.status} ${response.statusText}`);
        }
      }
      
      const data = await response.json();
      console.log("Translation response received:", data);
      return data;
    } catch (fetchError) {
      console.error("Fetch operation failed:", fetchError);
      throw new Error("Network error while connecting to the translation service.");
    }
    
  } catch (error) {
    console.error("API call error:", error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};

/**
 * Generate a realistic mock translation response for development purposes
 */
const getMockTranslationResponse = (texts: string[], targetLang: string) => {
  // Create a mock response structure that matches the DeepL API response
  const translations = texts.map(text => ({
    text: getRealisticMockTranslation(text, targetLang),
    detected_source_language: "EN"
  }));
  
  return {
    translations
  };
};
