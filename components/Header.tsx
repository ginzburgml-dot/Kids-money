
import React from 'react';
import { translations, Language } from '../translations';

interface Props {
  lang: Language;
  onToggleLang: () => void;
}

const Header: React.FC<Props> = ({ lang, onToggleLang }) => {
  const t = translations[lang];

  return (
    <header className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-b-[40px] shadow-lg text-white relative">
      <button 
        onClick={onToggleLang}
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-black backdrop-blur-sm transition-all flex items-center gap-1 border border-white/30"
      >
        {lang === 'en' ? '🇺🇸 EN' : '🇷🇺 RU'}
      </button>

      <div className="flex flex-col items-center text-center">
        <div className="flex justify-center items-center gap-3 mb-1">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-inner animate-bounce">
            🐷
          </div>
          <h1 className="text-2xl font-black tracking-tight">{t.appName}</h1>
        </div>
        <p className="text-blue-100 text-sm font-medium">{t.appSubtitle}</p>
      </div>
    </header>
  );
};

export default Header;
