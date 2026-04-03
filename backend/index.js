/** @format */

const express = require("express");
const app = express();
require("dotenv").config();

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
                    * Always include a YouTube link for the song (e.g., https://www.youtube.com/results?search_query=Song+Name+Artist).
                    * You do not need to create files or run terminal commands. Just respond with text.
                    `,
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
    console.log(message.content);
    return message.content;
  } catch (e) {
    console.log("An API error occurred: ", e.message);
  }
}

async function main() {
  console.log("i am Glider : let's recommend some music");

  const rl = require("readline/promises").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = async () => {
    try {
      const userProblem = await rl.question("Ask me anything -> ");
      await runAgent(userProblem);

      // Call askQuestion again after answering
      askQuestion();
    } catch (err) {
      console.error(err);
      rl.close();
    }
  };

  askQuestion();
}
main();

// healt route

//app.listen(port, () => console.log(`server is running on port ${port}`));
