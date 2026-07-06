require("dotenv").config();
const express = require("express");
const cors = require("cors");

const ingestRouter = require("./src/routes/ingest");
const chatRouter = require("./src/routes/chat");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/ingest", ingestRouter);
app.use("/chat", chatRouter);

app.get("/health", (_, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`rag-backend running on port ${PORT}`));
