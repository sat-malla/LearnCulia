const express = require("express");
const supabase = require("../supabase");
const { getEmbedding } = require("../cohere");
const { chat } = require("../gemini");

const router = express.Router();

const SYSTEM_PROMPT = `You are a friendly assistant for LearnCulia, a math app designed to help people with dyscalculia conquer their math hurdles to achieve mathematical intelligence.
You help users understand dyscalculia, give tips on how to improve their mathematical skills to accomplish LearnCulia's games and challenges, and explain what users can do to improve their mathematical maturity.
Make sure to mention the name of the game or challenge when providing tips or explanations.
Also understand LearnCulia's functionality and features for both mobile and web, and use them to provide the best possible answer.
Answer only based on the provided context. If you don't know the answer, say so honestly.
Keep responses concise, friendly, kind, and encouraging.`;

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const embedding = await getEmbedding(message);

    const { data: chunks, error } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_count: 5,
    });

    if (error) throw error;

    const context = chunks.map((c) => c.content).join("\n\n");

    const prompt = `${SYSTEM_PROMPT}

Context:
${context}

User: ${message}
Assistant:`;

    const response = await chat(prompt);
    res.json({ response });
  } catch (err) {
    console.error(err);
    const isQuotaError = err.message?.includes("429") || err.message?.toLowerCase().includes("quota") || err.message?.toLowerCase().includes("resource exhausted");
    if (isQuotaError) {
      return res.status(429).json({ error: "The AI assistant is temporarily unavailable due to high demand. Please try again later. Thank you for your patience!" });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
