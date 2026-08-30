import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Scroll, 
  BookOpen, 
  ChevronRight, 
  HelpCircle
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { adventistBeliefsList, BeliefDetail } from '../data/adventistBeliefs';
import { sound } from '../utils/audio';
import { localizeBelief } from '../utils/localize';

export const AdventistBeliefsScreen: React.FC = () => {
  const { setActiveScreen, addXpAndCoins, language, darkMode } = useGame();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBeliefModal, setActiveBeliefModal] = useState<BeliefDetail | null>(null);

  const categories = [
    { key: 'All', labelEn: 'All', labelTl: 'Lahat' },
    { key: 'God', labelEn: 'God', labelTl: 'Diyos' },
    { key: 'Humanity', labelEn: 'Humanity', labelTl: 'Sangkatauhan' },
    { key: 'Salvation', labelEn: 'Salvation', labelTl: 'Kaligtasan' },
    { key: 'Church', labelEn: 'Church', labelTl: 'Iglesya' },
    { key: 'Living', labelEn: 'Living', labelTl: 'Pamumuhay' },
    { key: 'End Time', labelEn: 'End Time', labelTl: 'Wakas ng Panahon' }
  ];

  const filteredBeliefs = selectedCategory === 'All'
    ? adventistBeliefsList
    : adventistBeliefsList.filter(b => b.category === selectedCategory);

  const handleOpenBelief = (belief: BeliefDetail) => {
    sound.playClick();
    setActiveBeliefModal(belief);
    addXpAndCoins(5, 2, 'Belief Study');
  };

  const localizedModalBelief = activeBeliefModal ? localizeBelief(activeBeliefModal, language) : null;

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

        <button
          onClick={() => {
            sound.playClick();
            setActiveScreen('bible_quiz');
          }}
          className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-lg flex items-center gap-2 transition-all"
        >
          <HelpCircle className="w-4 h-4" /> {language === 'tl' ? 'Magsagot ng Pagsusulit' : 'Take Beliefs Quiz'}
        </button>
      </div>

      {/* Hero Header */}
      <div className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-xl space-y-3 ${
        darkMode 
          ? 'bg-gradient-to-r from-indigo-950/70 via-purple-950/70 to-slate-950/80 border-white/10 text-white' 
          : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-slate-50 border-indigo-200 text-slate-900 shadow-md'
      }`}>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold uppercase tracking-wider border ${
          darkMode 
            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' 
            : 'bg-indigo-100 text-indigo-900 border-indigo-300'
        }`}>
          <Scroll className="w-3.5 h-3.5" />
          <span>{language === 'tl' ? 'Saligan sa Kasulatan' : 'Scriptural Foundations'}</span>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {language === 'tl' ? 'Ang 28 Pangunahing Paniniwala' : 'The 28 Fundamental Beliefs'}
        </h1>
        <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {language === 'tl'
            ? 'Tinatanggap ng mga Seventh-day Adventist ang Bibliya bilang kanilang tanging gabay at naniniwala sa mga pangunahing aral ng Banal na Kasulatan. Tuklasin ang lahat ng 28 doktrina.'
            : 'Seventh-day Adventists accept the Bible as their only creed and hold certain fundamental beliefs to be the teaching of the Holy Scriptures. Explore all 28 doctrines and their biblical proof texts.'}
        </p>
      </div>

      {/* Category Pills */}
      <div className={`flex flex-wrap gap-1.5 sm:gap-2 p-1.5 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-100 border-slate-200'
      }`}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => {
              sound.playClick();
              setSelectedCategory(cat.key);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat.key
                ? 'bg-indigo-600 text-white font-black shadow-md'
                : darkMode 
                  ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white'
            }`}
          >
            {language === 'tl' ? cat.labelTl : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Beliefs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBeliefs.map(rawBelief => {
          const belief = localizeBelief(rawBelief, language);

          return (
            <div
              key={belief.number}
              onClick={() => handleOpenBelief(rawBelief)}
              className={`p-5 rounded-3xl backdrop-blur-xl border shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.99] ${
                darkMode 
                  ? 'bg-white/[0.06] border-white/10 hover:border-indigo-400/40' 
                  : 'bg-white border-slate-200 hover:border-indigo-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black border shadow-inner ${
                    darkMode ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-indigo-100 text-indigo-900 border-indigo-300'
                  }`}>
                    {belief.number}
                  </span>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                    darkMode ? 'bg-white/[0.06] text-slate-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {belief.categoryTl || belief.category}
                  </span>
                </div>

                <h3 className={`font-bold text-sm transition-colors mb-1.5 ${
                  darkMode ? 'text-white group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'
                }`}>
                  {belief.title}
                </h3>
                <p className={`text-xs line-clamp-2 leading-relaxed mb-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {belief.summary}
                </p>
              </div>

              <div className={`pt-3 border-t text-xs font-bold flex items-center justify-between ${
                darkMode ? 'border-white/10 text-indigo-400' : 'border-slate-200 text-indigo-600'
              }`}>
                <span>{language === 'tl' ? 'Basahin ang Talata' : 'Read Key Scriptures'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Modal */}
      {localizedModalBelief && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className={`backdrop-blur-2xl rounded-3xl p-6 sm:p-8 max-w-lg w-full border shadow-2xl space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-slate-900/95 border-white/15' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-lg shadow-indigo-500/20">
                  #{localizedModalBelief.number}
                </div>
                <div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    {language === 'tl'
                      ? `Kategorya: ${localizedModalBelief.categoryTl || localizedModalBelief.category}`
                      : `Category: ${localizedModalBelief.category}`}
                  </span>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {localizedModalBelief.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-indigo-500/15 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200'
            }`}>
              <p className={`text-sm leading-relaxed font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                {localizedModalBelief.summary}
              </p>
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <BookOpen className={`w-3.5 h-3.5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                {language === 'tl' ? 'Mga Talata sa Bibliya:' : 'Biblical Proof Texts:'}
              </label>
              <div className="flex flex-wrap gap-2">
                {localizedModalBelief.keyScriptures.map((ref, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
                      darkMode ? 'bg-white/[0.08] text-slate-200 border-white/10' : 'bg-slate-100 text-slate-800 border-slate-300'
                    }`}
                  >
                    📖 {ref}
                  </span>
                ))}
              </div>
            </div>

            <div className={`pt-3 border-t flex items-center justify-end ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveBeliefModal(null);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-lg transition-all"
              >
                {language === 'tl' ? 'Isara' : 'Close Doctrine Guide'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
