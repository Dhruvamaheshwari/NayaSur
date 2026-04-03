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
            className="flex p-4 bg-gray-50 border-t border-gray-200"
            onSubmit={handleSubmit}
        >
            <input
                className="flex-1 p-3 border border-gray-300 rounded-full outline-none text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                type="text"
                placeholder="Type your music request here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={loading}
            />
            <button
                className="ml-3 bg-green-500 text-white font-medium rounded-full px-6 py-3 text-base cursor-pointer transition-colors duration-200 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
                type="submit"
                disabled={!text.trim() || loading}
            >
                Send
            </button>
        </form>
    );
}

export default MessageInput;
