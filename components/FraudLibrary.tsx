
import React, { useState } from 'react';
import { FRAUD_METHODS } from '../constants';
import { Language } from '../types';
import { ShieldAlert, TrendingUp, HeartCrack, ShoppingBag, Siren, Info } from 'lucide-react';
import { UI_TRANSLATIONS } from '../translations';

const iconMap: Record<string, React.ReactNode> = {
  'chart-line': <TrendingUp className="w-6 h-6" />,
  'credit-card': <ShieldAlert className="w-6 h-6" />,
  'heart-crack': <HeartCrack className="w-6 h-6" />,
  'shopping-bag': <ShoppingBag className="w-6 h-6" />,
  'siren': <Siren className="w-6 h-6" />,
};

interface Props { language: Language; }

const FraudLibrary: React.FC<Props> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const t = (key: string) => UI_TRANSLATIONS[key][language] || key;

  const cats = FRAUD_METHODS.map(m => m.category[language]);
  const categories = ['all', ...Array.from(new Set(cats))];

  const filtered = activeCategory === 'all' 
    ? FRAUD_METHODS 
    : FRAUD_METHODS.filter(m => m.category[language] === activeCategory);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 animate-fade-in">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(m => (
          <div key={m.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">{iconMap[m.icon]}</div>
              <h3 className="font-bold">{m.title[language]}</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">{m.description[language]}</p>
            <div className="space-y-2">
              <div className="text-xs font-bold text-red-600">Red Flags:</div>
              <div className="flex flex-wrap gap-1">
                {m.indicators[language].map(ind => <span className="bg-red-50 px-2 py-0.5 rounded" key={ind}>{ind}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FraudLibrary;
