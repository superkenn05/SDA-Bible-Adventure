import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { verseChallengesData } from '../data/verseChallenges';
import { VerseChallengeItem } from '../types';
import { sound } from '../utils/audio';
import { localizeVerseChallenge } from '../utils/localize';

export const VerseChallengeScreen: React.FC = () => {
  const { 
    addXpAndCoins, 
    updateUserStats, 
    setActiveScreen, 
    celebrate, 
    language,
    darkMode
  } = useGame();

  const [mode, setMode] = useState<'scramble' | 'fill_blank'>('scramble');
  const [verseList] = useState<VerseChallengeItem[]>(verseChallengesData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const rawVerse = verseList[currentIndex];
  const currentVerse = localizeVerseChallenge(rawVerse, language);

  const originalWords = currentVerse.scrambledWords || currentVerse.fullVerse.split(' ');
  const [availableWords, setAvailableWords] = useState<{ id: string; word: string }[]>(() => {
    return originalWords
      .map((w, i) => ({ id: `${w}-${i}`, word: w }))
      .sort(() => Math.random() - 0.5);
  });
  const [selectedWords, setSelectedWords] = useState<{ id: string; word: string }[]>([]);
  const [isScrambleComplete, setIsScrambleComplete] = useState(false);
  const [scrambleError, setScrambleError] = useState(false);

  // Fill blank state
  const [selectedBlankWord, setSelectedBlankWord] = useState<string | null>(null);
  const [isBlankRevealed, setIsBlankRevealed] = useState(false);

  const resetScramble = (verseItem: VerseChallengeItem) => {
    const words = (verseItem.scrambledWords || verseItem.fullVerse.split(' ')).map((w, i) => ({
      id: `${w}-${i}`,
      word: w
    }));
    setAvailableWords([...words].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setIsScrambleComplete(false);
    setScrambleError(false);
  };

  useEffect(() => {
    resetScramble(currentVerse);
  }, [currentIndex, language]);

  const handleWordClick = (item: { id: string; word: string }) => {
    if (isScrambleComplete) return;
    sound.playCardFlip();
    setAvailableWords(prev => prev.filter(w => w.id !== item.id));
    setSelectedWords(prev => [...prev, item]);
    setScrambleError(false);
  };

  const handleRemoveWord = (item: { id: string; word: string }) => {
    if (isScrambleComplete) return;
    sound.playCardFlip();
    setSelectedWords(prev => prev.filter(w => w.id !== item.id));
    setAvailableWords(prev => [...prev, item]);
    setScrambleError(false);
  };

  const checkScramble = () => {
    const userSentence = selectedWords.map(w => w.word).join(' ');
    const correctSentence = originalWords.join(' ');

    if (userSentence === correctSentence) {
      sound.playCorrect();
      setIsScrambleComplete(true);
      setScrambleError(false);
      addXpAndCoins(40, 20, 'Verse Scramble');
      updateUserStats({ versesMemorized: 1 });
      celebrate();
    } else {
      sound.playIncorrect();
      setScrambleError(true);
    }
  };

  const handleSelectBlank = (word: string) => {
    if (isBlankRevealed) return;
    setSelectedBlankWord(word);
    setIsBlankRevealed(true);

    const isCorrect = word === currentVerse.correctWord;
    if (isCorrect) {
      sound.playCorrect();
      addXpAndCoins(35, 15, 'Verse Blank');
      updateUserStats({ versesMemorized: 1 });
      celebrate();
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextVerse = () => {
    sound.playClick();
    const nextIdx = (currentIndex + 1) % verseList.length;
    setCurrentIndex(nextIdx);
    resetScramble(localizeVerseChallenge(verseList[nextIdx], language));
    setSelectedBlankWord(null);
    setIsBlankRevealed(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in">
      
      {/* Top Bar */}
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

        {/* Mode Switcher */}
        <div className={`flex items-center gap-1 p-1 rounded-2xl border backdrop-blur-md ${
          darkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => {
              sound.playClick();
              setMode('scramble');
              resetScramble(currentVerse);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'scramble'
                ? 'bg-emerald-600 text-white font-black shadow-md'
                : darkMode
                  ? 'text-slate-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            {language === 'tl' ? 'Ayusin ang Talata (Scramble)' : 'Arrange Scramble'}
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setMode('fill_blank');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'fill_blank'
                ? 'bg-emerald-600 text-white font-black shadow-md'
                : darkMode
                  ? 'text-slate-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            {language === 'tl' ? 'Punan ang Patlang' : 'Fill in the Blank'}
          </button>
        </div>
      </div>

      {/* Main Challenge Box */}
      <div className={`backdrop-blur-xl rounded-3xl p-5 sm:p-8 border shadow-xl space-y-6 ${
        darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
      }`}>
        
        {/* Header */}
        <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-4 ${
          darkMode ? 'border-white/10' : 'border-slate-200'
        }`}>
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${
              darkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              {language === 'tl' ? `Paksa: ${currentVerse.theme}` : `Theme: ${currentVerse.theme}`}
            </span>
            <h2 className={`text-xl sm:text-2xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {currentVerse.reference}
            </h2>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
            darkMode ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
          }`}>
            {language === 'tl' ? `Pagsasaulo ng Talata #${currentIndex + 1}` : `Memory Verse #${currentIndex + 1}`}
          </span>
        </div>

        {/* SCRAMBLE SUB-MODE */}
        {mode === 'scramble' && (
          <div className="space-y-6">
            
            {/* Assembled Words Drop Zone */}
            <div className="space-y-2">
              <div className={`flex items-center justify-between text-xs font-bold uppercase tracking-wider ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <span>{language === 'tl' ? 'Ang Iyong Nabuong Talata:' : 'Your Assembled Verse:'}</span>
                <span className={`text-[11px] font-normal ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {language === 'tl' ? '(Pindutin ang salita upang alisin)' : '(Tap word to remove)'}
                </span>
              </div>
              <div className={`min-h-24 p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-wrap gap-1.5 sm:gap-2 items-center ${
                isScrambleComplete
                  ? darkMode
                    ? 'bg-emerald-500/20 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                    : 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-md'
                  : scrambleError
                    ? darkMode ? 'bg-rose-500/20 border-rose-500/50' : 'bg-rose-50 border-rose-300'
                    : darkMode ? 'bg-slate-950/50 border-dashed border-white/20' : 'bg-slate-50 border-dashed border-slate-300'
              }`}>
                {selectedWords.length === 0 ? (
                  <p className={`text-xs italic ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {language === 'tl'
                      ? 'Pindutin ang mga salita sa ibaba ayon sa tamang pagkakasunod-sunod...'
                      : 'Tap the scrambled word cards below in the correct order...'}
                  </p>
                ) : (
                  selectedWords.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleRemoveWord(item)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
                    >
                      {item.word}
                    </button>
                  ))
                )}
              </div>
              {scrambleError && (
                <p className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> {language === 'tl' ? 'Mali ang pagkakasunod-sunod. Pindutin ang salita upang ayusin muli!' : 'Order is not quite right. Tap words to rearrange!'}
                </p>
              )}
            </div>

            {/* Available Scrambled Word Pool */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {language === 'tl' ? 'Pagpipiliang mga Salita (Pindutin upang ilagay):' : 'Word Pool (Tap to place):'}
              </label>
              <div className={`flex flex-wrap gap-1.5 sm:gap-2 p-3 rounded-2xl border ${
                darkMode ? 'bg-slate-950/50 border-white/10' : 'bg-slate-100 border-slate-200'
              }`}>
                {availableWords.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleWordClick(item)}
                    className={`px-3 py-1.5 rounded-xl border font-semibold text-xs sm:text-sm active:scale-95 transition-all ${
                      darkMode
                        ? 'bg-white/[0.08] border-white/15 text-slate-100 hover:border-emerald-400 hover:bg-white/15'
                        : 'bg-white border-slate-300 text-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 shadow-xs'
                    }`}
                  >
                    {item.word}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {!isScrambleComplete ? (
                <>
                  <button
                    onClick={checkScramble}
                    disabled={selectedWords.length === 0}
                    className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> {language === 'tl' ? 'Suriin ang Pagkakasunod-sunod' : 'Verify Scripture Order'}
                  </button>
                  <button
                    onClick={() => resetScramble(currentVerse)}
                    className={`p-3.5 rounded-2xl border transition-all active:scale-95 ${
                      darkMode ? 'bg-white/[0.08] hover:bg-white/15 text-slate-200 border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    }`}
                    title={language === 'tl' ? 'Ulitin' : 'Reset Scramble'}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNextVerse}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  {language === 'tl' ? 'Susunod na Hamon sa Talata' : 'Next Verse Challenge'} <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        )}

        {/* FILL IN THE BLANK SUB-MODE */}
        {mode === 'fill_blank' && (
          <div className="space-y-6">
            
            <div className={`p-5 sm:p-6 rounded-2xl border ${
              darkMode ? 'bg-emerald-500/10 border-emerald-500/25' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <p className={`text-base sm:text-lg font-serif leading-relaxed ${
                darkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                "{currentVerse.blankVerse}"
              </p>
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-wider ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {language === 'tl' ? 'Piliin ang nawawalang salita:' : 'Choose the missing word:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {(currentVerse.missingWordOptions || []).map((word, idx) => {
                  const isSelected = selectedBlankWord === word;
                  const isCorrect = word === currentVerse.correctWord;

                  let style = darkMode 
                    ? 'bg-white/[0.06] border-white/10 text-slate-100 hover:bg-white/10' 
                    : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100';

                  if (isBlankRevealed) {
                    if (isCorrect) {
                      style = darkMode
                        ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 font-black ring-2 ring-emerald-400/40 shadow-lg'
                        : 'bg-emerald-100 border-emerald-500 text-emerald-900 font-black ring-2 ring-emerald-400/40 shadow-md';
                    } else if (isSelected && !isCorrect) {
                      style = darkMode
                        ? 'bg-rose-500/25 border-rose-400 text-rose-200 font-bold'
                        : 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                    } else {
                      style = darkMode
                        ? 'opacity-40 border-white/5 bg-slate-900/30'
                        : 'opacity-40 border-slate-200 bg-slate-100 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isBlankRevealed}
                      onClick={() => handleSelectBlank(word)}
                      className={`p-3.5 sm:p-4 rounded-2xl border text-center font-bold text-sm transition-all flex items-center justify-center gap-2 ${style}`}
                    >
                      <span>{word}</span>
                      {isBlankRevealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {isBlankRevealed && (
              <div className="space-y-3 animate-in fade-in">
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                  darkMode ? 'bg-white/[0.06] border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{language === 'tl' ? 'Buong Talata: ' : 'Full Passage: '}</span>
                  {currentVerse.fullVerse}
                </div>

                <button
                  onClick={handleNextVerse}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  {language === 'tl' ? 'Susunod na Hamon sa Talata' : 'Next Verse Challenge'} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
