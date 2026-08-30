import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ChevronRight,
  Eye,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { characterCluesData } from '../data/characterClues';
import { CharacterClueItem } from '../types';
import { sound } from '../utils/audio';
import { localizeCharacter } from '../utils/localize';

export const CharacterGuessScreen: React.FC = () => {
  const { 
    addXpAndCoins, 
    updateUserStats, 
    setActiveScreen,
    celebrate,
    language,
    darkMode
  } = useGame();

  const [charactersList] = useState<CharacterClueItem[]>(() => 
    [...characterCluesData].sort(() => Math.random() - 0.5)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedCluesCount, setRevealedCluesCount] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  const rawChar = charactersList[currentIndex];
  const currentChar = localizeCharacter(rawChar, language);

  const handleRevealNextClue = () => {
    sound.playClick();
    if (revealedCluesCount < currentChar.clues.length) {
      setRevealedCluesCount(prev => prev + 1);
    }
  };

  const handleSelectCharacter = (name: string, rawName: string) => {
    if (isAnswered) return;
    setSelectedAnswer(name);
    setIsAnswered(true);

    const isCorrect = name === currentChar.correctAnswer || rawName === rawChar.correctAnswer;
    if (isCorrect) {
      sound.playCorrect();
      // More points for fewer clues revealed (Clue 1 = 50 XP, Clue 2 = 35 XP, Clue 3 = 20 XP)
      const earnedBonus = revealedCluesCount === 1 ? 50 : (revealedCluesCount === 2 ? 35 : 20);
      setScore(prev => prev + 1);
      setTotalXpEarned(prev => prev + earnedBonus);
      addXpAndCoins(earnedBonus, 15, 'Character Guessing');
      updateUserStats({ totalCorrectAnswers: 1 });
      celebrate();
    } else {
      sound.playIncorrect();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < charactersList.length) {
      setCurrentIndex(prev => prev + 1);
      setRevealedCluesCount(1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Re-shuffle for infinite replay
      setCurrentIndex(0);
      setRevealedCluesCount(1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playClick();
            setActiveScreen('dashboard');
          }}
          className={`px-4 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm backdrop-blur-md ${
            darkMode
              ? 'bg-white/10 hover:bg-white/20 border-white/15 text-slate-200'
              : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> {language === 'tl' ? 'Bumalik sa Dashboard' : 'Back to Dashboard'}
        </button>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-md ${
            darkMode
              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
              : 'bg-indigo-100 text-indigo-900 border-indigo-300'
          }`}>
            {language === 'tl' ? 'Hulaan ang Tauhan' : 'Mystery Clues Mode'}
          </span>
        </div>
      </div>

      {/* Main Character Guessing Card (Frosted Glass Panel) */}
      <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 ${
        darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
      }`}>
        
        {/* Header & Era Tag */}
        <div className={`flex items-center justify-between border-b pb-4 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
              {language === 'tl' ? `Misteryo ng Tauhan #${currentIndex + 1}` : `Bible Hero Mystery #${currentIndex + 1}`}
            </span>
            <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'tl' ? 'Sino Ako?' : 'Who Am I?'}
            </h2>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-md ${
            darkMode
              ? 'bg-white/10 text-slate-200 border-white/15'
              : 'bg-slate-100 text-slate-700 border-slate-300'
          }`}>
            {language === 'tl' ? `Panahon: ${currentChar.eraTl || currentChar.era}` : `Era: ${currentChar.era}`}
          </span>
        </div>

        {/* Progressive Clues Box */}
        <div className="space-y-3">
          <div className={`flex items-center justify-between text-xs font-bold uppercase tracking-wider ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <span>{language === 'tl' ? `Mga Pahiwatig (${revealedCluesCount}/3)` : `Investigate Clues (${revealedCluesCount}/3)`}</span>
            <span className={`font-bold ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
              {language === 'tl' ? `Gantimpala: ${revealedCluesCount === 1 ? '50 XP' : revealedCluesCount === 2 ? '35 XP' : '20 XP'}` : `Reward: ${revealedCluesCount === 1 ? '50 XP' : revealedCluesCount === 2 ? '35 XP' : '20 XP'}`}
            </span>
          </div>

          <div className="space-y-2.5">
            {currentChar.clues.slice(0, revealedCluesCount).map((clue, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border backdrop-blur-md flex items-start gap-3.5 animate-in fade-in slide-in-from-top-1 ${
                  darkMode 
                    ? 'bg-indigo-950/40 border-indigo-500/30' 
                    : 'bg-indigo-50/70 border-indigo-200'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 shadow-sm">
                  {idx + 1}
                </div>
                <p className={`text-sm leading-relaxed font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  "{clue}"
                </p>
              </div>
            ))}
          </div>

          {/* Reveal Next Clue Button */}
          {!isAnswered && revealedCluesCount < currentChar.clues.length && (
            <button
              onClick={handleRevealNextClue}
              className={`w-full py-3 rounded-2xl border border-dashed text-xs font-bold flex items-center justify-center gap-1.5 transition-all backdrop-blur-md ${
                darkMode
                  ? 'border-indigo-400/40 text-indigo-300 hover:bg-indigo-500/10'
                  : 'border-indigo-300 text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              <Eye className={`w-4 h-4 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} /> {language === 'tl' ? `Kailangan ng tulong? Ipakita ang Pahiwatig #${revealedCluesCount + 1}` : `Need a hint? Reveal Clue #${revealedCluesCount + 1}`}
            </button>
          )}
        </div>

        {/* Character Options Grid */}
        <div className="space-y-2 pt-2">
          <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {language === 'tl' ? 'Piliin ang Tamang Tauhan sa Bibliya:' : 'Choose the Correct Bible Character:'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentChar.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const rawOpt = rawChar.options[idx] || option;
              const isCorrect = option === currentChar.correctAnswer || rawOpt === rawChar.correctAnswer;
              
              let btnStyle = darkMode
                ? 'bg-slate-900/50 hover:bg-slate-900/80 border-white/10 hover:border-indigo-400/50 text-slate-200'
                : 'bg-slate-50 hover:bg-indigo-50/60 border-slate-300 hover:border-indigo-400 text-slate-800';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = darkMode
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold ring-2 ring-emerald-400/30 shadow-lg'
                    : 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-400/30 shadow-md';
                } else if (isSelected && !isCorrect) {
                  btnStyle = darkMode
                    ? 'bg-rose-950/80 border-rose-400 text-rose-200 font-bold'
                    : 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                } else {
                  btnStyle = darkMode
                    ? 'opacity-30 border-white/5 bg-slate-900/30 text-slate-500'
                    : 'opacity-40 border-slate-200 bg-slate-100 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectCharacter(option, rawOpt)}
                  className={`p-4 rounded-2xl border text-left font-bold text-sm transition-all flex items-center justify-between backdrop-blur-md ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Revealed Character Story Box */}
        {isAnswered && (
          <div className={`p-5 rounded-2xl border backdrop-blur-md space-y-2.5 animate-in fade-in ${
            darkMode
              ? 'bg-indigo-500/15 border-indigo-500/30'
              : 'bg-indigo-50 border-indigo-200'
          }`}>
            <div className="flex items-center gap-2">
              <UserCheck className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <h4 className={`font-bold text-sm ${darkMode ? 'text-indigo-200' : 'text-indigo-900'}`}>
                {currentChar.name} — {currentChar.title}
              </h4>
            </div>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {currentChar.description}
            </p>
            <div className={`text-xs font-bold flex items-center gap-1 ${darkMode ? 'text-indigo-300' : 'text-indigo-800'}`}>
              <BookOpen className="w-3.5 h-3.5" /> {currentChar.bibleReference}
            </div>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            {language === 'tl' ? 'Susunod na Tauhan sa Bibliya' : 'Next Bible Hero'} <ChevronRight className="w-4 h-4 text-white" />
          </button>
        )}

      </div>

    </div>
  );
};
