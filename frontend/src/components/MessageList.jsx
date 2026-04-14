import React from "react";
import ReactMarkdown from "react-markdown";

function MessageList({ messages, loading }) {
    return (
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-white dark:bg-zinc-950">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex w-full animate-fade-in-up ${msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                >
                    <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 text-sm shadow-sm ${msg.role === "user"
                            ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                            : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
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
                                            className="font-medium underline underline-offset-4"
                                        />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul {...props} className="my-2 ml-6 list-disc [&>li]:mt-2" />
                                    ),
                                    ol: ({ node, ...props }) => (
                                        <ol {...props} className="my-2 ml-6 list-decimal [&>li]:mt-2" />
                                    ),
                                    strong: ({ node, ...props }) => (
                                        <strong {...props} className="font-semibold" />
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
                <div className="flex w-full justify-start animate-fade-in-up">
                    <div className="max-w-[80%] rounded-lg px-4 py-3 text-sm shadow-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                        <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MessageList;
