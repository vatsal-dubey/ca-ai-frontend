'use client';

import { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help you with GST, ITR, Audit, and compliance queries.',
      created_at: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // 🔹 Mock AI response (replace with API later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'This is a placeholder response. Once connected, I will answer based on your uploaded documents.',
          created_at: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="p-6 h-[calc(100vh-64px)] flex flex-col space-y-4">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          AI Assistant
        </h1>
        <p className="text-sm text-slate-500">
          Ask questions based on your knowledge base documents
        </p>
      </div>

      {/* CHAT CONTAINER */}
      <div className="flex-1 bg-white border rounded-lg shadow flex flex-col overflow-hidden">

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}

          {loading && (
            <div className="text-sm text-slate-500 italic">
              AI is thinking...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="border-t p-4 flex gap-3">
          <input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            Send
          </button>
        </div>
      </div>

      {/* QUICK PROMPTS */}
      <div className="flex gap-2 flex-wrap">
        {[
          'GST return due date',
          'ITR filing last date',
          'TDS compliance',
          'Audit checklist',
        ].map((prompt) => (
          <button
            key={prompt}
            onClick={() => setInput(prompt)}
            className="px-3 py-1.5 text-xs rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

const ChatBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-lg text-sm leading-relaxed ${
          isUser
            ? 'bg-indigo-600 text-white'
            : 'bg-slate-100 text-slate-800'
        }`}
      >
        {message.content}
        <div className="text-[10px] opacity-60 mt-1">
          {new Date(message.created_at).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
