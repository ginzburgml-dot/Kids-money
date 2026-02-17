
import React from 'react';
import { translations, Language } from '../translations';

interface Props {
  isAvailable: boolean;
  onClaim: () => void;
  lang: Language;
}

const DailyBonus: React.FC<Props> = ({ isAvailable, onClaim, lang }) => {
  if (!isAvailable) return null;
  const t = translations[lang];

  return (
    <div className="bg-gradient-to-br from-yellow-300 to-orange-400 p-1 rounded-[32px] shadow-xl animate-bounce-soft">
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-[30px] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🎁</div>
          <div>
            <h3 className="font-black text-orange-600 text-lg leading-tight">{t.dailyGift}</h3>
            <p className="text-orange-400 text-xs font-bold uppercase">{t.comeBack}</p>
          </div>
        </div>
        <button
          onClick={onClaim}
          className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 py-3 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2"
        >
          {t.claim} <span className="text-xl">$2</span>
        </button>
      </div>
    </div>
  );
};

export default DailyBonus;
