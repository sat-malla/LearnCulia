const express = require("express");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
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

router.post("/", async (res) => {
  try {
    const docsDir = path.join(__dirname, "../../documents");
    const files = fs.readdirSync(docsDir);

    if (files.length === 0) {
      return res.status(400).json({ error: "No documents found in /documents folder. Insert documents in the /documents folder." });
    }

    let totalChunks = 0;

    for (const file of files) {
      const filePath = path.join(docsDir, file);
      let text = "";

      if (file.endsWith(".pdf")) {
        const buffer = fs.readFileSync(filePath);
        const parsed = await pdfParse(buffer);
        text = parsed.text;
      } else if (file.endsWith(".txt")) {
        text = fs.readFileSync(filePath, "utf-8");
      } else {
        continue;
      }

      const chunks = chunkText(text);

      for (const chunk of chunks) {
        const embedding = await getEmbedding(chunk);
        await supabase.from("documents").insert({
          content: chunk,
          metadata: { source: file },
          embedding,
        });
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
