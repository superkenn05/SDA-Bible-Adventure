import React from 'react';
import { 
  ArrowLeft, 
  Award, 
  Lock, 
  CheckCircle2, 
  Star, 
  Scroll, 
  Sunrise, 
  Flame, 
  Compass, 
  Heart, 
  BookOpen,
  Crown
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { initialBadges } from '../data/rewardsAndLeaderboard';
import { sound } from '../utils/audio';
import { localizeBadge } from '../utils/localize';

export const AchievementsScreen: React.FC = () => {
  const { user, setActiveScreen, language, darkMode } = useGame();

  const iconMap: Record<string, React.ElementType> = {
    BookOpen,
    Crown,
    Flame,
    Sunrise,
    Award,
    Heart,
    Scroll,
    Compass,
    Star
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
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
            : 'bg-amber-100 text-amber-900 border-amber-300'
        }`}>
          {language === 'tl' ? 'Mga Gantimpala at Tsapa' : 'Achievements & Badges'}
        </span>
      </div>

      {/* Hero Header */}
      <div className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-xl space-y-3 ${
        darkMode 
          ? 'bg-gradient-to-r from-amber-950/70 via-stone-950/70 to-slate-950/70 border-white/10 text-white' 
          : 'bg-gradient-to-r from-amber-100 via-orange-50 to-amber-50 border-amber-200 text-slate-900 shadow-md'
      }`}>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold uppercase tracking-wider border ${
          darkMode 
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
            : 'bg-amber-200/80 text-amber-900 border-amber-300'
        }`}>
          <Award className="w-3.5 h-3.5" />
          <span>{language === 'tl' ? 'Kristiyanong Karakter at mga Tagumpay' : 'Christian Character & Milestones'}</span>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {language === 'tl' ? 'Gabinete ng mga Tsapa at Parangal' : 'Badge Trophy Cabinet'}
        </h1>
        <p className={`text-xs sm:text-sm max-w-xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {language === 'tl'
            ? 'Magbukas ng mga tsapa habang nag-aaral ng Banal na Kasulatan, nangingilin ng Sabbath, sumusunod sa NEWSTART, at sumusulong sa kabanalan.'
            : 'Unlock badges as you study the Scriptures, keep the Sabbath holy, practice the NEWSTART principles, and advance in Christian virtue.'}
        </p>
      </div>

      {/* Badges Progress Summary */}
      <div className={`p-5 rounded-3xl backdrop-blur-xl border shadow-lg flex flex-wrap items-center justify-between gap-4 ${
        darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
      }`}>
        <div>
          <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {language === 'tl'
              ? `Nabuksan ang ${user.earnedBadgeIds.length} sa ${initialBadges.length} na mga Tsapa`
              : `Unlocked ${user.earnedBadgeIds.length} of ${initialBadges.length} Badges`}
          </h3>
          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {Math.round((user.earnedBadgeIds.length / initialBadges.length) * 100)}% {language === 'tl' ? 'nakumpleto' : 'complete'}
          </p>
        </div>
        <div className={`w-full sm:w-48 h-3 rounded-full overflow-hidden p-0.5 border ${
          darkMode ? 'bg-white/[0.1] border-white/10' : 'bg-slate-200 border-slate-300'
        }`}>
          <div 
            className="bg-amber-400 h-full rounded-full transition-all duration-500 shadow-sm" 
            style={{ width: `${(user.earnedBadgeIds.length / initialBadges.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {initialBadges.map(rawBadge => {
          const badge = localizeBadge(rawBadge, language);
          const isUnlocked = user.earnedBadgeIds.includes(badge.id);
          const IconComp = iconMap[badge.icon] || Award;

          return (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border text-center transition-all flex flex-col justify-between items-center backdrop-blur-xl ${
                isUnlocked
                  ? darkMode
                    ? 'bg-amber-500/15 border-amber-400/50 shadow-lg ring-1 ring-amber-400/30'
                    : 'bg-amber-50 border-amber-300 shadow-md ring-1 ring-amber-300/40'
                  : darkMode
                    ? 'bg-white/[0.03] border-white/10 opacity-60'
                    : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="space-y-3 flex flex-col items-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-transform ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black scale-105 shadow-amber-500/25'
                    : darkMode
                      ? 'bg-white/[0.08] text-slate-400 border border-white/10'
                      : 'bg-slate-200 text-slate-500 border border-slate-300'
                }`}>
                  {isUnlocked ? <IconComp className="w-8 h-8" /> : <Lock className="w-6 h-6" />}
                </div>

                <div className="space-y-1">
                  <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {badge.name}
                  </h4>
                  <p className={`text-xs leading-tight ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {badge.description}
                  </p>
                </div>
              </div>

              <div className={`pt-3 w-full border-t mt-3 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
                {isUnlocked ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {language === 'tl' ? 'Nabuksan' : 'Unlocked'}
                  </span>
                ) : (
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {language === 'tl' ? `Hamon sa ${badge.category}` : `${badge.category} Challenge`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
