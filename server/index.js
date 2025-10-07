import { HashbrownOpenAI } from "@hashbrownai/openai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());
app.use(express.json());

// https://hashbrown.dev/docs/react/platform/openai
app.post("/chat", async (req, res) => {
  console.log("openapi key:", process.env.OPENAI_API_KEY);
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OpenAI API key not configured" });
  }

  const stream = HashbrownOpenAI.stream.text({
    apiKey: process.env.OPENAI_API_KEY,
    request: req.body, // must be Chat.Api.CompletionCreateParams
  });

  res.header("Content-Type", "application/octet-stream");

  for await (const chunk of stream) {
    res.write(chunk); // Pipe each encoded frame as it arrives
  }

  res.end();
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});
