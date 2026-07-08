const getEmbedding = async (text) => {
  const response = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({ model: "voyage-3-lite", input: [text] }),
  });
  const data = await response.json();
  return data.data[0].embedding;
};

module.exports = { getEmbedding };
