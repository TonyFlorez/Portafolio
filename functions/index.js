import fetch from "node-fetch";
import cors from "cors";
import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: true })); // permitir cualquier origen
app.use(express.json());

// POST al root
app.post("/", async (req, res) => {
    console.log("Mensaje recibido:", req.body);
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "No hay mensaje" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Eres un asistente personal llamado 'ThonnyBot', que representa al desarrollador Anthonny Florez. Responde de forma amable y profesional.",
          },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
const botMessage = data.choices?.[0]?.message?.content || "No pude responder eso 😅";
res.json({ message: botMessage });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al conectar con OpenAI" });
  }
});

// Exportar la función para Firebase v2
export const chatbot = onRequest(app);
