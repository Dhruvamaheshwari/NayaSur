import { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const API_URL = "http://localhost:4000/api/chat";

function Chatbot() {
    const [messages, setMessages] = useState([
        { id: 1, role: "assistant", text: "Hi! I am your music recommender bot. Ask me for some music!" }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), role: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setLoading(true);

        try {
            // Using native fetch, no axios
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: text }),
            });

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            const data = await response.json();

            const botMsg = { id: Date.now() + 1, role: "assistant", text: data.reply };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error(error);
            const errorMsg = { id: Date.now() + 1, role: "assistant", text: "Oops, something went wrong. Let's try again!" };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-2xl h-[80vh] mx-auto border border-gray-200 rounded-xl bg-gray-50 shadow-lg overflow-hidden font-sans">
            <div className="bg-slate-700 text-white p-4 text-center text-xl font-bold">
                🎵 NayaSur Music Recommender
            </div>
            <MessageList messages={messages} loading={loading} />
            <MessageInput onSend={handleSendMessage} loading={loading} />
        </div>
    );
}

export default Chatbot;
