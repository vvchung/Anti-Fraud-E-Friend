import React, { useState, useEffect, useRef } from 'react';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Chat } from "@google/genai";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session on mount
    const initChat = async () => {
      try {
        const session = await createChatSession();
        setChatSession(session);
        // Add welcome message
        setMessages([
          {
            id: 'welcome',
            role: 'model',
            text: '嗨！我是防詐 E 友。👋\n\n我可以幫您：\n1. **辨識詐騙訊息**：複製您收到的可疑簡訊或 Line 內容給我。\n2. **情境演練**：想練習怎麼拒絕詐騙電話嗎？\n3. **抒發心情**：如果不幸遇到詐騙，我會在這裡陪您。\n\n請問今天有什麼我可以幫您的？',
            timestamp: new Date()
          }
        ]);
      } catch (error) {
        console.error("Failed to init chat", error);
        setMessages([
          {
            id: 'error-init',
            role: 'model',
            text: '系統暫時無法連線，請檢查您的網路或 API 設定。',
            timestamp: new Date(),
            isError: true
          }
        ]);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let fullResponse = '';
      const responseMsgId = (Date.now() + 1).toString();
      
      // Add placeholder for streaming response
      setMessages(prev => [...prev, {
        id: responseMsgId,
        role: 'model',
        text: '',
        timestamp: new Date()
      }]);

      await sendMessageStream(chatSession, userMsg.text, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === responseMsgId ? { ...msg, text: fullResponse } : msg
        ));
      });

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: '抱歉，我現在有點暈頭轉向，請稍後再試一次。😓',
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      
      {/* Header */}
      <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">防詐 E 友</h3>
            <div className="flex items-center gap-1.5 text-xs text-blue-100">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              在線諮詢中
            </div>
          </div>
        </div>
        <div className="hidden sm:block text-xs bg-blue-700 px-3 py-1 rounded-full text-blue-100">
          Powered by Gemini 2.5
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] sm:max-w-[75%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              {/* Bubble */}
              <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : msg.isError 
                    ? 'bg-red-50 text-red-600 border border-red-200 rounded-tl-none'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.text}
                {msg.text === '' && isLoading && (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        {/* Quick Prompts (Only show if messages length is low to guide user) */}
        {messages.length < 3 && (
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              onClick={() => setInput('幫我分析這是不是詐騙：保證獲利，每月配息15%...')}
              className="whitespace-nowrap px-3 py-1.5 bg-blue-50 text-blue-600 text-xs rounded-full hover:bg-blue-100 transition-colors border border-blue-100 flex items-center gap-1">
              <Sparkles size={12} /> 分析投資訊息
            </button>
            <button 
              onClick={() => setInput('我接到電話說我的訂單被重複扣款，該怎麼辦？')}
              className="whitespace-nowrap px-3 py-1.5 bg-orange-50 text-orange-600 text-xs rounded-full hover:bg-orange-100 transition-colors border border-orange-100 flex items-center gap-1">
              <AlertTriangle size={12} /> 解除分期付款?
            </button>
          </div>
        )}

        <div className="relative flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="輸入訊息，或貼上可疑內容..."
            className="w-full resize-none bg-slate-100 text-slate-900 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all max-h-32 min-h-[50px]"
            rows={1}
            style={{ height: 'auto', minHeight: '50px' }} 
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 bottom-2 p-2 rounded-lg transition-all ${
              input.trim() && !isLoading
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-2">
          AI 可能會產生錯誤資訊，重要財務決策請務必撥打 165 反詐騙專線查證。
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;