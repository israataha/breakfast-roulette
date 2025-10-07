import { HashbrownOpenAI } from "@hashbrownai/openai";
import cors from "cors";
import dotenv from "dotenv";
import express, { Router } from "express";
import serverless from "serverless-http";

dotenv.config();

const api = express();
const router = Router();

api.use(cors());
api.use(express.json());

// https://hashbrown.dev/docs/react/platform/openai
router.post("/chat", async (req, res) => {
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

router.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

api.use("/api/", router);

export const handler = serverless(api);
