import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Compass, 
  Shield, 
  Award, 
  CheckCircle2, 
  Lock, 
  ChevronRight
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { pathfinderRanks, pathfinderHonors } from '../data/pathfinderData';
import { PathfinderHonor } from '../types';
import { sound } from '../utils/audio';
import { localizeHonor, localizeRank } from '../utils/localize';

export const PathfinderScreen: React.FC = () => {
  const { user, unlockHonor, setActiveScreen, celebrate, language, darkMode } = useGame();
  
  const [selectedHonorId, setSelectedHonorId] = useState<string | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [honorEarnedModal, setHonorEarnedModal] = useState<PathfinderHonor | null>(null);

  const rawRank = pathfinderRanks.find(r => r.id === user.pathfinderRankId) || pathfinderRanks[0];
  const currentRank = localizeRank(rawRank, language);

  const rawSelectedHonor = selectedHonorId ? pathfinderHonors.find(h => h.id === selectedHonorId) || null : null;
  const selectedHonor = rawSelectedHonor ? localizeHonor(rawSelectedHonor, language) : null;

  const handleStartHonorQuiz = (honor: PathfinderHonor) => {
    sound.playClick();
    setSelectedHonorId(honor.id);
    setQuizIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizScore(0);
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswered || !selectedHonor) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const currentQ = selectedHonor.quiz[quizIndex];
    if (idx === currentQ.correctAnswer) {
      sound.playCorrect();
      setQuizScore(prev => prev + 1);
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextHonorQuestion = () => {
    if (!selectedHonor) return;
    sound.playClick();

    if (quizIndex + 1 < selectedHonor.quiz.length) {
      setQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished Honor Quiz
      const passed = quizScore + (selectedOption === selectedHonor.quiz[quizIndex]?.correctAnswer ? 1 : 0) >= 1;
      if (passed) {
        unlockHonor(selectedHonor.id);
        setHonorEarnedModal(selectedHonor);
        celebrate();
      }
      setSelectedHonorId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in">
      
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => {
            sound.playClick();
            setActiveScreen('dashboard');
          }}
          className={`px-3.5 py-2 rounded-2xl backdrop-blur-md border text-xs font-semibold flex items-center gap-2 transition-all shadow-xs ${
            darkMode 
              ? 'bg-white/[0.08] border-white/15 text-slate-200 hover:bg-white/15' 
              : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> {language === 'tl' ? 'Bumalik sa Dashboard' : 'Back to Dashboard'}
        </button>

        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
          darkMode 
            ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' 
            : 'bg-sky-100 text-sky-900 border-sky-300'
        }`}>
          {language === 'tl' ? 'Pakikipagsapalaran ng Pathfinder' : 'Pathfinder Club Adventure'}
        </span>
      </div>

      {/* Hero Banner */}
      <div className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-xl space-y-3 ${
        darkMode 
          ? 'bg-gradient-to-r from-sky-950/70 via-blue-950/70 to-indigo-950/70 border-white/10 text-white' 
          : 'bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-50 border-sky-200 text-slate-900 shadow-md'
      }`}>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold uppercase tracking-wider border ${
          darkMode 
            ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' 
            : 'bg-sky-200/80 text-sky-900 border-sky-300'
        }`}>
          <Compass className="w-3.5 h-3.5" />
          <span>{language === 'tl' ? 'Mga Klase at Honor ng Pathfinder' : 'Pathfinder Club Classes & Honors'}</span>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {language === 'tl' ? 'Pathfinder Adventure at mga Honor Patch' : 'Pathfinder Adventure & Honor Patches'}
        </h1>
        <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {language === 'tl'
            ? '"Ang Pag-ibig ni Kristo ang Nag-uudyok sa Amin." Umabante sa 7 Klase ng Pathfinder, tapusin ang mga hamon sa kalikasan, camping, first-aid, at magkamit ng mga digital honor badge!'
            : '"The Love of Christ Compelleth Us." Advance through the 7 Pathfinder Classes, conquer camping challenges, nature honors, first-aid missions, and earn authentic digital badges!'}
        </p>
      </div>

      {/* Current Rank Banner */}
      <div className={`backdrop-blur-xl rounded-3xl p-5 sm:p-6 border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-sky-500/20 shrink-0">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`font-bold text-base sm:text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'tl' ? `Kasalukuyang Klase: ${currentRank.name}` : `Current Class: ${currentRank.name}`}
              </h3>
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                darkMode ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-sky-100 text-sky-800 border-sky-300'
              }`}>
                {currentRank.ageGroup}
              </span>
            </div>
            <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {currentRank.description}
            </p>
          </div>
        </div>
        
        <div className={`sm:text-right shrink-0 p-3 sm:p-0 rounded-2xl border sm:border-0 ${
          darkMode ? 'bg-white/[0.04] sm:bg-transparent border-white/10' : 'bg-slate-50 sm:bg-transparent border-slate-200'
        }`}>
          <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {language === 'tl' ? 'Nakamit na mga Honor' : 'Club Honors Earned'}
          </p>
          <p className={`text-xl sm:text-2xl font-black ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>
            {user.earnedHonorIds.length} / {pathfinderHonors.length}
          </p>
        </div>
      </div>

      {/* Pathfinder Ranks Progression Chain */}
      <div className="space-y-2">
        <h3 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {language === 'tl' ? 'Antas ng mga Klase sa Pathfinder' : 'Pathfinder Class Rank Hierarchy'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {pathfinderRanks.map(rank => {
            const locRank = localizeRank(rank, language);
            const isCurrent = rank.id === user.pathfinderRankId;
            const isUnlocked = user.xp >= rank.requiredXp;

            return (
              <div
                key={rank.id}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? darkMode
                      ? 'bg-sky-500/25 border-sky-400 text-white ring-2 ring-sky-400/40 shadow-lg'
                      : 'bg-sky-100 border-sky-400 text-slate-900 ring-2 ring-sky-400/40 shadow-md'
                    : isUnlocked
                      ? darkMode
                        ? 'bg-white/[0.06] backdrop-blur-md border-white/10 text-slate-200'
                        : 'bg-white border-slate-200 text-slate-800'
                      : darkMode
                        ? 'bg-white/[0.02] border-white/5 opacity-50 text-slate-400'
                        : 'bg-slate-100 border-slate-200 opacity-60 text-slate-500'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-1.5 text-xs font-bold ${
                  darkMode ? 'bg-white/[0.08]' : 'bg-slate-100'
                }`}>
                  {isUnlocked ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Lock className="w-3.5 h-3.5 text-slate-400" />}
                </div>
                <p className="font-bold text-xs">{locRank.name}</p>
                <p className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{rank.requiredXp} XP</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Honors Patches Grid */}
      <div className="space-y-3">
        <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {language === 'tl' ? 'Mga Honor Patch (Pindutin upang Masungkit)' : 'Digital Honor Badges (Tap to Earn)'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pathfinderHonors.map(rawH => {
            const honor = localizeHonor(rawH, language);
            const isEarned = user.earnedHonorIds.includes(honor.id);

            return (
              <div
                key={honor.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                  isEarned
                    ? darkMode
                      ? 'bg-emerald-500/10 backdrop-blur-xl border-emerald-500/30 shadow-md shadow-emerald-500/10'
                      : 'bg-emerald-50 backdrop-blur-xl border-emerald-300 shadow-md ring-1 ring-emerald-300/50'
                    : darkMode
                      ? 'bg-white/[0.06] backdrop-blur-xl border-white/10 hover:border-sky-400/40 shadow-lg'
                      : 'bg-white backdrop-blur-xl border-slate-200 hover:border-sky-400 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-2xl ${honor.color} text-slate-950 flex items-center justify-center shadow-md font-black`}>
                      <Award className="w-6 h-6" />
                    </div>
                    {isEarned ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> {language === 'tl' ? 'Nakamit' : 'Earned'}
                      </span>
                    ) : (
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        darkMode ? 'bg-white/[0.06] text-slate-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {honor.categoryTl || honor.category}
                      </span>
                    )}
                  </div>

                  <h4 className={`font-bold text-base mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {honor.name}
                  </h4>
                  <p className={`text-xs mb-3 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {honor.description}
                  </p>

                  <div className="space-y-1 mb-4">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {language === 'tl' ? 'Pangunahing Kahingian:' : 'Key Requirements:'}
                    </p>
                    {honor.requirements.slice(0, 2).map((req, i) => (
                      <p key={i} className={`text-[11px] flex items-start gap-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        • <span>{req}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleStartHonorQuiz(honor)}
                  className={`w-full py-3 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 ${
                    isEarned
                      ? darkMode
                        ? 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                      : 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-black'
                  }`}
                >
                  {isEarned
                    ? (language === 'tl' ? 'Balikan ang Pagsusulit' : 'Review Honor Quiz')
                    : (language === 'tl' ? 'Kumuha ng Pagsusulit sa Honor' : 'Take Honor Test & Earn Patch')} <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Honor Test Quiz Modal */}
      {selectedHonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className={`backdrop-blur-2xl rounded-3xl p-6 sm:p-8 max-w-lg w-full border shadow-2xl space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-slate-900/95 border-white/15' : 'bg-white border-slate-200'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <div>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>
                  {selectedHonor.name} {language === 'tl' ? 'Pagsusulit sa Honor' : 'Honor Exam'}
                </span>
                <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'tl'
                    ? `Tanong ${quizIndex + 1} sa ${selectedHonor.quiz.length}`
                    : `Question ${quizIndex + 1} of ${selectedHonor.quiz.length}`}
                </h3>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className={`text-base font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {selectedHonor.quiz[quizIndex].question}
              </h4>
            </div>

            <div className="space-y-2.5">
              {selectedHonor.quiz[quizIndex].options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === selectedHonor.quiz[quizIndex].correctAnswer;

                let style = darkMode 
                  ? 'bg-white/[0.06] border-white/10 text-slate-200 hover:bg-white/10' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                if (isAnswered) {
                  if (isCorrect) {
                    style = darkMode
                      ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold ring-2 ring-emerald-400/40 shadow-md'
                      : 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-400/40 shadow-md';
                  } else if (isSelected && !isCorrect) {
                    style = darkMode
                      ? 'bg-rose-500/25 border-rose-400 text-rose-200 font-bold'
                      : 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                  } else {
                    style = 'opacity-40 border-slate-300/30';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full p-3.5 rounded-2xl border text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between ${style}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="space-y-3 animate-in fade-in">
                <div className={`p-3.5 rounded-2xl border text-xs ${
                  darkMode ? 'bg-sky-500/15 border-sky-500/30 text-slate-300' : 'bg-sky-50 border-sky-300 text-slate-700'
                }`}>
                  <p className={`font-bold mb-0.5 ${darkMode ? 'text-sky-300' : 'text-sky-800'}`}>{language === 'tl' ? 'Paliwanag:' : 'Explanation:'}</p>
                  <p>{selectedHonor.quiz[quizIndex].explanation}</p>
                </div>

                <button
                  onClick={handleNextHonorQuestion}
                  className="w-full py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg transition-all"
                >
                  {quizIndex + 1 < selectedHonor.quiz.length
                    ? (language === 'tl' ? 'Susunod na Tanong' : 'Next Question')
                    : (language === 'tl' ? 'Tapusin ang Pagsusulit sa Honor' : 'Complete Honor Test')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Honor Earned Celebration Modal */}
      {honorEarnedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className={`backdrop-blur-2xl rounded-3xl p-6 sm:p-8 max-w-sm w-full border shadow-2xl text-center space-y-4 animate-in zoom-in-95 ${
            darkMode ? 'bg-slate-900/95 border-white/15' : 'bg-white border-slate-200'
          }`}>
            <div className={`w-20 h-20 rounded-3xl ${honorEarnedModal.color} text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-sky-500/25 font-black`}>
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                {language === 'tl' ? 'Honor Nakamit!' : 'Honor Earned!'}
              </span>
              <h3 className={`text-xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {honorEarnedModal.name} Patch
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'tl'
                  ? '+150 XP at +75 Talento ang naidagdag sa iyong Pathfinder record!'
                  : '+150 XP and +75 Talents awarded to your Pathfinder record!'}
              </p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setHonorEarnedModal(null);
              }}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition-all"
            >
              {language === 'tl' ? 'Ilagay sa Honor Sash' : 'Pin to Honor Sash'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
