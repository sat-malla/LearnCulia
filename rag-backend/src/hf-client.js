const getEmbedding = async (text) => {
  const response = await fetch("https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
    },
    body: JSON.stringify({ inputs: text }),
  });
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error(`HuggingFace error: ${JSON.stringify(data)}`);
  return Array.isArray(data[0]) ? data[0] : data;
};

module.exports = { getEmbedding };
