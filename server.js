
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

let gameHistory = [];

app.post("/start", async (req, res) => {

  gameHistory = [];

  const response = await openai.chat.completions.create({
    model: "gemini-2.5-pro",
    messages: [{
      role: "system",
      content: "Eres AKINATOR GOD EDITION. Inteligencia suprema estratégica. Haz la mejor primera pregunta posible."
    }]
  });

  res.json({ question: response.choices[0].message.content });
});

app.post("/answer", async (req, res) => {

  const userAnswer = req.body.answer;
  gameHistory.push(`Jugador: ${userAnswer}`);

  const response = await openai.chat.completions.create({
    model: "gemini-2.5-pro",
    messages: [{
      role: "system",
      content: `Eres AKINATOR GOD EDITION.
      Analiza profundamente este historial:
      ${gameHistory.join("\n")}
      Haz UNA pregunta ultra estratégica.`
    }]
  });

  res.json({ question: response.choices[0].message.content });
});

app.post("/guess", async (req, res) => {

  const response = await openai.chat.completions.create({
    model: "gemini-2.5-pro",
    messages: [{
      role: "system",
      content: `Basado en este historial:
      ${gameHistory.join("\n")}
      Haz una suposición final contundente.`
    }]
  });

  gameHistory = [];

  res.json({ guess: response.choices[0].message.content });
});

app.listen(3000, () => {
  console.log("AKINATOR GOD EDITION corriendo en puerto 3000");
});
