import React, { useState, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Sun, 
  Globe, 
  Sunrise, 
  Heart, 
  Cross, 
  CloudSun, 
  Shield, 
  Target, 
  Anchor, 
  Church, 
  Apple 
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { memoryCardPairsData } from '../data/memoryCardsData';
import { sound } from '../utils/audio';

interface CardItem {
  uid: string;
  pairId: string;
  title: string;
  subtitle: string;
  iconName: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGameScreen: React.FC = () => {
  const { addXpAndCoins, setActiveScreen, celebrate, language, darkMode } = useGame();

  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchesFound, setMatchesFound] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const iconMap: Record<string, React.ElementType> = {
    Sun,
    Globe,
    Sunrise,
    Sparkles,
    Heart,
    Cross,
    CloudSun,
    Shield,
    Target,
    Anchor,
    Church,
    Apple
  };

  const initGame = useCallback((diff: 'easy' | 'medium' | 'hard' = difficulty) => {
    sound.playClick();
    const pairCount = diff === 'easy' ? 4 : (diff === 'medium' ? 6 : 8);
    const selectedPairs = memoryCardPairsData.slice(0, pairCount);

    const cardList: CardItem[] = [];
    selectedPairs.forEach(pair => {
      cardList.push({
        uid: `${pair.id}_a`,
        pairId: pair.id,
        title: language === 'tl' ? pair.itemA.titleTl || pair.itemA.title : pair.itemA.title,
        subtitle: language === 'tl' ? pair.itemA.subtitleTl || pair.itemA.subtitle : pair.itemA.subtitle,
        iconName: pair.itemA.icon,
        isFlipped: false,
        isMatched: false
      });
      cardList.push({
        uid: `${pair.id}_b`,
        pairId: pair.id,
        title: language === 'tl' ? pair.itemB.titleTl || pair.itemB.title : pair.itemB.title,
        subtitle: language === 'tl' ? pair.itemB.subtitleTl || pair.itemB.subtitle : pair.itemB.subtitle,
        iconName: pair.itemB.icon,
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(cardList.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMoves(0);
    setMatchesFound(0);
    setIsGameOver(false);
    setSeconds(0);
    setTimerActive(true);
  }, [difficulty, language]);

  useEffect(() => {
    initGame(difficulty);
  }, [difficulty, initGame]);

  useEffect(() => {
    let interval: number | null = null;
    if (timerActive && !isGameOver) {
      interval = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, isGameOver]);

  const handleCardClick = (card: CardItem) => {
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    sound.playCardFlip();
    const newFlipped = [...flippedCards, card];
    
    setCards(prev => prev.map(c => c.uid === card.uid ? { ...c, isFlipped: true } : c));
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [c1, c2] = newFlipped;

      if (c1.pairId === c2.pairId) {
        // Match!
        sound.playCorrect();
        setCards(prev => prev.map(c => c.pairId === c1.pairId ? { ...c, isMatched: true } : c));
        setFlippedCards([]);
        setMatchesFound(prev => {
          const next = prev + 1;
          const totalPairs = cards.length / 2;
          if (next >= totalPairs) {
            // Game won!
            setIsGameOver(true);
            setTimerActive(false);
            const rewardXp = difficulty === 'easy' ? 40 : (difficulty === 'medium' ? 70 : 100);
            addXpAndCoins(rewardXp, 25, 'Memory Match');
            celebrate();
          }
          return next;
        });
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setCards(prev => prev.map(c => (c.uid === c1.uid || c.uid === c2.uid) ? { ...c, isFlipped: false } : c));
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in">
      
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => {
            sound.playClick();
            setActiveScreen('dashboard');
          }}
          className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all shadow-xs backdrop-blur-md ${
            darkMode
              ? 'bg-white/10 hover:bg-white/20 border-white/15 text-slate-200'
              : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> {language === 'tl' ? 'Bumalik sa Dashboard' : 'Back to Dashboard'}
        </button>

        {/* Difficulty Selector */}
        <div className={`flex items-center gap-1 p-1 rounded-2xl border backdrop-blur-md ${
          darkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-100 border-slate-200'
        }`}>
          {(['easy', 'medium', 'hard'] as const).map(diff => (
            <button
              key={diff}
              onClick={() => {
                setDifficulty(diff);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                difficulty === diff
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : darkMode
                    ? 'text-slate-300 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {diff === 'easy' 
                ? (language === 'tl' ? 'Madali (4 na pares)' : 'Easy (4 pairs)')
                : diff === 'medium'
                  ? (language === 'tl' ? 'Katamtaman (6 na pares)' : 'Medium (6 pairs)')
                  : (language === 'tl' ? 'Mahirap (8 na pares)' : 'Hard (8 pairs)')}
            </button>
          ))}
        </div>
      </div>

      {/* Header Info Bar */}
      <div className={`backdrop-blur-xl rounded-3xl p-4 sm:p-5 border shadow-xl flex items-center justify-between text-xs font-bold ${
        darkMode ? 'bg-white/[0.06] border-white/10 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5">
            <Clock className={`w-4 h-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            <span>{language === 'tl' ? 'Oras:' : 'Time:'} <strong className={darkMode ? 'text-white' : 'text-slate-900'}>{seconds}s</strong></span>
          </div>
          <div>
            {language === 'tl' ? 'Tira:' : 'Moves:'} <span className={`font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>{moves}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 rounded-xl border ${
            darkMode ? 'bg-white/[0.06] border-white/10 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}>
            {language === 'tl' ? 'Pares:' : 'Matches:'} <span className={`font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{matchesFound}</span> / {cards.length / 2}
          </span>
          <button
            onClick={() => initGame(difficulty)}
            className={`p-2 rounded-xl border transition-all active:scale-95 ${
              darkMode ? 'bg-white/[0.08] text-slate-200 hover:bg-white/15 border-white/10' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
            }`}
            title={language === 'tl' ? 'I-reset ang Grid' : 'Reset Grid'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={`grid gap-2.5 sm:gap-4 ${
        cards.length <= 8 
          ? 'grid-cols-2 sm:grid-cols-4' 
          : cards.length <= 12 
            ? 'grid-cols-3 sm:grid-cols-4' 
            : 'grid-cols-3 sm:grid-cols-4'
      }`}>
        {cards.map(card => {
          const IconComp = iconMap[card.iconName] || Sparkles;
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <div
              key={card.uid}
              onClick={() => handleCardClick(card)}
              className={`h-24 sm:h-32 md:h-36 rounded-2xl sm:rounded-3xl border cursor-pointer select-none transition-all duration-300 flex flex-col items-center justify-center p-2 sm:p-3 text-center ${
                card.isMatched
                  ? darkMode
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 shadow-md shadow-emerald-500/10'
                    : 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-md ring-2 ring-emerald-400/40'
                  : isRevealed
                    ? darkMode
                      ? 'bg-amber-500/25 border-amber-400/50 shadow-lg text-white ring-2 ring-amber-400/30'
                      : 'bg-amber-50 border-amber-400 shadow-md text-amber-950 ring-2 ring-amber-400/40'
                    : darkMode
                      ? 'bg-gradient-to-br from-amber-600/80 to-amber-700/80 hover:from-amber-500 hover:to-amber-600 text-slate-950 border-amber-400/30 hover:scale-102 active:scale-98 shadow-md'
                      : 'bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-amber-500 hover:scale-102 active:scale-98 shadow-md'
              }`}
            >
              {isRevealed ? (
                <div className="space-y-1 sm:space-y-1.5 animate-in zoom-in-75 duration-200">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center mx-auto border ${
                    darkMode ? 'bg-amber-500/30 text-amber-300 border-amber-400/30' : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h4 className={`font-bold text-[11px] sm:text-xs md:text-sm leading-tight ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {card.title}
                  </h4>
                  <p className={`text-[9px] sm:text-[10px] line-clamp-2 leading-tight hidden xs:block ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {card.subtitle}
                  </p>
                </div>
              ) : (
                <div className="space-y-0.5 sm:space-y-1">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 mx-auto" />
                  <p className="text-[10px] font-black text-slate-950 uppercase tracking-wider">
                    {language === 'tl' ? 'Bibliya' : 'Bible'}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Victory Modal */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className={`rounded-3xl p-6 sm:p-8 max-w-sm w-full border shadow-2xl text-center space-y-4 animate-in zoom-in-95 backdrop-blur-2xl ${
            darkMode ? 'bg-slate-900/95 border-white/15' : 'bg-white border-slate-200'
          }`}>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/25">
              <Award className="w-10 h-10 text-slate-950" />
            </div>

            <div className="space-y-1">
              <h3 className={`text-xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'tl' ? 'Lahat ng Pares ay Naitugma!' : 'All Bible Pairs Matched!'}
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'tl'
                  ? `Natapos sa ${moves} na tira at ${seconds} na segundo.`
                  : `Completed in ${moves} moves and ${seconds} seconds.`}
              </p>
            </div>

            <div className={`p-3 rounded-2xl border text-xs font-bold ${
              darkMode ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-800'
            }`}>
              +{difficulty === 'easy' ? 40 : difficulty === 'medium' ? 70 : 100} XP {language === 'tl' ? 'Nakamit!' : 'Awarded!'}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => initGame(difficulty)}
                className="flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all"
              >
                {language === 'tl' ? 'Maglaro Ulit' : 'Play Again'}
              </button>
              <button
                onClick={() => setActiveScreen('dashboard')}
                className={`px-4 py-3 rounded-2xl font-bold text-xs border transition-all ${
                  darkMode ? 'bg-white/10 hover:bg-white/15 text-white border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
              >
                {language === 'tl' ? 'Tapos Na' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
