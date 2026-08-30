import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trophy, 
  Crown
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sampleLeaderboard } from '../data/rewardsAndLeaderboard';
import { sound } from '../utils/audio';

export const LeaderboardScreen: React.FC = () => {
  const { user, setActiveScreen, language, darkMode } = useGame();
  const [filter, setFilter] = useState<'weekly' | 'alltime' | 'club'>('weekly');

  const combinedLeaderboard = [
    {
      id: user.id,
      name: `${user.name} (${language === 'tl' ? 'Ikaw' : 'You'})`,
      avatar: user.avatar,
      clubOrChurch: user.churchName || (language === 'tl' ? 'Berean SDA Church' : 'Berean SDA Church'),
      score: user.xp,
      level: user.level,
      rank: 1
    },
    ...sampleLeaderboard
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in">
      
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
          {language === 'tl' ? 'Pandaigdigan at Samahang Pang-iglesya' : 'Global & Club Fellowship'}
        </span>
      </div>

      {/* Leaderboard Header Banner */}
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
          <Trophy className="w-3.5 h-3.5" />
          <span>{language === 'tl' ? 'Samahang Kristiyano at Paglago' : 'Christian Fellowship & Growth'}</span>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {language === 'tl' ? 'Talaan ng mga Kampeon sa Banal na Kasulatan' : 'Scripture Champions Leaderboard'}
        </h1>
        <p className={`text-xs sm:text-sm max-w-xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {language === 'tl'
            ? '"Magsitakbo kayo nang gayon, upang kayo\'y magsipagtamo... ng putong na walang pagkasira." (1 Corinto 9:24-25).'
            : '"Run in such a way as to get the prize... an imperishable crown." (1 Corinthians 9:24-25). Honor God as you learn His Word!'}
        </p>
      </div>

      {/* Filters */}
      <div className={`flex gap-1.5 sm:gap-2 p-1.5 rounded-2xl border backdrop-blur-md ${
        darkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-200/90 border-slate-300'
      }`}>
        {(['weekly', 'alltime', 'club'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => {
              sound.playClick();
              setFilter(tab);
            }}
            className={`flex-1 py-2 sm:py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
              filter === tab
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : darkMode
                  ? 'text-slate-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            {tab === 'weekly'
              ? (language === 'tl' ? 'Linggong Ito' : 'This Week')
              : tab === 'alltime'
                ? (language === 'tl' ? 'Pangkalahatan' : 'All-Time')
                : (language === 'tl' ? 'Mga Samahan/Klub' : 'Clubs')}
          </button>
        ))}
      </div>

      {/* Leaderboard Podium Top 3 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end pt-4 pb-2">
        {/* Rank 2 */}
        {combinedLeaderboard[1] && (
          <div className={`backdrop-blur-xl p-3 sm:p-4 rounded-3xl border text-center space-y-2 flex flex-col items-center shadow-lg ${
            darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center border ${
              darkMode ? 'bg-white/10 text-slate-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-300'
            }`}>
              2
            </span>
            <span className="text-2xl sm:text-3xl">{combinedLeaderboard[1].avatar === 'Sparkles' ? '✨' : '👦'}</span>
            <div className="min-w-0 w-full">
              <p className={`font-bold text-xs truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>{combinedLeaderboard[1].name}</p>
              <p className={`text-[11px] font-black ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>{combinedLeaderboard[1].score} XP</p>
            </div>
          </div>
        )}

        {/* Rank 1 (Tallest) */}
        {combinedLeaderboard[0] && (
          <div className={`backdrop-blur-xl p-4 sm:p-6 rounded-3xl border-2 border-amber-400 text-center space-y-2 flex flex-col items-center shadow-xl shadow-amber-500/20 ${
            darkMode ? 'bg-amber-500/20' : 'bg-amber-50/90'
          }`}>
            <Crown className="w-6 h-6 text-amber-500 fill-amber-500 animate-bounce" />
            <span className="text-3xl sm:text-4xl">{combinedLeaderboard[0].avatar.length <= 2 ? combinedLeaderboard[0].avatar : '👑'}</span>
            <div className="min-w-0 w-full">
              <p className={`font-black text-sm truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>{combinedLeaderboard[0].name}</p>
              <p className={`text-xs font-black ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>{combinedLeaderboard[0].score} XP</p>
            </div>
          </div>
        )}

        {/* Rank 3 */}
        {combinedLeaderboard[2] && (
          <div className={`backdrop-blur-xl p-3 sm:p-4 rounded-3xl border text-center space-y-2 flex flex-col items-center shadow-lg ${
            darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center border ${
              darkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              3
            </span>
            <span className="text-2xl sm:text-3xl">{combinedLeaderboard[2].avatar === 'Compass' ? '🧭' : '👧'}</span>
            <div className="min-w-0 w-full">
              <p className={`font-bold text-xs truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>{combinedLeaderboard[2].name}</p>
              <p className={`text-[11px] font-black ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>{combinedLeaderboard[2].score} XP</p>
            </div>
          </div>
        )}
      </div>

      {/* Full Leaderboard List */}
      <div className={`backdrop-blur-xl rounded-3xl p-4 sm:p-6 border shadow-xl space-y-2 ${
        darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
      }`}>
        {combinedLeaderboard.map((player, idx) => {
          const isUser = player.id === user.id;

          return (
            <div
              key={player.id}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between backdrop-blur-md ${
                isUser
                  ? darkMode
                    ? 'bg-amber-500/20 border-amber-400 text-white ring-2 ring-amber-400/40 shadow-lg'
                    : 'bg-amber-100 border-amber-400 text-slate-900 ring-2 ring-amber-400/40 shadow-md'
                  : darkMode
                    ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-6 text-center font-bold text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  #{idx + 1}
                </span>
                <span className="text-2xl">{player.avatar.length <= 2 ? player.avatar : '🌟'}</span>
                <div className="min-w-0">
                  <p className={`font-bold text-xs sm:text-sm truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {player.name}
                  </p>
                  <div className={`flex items-center gap-2 text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    <span className="truncate">{player.clubOrChurch}</span>
                    <span>•</span>
                    <span className={`font-bold ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                      {language === 'tl' ? `Lebel ${player.level}` : `Level ${player.level}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`font-black text-sm ${darkMode ? 'text-amber-400' : 'text-amber-800'}`}>
                  {player.score.toLocaleString()} XP
                </span>
                <p className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {language === 'tl' ? `Posisyon #${idx + 1}` : `Rank #${idx + 1}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
