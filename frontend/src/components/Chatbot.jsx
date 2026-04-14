import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const API_URL = "http://localhost:4000/api/chat";

const SUGGESTED_PROMPTS = [
    {
        icon: "🏋️‍♂️",
        title: "Workout Mix",
        text: "Suggest some high-energy, upbeat electronic and hip-hop songs for a sweaty gym session."
    },
    {
        icon: "📚",
        title: "Deep Focus",
        text: "I need a relaxing lo-fi beats and ambient music playlist for long study hours."
    },
    {
        icon: "🌅",
        title: "Morning Vibes",
        text: "Give me some acoustic and mellow indie songs to start an easy Sunday morning."
    },
    {
        icon: "🔥",
        title: "Trending Hits",
        text: "What are some of the most popular global pop and trending songs right now?"
    }
];

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
        if (!text.trim() || loading) return;

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
        <div className="flex w-full max-w-5xl h-[85vh] mx-auto border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-2xl overflow-hidden font-sans">
            {/* Sidebar with Suggestions */}
            <div className="hidden md:flex w-72 flex-col border-r border-zinc-200/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/40 p-4 overflow-y-auto">
                <div className="mb-6 mt-2 px-1">
                    <h2 className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400 mb-2">
                        Get Inspired
                    </h2>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Don't know what to ask? Try one of these suggestions to kick off a great playlist.
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    {SUGGESTED_PROMPTS.map((prompt, i) => (
                        <button
                            key={i}
                            onClick={() => handleSendMessage(prompt.text)}
                            disabled={loading}
                            className="group flex flex-col text-left p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/50 bg-white/60 dark:bg-zinc-800/60 hover:bg-white dark:hover:bg-zinc-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none"
                        >
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-lg">{prompt.icon}</span>
                                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {prompt.title}
                                </span>
                            </div>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug line-clamp-2 pr-2">
                                "{prompt.text}"
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50">
                    <div className="flex items-center gap-3">
                        <div className="flex items-end justify-center gap-0.5 h-4 w-4 overflow-hidden">
                            <span className="w-1 h-3 bg-indigo-500 rounded-sm equalize-1"></span>
                            <span className="w-1 h-4 bg-purple-500 rounded-sm equalize-2"></span>
                            <span className="w-1 h-2 bg-pink-500 rounded-sm equalize-3"></span>
                        </div>
                        <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-pink-400">
                            NayaSur Music
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
        </div>
    );
}

export default Chatbot;
