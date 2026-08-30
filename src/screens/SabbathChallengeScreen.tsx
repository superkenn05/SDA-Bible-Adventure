import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sunrise, 
  Moon, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Volume2,
  Calendar
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sabbathActivitiesData, sabbathPreparationChecklist, sabbathBlessings } from '../data/sabbathData';
import { sound } from '../utils/audio';
import { localizeSabbathActivity, localizePreparationStep } from '../utils/localize';

export const SabbathChallengeScreen: React.FC = () => {
  const { 
    addXpAndCoins, 
    updateUserStats, 
    checkAndAwardBadges, 
    setActiveScreen,
    celebrate,
    language,
    darkMode
  } = useGame();

  const [activeTab, setActiveTab] = useState<'sorting' | 'checklist' | 'blessings'>('sorting');
  
  // Sorting game state
  const [activitiesList] = useState(() => 
    [...sabbathActivitiesData].sort(() => Math.random() - 0.5)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSortChoice, setSelectedSortChoice] = useState<boolean | null>(null);
  const [isSortRevealed, setIsSortRevealed] = useState(false);
  const [sortScore, setSortScore] = useState(0);
  const [sortRoundComplete, setSortRoundComplete] = useState(false);

  // Preparation checklist state
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const rawActivity = activitiesList[currentIndex];
  const currentActivity = localizeSabbathActivity(rawActivity, language);

  const handleSortChoice = (isAppropriateChoice: boolean) => {
    if (isSortRevealed) return;
    setSelectedSortChoice(isAppropriateChoice);
    setIsSortRevealed(true);

    const isCorrect = isAppropriateChoice === currentActivity.isSabbathAppropriate;
    if (isCorrect) {
      sound.playCorrect();
      setSortScore(prev => prev + 1);
      addXpAndCoins(25, 10, 'Sabbath Activity Sort');
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextActivity = () => {
    sound.playClick();
    if (currentIndex + 1 < activitiesList.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedSortChoice(null);
      setIsSortRevealed(false);
    } else {
      setSortRoundComplete(true);
      updateUserStats({ sabbathsCelebrated: 1 });
      checkAndAwardBadges();
      celebrate();
    }
  };

  const toggleChecklistStep = (id: string) => {
    sound.playCardFlip();
    setCheckedSteps(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        addXpAndCoins(15, 5, 'Sabbath Prep Step');
      }
      return next;
    });
  };

  const playSunsetChime = () => {
    sound.playSabbathChime();
    celebrate();
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
          className={`px-3.5 py-2 rounded-2xl backdrop-blur-md border text-xs font-semibold flex items-center gap-2 transition-all shadow-xs ${
            darkMode 
              ? 'bg-white/[0.08] border-white/15 text-slate-200 hover:bg-white/15' 
              : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> {language === 'tl' ? 'Bumalik sa Dashboard' : 'Back to Dashboard'}
        </button>

        <button
          onClick={playSunsetChime}
          className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-black shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <Volume2 className="w-4 h-4" /> {language === 'tl' ? 'Patunugin ang Kampana ng Paglubog' : 'Ring Sunset Bell'}
        </button>
      </div>

      {/* Sabbath Sanctuary Banner */}
      <div className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-xl space-y-3 relative overflow-hidden ${
        darkMode 
          ? 'bg-gradient-to-r from-rose-950/70 via-purple-950/70 to-indigo-950/70 border-white/10 text-white' 
          : 'bg-gradient-to-r from-rose-50 via-purple-50 to-indigo-50 border-rose-200 text-slate-900 shadow-md'
      }`}>
        <div className="relative z-10">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold uppercase tracking-wider border mb-2 ${
            darkMode 
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' 
              : 'bg-rose-100 text-rose-900 border-rose-300'
          }`}>
            <Sunrise className="w-3.5 h-3.5" />
            <span>{language === 'tl' ? 'Banal na Alaala sa Ikapitong Araw' : 'Holy Seventh-Day Memorial'}</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {language === 'tl' ? 'Dambana at Hamon sa Sabbath' : 'Sabbath Sanctuary & Challenge'}
          </h1>
          <p className={`text-xs sm:text-sm max-w-xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {language === 'tl'
              ? '"Alalahanin mo ang araw ng Sabbath, upang ipangilin." (Exodo 20:8). Damhin ang payapang kagalakan mula sa paglubog ng araw sa Biyernes hanggang sa paglubog sa Sabado.'
              : '"Remember the Sabbath day, to keep it holy." (Exodus 20:8). Experience the peaceful joy of Friday sunset to Saturday sunset.'}
          </p>
        </div>

        <div className="absolute right-4 bottom-2 opacity-10 pointer-events-none">
          <Sunrise className="w-40 h-40" />
        </div>
      </div>

      {/* Mode Sub-Tabs */}
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 p-1.5 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('sorting');
          }}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'sorting'
              ? 'bg-rose-600 text-white font-black shadow-md'
              : darkMode 
                ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> {language === 'tl' ? 'Pagsusuri ng Gawain' : 'Activity Sorting'}
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('checklist');
          }}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'checklist'
              ? 'bg-rose-600 text-white font-black shadow-md'
              : darkMode 
                ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" /> {language === 'tl' ? 'Paghahanda sa Biyernes' : 'Friday Preparation'}
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('blessings');
          }}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'blessings'
              ? 'bg-rose-600 text-white font-black shadow-md'
              : darkMode 
                ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> {language === 'tl' ? 'Kaluguran sa Sabbath' : 'Sabbath Delight'}
        </button>
      </div>

      {/* SORTING GAME TAB */}
      {activeTab === 'sorting' && (
        <div className={`backdrop-blur-xl rounded-3xl p-5 sm:p-8 border shadow-xl space-y-6 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          
          {!sortRoundComplete ? (
            <>
              <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${
                darkMode ? 'border-white/10' : 'border-slate-200'
              }`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                  {language === 'tl'
                    ? `Gawain ${currentIndex + 1} sa ${activitiesList.length}`
                    : `Activity ${currentIndex + 1} of ${activitiesList.length}`}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  darkMode ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-rose-100 text-rose-900 border-rose-300'
                }`}>
                  {language === 'tl' ? `Kategorya: ${currentActivity.categoryTl || currentActivity.category}` : `Category: ${currentActivity.category}`}
                </span>
              </div>

              {/* Activity Question Card */}
              <div className={`p-5 sm:p-6 rounded-2xl border text-center space-y-2 ${
                darkMode ? 'bg-rose-500/10 border-rose-500/25' : 'bg-rose-50 border-rose-200'
              }`}>
                <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {language === 'tl'
                    ? 'Ang gawaing ba na ito ay naaayon sa pag-iingat ng Banal na Sabbath?'
                    : 'Is this activity harmonious with keeping the Holy Sabbath?'}
                </p>
                <h3 className={`text-base sm:text-lg font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  "{currentActivity.activity}"
                </h3>
              </div>

              {/* Choice Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <button
                  disabled={isSortRevealed}
                  onClick={() => handleSortChoice(true)}
                  className={`p-4 rounded-2xl border font-bold text-sm transition-all flex flex-col items-center gap-2 ${
                    isSortRevealed
                      ? currentActivity.isSabbathAppropriate
                        ? darkMode 
                          ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/40 shadow-lg'
                          : 'bg-emerald-100 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400/40 shadow-md'
                        : selectedSortChoice === true
                          ? darkMode
                            ? 'bg-rose-500/25 border-rose-400 text-rose-200'
                            : 'bg-rose-100 border-rose-400 text-rose-900'
                          : 'opacity-40 border-slate-300/30'
                      : darkMode 
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  <Sunrise className="w-6 h-6 text-emerald-500" />
                  <span className={darkMode ? 'text-white' : 'text-slate-900'}>
                    {language === 'tl' ? 'Naaangkop sa Sabbath' : 'Sabbath Appropriate'}
                  </span>
                  <span className={`text-[10px] font-normal ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {language === 'tl' ? 'Pagsamba, Kalikasan, Pahinga, Awa' : 'Worship, Nature, Rest, Mercy'}
                  </span>
                </button>

                <button
                  disabled={isSortRevealed}
                  onClick={() => handleSortChoice(false)}
                  className={`p-4 rounded-2xl border font-bold text-sm transition-all flex flex-col items-center gap-2 ${
                    isSortRevealed
                      ? !currentActivity.isSabbathAppropriate
                        ? darkMode
                          ? 'bg-amber-500/25 border-amber-400 text-amber-200 ring-2 ring-amber-400/40 shadow-lg'
                          : 'bg-amber-100 border-amber-500 text-amber-900 ring-2 ring-amber-400/40 shadow-md'
                        : selectedSortChoice === false
                          ? darkMode
                            ? 'bg-rose-500/25 border-rose-400 text-rose-200'
                            : 'bg-rose-100 border-rose-400 text-rose-900'
                          : 'opacity-40 border-slate-300/30'
                      : darkMode
                        ? 'bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25'
                        : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  <Moon className="w-6 h-6 text-amber-500" />
                  <span className={darkMode ? 'text-white' : 'text-slate-900'}>
                    {language === 'tl' ? 'Pang-araw-araw / Sekular' : 'Weekday / Secular'}
                  </span>
                  <span className={`text-[10px] font-normal ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {language === 'tl' ? 'Kalakal, Trabaho, Sekular na Gawain' : 'Commercial, Work, Secular tasks'}
                  </span>
                </button>
              </div>

              {/* Explanation Box */}
              {isSortRevealed && (
                <div className={`p-4 sm:p-5 rounded-2xl border space-y-2 animate-in fade-in ${
                  darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`flex items-center gap-1.5 text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    <BookOpen className="w-4 h-4 text-rose-500" />
                    <span>{language === 'tl' ? 'Simulain sa Bibliya tungkol sa Sabbath:' : 'Biblical Sabbath Principle:'}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {currentActivity.explanation}
                  </p>
                  <p className={`text-xs font-bold ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                    📖 {currentActivity.scripture}
                  </p>

                  <button
                    onClick={handleNextActivity}
                    className="w-full mt-3 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg transition-all"
                  >
                    {language === 'tl' ? 'Susunod na Gawain' : 'Next Activity'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto shadow-lg ${
                darkMode ? 'bg-rose-500/20 border-rose-500/30 text-rose-400' : 'bg-rose-100 border-rose-300 text-rose-600'
              }`}>
                <Sunrise className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'tl' ? 'Nakumpleto ang Pagsusuri sa Sabbath!' : 'Sabbath Activities Complete!'}
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'tl'
                  ? `Matagumpay mong nasuri ang ${sortScore} sa ${activitiesList.length} na mga gawain.`
                  : `You correctly evaluated ${sortScore} out of ${activitiesList.length} activities.`}
              </p>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setIsSortRevealed(false);
                  setSelectedSortChoice(null);
                  setSortScore(0);
                  setSortRoundComplete(false);
                }}
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg transition-all"
              >
                {language === 'tl' ? 'Muling Suriin' : 'Sort Again'}
              </button>
            </div>
          )}

        </div>
      )}

      {/* FRIDAY PREPARATION CHECKLIST TAB */}
      {activeTab === 'checklist' && (
        <div className={`backdrop-blur-xl rounded-3xl p-5 sm:p-8 border shadow-xl space-y-4 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-1">
            <h3 className={`font-bold text-base sm:text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'tl' ? 'Paghahanda sa Biyernes at Banal na Oras' : 'Friday Preparation & Sabbath Hours Routine'}
            </h3>
            <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'tl'
                ? 'Lagyan ng tsek ang bawat hakbang habang inihahanda ang tahanan, isip, at espiritu para sa mapayapang banal na araw.'
                : 'Check off steps as you prepare your home, mind, and spirit for a peaceful, stress-free holy day.'}
            </p>
          </div>

          <div className="space-y-3">
            {sabbathPreparationChecklist.map(rawStep => {
              const step = localizePreparationStep(rawStep, language);
              const isChecked = !!checkedSteps[step.id];
              return (
                <div
                  key={step.id}
                  onClick={() => toggleChecklistStep(step.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? darkMode
                        ? 'bg-rose-500/15 border-rose-500/30'
                        : 'bg-rose-50 border-rose-200'
                      : darkMode
                        ? 'bg-white/[0.04] border-white/5 hover:bg-white/[0.08]'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked 
                      ? 'bg-rose-600 border-rose-600 text-white font-bold' 
                      : darkMode
                        ? 'border-white/20 bg-white/5'
                        : 'border-slate-300 bg-white'
                  }`}>
                    {isChecked && <CheckCircle2 className="w-4 h-4" />}
                  </div>

                  <div className="space-y-0.5">
                    <span className={`text-[10px] uppercase font-bold ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                      {step.dayTl || step.day}
                    </span>
                    <h4 className={`text-sm font-bold ${isChecked ? 'line-through text-slate-400' : darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {step.step}
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{step.tip}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* BLESSINGS & DELIGHT TAB */}
      {activeTab === 'blessings' && (
        <div className="space-y-4">
          {sabbathBlessings.map((blessing, idx) => (
            <div 
              key={idx}
              className={`backdrop-blur-xl rounded-3xl p-5 sm:p-6 border shadow-lg space-y-3 ${
                darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                  {language === 'tl' ? 'Pangako sa Kasulatan' : 'Scripture Promise'}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  darkMode ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-rose-100 text-rose-900 border-rose-300'
                }`}>
                  {blessing.verse}
                </span>
              </div>
              <blockquote className={`text-sm sm:text-base font-serif italic leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                "{language === 'tl' ? blessing.textTl || blessing.text : blessing.text}"
              </blockquote>
              <p className={`text-xs border-t pt-2.5 ${darkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                💡 <span className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{language === 'tl' ? 'Pagninilay sa Dambana:' : 'Sanctuary Meditation:'}</span> {language === 'tl' ? blessing.reflectionTl || blessing.reflection : blessing.reflection}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
