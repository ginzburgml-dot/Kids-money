
import React from 'react';
import { translations, Language } from '../translations';

interface Props {
  balance: number;
  encouragement: string;
  totalEarned: number;
  lang: Language;
}

const BalanceDisplay: React.FC<Props> = ({ balance, encouragement, totalEarned, lang }) => {
  const t = translations[lang];
  const levelThreshold = 15;
  const level = Math.floor(totalEarned / levelThreshold) + 1;
  const progressToNext = (totalEarned % levelThreshold) / levelThreshold * 100;

  return (
    <div className="relative bg-white p-6 rounded-[32px] shadow-xl border-4 border-yellow-200 overflow-hidden group">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-100 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
      
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="text-6xl animate-pulse transition-transform group-hover:scale-110">
            {level >= 5 ? '👑' : level >= 3 ? '🕶️' : '🐷'}
          </div>
          <div className="absolute -top-2 -right-2 flex flex-col items-center">
            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-black shadow-lg border-2 border-white animate-bounce">
              {lang === 'ru' ? 'УР' : 'LVL'} {level}
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">{t.myPiggyBank}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black text-blue-600">${balance}</span>
            <span className="text-lg font-bold text-blue-400">{t.coins}</span>
          </div>
          
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-[10px] font-black text-green-600 uppercase">
              <span>{t.xpToLvl} {level + 1}</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700 ease-out"
                style={{ width: `${progressToNext}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-2xl border border-blue-100 italic text-blue-800 text-sm shadow-inner">
        "{encouragement}"
      </div>
    </div>
  );
};

export default BalanceDisplay;
