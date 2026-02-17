
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Goal, Chore, ShopItem, Transaction } from './types';
import { INITIAL_CHORES, INITIAL_SHOP_ITEMS, DEFAULT_GOAL } from './constants';
import { getEncouragement, suggestNewChores } from './services/aiAssistant';
import { soundService } from './services/soundService';
import { translations, Language } from './translations';

// Component Parts
import Header from './components/Header';
import BalanceDisplay from './components/BalanceDisplay';
import GoalTracker from './components/GoalTracker';
import ChoreBoard from './components/ChoreBoard';
import MarketPlace from './components/MarketPlace';
import Confetti from './components/Confetti';
import DailyBonus from './components/DailyBonus';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ru');
  const t = translations[lang];

  const [balance, setBalance] = useState<number>(10);
  const [goal, setGoal] = useState<Goal>(() => DEFAULT_GOAL(lang));
  const [chores, setChores] = useState<Chore[]>(() => INITIAL_CHORES(lang));
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chores' | 'shop'>('dashboard');
  const [encouragement, setEncouragement] = useState<string>(t.welcome);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isBonusAvailable, setIsBonusAvailable] = useState(false);
  
  const hasCelebratedGoal = useRef(false);

  // Derive total earnings
  const totalEarned = useMemo(() => {
    return transactions
      .filter(t => t.type === 'earn')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  // Check Daily Bonus
  useEffect(() => {
    const lastClaim = localStorage.getItem('lastBonusClaim');
    const today = new Date().toDateString();
    if (lastClaim !== today) {
      setIsBonusAvailable(true);
    }
  }, []);

  const handleClaimBonus = () => {
    const bonusAmount = 2;
    soundService.playSuccess();
    setBalance(prev => prev + bonusAmount);
    setTransactions(prevT => [
      {
        id: Math.random().toString(),
        amount: bonusAmount,
        type: 'earn',
        description: lang === 'ru' ? 'Ежедневный бонус! 🎁' : 'Daily Login Bonus! 🎁',
        date: Date.now()
      },
      ...prevT
    ]);
    setIsBonusAvailable(false);
    localStorage.setItem('lastBonusClaim', new Date().toDateString());
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Switch language
  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'ru' : 'en';
    setLang(newLang);
    // Optionally reset/update current chores if they haven't been modified
    setChores(INITIAL_CHORES(newLang));
  };

  useEffect(() => {
    if (balance >= goal.cost && !hasCelebratedGoal.current) {
      soundService.playSuccess();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      hasCelebratedGoal.current = true;
    } else if (balance < goal.cost) {
      hasCelebratedGoal.current = false;
    }
  }, [balance, goal.cost]);

  useEffect(() => {
    const fetchEncouragement = async () => {
      const msg = await getEncouragement(balance, goal.cost, goal.name, lang);
      setEncouragement(msg);
    };
    fetchEncouragement();
  }, [balance, goal.cost, goal.name, lang]);

  const handleCompleteChore = useCallback((choreId: string) => {
    soundService.playCoin();
    setChores(prev => prev.map(c => {
      if (c.id === choreId) {
        const newBalance = balance + c.reward;
        setBalance(newBalance);
        setTransactions(prevT => [
          {
            id: Math.random().toString(),
            amount: c.reward,
            type: 'earn',
            description: `${lang === 'ru' ? 'Выполнено' : 'Finished'}: ${c.title}`,
            date: Date.now()
          },
          ...prevT
        ]);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        return { ...c, timesCompleted: c.timesCompleted + 1 };
      }
      return c;
    }));
  }, [balance, lang]);

  const handleBuyItem = useCallback((item: ShopItem) => {
    if (balance >= item.price) {
      soundService.playSpend();
      setBalance(prev => prev - item.price);
      setTransactions(prevT => [
        {
          id: Math.random().toString(),
          amount: item.price,
          type: 'spend',
          description: `${lang === 'ru' ? 'Куплено' : 'Bought'}: ${item.name}`,
          date: Date.now()
        },
        ...prevT
      ]);
      alert(t.boughtSuccess(item.name));
    } else {
      alert(t.notEnough);
    }
  }, [balance, lang, t]);

  const handleSetNewGoal = () => {
    const name = prompt(t.setGoalPrompt, lang === 'ru' ? 'Кукла' : 'Cool Doll');
    const costStr = prompt(t.setCostPrompt, "20");
    if (name && costStr) {
      hasCelebratedGoal.current = false;
      setGoal({
        id: Math.random().toString(),
        name,
        cost: parseInt(costStr),
        imageUrl: `https://picsum.photos/seed/${name}/300/300`,
        category: lang === 'ru' ? 'Игрушка' : 'Toy'
      });
    }
  };

  const handleAddAIGeneratedChores = async () => {
    const currentTitles = chores.map(c => c.title);
    const suggestions = await suggestNewChores(currentTitles, lang);
    if (suggestions.length > 0) {
      const newChores: Chore[] = suggestions.map((s: any) => ({
        id: Math.random().toString(),
        title: s.title,
        reward: s.reward,
        icon: s.emoji,
        isCompleted: false,
        timesCompleted: 0
      }));
      setChores(prev => [...prev, ...newChores]);
    }
  };

  return (
    <div className="min-h-screen pb-24 max-w-lg mx-auto bg-blue-50 relative shadow-2xl overflow-hidden">
      {showConfetti && <Confetti />}
      
      <Header lang={lang} onToggleLang={toggleLanguage} />

      <main className="px-4 pt-4 space-y-6">
        {activeTab === 'dashboard' && (
          <>
            <DailyBonus isAvailable={isBonusAvailable} onClaim={handleClaimBonus} lang={lang} />
            
            <BalanceDisplay 
              balance={balance} 
              encouragement={encouragement} 
              totalEarned={totalEarned} 
              lang={lang}
            />
            <GoalTracker goal={goal} balance={balance} onSetGoal={handleSetNewGoal} lang={lang} />
            
            <section className="bg-white p-4 rounded-3xl shadow-sm border-2 border-orange-100">
              <h3 className="text-xl font-bold text-orange-600 mb-3 flex items-center">
                <span className="mr-2">📜</span> {t.recentLogs}
              </h3>
              <div className="space-y-2">
                {transactions.length === 0 ? (
                  <p className="text-gray-400 italic text-center py-4">{t.noLogs}</p>
                ) : (
                  transactions.slice(0, 3).map(t => (
                    <div key={t.id} className="flex justify-between items-center p-2 rounded-xl bg-orange-50">
                      <span className="text-gray-700 font-medium">{t.description}</span>
                      <span className={t.type === 'earn' ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                        {t.type === 'earn' ? '+' : '-'}${t.amount}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </>
        )}

        {activeTab === 'chores' && (
          <ChoreBoard 
            chores={chores} 
            onComplete={handleCompleteChore} 
            onGenerateAI={handleAddAIGeneratedChores}
            lang={lang}
          />
        )}

        {activeTab === 'shop' && (
          <MarketPlace 
            items={INITIAL_SHOP_ITEMS(lang)} 
            balance={balance} 
            onBuy={handleBuyItem} 
            nextBigGoal={goal}
            lang={lang}
          />
        )}
      </main>

      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/80 backdrop-blur-md border-2 border-white/50 rounded-full shadow-2xl px-6 py-3 flex justify-between items-center z-50">
        <button 
          onClick={() => { soundService.playCoin(); setActiveTab('dashboard'); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-blue-600 scale-110' : 'text-gray-400'} transition-all`}
        >
          <span className="text-2xl">🏠</span>
          <span className="text-xs font-bold">{t.home}</span>
        </button>
        <button 
          onClick={() => { soundService.playCoin(); setActiveTab('chores'); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'chores' ? 'text-blue-600 scale-110' : 'text-gray-400'} transition-all`}
        >
          <span className="text-2xl">🧹</span>
          <span className="text-xs font-bold">{t.earn}</span>
        </button>
        <button 
          onClick={() => { soundService.playCoin(); setActiveTab('shop'); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'shop' ? 'text-blue-600 scale-110' : 'text-gray-400'} transition-all`}
        >
          <span className="text-2xl">🍭</span>
          <span className="text-xs font-bold">{t.spend}</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
