import { useState } from "react";

function MessageInput({ onSend, loading }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !loading) {
            onSend(text);
            setText("");
        }
    };

    return (
        <form
            className="flex items-center gap-3 p-4 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl border-t border-white/20 dark:border-zinc-800/50"
            onSubmit={handleSubmit}
        >
            <div className="relative flex-1 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <input
                    className="relative flex h-12 w-full rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm px-4 py-2 text-sm shadow-inner transition-colors placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-100"
                    type="text"
                    placeholder="Type your music request here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={loading}
                />
            </div>
            <button
                className="relative inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 active:translate-y-0 h-12 px-6 py-2"
                type="submit"
                disabled={!text.trim() || loading}
            >
                <div className="flex items-center gap-2">
                    <span>Send</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                </div>
            </button>
        </form>
    );
}

export default MessageInput;
