import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  X,
  RotateCcw,
  User,
  ChevronDown,
  Maximize2,
  Minimize2,
  ExternalLink,
  Briefcase,
  Code2,
  Mail,
  HelpCircle
} from 'lucide-react';
import { getClientPortfolioAnswer } from '../utils/aiFallback';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { label: 'Technical Stack', icon: Code2, prompt: "What is Vedant's primary tech stack and experience level?" },
  { label: 'Key Projects', icon: Briefcase, prompt: 'Tell me about the enterprise projects Vedant has built.' },
  { label: 'SSC Exam Vault', icon: Sparkles, prompt: 'How did Vedant secure 10M+ questions for Staff Selection Commission?' },
  { label: 'Contact & Hire', icon: Mail, prompt: 'What is Vedant availability and how can I contact him for roles?' }
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-msg',
  role: 'model',
  text: "Hi there! 👋 I'm **Vedant's AI**. \n\nFeel free to ask me anything about his architecture choices, achievements, or how to get in touch!",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export const AskVedantAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    setHasInteracted(true);
    const userMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build lightweight conversation history for the API
      const historyPayload = nextMessages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text
      }));

      // Abort after 6 seconds to prevent UI hangs
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: query,
          history: historyPayload
        })
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const reply = data.reply || getClientPortfolioAnswer(query);
      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      console.warn('Ask Vedant AI network/server exception; serving grounded answer:', err);
      // Immediately provide an accurate, high-fidelity portfolio answer without leaving the user stranded
      const clientAnswer = getClientPortfolioAnswer(query);
      const fallbackMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: clientAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Enhanced formatting helper for markdown (bold, links, headers, lists, linebreaks)
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');

    const parseInline = (text: string) => {
      // First match links [text](url) and bold **bold**
      const tokenRegex = /(\[[^\]]+\]\([^\)]+\)|\*\*[^*]+\*\*)/g;
      const parts = text.split(tokenRegex);

      return parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-teal-600 dark:text-[#5eead4]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
        if (linkMatch) {
          const [, label, href] = linkMatch;
          return (
            <a
              key={pIdx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-[#5eead4] underline decoration-teal-400/50 hover:decoration-teal-400 font-medium break-all"
            >
              {label}
            </a>
          );
        }
        return part;
      });
    };

    return lines.map((line, idx) => {
      const trimmed = line.trim();

      // Check for headers (e.g., ### Header)
      if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
        const headerText = trimmed.replace(/^#+\s+/, '');
        return (
          <h4 key={idx} className="font-bold text-slate-900 dark:text-white mt-2 mb-1 text-xs sm:text-sm">
            {parseInline(headerText)}
          </h4>
        );
      }

      // Check for bullet line (* or -)
      const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ');
      if (isBullet) {
        const cleanLine = trimmed.replace(/^(\*|\-|•)\s+/, '');
        return (
          <li key={idx} className="ml-4 list-disc mb-1 leading-relaxed text-slate-700 dark:text-slate-300">
            {parseInline(cleanLine)}
          </li>
        );
      }

      if (trimmed === '') {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p key={idx} className="mb-1 leading-relaxed text-slate-700 dark:text-slate-300">
          {parseInline(line)}
        </p>
      );
    });
  };

  return (
    <>
      {/* FLOATING ACTION BUTTON TRIGGER */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-full bg-white/90 dark:bg-[#0c2120]/90 backdrop-blur-xl shadow-lg shadow-teal-900/10 dark:shadow-teal-900/40 text-xs font-medium text-slate-700 dark:text-slate-200 cursor-pointer hover:scale-105 transition-all duration-300 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span>Ask Vedant AI</span>
            <span className="text-[10px] text-teal-600 dark:text-[#2dd4bf] font-bold group-hover:translate-x-0.5 transition-transform">
              ✨
            </span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Ask Vedant AI Assistant"
          className="relative group p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-[#0d9488] via-[#14b8a6] to-[#06b6d4] text-white shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-400/30"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
          ) : (
            <>
              <Sparkles className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300" />
              {/* Notification ping badge */}
              {!hasInteracted && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-300 border-2 border-white dark:border-[#050e0d]"></span>
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* FLOATING CHAT MODAL DIALOG */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-out flex flex-col ${
            isExpanded
              ? 'inset-3 sm:inset-6 max-w-4xl max-h-[92vh] m-auto'
              : 'bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[440px] h-[580px] max-h-[85vh]'
          } rounded-3xl bg-white/95 dark:bg-[#091b1a]/95 backdrop-blur-2xl shadow-2xl shadow-slate-900/20 dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-slate-50/80 dark:bg-[#0c2422]/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#0891b2] text-white shadow-md shadow-teal-500/20">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-[#0c2422]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Ask Vedant AI</h3>
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-[#5eead4]">
                    Version 1.3
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Grounded in Vedant Sharma&apos;s Portfolio
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-teal-950/50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Minimize' : 'Expand'}
                className="hidden sm:block p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-teal-950/50 transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-teal-950/50 transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-slate-100/60 dark:bg-[#071716]/60 flex gap-2 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.prompt)}
                    className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-xl bg-white/80 dark:bg-[#0e2c29]/70 hover:bg-teal-50 dark:hover:bg-[#133b37] text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-[#5eead4] shadow-sm transition-all duration-200"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-teal-600 dark:text-[#2dd4bf]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0d9488] to-[#06b6d4] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3.5 ${
                      isUser
                        ? 'bg-gradient-to-tr from-[#0d9488] to-[#0ea5e9] text-white rounded-br-xs shadow-md shadow-teal-500/10'
                        : 'bg-slate-100 dark:bg-[#0e2c29]/80 text-slate-800 dark:text-slate-200 rounded-bl-xs shadow-sm'
                    }`}
                  >
                    <div className="prose-sm dark:prose-invert">
                      {isUser ? <p>{msg.text}</p> : renderFormattedText(msg.text)}
                    </div>
                    <span
                      className={`block text-[10px] mt-1.5 ${
                        isUser ? 'text-teal-100 text-right' : 'text-slate-400 dark:text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Loader Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0d9488] to-[#06b6d4] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="rounded-2xl rounded-bl-xs p-3.5 bg-slate-100 dark:bg-[#0e2c29]/80 text-slate-600 dark:text-slate-300 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  <span className="text-xs ml-1 text-slate-400">Searching portfolio...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-50/90 dark:bg-[#0c2422]/90 backdrop-blur-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-white dark:bg-[#071716] rounded-2xl px-3 py-1.5 shadow-inner"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Vedant's skills, projects, or experience..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none py-1.5"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-2 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#0891b2] text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between px-2 pt-2 text-[10px] text-slate-400 dark:text-slate-500">
              <span>Powered by Vedant AI 1.3</span>
              <span>Ask Vedant AI</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
