import React, { useState } from 'react';
import { Shield, MessageSquare, BookOpen, BrainCircuit, Phone, Menu, X, ExternalLink } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import FraudLibrary from './components/FraudLibrary';
import { ViewState, QuizQuestion } from './types';
import { QUIZ_DATA } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simple Quiz Component Inline
  const QuizComponent = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleAnswer = (index: number) => {
      if (answered) return;
      setAnswered(true);
      const isCorrect = index === QUIZ_DATA[currentQ].correctIndex;
      if (isCorrect) setScore(s => s + 1);
      setFeedback(isCorrect ? '✅ 答對了！' : '❌ 答錯了。');
    };

    const nextQ = () => {
      if (currentQ < QUIZ_DATA.length - 1) {
        setCurrentQ(c => c + 1);
        setAnswered(false);
        setFeedback('');
      } else {
        setShowResult(true);
      }
    };

    const resetQuiz = () => {
      setCurrentQ(0);
      setScore(0);
      setShowResult(false);
      setAnswered(false);
      setFeedback('');
    };

    if (showResult) {
      return (
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 text-center shadow-lg border border-slate-100">
          <div className="mb-4 text-6xl">🏆</div>
          <h2 className="text-2xl font-bold mb-2 text-slate-800">測驗完成！</h2>
          <p className="text-lg mb-6 text-slate-600">你的防詐指數：<span className="font-bold text-blue-600">{Math.round((score / QUIZ_DATA.length) * 100)} 分</span></p>
          <button 
            onClick={resetQuiz}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            再測一次
          </button>
        </div>
      );
    }

    const question = QUIZ_DATA[currentQ];

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BrainCircuit className="text-blue-600" /> 防詐小測驗
          </h2>
          <span className="text-sm font-medium text-slate-500">第 {currentQ + 1} / {QUIZ_DATA.length} 題</span>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-xl mb-6 text-slate-800 text-lg font-medium leading-relaxed">
          {question.scenario}
        </div>

        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                answered 
                  ? idx === question.correctIndex 
                    ? 'bg-green-100 border-green-300 text-green-800'
                    : idx === QUIZ_DATA[currentQ].correctIndex // Highlight correct answer even if wrong selected
                      ? 'bg-green-100 border-green-300 text-green-800' // Should not happen based on logic but strictly standard
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700'
              } ${answered && idx !== question.correctIndex && 'opacity-50'}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs">
                  {['A', 'B', 'C', 'D'][idx]}
                </span>
                {opt}
              </div>
            </button>
          ))}
        </div>

        {answered && (
          <div className="mt-6 animate-fade-in">
            <div className={`p-4 rounded-xl mb-4 ${feedback.includes('對') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <p className="font-bold mb-1 text-lg">{feedback}</p>
              <p className="text-sm">{question.explanation}</p>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={nextQ}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                下一題 <ExternalLink size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const navItems = [
    { id: 'home', label: '首頁', icon: <Shield size={18} /> },
    { id: 'chat', label: 'E友諮詢', icon: <MessageSquare size={18} /> },
    { id: 'library', label: '詐騙圖鑑', icon: <BookOpen size={18} /> },
    { id: 'quiz', label: '防詐測驗', icon: <BrainCircuit size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Shield size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">防詐<span className="text-blue-600">E</span>友</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id as ViewState)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                    view === item.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <a 
                href="tel:165"
                className="ml-4 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-bold hover:bg-red-100 transition-colors flex items-center gap-2 border border-red-100"
              >
                <Phone size={16} /> 撥打 165
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 p-2">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-2 space-y-1 shadow-lg absolute w-full z-50">
             {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id as ViewState);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium ${
                    view === item.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
        
        {view === 'home' && (
          <div className="space-y-12 animate-fade-in">
            {/* Hero */}
            <div className="text-center space-y-6 py-10 md:py-20">
              <div className="inline-block p-3 rounded-full bg-blue-50 text-blue-600 mb-4 animate-bounce">
                <Shield size={48} strokeWidth={1.5} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
                識破詐騙，<br className="md:hidden"/>只需<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">一句對話</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
                結合 Google Gemini AI 技術與 165 反詐騙資料庫。<br/>
                無論是奇怪的簡訊、不明的連結，還是網戀對象的要求，讓 E 友幫您把關。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button 
                  onClick={() => setView('chat')}
                  className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <MessageSquare /> 開始諮詢 E 友
                </button>
                <button 
                  onClick={() => setView('library')}
                  className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen /> 認識常見手法
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BrainCircuit />
                </div>
                <h3 className="font-bold text-lg mb-2">AI 智能分析</h3>
                <p className="text-slate-600 text-sm">輸入對話截圖或文字，AI 立即分析詐騙風險指數。</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare />
                </div>
                <h3 className="font-bold text-lg mb-2">暖心陪伴</h3>
                <p className="text-slate-600 text-sm">不只是工具，更是您的朋友。提供情緒支持與正確的處理建議。</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen />
                </div>
                <h3 className="font-bold text-lg mb-2">情境模擬</h3>
                <p className="text-slate-600 text-sm">透過模擬對話練習拒絕話術，增強您的防詐免疫力。</p>
              </div>
            </div>
          </div>
        )}

        {view === 'chat' && <ChatInterface />}
        {view === 'library' && <FraudLibrary />}
        {view === 'quiz' && <QuizComponent />}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">防詐 E 友 - 您的 AI 安全顧問</p>
          <p className="text-xs opacity-60">
            本網站由 Google Gemini 提供 AI 技術支援。<br/>
            重要聲明：本工具僅供參考，若遇緊急詐騙案件，請務必直接撥打 165 反詐騙專線或 110 報案。
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;