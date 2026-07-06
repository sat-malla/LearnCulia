const express = require("express");
const fs = require("fs");
const path = require("path");
const supabase = require("../supabase");
const { getEmbedding } = require("../gemini");

const router = express.Router();

const chunkText = (text, chunkSize = 500, overlap = 50) => {
  const words = text.split(" ");
  const chunks = [];
  let i = 0;
  while (i < words.length) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    chunks.push(chunk);
    i += chunkSize - overlap;
  }
  return chunks;
};

router.post("/", async (req, res) => {
  try {
    const docsDir = path.join(__dirname, "../../documents");
    const files = fs.readdirSync(docsDir);

    const supported = files.filter((f) => f.endsWith(".txt") || f.endsWith(".md"));

    if (supported.length === 0) {
      return res.status(400).json({ error: "No .txt or .md documents found in /documents folder." });
    }

    let totalChunks = 0;

    for (const file of supported) {
      const filePath = path.join(docsDir, file);
      const text = fs.readFileSync(filePath, "utf-8");
      const chunks = chunkText(text);

      for (const chunk of chunks) {
        const embedding = await getEmbedding(chunk);
        const { error } = await supabase.from("documents").insert({
          content: chunk,
          metadata: { source: file },
          embedding,
        });
        if (error) throw new Error(`Supabase insert error: ${error.message}`);
        totalChunks++;
      }
    }

    res.json({ success: true, totalChunks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
