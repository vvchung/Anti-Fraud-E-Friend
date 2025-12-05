import React, { useState } from 'react';
import { FRAUD_METHODS } from '../constants';
import { ShieldAlert, TrendingUp, HeartCrack, ShoppingBag, Siren, Info } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'chart-line': <TrendingUp className="w-6 h-6" />,
  'credit-card': <ShieldAlert className="w-6 h-6" />,
  'heart-crack': <HeartCrack className="w-6 h-6" />,
  'shopping-bag': <ShoppingBag className="w-6 h-6" />,
  'siren': <Siren className="w-6 h-6" />,
};

const FraudLibrary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(FRAUD_METHODS.map(m => m.category)))];

  const filteredMethods = activeCategory === 'all' 
    ? FRAUD_METHODS 
    : FRAUD_METHODS.filter(m => m.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">常見詐騙手法資料庫</h2>
        <p className="text-slate-600">知己知彼，百戰不殆。了解詐騙集團的劇本，就能一眼識破陷阱。</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'all' ? '全部顯示' : cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMethods.map((method) => (
          <div key={method.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {iconMap[method.icon] || <Info />}
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                {method.category}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">{method.title}</h3>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">{method.description}</p>
            
            <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <h4 className="text-xs font-bold text-red-700 uppercase mb-2 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> 識別關鍵字
                </h4>
                <div className="flex flex-wrap gap-2">
                  {method.indicators.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-white text-red-600 px-2 py-1 rounded border border-red-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <h4 className="text-xs font-bold text-green-700 uppercase mb-2">💡 防範之道</h4>
                <ul className="text-xs text-green-800 list-disc list-inside space-y-1">
                  {method.prevention.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FraudLibrary;