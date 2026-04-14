import React from "react";
import ReactMarkdown from "react-markdown";

function MessageList({ messages, loading }) {
    return (
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-5 bg-transparent scroll-smooth">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex w-full animate-fade-in-up ${msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                >
                    <div
                        className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm transition-all duration-300 hover:shadow-md ${msg.role === "user"
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5"
                            : "bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md text-zinc-900 dark:text-zinc-100 border border-white/20 dark:border-zinc-700/30 rounded-bl-sm shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5"
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
                                            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 underline underline-offset-2 transition-colors break-words"
                                        />
                                    ),
                                    p: ({ node, ...props }) => (
                                        <p {...props} className="mb-3 last:mb-0 leading-relaxed" />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul {...props} className="mb-3 ml-6 list-disc space-y-1 marker:text-indigo-500" />
                                    ),
                                    ol: ({ node, ...props }) => (
                                        <ol {...props} className="mb-3 ml-6 list-decimal space-y-1 marker:text-indigo-500 dark:marker:text-indigo-400" />
                                    ),
                                    strong: ({ node, ...props }) => (
                                        <strong {...props} className="font-semibold text-indigo-900 dark:text-indigo-100" />
                                    ),
                                    h3: ({ node, ...props }) => (
                                        <h3 {...props} className="font-bold text-lg mt-4 mb-2 text-zinc-800 dark:text-zinc-200" />
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
                    <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-5 py-3.5 text-sm shadow-sm bg-white dark:bg-zinc-800/80 border border-zinc-100 dark:border-zinc-700/50 text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                        <span className="text-xs font-semibold text-indigo-500 pr-1">Tuning in</span>
                        <div className="flex items-end justify-center gap-[2px] h-3">
                            <span className="w-1 h-full bg-indigo-400 rounded-sm equalize-1"></span>
                            <span className="w-1 h-full bg-purple-400 rounded-sm equalize-2"></span>
                            <span className="w-1 h-full bg-pink-400 rounded-sm equalize-3"></span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MessageList;
