import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const API_URL = "http://localhost:4000/api/chat";

function Chatbot() {
    const [messages, setMessages] = useState([
        { id: 1, role: "assistant", text: "Hi! I am your music recommender bot. Ask me for some music!" }
    ]);
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState("light");

    // Theme toggle effect
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const handleClearChat = () => {
        setMessages([
            { id: Date.now(), role: "assistant", text: "Chat cleared. What kind of music are you looking for now?" }
        ]);
    };

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
        <div className="flex flex-col w-full max-w-3xl h-[85vh] mx-auto border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 shadow-sm overflow-hidden font-sans">
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        Music Recommender
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleClearChat}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 shadow-sm transition-colors text-zinc-900 dark:text-zinc-100"
                        title="Clear Chat"
                        aria-label="Clear Chat"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 shadow-sm transition-colors text-zinc-900 dark:text-zinc-100"
                        title="Toggle theme"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                        )}
                    </button>
                </div>
            </div>
            <MessageList messages={messages} loading={loading} />
            <MessageInput onSend={handleSendMessage} loading={loading} />
        </div>
    );
}

export default Chatbot;
