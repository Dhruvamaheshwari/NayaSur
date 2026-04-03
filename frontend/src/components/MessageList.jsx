import React from "react";
import ReactMarkdown from "react-markdown";

function MessageList({ messages, loading }) {
    return (
        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-white border-t border-gray-200">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                >
                    <div
                        className={`max-w-[75%] px-4 py-3 rounded-2xl leading-relaxed whitespace-pre-wrap break-words shadow-sm ${msg.role === "user"
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-800 rounded-bl-sm"
                            }`}
                    >
                        {msg.role === "user" ? (
                            msg.text
                        ) : (
                            <ReactMarkdown
                                components={{
                                    a: ({ node, ...props }) => (
                                        <a
                                            {...props}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700 underline break-all"
                                        />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul {...props} className="list-disc pl-5 my-2" />
                                    ),
                                    ol: ({ node, ...props }) => (
                                        <ol {...props} className="list-decimal pl-5 my-2" />
                                    ),
                                    strong: ({ node, ...props }) => (
                                        <strong {...props} className="font-bold text-gray-900" />
                                    ),
                                }}
                            >
                                {msg.text}
                            </ReactMarkdown>
                        )}
                    </div>
                </div>
            ))}
            {loading && (
                <div className="flex w-full justify-start">
                    <div className="max-w-[75%] px-4 py-3 rounded-2xl leading-relaxed bg-gray-100 text-gray-500 italic rounded-bl-sm shadow-sm">
                        Thinking...
                    </div>
                </div>
            )}
        </div>
    );
}

export default MessageList;
