const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const embeddingModel = genAI.getGenerativeModel({ model: "models/gemini-embedding-2" });
const chatModel = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

const getEmbedding = async (text) => {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
};

const chat = async (prompt) => {
  const result = await chatModel.generateContent(prompt);
  return result.response.text();
};

module.exports = { getEmbedding, chat };
