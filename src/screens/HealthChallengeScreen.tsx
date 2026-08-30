import React, { useState } from 'react';
import { 
  ArrowLeft, 
  HeartPulse, 
  Apple, 
  Activity, 
  Droplets, 
  Sun, 
  Scale, 
  Wind, 
  Moon, 
  Heart, 
  CheckCircle2, 
  ChevronRight, 
  Award,
  BookOpen
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { newstartPrinciples } from '../data/healthData';
import { HealthPrinciple } from '../types';
import { sound } from '../utils/audio';
import { localizePrinciple, localizeQuestion } from '../utils/localize';

export const HealthChallengeScreen: React.FC = () => {
  const { addXpAndCoins, setActiveScreen, celebrate, language, darkMode } = useGame();

  const [activeTab, setActiveTab] = useState<'principles' | 'hydration' | 'quiz'>('principles');
  const [selectedLetter, setSelectedLetter] = useState('N');
  const [waterGlasses, setWaterGlasses] = useState(3);

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const iconMap: Record<string, React.ElementType> = {
    Apple,
    Activity,
    Droplets,
    Sun,
    Scale,
    Wind,
    Moon,
    Heart
  };

  const localizedPrinciples = newstartPrinciples.map(p => localizePrinciple(p, language));
  const selectedPrinciple = localizedPrinciples.find(p => p.letter === selectedLetter) || localizedPrinciples[0];

  const allHealthQuestions = localizedPrinciples.flatMap(p => p.questions);

  const handleSelectPrinciple = (p: HealthPrinciple) => {
    sound.playClick();
    setSelectedLetter(p.letter);
  };

  const handleAddWater = () => {
    if (waterGlasses < 8) {
      sound.playClick();
      setWaterGlasses(prev => prev + 1);
      if (waterGlasses + 1 === 8) {
        sound.playLevelUp();
        addXpAndCoins(50, 25, '8 Glasses of Water Goal Reached!');
        celebrate();
      }
    }
  };

  const handleQuizOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const q = allHealthQuestions[currentQIndex % allHealthQuestions.length];
    if (idx === q.correctAnswer) {
      sound.playCorrect();
      setScore(prev => prev + 1);
      addXpAndCoins(30, 15, 'Health Quiz');
      celebrate();
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextQuiz = () => {
    sound.playClick();
    setCurrentQIndex(prev => prev + 1);
    setSelectedOpt(null);
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
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
            : 'bg-emerald-100 text-emerald-900 border-emerald-300'
        }`}>
          {language === 'tl' ? 'Mensahe ng Kalusugan (NEWSTART)' : 'NEWSTART Health Message'}
        </span>
      </div>

      {/* Hero Header */}
      <div className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-xl space-y-3 ${
        darkMode 
          ? 'bg-gradient-to-r from-emerald-950/70 via-teal-950/70 to-slate-950/70 border-white/10 text-white' 
          : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border-emerald-200 text-slate-900 shadow-md'
      }`}>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold uppercase tracking-wider border ${
          darkMode 
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
            : 'bg-emerald-100 text-emerald-900 border-emerald-300'
        }`}>
          <HeartPulse className="w-3.5 h-3.5" />
          <span>{language === 'tl' ? 'Katawan Bilang Templo' : 'Body Temple Ministry'}</span>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {language === 'tl' ? 'NEWSTART Kalusugan at Kaayusan' : 'NEWSTART Health & Wholeness'}
        </h1>
        <p className={`text-xs sm:text-sm max-w-xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {language === 'tl'
            ? '"Hindi ba ninyo nalalaman na ang inyong katawan ay templo ng Espiritu Santo na nasa inyo?" (1 Corinto 6:19). Alamin ang 8 likas na lunas ng Diyos para sa masiglang buhay!'
            : '"Do you not know that your body is the temple of the Holy Spirit who is in you?" (1 Corinthians 6:19). Learn God\'s 8 natural remedies for vitality!'}
        </p>
      </div>

      {/* Tabs */}
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 p-1.5 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('principles');
          }}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'principles'
              ? 'bg-emerald-600 text-white font-black shadow-md'
              : darkMode 
                ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Apple className="w-3.5 h-3.5" /> {language === 'tl' ? '8 Simulain' : '8 Principles'}
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('hydration');
          }}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'hydration'
              ? 'bg-emerald-600 text-white font-black shadow-md'
              : darkMode 
                ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Droplets className="w-3.5 h-3.5" /> {language === 'tl' ? 'Tagasubaybay ng Tubig' : 'Water Tracker'}
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('quiz');
          }}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'quiz'
              ? 'bg-emerald-600 text-white font-black shadow-md'
              : darkMode 
                ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Award className="w-3.5 h-3.5" /> {language === 'tl' ? 'Pagsusulit sa Kalusugan' : 'Health Quiz'}
        </button>
      </div>

      {/* PRINCIPLES TAB */}
      {activeTab === 'principles' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Letters List */}
          <div className="space-y-2">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'tl' ? 'Ang 8 Batas ng Kalusugan' : 'The 8 Laws of Health'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
              {localizedPrinciples.map(p => {
                const isSelected = selectedPrinciple.letter === p.letter;

                return (
                  <button
                    key={p.name}
                    onClick={() => handleSelectPrinciple(p)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? darkMode
                          ? 'bg-emerald-500/25 border-emerald-400 text-white ring-2 ring-emerald-400/40 shadow-lg'
                          : 'bg-emerald-100 border-emerald-400 text-slate-900 ring-2 ring-emerald-400/40 shadow-md'
                        : darkMode
                          ? 'bg-white/[0.06] backdrop-blur-xl border-white/10 text-slate-300 hover:bg-white/10'
                          : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-md">
                        {p.letter}
                      </span>
                      <div>
                        <p className={`font-bold text-xs sm:text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{p.name}</p>
                        <p className={`text-[10px] line-clamp-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{p.tagline}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Principle Detail (2 cols) */}
          <div className={`md:col-span-2 backdrop-blur-xl rounded-3xl p-5 sm:p-8 border shadow-xl space-y-5 ${
            darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <div className={`flex items-center justify-between border-b pb-4 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl shadow-lg ${
                  darkMode ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-emerald-100 border-emerald-300 text-emerald-700'
                }`}>
                  {React.createElement(iconMap[selectedPrinciple.icon] || Heart, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {language === 'tl'
                      ? `Titik ${selectedPrinciple.letter} sa N.E.W.S.T.A.R.T.`
                      : `Letter ${selectedPrinciple.letter} in N.E.W.S.T.A.R.T.`}
                  </span>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {selectedPrinciple.name}
                  </h3>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {language === 'tl' ? 'Pangkalahatang Aral sa Bibliya at Agham' : 'Biblical & Scientific Overview'}
              </span>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {selectedPrinciple.description}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1.5 ${
              darkMode ? 'bg-emerald-500/15 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <span className={`text-xs font-bold flex items-center gap-1.5 ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
                <BookOpen className="w-4 h-4" /> {language === 'tl' ? 'Batayan sa Banal na Kasulatan:' : 'Scripture Foundation:'}
              </span>
              <p className={`text-xs font-semibold italic ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                {selectedPrinciple.biblicalBasis}
              </p>
            </div>

            <div className="space-y-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {language === 'tl' ? 'Praktikal na Pang-araw-araw na Payo' : 'Practical Daily Tips'}
              </span>
              <div className="space-y-2">
                {selectedPrinciple.practicalTips.map((tip, i) => (
                  <div key={i} className={`p-3 rounded-2xl border text-xs flex items-start gap-2 ${
                    darkMode ? 'bg-white/[0.04] border-white/5 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-750'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* WATER TRACKER TAB */}
      {activeTab === 'hydration' && (
        <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-xl text-center space-y-6 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="w-16 h-16 rounded-2xl bg-sky-500 text-white font-black flex items-center justify-center mx-auto shadow-lg shadow-sky-500/25">
            <Droplets className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'tl' ? 'Araw-araw na Tagasubaybay ng Malinis na Tubig' : 'Daily Pure Water Tracker'}
            </h3>
            <p className={`text-xs max-w-md mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'tl'
                ? 'Nilikha ng Diyos ang tubig upang maglinis, magpasigla, at magpaginhawa sa iyong katawan. Abutin ang 8 baso ng malinis na tubig araw-araw!'
                : 'God created water to cleanse, energize, and refresh your body. Aim for 8 glasses of pure water every day!'}
            </p>
          </div>

          {/* Glasses Visualization */}
          <div className="flex justify-center gap-3 flex-wrap max-w-md mx-auto">
            {Array.from({ length: 8 }).map((_, idx) => {
              const isFilled = idx < waterGlasses;
              return (
                <button
                  key={idx}
                  onClick={handleAddWater}
                  className={`w-12 h-16 rounded-2xl border-2 transition-all flex flex-col items-center justify-end p-1.5 relative overflow-hidden ${
                    isFilled
                      ? 'bg-sky-500/25 border-sky-400 shadow-md'
                      : darkMode 
                        ? 'bg-white/[0.04] border-white/10 hover:border-white/20' 
                        : 'bg-slate-50 border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {isFilled ? (
                    <div className="w-full bg-sky-500 rounded-lg h-10 flex items-center justify-center text-white text-[10px] font-black">
                      💧
                    </div>
                  ) : (
                    <span className={`text-[10px] font-bold mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      #{idx + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {language === 'tl'
              ? `${waterGlasses} sa 8 Baso ang Narehistro Ngayong Araw (${Math.round((waterGlasses / 8) * 100)}%)`
              : `${waterGlasses} of 8 Glasses Logged Today (${Math.round((waterGlasses / 8) * 100)}%)`}
          </p>

          <button
            onClick={handleAddWater}
            disabled={waterGlasses >= 8}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-black text-xs shadow-lg transition-all"
          >
            {waterGlasses >= 8
              ? (language === 'tl' ? '8 Baso ng Tubig Nakumpleto! 🎉' : '8 Glasses Goal Completed! 🎉')
              : (language === 'tl' ? '+ Uminom ng Isang Basong Tubig' : '+ Drink a Glass of Water')}
          </button>
        </div>
      )}

      {/* HEALTH QUIZ TAB */}
      {activeTab === 'quiz' && allHealthQuestions.length > 0 && (
        <div className={`backdrop-blur-xl rounded-3xl p-5 sm:p-8 border shadow-xl space-y-6 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          {(() => {
            const currentQ = allHealthQuestions[currentQIndex % allHealthQuestions.length];
            return (
              <>
                <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${
                  darkMode ? 'border-white/10' : 'border-slate-200'
                }`}>
                  <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {language === 'tl'
                      ? `Karunungang NEWSTART (${(currentQIndex % allHealthQuestions.length) + 1} sa ${allHealthQuestions.length})`
                      : `NEWSTART Wisdom (${(currentQIndex % allHealthQuestions.length) + 1} of ${allHealthQuestions.length})`}
                  </span>
                  <span className={`text-xs font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {language === 'tl' ? `Iskor: ${score}` : `Score: ${score}`}
                  </span>
                </div>

                <h3 className={`text-base sm:text-lg font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {currentQ.question}
                </h3>

                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOpt === idx;
                    const isCorrect = idx === currentQ.correctAnswer;

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
                        onClick={() => handleQuizOption(idx)}
                        className={`w-full p-4 rounded-2xl border text-left font-medium text-sm transition-all flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className={`p-4 rounded-2xl border text-xs ${
                      darkMode ? 'bg-emerald-500/15 border-emerald-500/30 text-slate-300' : 'bg-emerald-50 border-emerald-200 text-slate-700'
                    }`}>
                      <p className={`font-bold mb-1 ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
                        {language === 'tl' ? 'Paliwanag sa Kalusugan:' : 'Health Insight:'}
                      </p>
                      <p className="leading-relaxed">{currentQ.explanation}</p>
                      <p className={`font-bold mt-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>📖 {currentQ.bibleReference}</p>
                    </div>

                    <button
                      onClick={handleNextQuiz}
                      className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg transition-all"
                    >
                      {language === 'tl' ? 'Susunod na Tanong sa Kalusugan' : 'Next Health Question'}
                    </button>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

    </div>
  );
};
