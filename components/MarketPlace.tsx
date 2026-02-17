
import React from 'react';
import { ShopItem, Goal } from '../types';
import { translations, Language } from '../translations';

interface Props {
  items: ShopItem[];
  balance: number;
  onBuy: (item: ShopItem) => void;
  nextBigGoal: Goal;
  lang: Language;
}

const MarketPlace: React.FC<Props> = ({ items, balance, onBuy, nextBigGoal, lang }) => {
  const t = translations[lang];
  const affordable = items.filter(i => i.price <= balance);
  const tooExpensive = items.filter(i => i.price > balance);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-black text-orange-600">{t.funShop}</h2>

      <div className="bg-orange-50 p-5 rounded-3xl border-2 border-orange-200">
        <h3 className="text-lg font-bold text-orange-700 mb-3 flex items-center gap-2">
          <span>🛍️</span> {t.buyNow}
        </h3>
        {affordable.length === 0 ? (
          <p className="text-gray-500 italic text-center py-4 bg-white/50 rounded-xl">{t.nothingYet}</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {affordable.map(item => (
              <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border-2 border-green-100 flex flex-col items-center">
                <img src={item.imageUrl} alt={item.name} className="w-full aspect-square rounded-xl object-cover mb-2" />
                <h4 className="font-bold text-gray-800 text-sm text-center">{item.name}</h4>
                <div className="text-green-600 font-black mb-2">${item.price}</div>
                <button 
                  onClick={() => onBuy(item)}
                  className="w-full bg-orange-500 text-white py-1.5 rounded-full text-xs font-black shadow-md active:scale-95 transition-all"
                >
                  {t.buy}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-5 rounded-3xl border-2 border-blue-200 opacity-80">
        <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
          <span>🔒</span> {t.saveMore}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {tooExpensive.map(item => (
            <div key={item.id} className="bg-white/60 p-3 rounded-2xl border-2 border-gray-100 flex flex-col items-center grayscale-[0.5]">
              <div className="relative w-full">
                <img src={item.imageUrl} alt={item.name} className="w-full aspect-square rounded-xl object-cover mb-2 opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center text-4xl">🔒</div>
              </div>
              <h4 className="font-bold text-gray-400 text-sm text-center">{item.name}</h4>
              <div className="text-blue-400 font-black">${item.price}</div>
              <div className="text-[10px] font-bold text-blue-300 mt-1 uppercase">
                {t.needMore} ${item.price - balance}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-[32px] text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-[-10%] bottom-[-10%] text-9xl opacity-10">✨</div>
        <h3 className="text-xl font-black mb-2">{t.myBigGoal}</h3>
        <div className="flex items-center gap-4">
          <img src={nextBigGoal.imageUrl} className="w-20 h-20 rounded-2xl border-4 border-white/30" />
          <div>
            <p className="font-bold text-lg">{nextBigGoal.name}</p>
            <p className="text-purple-100 font-medium">{t.totalCost}: ${nextBigGoal.cost}</p>
            <div className="mt-2 text-xs font-black bg-white/20 px-2 py-1 rounded-full inline-block">
              {t.keepSaving}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPlace;
