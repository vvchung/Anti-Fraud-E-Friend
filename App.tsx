
import React, { useState } from 'react';
import { Shield, MessageSquare, BookOpen, BrainCircuit, Phone, Menu, X, Globe } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import FraudLibrary from './components/FraudLibrary';
import { ViewState, Language } from './types';
import { QUIZ_DATA } from './constants';
import { UI_TRANSLATIONS, LANG_MAP } from './translations';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [language, setLanguage] = useState<Language>('zh-TW');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = (key: string) => UI_TRANSLATIONS[key]?.[language] || key;

  const QuizComponent = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answered, setAnswered] = useState(false);

    const question = QUIZ_DATA[currentQ];
    const handleAnswer = (idx: number) => {
      if (answered) return;
      if (idx === question.correctIndex) setScore(s => s + 1);
      setAnswered(true);
    };

    if (showResult) return <div className="p-8 text-center bg-white rounded-xl shadow">Done! Score: {score}</div>;

    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-6">{t('navQuiz')}</h2>
        <div className="bg-blue-50 p-6 rounded-xl mb-6 font-medium">{question.scenario[language]}</div>
        <div className="space-y-3">
          {question.options[language].map((opt, idx) => (
            <button key={idx} onClick={() => handleAnswer(idx)} className={`w-full p-4 text-left border rounded-xl ${answered && idx === question.correctIndex ? 'bg-green-50 border-green-300' : 'bg-white'}`}>
              {opt}
            </button>
          ))}
        </div>
        {answered && (
          <div className="mt-6">
            <p className="text-sm bg-slate-50 p-4 rounded-lg mb-4">{question.explanation[language]}</p>
            <button onClick={() => currentQ < QUIZ_DATA.length - 1 ? (setCurrentQ(q => q + 1), setAnswered(false)) : setShowResult(true)} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Next</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <Shield className="text-blue-600" />
            <span className="font-bold text-xl">{t('appName')}</span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setView('home')}>{t('navHome')}</button>
            <button onClick={() => setView('chat')}>{t('navChat')}</button>
            <button onClick={() => setView('library')}>{t('navLibrary')}</button>
            <button onClick={() => setView('quiz')}>{t('navQuiz')}</button>
            
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-xs">
                <Globe size={14} /> {LANG_MAP[language].flag} {LANG_MAP[language].name}
              </button>
              <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-white border rounded-lg shadow-xl p-2 w-40">
                {(Object.entries(LANG_MAP) as [Language, {name: string, flag: string}][]).map(([code, {name, flag}]) => (
                  <button key={code} onClick={() => setLanguage(code)} className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 rounded flex items-center gap-2">
                    <span>{flag}</span> {name}
                  </button>
                ))}
              </div>
            </div>
            <a href="tel:165" className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold">{t('call165')}</a>
          </div>
          
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4">
        {view === 'home' && (
          <div className="text-center py-20 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('heroTitle')}</h1>
            <p className="text-slate-600 max-w-2xl mx-auto mb-10">{t('heroSub')}</p>
            <button onClick={() => setView('chat')} className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700">
              {t('startChat')}
            </button>
          </div>
        )}
        {view === 'chat' && <ChatInterface language={language} />}
        {view === 'library' && <FraudLibrary language={language} />}
        {view === 'quiz' && <QuizComponent />}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs">
        <p>{t('appName')} - {language === 'zh-TW' ? '您的國際防詐顧問' : 'Your International Anti-Fraud Advisor'}</p>
        <p className="mt-2 opacity-50">{t('aiWarning')}</p>
      </footer>
    </div>
  );
};

export default App;
