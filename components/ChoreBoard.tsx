
import React from 'react';
import { Chore } from '../types';
import { translations, Language } from '../translations';

interface Props {
  chores: Chore[];
  onComplete: (id: string) => void;
  onGenerateAI: () => void;
  lang: Language;
}

const ChoreBoard: React.FC<Props> = ({ chores, onComplete, onGenerateAI, lang }) => {
  const t = translations[lang];

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-green-600">{t.earnMoney}</h2>
        <button 
          onClick={onGenerateAI}
          className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center gap-1 active:scale-95 transition-transform"
        >
          <span>✨</span> {t.newTasks}
        </button>
      </div>

      <div className="grid gap-3">
        {chores.map(chore => (
          <div 
            key={chore.id} 
            className="bg-white p-4 rounded-3xl shadow-md border-2 border-green-50 flex items-center justify-between group hover:border-green-300 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {chore.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg leading-tight">{chore.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-black text-xl">${chore.reward}</span>
                  <span className="text-xs text-gray-400 font-bold uppercase">{t.reward}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <button 
                onClick={() => onComplete(chore.id)}
                className="bg-green-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg active:scale-90 hover:bg-green-600 transition-all"
              >
                ✅
              </button>
              <span className="text-[10px] font-bold text-gray-400 uppercase">{t.doneX} {chore.timesCompleted}x</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-dashed border-yellow-200 text-center">
        <p className="text-sm text-yellow-700 font-medium">{t.moreChores}</p>
      </div>
    </section>
  );
};

export default ChoreBoard;
