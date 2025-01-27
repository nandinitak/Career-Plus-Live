// ask.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize the GoogleGenerativeAI instance only once
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Function to interact with Gemini 1.5 Flash model
 * @param {Object} req - The request object containing the prompt, token limit, and format.
 * @returns {Object|String} - The extracted response, either in JSON or plain text format.
 */
async function ask(req) {
  try {
    const { prompt, tokens, format } = req;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: tokens,
        responseMimeType: "application/json",
        temperature: 1,
      },
    });

    const result = await chat.sendMessage(prompt);
    return result.response.text();
    // console.log(result.response);
    // console.log(result.text);
    // console.log(result.text());
    // // Return the response in the desired format
    // if (format === "json") return JSON.parse(text);
    // return response;
  } catch (error) {
    console.error("Error with Generative AI:", error.message);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

module.exports = { ask };
