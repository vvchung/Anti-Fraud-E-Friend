
import React, { useState, useEffect, useRef } from 'react';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { Send, Bot, User, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Chat } from "@google/genai";
import { UI_TRANSLATIONS } from '../translations';

interface Props {
  language: Language;
}

const ChatInterface: React.FC<Props> = ({ language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => UI_TRANSLATIONS[key][language] || key;

  // Simple Markdown-lite parser for Bold and Newlines
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Bold handling
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const content = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-blue-900 font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      return <div key={i} className="mb-1">{content}</div>;
    });
  };

  useEffect(() => {
    const initChat = async () => {
      try {
        const session = await createChatSession(language);
        setChatSession(session);
        setMessages([
          {
            id: 'welcome',
            role: 'model',
            text: language === 'zh-TW' 
              ? '您好！我是您的 24 小時防詐 E 友。🛡️\n\n您可以將可疑訊息貼在這裡，或是描述遇到的狀況，我會立即為您分析。'
              : `Hello! I am your 24/7 Anti-Fraud E-Friend. 🛡️\n\nYou can paste suspicious messages here or describe your situation, and I will analyze it immediately.`,
            timestamp: new Date()
          }
        ]);
      } catch (error) {
        setMessages([{ id: 'err', role: 'model', text: 'Error connecting to Gemini...', timestamp: new Date(), isError: true }]);
      }
    };
    initChat();
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession || isLoading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let fullResponse = '';
      const responseMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: responseMsgId, role: 'model', text: '', timestamp: new Date() }]);
      await sendMessageStream(chatSession, userMsg.text, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => msg.id === responseMsgId ? { ...msg, text: fullResponse } : msg));
      });
    } catch (error) {
      setMessages(prev => [...prev, { id: 'err', role: 'model', text: 'Sorry, I encountered an error. Please try again.', timestamp: new Date(), isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-none">{t('appName')}</h3>
            <span className="text-[10px] text-blue-100 flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3" /> 24/7 AI Security Active
            </span>
          </div>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/50 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex items-start gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border shadow-sm text-blue-600'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-5 rounded-2xl shadow-sm leading-relaxed text-[15px] ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : msg.isError 
                    ? 'bg-red-50 border border-red-100 text-red-800'
                    : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                {msg.role === 'model' ? (
                  <div className="whitespace-pre-wrap">{formatText(msg.text)}</div>
                ) : (
                  msg.text
                )}
                {msg.isError && <AlertCircle className="w-4 h-4 inline ml-2" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="relative flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('chatPlaceholder')}
            className="w-full bg-slate-100/80 border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all rounded-2xl px-6 py-4 outline-none text-[15px]"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()}
            className="p-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex-shrink-0"
          >
            {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : <Send className="w-6 h-6" />}
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-slate-400">
          <AlertCircle className="w-3 h-3" />
          {t('aiWarning')}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
