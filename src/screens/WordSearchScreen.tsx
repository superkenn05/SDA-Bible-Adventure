import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Award, 
  ChevronRight
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { wordSearchPuzzles } from '../data/wordSearchData';
import { sound } from '../utils/audio';
import { localizeWordSearch } from '../utils/localize';

export const WordSearchScreen: React.FC = () => {
  const { addXpAndCoins, setActiveScreen, celebrate, language, darkMode } = useGame();

  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const rawPuzzle = wordSearchPuzzles[currentPuzzleIdx];
  const puzzle = localizeWordSearch(rawPuzzle, language);

  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [isWon, setIsWon] = useState(false);

  const handleCellClick = (r: number, c: number) => {
    sound.playCardFlip();
    const isAlreadySelected = selectedCells.some(cell => cell.r === r && cell.c === c);

    let nextCells: { r: number; c: number }[];
    if (isAlreadySelected) {
      nextCells = selectedCells.filter(cell => !(cell.r === r && cell.c === c));
    } else {
      nextCells = [...selectedCells, { r, c }];
    }

    setSelectedCells(nextCells);

    // Check if the currently selected cells spell any word (forward or reverse)
    const spelledString = nextCells.map(cell => puzzle.grid[cell.r][cell.c]).join('');
    const reversedString = spelledString.split('').reverse().join('');

    const matchedWord = puzzle.words.find(
      w => (w === spelledString || w === reversedString) && !foundWords.includes(w)
    );

    if (matchedWord) {
      sound.playCorrect();
      const updatedFound = [...foundWords, matchedWord];
      setFoundWords(updatedFound);
      setSelectedCells([]);
      addXpAndCoins(30, 10, 'Word Search Match');

      if (updatedFound.length >= puzzle.words.length) {
        setIsWon(true);
        addXpAndCoins(100, 50, 'Word Search Complete');
        celebrate();
      }
    }
  };

  const handleClearSelection = () => {
    sound.playClick();
    setSelectedCells([]);
  };

  const switchPuzzle = (idx: number) => {
    sound.playClick();
    setCurrentPuzzleIdx(idx);
    setFoundWords([]);
    setSelectedCells([]);
    setIsWon(false);
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

        {/* Puzzle Themes */}
        <div className={`flex flex-wrap items-center gap-1.5 p-1 rounded-2xl border backdrop-blur-md ${
          darkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-100 border-slate-200'
        }`}>
          {wordSearchPuzzles.map((p, idx) => {
            const locP = localizeWordSearch(p, language);
            return (
              <button
                key={p.id}
                onClick={() => switchPuzzle(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentPuzzleIdx === idx
                    ? 'bg-teal-600 text-white font-black shadow-md'
                    : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {locP.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid & Words Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        
        {/* The Letter Grid (2 cols) */}
        <div className={`lg:col-span-2 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border shadow-xl space-y-4 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                darkMode ? 'text-teal-400' : 'text-teal-600'
              }`}>
                {language === 'tl' ? 'Word Search Puzzle' : 'Word Search Grid'}
              </span>
              <h2 className={`text-lg sm:text-xl font-bold ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {puzzle.title}
              </h2>
            </div>
            {selectedCells.length > 0 && (
              <button
                onClick={handleClearSelection}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20"
              >
                {language === 'tl' ? 'Alisin ang Pili' : 'Clear Selected'}
              </button>
            )}
          </div>

          {/* Letter Matrix with Touch & Scroll responsiveness */}
          <div className={`p-2 sm:p-4 rounded-2xl border flex flex-col gap-1 sm:gap-1.5 items-center select-none overflow-x-auto max-w-full ${
            darkMode ? 'bg-slate-950/60 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            {puzzle.grid.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-1 sm:gap-1.5 shrink-0">
                {row.map((letter, cIdx) => {
                  const isSelected = selectedCells.some(cell => cell.r === rIdx && cell.c === cIdx);

                  return (
                    <button
                      key={cIdx}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      className={`w-7 h-7 sm:w-9 sm:h-9 min-w-[28px] min-h-[28px] rounded-lg font-mono font-bold text-xs sm:text-sm flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-teal-500 text-white scale-105 shadow-md ring-2 ring-teal-400 font-black'
                          : darkMode
                            ? 'bg-white/[0.08] text-slate-200 border border-white/10 hover:bg-teal-500/20 active:scale-95'
                            : 'bg-white text-slate-800 border border-slate-300 hover:bg-teal-50 hover:border-teal-400 active:scale-95 shadow-xs'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <p className={`text-xs text-center ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {language === 'tl'
              ? '💡 Pindutin ang mga titik nang sunud-sunod upang piliin ang salita (pahalang, patayo, o pahilis).'
              : '💡 Tap letter tiles in order to select words horizontally, vertically, or diagonally.'}
          </p>
        </div>

        {/* Word Clues Checklist (1 col) */}
        <div className={`backdrop-blur-xl rounded-3xl p-4 sm:p-6 border shadow-xl space-y-4 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${
            darkMode ? 'border-white/10' : 'border-slate-200'
          }`}>
            <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'tl' ? 'Mga Hahanaping Salita' : 'Words to Find'}
            </h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
              darkMode ? 'text-teal-400 bg-teal-500/10 border-teal-500/20' : 'text-teal-800 bg-teal-100 border-teal-300'
            }`}>
              {foundWords.length} / {puzzle.words.length}
            </span>
          </div>

          <div className="space-y-2">
            {puzzle.words.map(word => {
              const isFound = foundWords.includes(word);
              const clue = (puzzle.clues && puzzle.clues[word]) || (language === 'tl' ? 'Salita sa Bibliya' : 'Bible Keyword');

              return (
                <div
                  key={word}
                  className={`p-2.5 sm:p-3 rounded-2xl border transition-all ${
                    isFound
                      ? darkMode
                        ? 'bg-teal-500/15 border-teal-500/30'
                        : 'bg-teal-50 border-teal-300'
                      : darkMode
                        ? 'bg-white/[0.04] border-white/5'
                        : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`font-mono font-bold text-xs tracking-wider ${
                      isFound 
                        ? (darkMode ? 'line-through text-teal-300' : 'line-through text-teal-700') 
                        : (darkMode ? 'text-white' : 'text-slate-800')
                    }`}>
                      {word}
                    </span>
                    {isFound && <CheckCircle2 className={`w-4 h-4 shrink-0 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />}
                  </div>
                  <p className={`text-[11px] leading-tight ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {clue}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Victory Modal */}
      {isWon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className={`rounded-3xl p-6 sm:p-8 max-w-sm w-full border shadow-2xl text-center space-y-4 animate-in zoom-in-95 backdrop-blur-2xl ${
            darkMode ? 'bg-slate-900/95 border-white/15' : 'bg-white border-slate-200'
          }`}>
            <div className="w-20 h-20 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-teal-500/25">
              <Award className="w-10 h-10 text-slate-950" />
            </div>

            <div className="space-y-1">
              <h3 className={`text-xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'tl' ? 'Word Search Nakumpleto!' : 'Word Search Completed!'}
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'tl'
                  ? `Nahanap mo ang lahat ng ${puzzle.words.length} na nakatagong salita.`
                  : `You located all ${puzzle.words.length} hidden words in the grid.`}
              </p>
            </div>

            <div className={`p-3 rounded-xl border text-xs font-bold ${
              darkMode ? 'bg-teal-500/20 border-teal-500/30 text-teal-300' : 'bg-teal-50 border-teal-300 text-teal-800'
            }`}>
              {language === 'tl' ? '+100 XP at +50 Talento ang Natanggap!' : '+100 XP and +50 Talents Awarded!'}
            </div>

            <button
              onClick={() => {
                const nextIdx = (currentPuzzleIdx + 1) % wordSearchPuzzles.length;
                switchPuzzle(nextIdx);
              }}
              className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1"
            >
              {language === 'tl' ? 'Susunod na Paksa' : 'Play Next Theme'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
