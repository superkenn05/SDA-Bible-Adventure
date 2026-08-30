import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { DashboardScreen } from './screens/DashboardScreen';
import { BibleQuizScreen } from './screens/BibleQuizScreen';
import { CharacterGuessScreen } from './screens/CharacterGuessScreen';
import { VerseChallengeScreen } from './screens/VerseChallengeScreen';
import { AdventistBeliefsScreen } from './screens/AdventistBeliefsScreen';
import { SabbathChallengeScreen } from './screens/SabbathChallengeScreen';
import { PathfinderScreen } from './screens/PathfinderScreen';
import { MemoryGameScreen } from './screens/MemoryGameScreen';
import { WordSearchScreen } from './screens/WordSearchScreen';
import { HealthChallengeScreen } from './screens/HealthChallengeScreen';
import { ChurchHistoryScreen } from './screens/ChurchHistoryScreen';
import { MultiplayerScreen } from './screens/MultiplayerScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';
import { AchievementsScreen } from './screens/AchievementsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminScreen } from './screens/AdminScreen';
import { Heart, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeScreen, setActiveScreen, darkMode } = useGame();

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'bible_quiz':
        return <BibleQuizScreen />;
      case 'character_guess':
        return <CharacterGuessScreen />;
      case 'verse_challenge':
        return <VerseChallengeScreen />;
      case 'adventist_beliefs':
        return <AdventistBeliefsScreen />;
      case 'sabbath_challenge':
        return <SabbathChallengeScreen />;
      case 'pathfinder':
        return <PathfinderScreen />;
      case 'memory_game':
        return <MemoryGameScreen />;
      case 'word_search':
        return <WordSearchScreen />;
      case 'health_challenge':
        return <HealthChallengeScreen />;
      case 'church_history':
        return <ChurchHistoryScreen />;
      case 'multiplayer':
        return <MultiplayerScreen />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      case 'profile':
      case 'settings':
        return <ProfileScreen />;
      case 'admin':
        return <AdminScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col relative overflow-x-hidden font-sans transition-colors duration-500 selection:bg-amber-500/30 selection:text-amber-200 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-amber-50/70 text-slate-900'
    }`}>
      {/* Layer 1: Ambient Background Gradient */}
      <div 
        className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-500 ${
          darkMode 
            ? 'bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#F59E0B]/20 opacity-100' 
            : 'bg-gradient-to-b from-amber-50 via-sky-50/50 to-emerald-50/40 opacity-100'
        }`} 
      />

      {/* Layer 2: Glowing Soft Ambient Light Orbs */}
      <div className={`fixed top-[-100px] left-[15%] w-[550px] h-[550px] rounded-full blur-[130px] pointer-events-none z-0 transition-all duration-500 ${
        darkMode ? 'bg-amber-500/10' : 'bg-amber-400/25'
      }`} />
      <div className={`fixed bottom-[-60px] right-[10%] w-[650px] h-[450px] rounded-full blur-[150px] pointer-events-none z-0 transition-all duration-500 ${
        darkMode ? 'bg-emerald-500/15' : 'bg-emerald-400/20'
      }`} />
      <div className={`fixed top-[45%] right-[-120px] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-500 ${
        darkMode ? 'bg-indigo-600/10' : 'bg-sky-400/20'
      }`} />

      {/* Layer 3: Mountain Horizon Silhouettes */}
      <div 
        className={`fixed bottom-0 left-0 right-0 h-64 z-0 pointer-events-none transition-opacity duration-500 ${
          darkMode ? 'opacity-60' : 'opacity-25'
        }`} 
        style={{ 
          background: darkMode 
            ? 'linear-gradient(135deg, #14532D 0%, #166534 50%, #064E3B 100%)' 
            : 'linear-gradient(135deg, #059669 0%, #10B981 50%, #047857 100%)', 
          clipPath: 'polygon(0 40%, 15% 20%, 30% 35%, 45% 10%, 65% 30%, 80% 5%, 100% 45%, 100% 100%, 0 100%)' 
        }} 
      />
      <div 
        className={`fixed bottom-0 left-0 right-0 h-48 z-0 pointer-events-none transition-opacity duration-500 ${
          darkMode ? 'opacity-80' : 'opacity-35'
        }`} 
        style={{ 
          background: darkMode 
            ? 'linear-gradient(135deg, #065F46 0%, #064E3B 100%)' 
            : 'linear-gradient(135deg, #047857 0%, #065F46 100%)', 
          clipPath: 'polygon(0 60%, 10% 45%, 25% 65%, 40% 50%, 55% 70%, 75% 40%, 90% 60%, 100% 55%, 100% 100%, 0 100%)' 
        }} 
      />

      {/* Foreground Interactive Content */}
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-20 lg:pb-8">
          {renderActiveScreen()}
        </main>

        {/* Frosted Glass Footer */}
        <footer className={`mt-12 mb-16 lg:mb-0 border-t backdrop-blur-xl py-6 px-4 transition-colors duration-500 ${
          darkMode 
            ? 'border-white/10 bg-white/[0.04] text-slate-400' 
            : 'border-slate-300/70 bg-white/70 text-slate-600 shadow-sm'
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <span className={`p-1.5 rounded-lg border shrink-0 ${
                darkMode ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-500/15 text-amber-700 border-amber-500/40'
              }`}>
                <BookOpen className="w-4 h-4" />
              </span>
              <span className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                Seventh-day Adventist Christian Games & Scripture Adventure
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span className={`inline-flex items-center gap-1.5 font-semibold px-2.5 py-1 rounded-full border ${
                darkMode ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-800 bg-emerald-100/90 border-emerald-300'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" /> Offline Ready
              </span>
              <span className="opacity-30 hidden sm:inline">•</span>
              <button 
                onClick={() => setActiveScreen('admin')}
                className={`transition-colors font-medium ${
                  darkMode ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-700'
                }`}
              >
                Teacher & Admin Portal
              </button>
              <span className="opacity-30 hidden sm:inline">•</span>
              <span className={`italic font-serif ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                "Thy Word is a lamp unto my feet"
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainContent />
    </GameProvider>
  );
}
