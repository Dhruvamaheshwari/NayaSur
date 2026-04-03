<!-- @format -->

# 🎵 NayaSur Music Recommender

NayaSur Music Recommender is an AI-powered full-stack application that acts as your personal music assistant. Simply ask for a song recommendation (e.g., "Sad Punjabi songs", "Romantic Hindi music", or "Party English hits"), and the bot will provide tailored suggestions along with direct, clickable YouTube links.

## 🚀 Features

- **Smart AI Recommendations**: Powered by the highly advanced Llama-3.3-70b model via the Groq SDK.
- **Clickable YouTube Links**: Automatically formats song recommendations with markdown-parsed YouTube search links so you can listen instantly.
- **Focused Conversational Agent**: The chatbot is strictly instructed to only answer music-related queries, gracefully declining off-topic questions.
- **Modern UI**: A clean, responsive chat interface built with React and styled using Tailwind CSS.
- **Markdown Support**: Uses `react-markdown` to render bold text, lists, and links properly in the UI.

## 🛠️ Tech Stack

**Frontend**:

- React (Vite)
- Tailwind CSS
- `react-markdown` (for rendering chat responses)

**Backend**:

- Node.js
- Express.js
- `groq-sdk` (for AI processing)
- `cors` & `dotenv`

---

## ⚙️ Project Setup

### Prerequisites

- Node.js installed
- A free API key from [Groq](https://console.groq.com/)

### 1. Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your Groq API key:
   ```env
   PORT=4000
   GROQ_API_KEY=your_groq_api_key_here
   ```
4. Start the backend server:
   ```bash
   node index.js
   # or npm start if nodemon is configured
   ```
   _The server will run on `http://localhost:4000`_

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the provided `localhost` link in your browser to start chatting with the Music Recommender!

## 💡 Usage Example

**You**: "Give me an energetic English party song"  
**NayaSur**: "Here is a great party song for you:

- **Song**: Uptown Funk
- **Artist**: Mark Ronson ft. Bruno Mars
- [Listen on YouTube](https://www.youtube.com/results?search_query=Uptown+Funk+Mark+Ronson)  
  Enjoy the party!"

---

_Built with ❤️ utilizing the speed of Groq and React._
