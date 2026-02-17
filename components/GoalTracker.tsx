
import React from 'react';
import { Goal } from '../types';
import { translations, Language } from '../translations';

interface Props {
  goal: Goal;
  balance: number;
  onSetGoal: () => void;
  lang: Language;
}

const GoalTracker: React.FC<Props> = ({ goal, balance, onSetGoal, lang }) => {
  const t = translations[lang];
  const progress = Math.min(100, (balance / goal.cost) * 100);
  const remaining = Math.max(0, goal.cost - balance);

  return (
    <div className="bg-white p-5 rounded-[32px] shadow-lg border-2 border-purple-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-purple-600 flex items-center gap-2">
          <span>🎯</span> {t.currentGoal}
        </h3>
        <button 
          onClick={onSetGoal}
          className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold hover:bg-purple-200 transition-colors"
        >
          {t.change}
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <img 
          src={goal.imageUrl} 
          alt={goal.name} 
          className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-white"
        />
        <div className="flex-1 flex flex-col justify-center">
          <h4 className="text-xl font-bold text-gray-800">{goal.name}</h4>
          <p className="text-gray-500 font-bold">{t.totalCost}: ${goal.cost}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm font-black uppercase text-purple-400">
          <span>{Math.round(progress)}% {t.complete}</span>
          <span>${remaining} {t.toGo}</span>
        </div>
        <div className="h-6 w-full bg-purple-50 rounded-full overflow-hidden border border-purple-100 p-1">
          <div 
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000 ease-out flex items-center justify-end px-2"
            style={{ width: `${progress}%` }}
          >
            {progress > 15 && <span className="text-[10px] text-white font-bold">🚀</span>}
          </div>
        </div>
      </div>

      {progress >= 100 && (
        <div className="mt-4 bg-green-100 p-3 rounded-2xl text-green-700 text-center font-bold animate-bounce">
          {t.goalReached}
        </div>
      )}
    </div>
  );
};

export default GoalTracker;
