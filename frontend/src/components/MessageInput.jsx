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
            className="flex items-center gap-2 p-4 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800"
            onSubmit={handleSubmit}
        >
            <input
                className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-100"
                type="text"
                placeholder="Type your music request here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={loading}
            />
            <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 shadow-sm h-10 px-4 py-2"
                type="submit"
                disabled={!text.trim() || loading}
            >
                Send
            </button>
        </form>
    );
}

export default MessageInput;
