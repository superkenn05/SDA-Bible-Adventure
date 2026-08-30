import React, { useState } from 'react';
import { 
  ArrowLeft, 
  History, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ChevronRight,
  MapPin
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { churchHistoryEvents } from '../data/churchHistoryData';
import { ChurchHistoryEvent } from '../types';
import { sound } from '../utils/audio';
import { localizeHistoryEvent } from '../utils/localize';

export const ChurchHistoryScreen: React.FC = () => {
  const { addXpAndCoins, setActiveScreen, celebrate, language, darkMode } = useGame();

  const [activeTab, setActiveTab] = useState<'timeline' | 'quiz'>('timeline');
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const localizedEvents = churchHistoryEvents.map(e => localizeHistoryEvent(e, language));
  const selectedEvent = localizedEvents[selectedEventIndex] || localizedEvents[0];

  const eventsWithQuiz = localizedEvents.filter(e => e.quizQuestion);
  const currentQuizEvent = eventsWithQuiz[quizIndex % eventsWithQuiz.length];

  const handleSelectEvent = (index: number) => {
    sound.playClick();
    setSelectedEventIndex(index);
  };

  const handleQuizSelect = (idx: number) => {
    if (isAnswered || !currentQuizEvent?.quizQuestion) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQuizEvent.quizQuestion.correctAnswer) {
      sound.playCorrect();
      setQuizScore(prev => prev + 1);
      addXpAndCoins(35, 15, 'Church History Quiz');
      celebrate();
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextQuiz = () => {
    sound.playClick();
    setQuizIndex(prev => prev + 1);
    setSelectedOption(null);
    setIsAnswered(false);
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
          className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all shadow-xs backdrop-blur-md ${
            darkMode
              ? 'bg-white/10 hover:bg-white/20 border-white/15 text-slate-200'
              : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> {language === 'tl' ? 'Bumalik sa Dashboard' : 'Back to Dashboard'}
        </button>

        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
          darkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-900 border-amber-300'
        }`}>
          {language === 'tl' ? 'Pamanang Adventista at mga Pioneer' : 'Advent Heritage & Pioneers'}
        </span>
      </div>

      {/* Hero Header */}
      <div className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-xl space-y-3 ${
        darkMode 
          ? 'bg-gradient-to-r from-amber-950/70 via-stone-950/70 to-slate-950/70 border-white/10 text-white' 
          : 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/50 border-amber-200 text-slate-900'
      }`}>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold uppercase tracking-wider border ${
          darkMode 
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
            : 'bg-amber-100 text-amber-900 border-amber-300'
        }`}>
          <History className="w-3.5 h-3.5" />
          <span>{language === 'tl' ? 'Kasaysayan ng Kilusang Adventista' : 'Advent Movement Heritage'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {language === 'tl' ? 'Kasaysayan ng Simbahan at mga Pioneer' : 'Church History & Advent Pioneers'}
        </h1>
        <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {language === 'tl'
            ? '"Wala tayong dapat katakutan sa hinaharap, maliban kung ating kalilimutan kung paano tayo inakay ng Panginoon at ang Kanyang mga aral sa ating nakaraang kasaysayan." (Ellen G. White)'
            : '"We have nothing to fear for the future, except as we shall forget the way the Lord has led us, and His teaching in our past history." (Ellen G. White)'}
        </p>
      </div>

      {/* Sub Tabs */}
      <div className={`grid grid-cols-2 gap-1.5 sm:gap-2 p-1.5 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('timeline');
          }}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'timeline'
              ? 'bg-amber-500 text-slate-950 font-black shadow-md'
              : darkMode
                ? 'text-slate-300 hover:text-white hover:bg-white/10'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" /> {language === 'tl' ? 'Timeline 1844-1888' : 'Timeline 1844-1888'}
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('quiz');
          }}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'quiz'
              ? 'bg-amber-500 text-slate-950 font-black shadow-md'
              : darkMode
                ? 'text-slate-300 hover:text-white hover:bg-white/10'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Award className="w-3.5 h-3.5" /> {language === 'tl' ? 'Pagsusulit sa Kasaysayan' : 'Heritage Quiz'}
        </button>
      </div>

      {/* TIMELINE TAB */}
      {activeTab === 'timeline' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Year list */}
          <div className="space-y-2">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'tl' ? 'Kronolohiya ng mga Pangyayari' : 'Milestone Chronology'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 max-h-[480px] overflow-y-auto pr-1">
              {localizedEvents.map((event, idx) => {
                const isSelected = selectedEvent.year === event.year;
                return (
                  <button
                    key={event.year}
                    onClick={() => handleSelectEvent(idx)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? darkMode
                          ? 'bg-amber-500/25 border-amber-400 text-white ring-2 ring-amber-400/40 shadow-lg'
                          : 'bg-amber-100 border-amber-400 text-amber-950 ring-2 ring-amber-400/40 shadow-md'
                        : darkMode
                          ? 'bg-white/[0.06] backdrop-blur-xl border-white/10 text-slate-300 hover:bg-white/10'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className={`font-black text-sm block ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                        {event.year}
                      </span>
                      <span className={`text-xs line-clamp-1 ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                        {event.title}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Detail View (2 cols) */}
          <div className={`md:col-span-2 backdrop-blur-xl rounded-3xl p-5 sm:p-8 border shadow-xl space-y-5 ${
            darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${
              darkMode ? 'border-white/10' : 'border-slate-200'
            }`}>
              <div>
                <span className={`text-2xl font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                  {selectedEvent.year}
                </span>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {selectedEvent.title}
                </h3>
                <p className={`text-xs flex items-center gap-1 mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <MapPin className={`w-3.5 h-3.5 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} /> {selectedEvent.location}
                </p>
              </div>
            </div>

            <div className={`p-4 sm:p-5 rounded-2xl border space-y-2 ${
              darkMode ? 'bg-amber-500/10 border-amber-500/25' : 'bg-amber-50 border-amber-200'
            }`}>
              <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {language === 'tl' ? 'Pangkalahatang Kasaysayan' : 'Historic Overview'}
              </span>
              <p className={`text-sm leading-relaxed font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                {selectedEvent.description}
              </p>
            </div>

            <div className="space-y-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {language === 'tl' ? 'Mahahalagang Pioneer at Kahalagahan' : 'Key Pioneers & Significance'}
              </span>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedEvent.pioneers.map((fig, i) => (
                  <span key={i} className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
                    darkMode ? 'bg-white/[0.08] text-slate-200 border-white/10' : 'bg-slate-100 text-slate-800 border-slate-200'
                  }`}>
                    👤 {fig}
                  </span>
                ))}
              </div>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                💡 <span className={`font-semibold ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>{language === 'tl' ? 'Epekto sa Simbahan:' : 'Adventist Impact:'}</span> {selectedEvent.significance}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* QUIZ TAB */}
      {activeTab === 'quiz' && currentQuizEvent?.quizQuestion && (
        <div className={`backdrop-blur-xl rounded-3xl p-5 sm:p-8 border shadow-xl space-y-6 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${
            darkMode ? 'border-white/10' : 'border-slate-200'
          }`}>
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              {language === 'tl'
                ? `Hamon sa Kasaysayan (${quizIndex + 1} sa ${eventsWithQuiz.length})`
                : `Pioneer Heritage Challenge (${quizIndex + 1} of ${eventsWithQuiz.length})`}
            </span>
            <span className={`text-xs font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {language === 'tl' ? `Iskor: ${quizScore}` : `Score: ${quizScore}`}
            </span>
          </div>

          <h3 className={`text-base sm:text-lg font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {currentQuizEvent.quizQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuizEvent.quizQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuizEvent.quizQuestion?.correctAnswer;

              let style = darkMode 
                ? 'bg-white/[0.06] border-white/10 text-slate-200 hover:bg-white/10' 
                : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100';

              if (isAnswered) {
                if (isCorrect) {
                  style = darkMode
                    ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold ring-2 ring-emerald-400/40 shadow-lg'
                    : 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-400/40 shadow-md';
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
                  disabled={isAnswered}
                  onClick={() => handleQuizSelect(idx)}
                  className={`w-full p-4 rounded-2xl border text-left font-medium text-sm transition-all flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className={`w-4 h-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="space-y-3 animate-in fade-in">
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                darkMode ? 'bg-amber-500/15 border-amber-500/30 text-slate-300' : 'bg-amber-50 border-amber-300 text-slate-800'
              }`}>
                <p className={`font-bold mb-1 ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>{language === 'tl' ? 'Paliwanag sa Kasaysayan:' : 'Historical Fact:'}</p>
                <p className="leading-relaxed">{currentQuizEvent.quizQuestion.explanation}</p>
                <p className={`font-bold mt-1 ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>📖 {currentQuizEvent.quizQuestion.bibleReference}</p>
              </div>

              <button
                onClick={handleNextQuiz}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition-all"
              >
                {language === 'tl' ? 'Susunod na Tanong' : 'Next Heritage Question'}
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
