/** @format */

const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

const Groq = require("groq-sdk");
// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const History = [
  {
    role: "system",
    content: `You are an expert music recommender chatbot.

                    Your job is to recommend songs to the user based on their input. 
                    You must understand whether they are asking for Hindi, English, Punjabi, or any other type of songs and provide excellent recommendations.

                    ---

                    ## YOUR RESPONSIBILITIES:

                    1. Analyze the user's music taste or request (e.g., "Give me a sad Punjabi song", "Party English songs", "Romantic Hindi music").
                    2. Provide the song name, artist name, and a YouTube search link or watch link so the user can easily listen to it.
                    3. Keep your answers concise, well-formatted, and friendly.
                    
                    ---

                    ## OUTPUT RULES:

                    * Format your output clearly (e.g., using bullet points).
                    * Always include a clickable YouTube link for the song formatted in Markdown (e.g., [Listen on YouTube](https://www.youtube.com/results?search_query=Song+Name+Artist)).
                    * You do not need to create files or run terminal commands. Just respond with text.                   
                    * If the user asks anything unrelated to music or songs, politely decline and remind them that you are only a music recommender chatbot.                `,
  },
];

async function runAgent(userProblem) {
  History.push({
    role: "user",
    content: userProblem,
  });

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: History,
    });

    const message = response.choices[0].message;

    History.push({
      role: "assistant",
      content: message.content,
    });
    return message.content;
  } catch (e) {
    console.log("An API error occurred: ", e.message);
  }
}

// Chat route
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }
    const reply = await runAgent(userMessage);
    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// health route
app.get("/", (req, res) => {
  res.send("helo jee");
});

app.listen(port, () => console.log(`server is running on port ${port}`));
