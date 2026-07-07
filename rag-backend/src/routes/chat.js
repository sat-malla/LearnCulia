const express = require("express");
const supabase = require("../supabase");
const { getEmbedding } = require("../cohere");
const { chat } = require("../llama");

const router = express.Router();

const SYSTEM_PROMPT = `You are a friendly assistant for LearnCulia called CuliaBot, a math app designed to help people with dyscalculia conquer their math hurdles to achieve mathematical intelligence.
You help users understand dyscalculia, give tips on how to improve their mathematical skills to accomplish LearnCulia's games and challenges, and explain what users can do to improve their mathematical maturity.
Make sure to mention the name of the game or challenge when providing tips or explanations.
Also understand LearnCulia's functionality and features for both mobile and web, and use them to provide the best possible answer. Note that challenge mode CANNOT be played until AFTER the user has completed the normal mode of the game.
Answer only based on the provided context. If you don't know the answer, say so honestly.
Keep responses concise, friendly, kind, and encouraging.
IMPORTANT: You are a text-only assistant. You cannot see the user's screen, control the app, trigger any actions, or interact with any part of the app directly. Never pretend you can see the screen or run app functions. If a user wants to play a game, tell them exactly which screen to navigate to in the app.`;

router.post("/", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const embedding = await getEmbedding(message);

    const { data: chunks, error } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_count: 5,
    });

    if (error) throw error;

    const context = chunks.map((c) => c.content).join("\n\n");

    const conversationHistory = (history || [])
      .slice(-10)
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`)
      .join("\n");

    const prompt = `${SYSTEM_PROMPT}

Context:
${context}

${conversationHistory ? `Conversation so far:\n${conversationHistory}\n` : ""}User: ${message}
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
