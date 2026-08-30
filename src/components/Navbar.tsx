import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Flame, 
  Coins, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Menu, 
  X, 
  User, 
  BookOpen, 
  Trophy, 
  Award, 
  Settings, 
  Sparkles,
  Gamepad2,
  Users,
  Compass,
  ChevronDown,
  Scroll,
  Heart,
  Brain,
  Search,
  Grid,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  FlameKindling,
  SlidersHorizontal,
  Share2,
  BellRing,
  Bookmark,
  Sun,
  Moon
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { pathfinderRanks } from '../data/pathfinderData';
import { sound } from '../utils/audio';
import { SdaLogo } from './SdaLogo';

export const Navbar: React.FC = () => {
  const { 
    user, 
    isOnline, 
    isSyncing, 
    lastSyncedAt, 
    activeScreen, 
    setActiveScreen, 
    updateProfile, 
    triggerCloudSync,
    darkMode,
    setDarkMode,
    t,
    language
  } = useGame();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [gamesMegaMenu, setGamesMegaMenu] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMobileCategory, setSelectedMobileCategory] = useState<'all' | 'scripture' | 'pathfinder' | 'puzzles'>('all');

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setGamesMegaMenu(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile full-screen drawer is active
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileDrawerOpen]);

  // Level & XP math
  const xpProgressInLevel = (user.xp % 250);
  const xpPercentage = Math.min(100, Math.round((xpProgressInLevel / 250) * 100));

  // Determine current Pathfinder rank
  const currentRank = pathfinderRanks.reduce((prev, curr) => {
    return user.xp >= curr.requiredXp ? curr : prev;
  }, pathfinderRanks[0]);

  const handleNav = (screen: string) => {
    sound.playClick();
    setActiveScreen(screen);
    setMobileDrawerOpen(false);
    setGamesMegaMenu(false);
    setProfileDropdown(false);
  };

  // Structured catalogue of all 10 Games & Activities
  const gameCatalog = useMemo(() => [
    {
      categoryKey: 'scripture',
      category: 'Scripture & Doctrine',
      description: 'Strengthen faith & Adventist biblical roots',
      items: [
        { 
          id: 'bible_quiz', 
          name: 'Bible Trivia Quiz', 
          desc: '100+ questions across Old & New Testament', 
          icon: BookOpen, 
          accent: 'from-amber-500 to-orange-600',
          badge: '100+ Qs',
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' 
        },
        { 
          id: 'verse_challenge', 
          name: 'Verse Scramble', 
          desc: 'Memorize scripture by ordering words', 
          icon: Scroll, 
          accent: 'from-emerald-500 to-teal-600',
          badge: 'Memory',
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
        },
        { 
          id: 'adventist_beliefs', 
          name: '28 Fundamental Beliefs', 
          desc: 'Explore core Adventist doctrines & proof texts', 
          icon: Layers, 
          accent: 'from-sky-500 to-blue-600',
          badge: 'Doctrine',
          color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' 
        },
        { 
          id: 'sabbath_challenge', 
          name: 'Sabbath Sunset Quest', 
          desc: 'Preparation checklist, countdown & blessings', 
          icon: Sparkles, 
          accent: 'from-indigo-500 to-violet-600',
          badge: 'Holy Day',
          color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' 
        },
      ]
    },
    {
      categoryKey: 'pathfinder',
      category: 'Youth & Pathfinder Heritage',
      description: 'Honors, Pioneers & Biblical Heroes',
      items: [
        { 
          id: 'pathfinder', 
          name: 'Pathfinder Honors & Ranks', 
          desc: 'Earn honors, camping patches & Pathfinder skills', 
          icon: Compass, 
          accent: 'from-sky-500 to-teal-600',
          badge: 'Honors',
          color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' 
        },
        { 
          id: 'character_guess', 
          name: 'Who Am I? Character Clues', 
          desc: 'Unmask prophets, kings, and matriarchs', 
          icon: User, 
          accent: 'from-purple-500 to-pink-600',
          badge: 'Mystery',
          color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' 
        },
        { 
          id: 'church_history', 
          name: 'Adventist History Timeline', 
          desc: 'The Great Disappointment, 1844 & Pioneers', 
          icon: ShieldCheck, 
          accent: 'from-amber-500 to-amber-700',
          badge: '1844',
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' 
        },
      ]
    },
    {
      categoryKey: 'puzzles',
      category: 'Brain Puzzles & Living',
      description: 'Mind sharpener, healthy living & battle room',
      items: [
        { 
          id: 'memory_game', 
          name: 'Scripture Memory Match', 
          desc: 'Pair Bible symbols, promises & cards', 
          icon: Brain, 
          accent: 'from-rose-500 to-red-600',
          badge: 'Visual',
          color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' 
        },
        { 
          id: 'word_search', 
          name: 'Bible Word Search', 
          desc: 'Uncover hidden books & virtues in the grid', 
          icon: Search, 
          accent: 'from-teal-500 to-emerald-600',
          badge: 'Puzzle',
          color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' 
        },
        { 
          id: 'health_challenge', 
          name: 'NEWSTART Health Laws', 
          desc: 'God-given 8 natural laws of true wellness', 
          icon: Heart, 
          accent: 'from-emerald-500 to-green-600',
          badge: 'Wellness',
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
        },
        { 
          id: 'multiplayer', 
          name: 'Multiplayer Sabbath Room', 
          desc: 'Host or join live interactive trivia battles', 
          icon: Users, 
          accent: 'from-indigo-500 to-purple-600',
          badge: 'Live Quiz',
          color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' 
        },
      ]
    }
  ], []);

  // Filtered games for mobile drawer search
  const filteredDrawerGames = useMemo(() => {
    let list = gameCatalog.flatMap(cat => cat.items.map(item => ({ ...item, categoryKey: cat.categoryKey })));
    if (selectedMobileCategory !== 'all') {
      list = list.filter(g => g.categoryKey === selectedMobileCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(g => g.name.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q));
    }
    return list;
  }, [gameCatalog, selectedMobileCategory, searchQuery]);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & NAVBAR (Fluid Responsive & High-Contrast Glass)           */}
      {/* ========================================================================= */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-2xl border-b transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-950/80 border-white/[0.12] shadow-2xl shadow-black/50 text-slate-100' 
          : 'bg-white/90 border-slate-200 shadow-md text-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15 sm:h-18">
            
            {/* Left: Brand Identity & Desktop Mega-Menu Button */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div 
                id="nav-brand-logo"
                onClick={() => handleNav('dashboard')}
                className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
              >
                {/* Official Seventh-day Adventist Church Logo Emblem */}
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500/25 via-amber-400/15 to-orange-500/25 border border-amber-400/40 backdrop-blur-md flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 group-hover:border-amber-400/70 group-hover:shadow-amber-500/40 transition-all shrink-0">
                  <SdaLogo size={28} className="text-amber-500 drop-shadow-md group-hover:brightness-110 transition-all" />
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 border border-slate-950"></span>
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-extrabold text-sm sm:text-lg tracking-tight transition-colors leading-none ${
                      darkMode ? 'text-white group-hover:text-amber-300' : 'text-slate-900 group-hover:text-amber-600'
                    }`}>
                      SDA Bible Games
                    </span>
                    <span className="text-[9px] uppercase font-black tracking-wider px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-500 border border-amber-500/35 hidden xs:inline-block">
                      ADVENT
                    </span>
                  </div>
                  <p className={`text-[10px] sm:text-xs font-medium tracking-wide ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Faith • Scripture • Fellowship
                  </p>
                </div>
              </div>

              {/* Desktop "Explore 10 Games" Mega Menu Trigger */}
              <div className="relative hidden xl:block" ref={megaMenuRef}>
                <button
                  id="nav-btn-mega-menu"
                  onClick={() => setGamesMegaMenu(!gamesMegaMenu)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    gamesMegaMenu 
                      ? 'bg-amber-500/20 text-amber-500 border-amber-500/40 shadow-inner' 
                      : darkMode
                        ? 'bg-white/[0.05] text-slate-300 border-white/10 hover:bg-white/[0.09] hover:text-white'
                        : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.allGames}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${gamesMegaMenu ? 'rotate-180 text-amber-500' : ''}`} />
                </button>

                {/* Mega Menu Bento Dropdown */}
                {gamesMegaMenu && (
                  <div className="absolute left-0 mt-3 w-[720px] bg-slate-950/95 backdrop-blur-3xl rounded-2xl shadow-2xl border border-white/15 p-4.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          <Sparkles className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-xs font-bold text-white uppercase tracking-wider">All 10 Interactive Game Modules</p>
                          <p className="text-[11px] text-slate-400">Grounded in Biblical truth, Pathfinder honors, and Adventist heritage</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleNav('dashboard')}
                        className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 hover:underline"
                      >
                        <span>Open Hub</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3.5">
                      {gameCatalog.map((cat, idx) => (
                        <div key={idx} className="space-y-2 bg-white/[0.03] p-3 rounded-xl border border-white/5">
                          <div className="px-1">
                            <h4 className="text-xs font-bold text-slate-200 tracking-tight">{cat.category}</h4>
                            <p className="text-[10px] text-slate-400 leading-tight mb-1.5">{cat.description}</p>
                          </div>
                          <div className="space-y-1">
                            {cat.items.map((item) => {
                              const IconComponent = item.icon;
                              const isActive = activeScreen === item.id;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => handleNav(item.id)}
                                  className={`w-full text-left p-2 rounded-lg transition-all flex items-start gap-2.5 group/item ${
                                    isActive 
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35' 
                                      : 'hover:bg-white/10 text-slate-300'
                                  }`}
                                >
                                  <div className={`p-1.5 rounded-md shrink-0 border ${item.color} group-hover/item:scale-105 transition-transform`}>
                                    <IconComponent className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold truncate group-hover/item:text-white transition-colors">{item.name}</p>
                                    <p className="text-[10px] text-slate-400 line-clamp-1 leading-tight">{item.desc}</p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Center: Desktop Navigation Bar Links */}
            {/* Middle: Desktop Pill Navigation */}
            <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-2xl border backdrop-blur-md shadow-inner transition-colors ${
              darkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-100/90 border-slate-300/80 shadow-slate-200'
            }`}>
              <button
                id="nav-btn-dashboard"
                onClick={() => handleNav('dashboard')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeScreen === 'dashboard' 
                    ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30 shadow-xs' 
                    : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Gamepad2 className="w-4 h-4 text-amber-500" />
                <span>{t.hub}</span>
              </button>

              <button
                id="nav-btn-multiplayer"
                onClick={() => handleNav('multiplayer')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 relative ${
                  activeScreen === 'multiplayer' 
                    ? 'bg-indigo-500/25 text-indigo-400 border border-indigo-500/35 shadow-xs' 
                    : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Users className="w-4 h-4 text-indigo-500" />
                <span>{t.multiplayer}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping absolute top-1.5 right-1.5" />
              </button>

              <button
                id="nav-btn-pathfinder"
                onClick={() => handleNav('pathfinder')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeScreen === 'pathfinder' 
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-xs' 
                    : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Compass className="w-4 h-4 text-sky-500" />
                <span>{t.pathfinders}</span>
              </button>

              <button
                id="nav-btn-leaderboard"
                onClick={() => handleNav('leaderboard')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeScreen === 'leaderboard' 
                    ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30 shadow-xs' 
                    : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>{t.ranks}</span>
              </button>

              <button
                id="nav-btn-achievements"
                onClick={() => handleNav('achievements')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeScreen === 'achievements' 
                    ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30 shadow-xs' 
                    : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>{t.honors}</span>
              </button>
            </nav>

            {/* Right: Gamification HUD (Streak, Coins) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* Daily Streak Pill */}
              <div 
                id="nav-streak-badge"
                title={`${user.streakDays} Day Bible Learning Streak!`}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold border backdrop-blur-md shadow-xs ${
                  darkMode
                    ? 'bg-orange-500/15 text-orange-300 border-orange-500/25'
                    : 'bg-orange-100/90 text-orange-800 border-orange-300'
                }`}
              >
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 animate-pulse shrink-0" />
                <span>{user.streakDays}d</span>
              </div>

              {/* Coins / Talents Pill */}
              <div 
                id="nav-coins-badge"
                title={`${user.coins} Talents / Coins earned`}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold border backdrop-blur-md shadow-xs ${
                  darkMode
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/25'
                    : 'bg-amber-100/90 text-amber-800 border-amber-300'
                }`}
              >
                <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-500/80 shrink-0" />
                <span>{user.coins}</span>
              </div>

              {/* Mobile Menu Drawer Toggle Button */}
              <button
                id="btn-nav-mobile-toggle"
                onClick={() => setMobileDrawerOpen(true)}
                className={`lg:hidden p-2 rounded-xl border active:scale-95 transition-all flex items-center gap-1.5 ${
                  darkMode 
                    ? 'bg-white/[0.08] hover:bg-white/[0.14] text-slate-100 border-white/15' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
                aria-label="Open Full Navigation Menu"
              >
                <Menu className="w-5 h-5 text-amber-500" />
                <span className={`text-[11px] font-bold pr-0.5 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{t.menu}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. AESTHETIC FULL-SCREEN MOBILE SLIDE-OVER DRAWER MENU                    */}
      {/* ========================================================================= */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Ambient Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Slide-in Panel */}
          <div className="relative ml-auto w-full max-w-md h-full bg-slate-950/95 backdrop-blur-3xl border-l border-white/15 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-250 text-slate-100 overflow-hidden">
            
            {/* Drawer Top Header: Profile Capsule & Close Button */}
            <div className="p-4 border-b border-white/10 bg-white/[0.04]">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shadow-md">
                    <SdaLogo size={22} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white tracking-tight leading-none">SDA Bible Games</h3>
                    <p className="text-[10px] text-amber-300/90 font-medium">Faith & Learning Navigator</p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/15 transition-all active:scale-95"
                  aria-label="Close Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Progress Card in Mobile Drawer */}
              <div 
                onClick={() => handleNav('settings')}
                className="p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 cursor-pointer transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-base shadow-md group-hover:scale-105 transition-transform">
                    {user.avatar || '⭐'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white">{user.name}</span>
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Lvl {user.level}
                      </span>
                    </div>
                    <p className="text-xs text-amber-300 font-medium">{language === 'tl' ? 'Profile at Antas' : 'Profile & Level'} • {t.settings}</p>
                    
                    {/* Tiny Progress Bar */}
                    <div className="w-28 bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1 border border-white/10">
                      <div 
                        className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full"
                        style={{ width: `${xpPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-400">{user.xp} XP</span>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-0.5">
                    <Coins className="w-3 h-3 inline" /> {user.coins}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Quick Action Bar in Mobile Drawer (Sync Status & Quick Settings) */}
            <div className="px-4 py-2.5 border-b border-white/10 bg-slate-900/60 flex items-center justify-between gap-2">
              <button
                onClick={triggerCloudSync}
                disabled={isSyncing}
                className={`flex-1 p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  isOnline
                    ? 'bg-sky-500/15 text-sky-300 border-sky-500/25'
                    : 'bg-amber-500/15 text-amber-300 border-amber-500/25'
                }`}
              >
                {isSyncing ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" /> : isOnline ? <Wifi className="w-3.5 h-3.5 text-sky-400" /> : <WifiOff className="w-3.5 h-3.5 text-amber-400" />}
                <span className="text-[11px] font-medium">{isOnline ? (language === 'tl' ? 'Online Nakasabay' : 'Online Synced') : (language === 'tl' ? 'Offline Mode' : 'Offline Mode')}</span>
              </button>

              <button
                onClick={() => handleNav('settings')}
                className="px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px]">{t.settings}</span>
              </button>
            </div>

            {/* Search & Category Filter Inside Drawer */}
            <div className="p-4 pb-2 space-y-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search all 10 games, honors & doctrines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Category Segmented Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px] font-semibold">
                <button
                  onClick={() => setSelectedMobileCategory('all')}
                  className={`px-3 py-1 rounded-lg shrink-0 transition-all ${
                    selectedMobileCategory === 'all'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-white/[0.06] text-slate-300 hover:bg-white/10'
                  }`}
                >
                  All (10)
                </button>
                <button
                  onClick={() => setSelectedMobileCategory('scripture')}
                  className={`px-3 py-1 rounded-lg shrink-0 transition-all ${
                    selectedMobileCategory === 'scripture'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-white/[0.06] text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Scripture & Beliefs
                </button>
                <button
                  onClick={() => setSelectedMobileCategory('pathfinder')}
                  className={`px-3 py-1 rounded-lg shrink-0 transition-all ${
                    selectedMobileCategory === 'pathfinder'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-white/[0.06] text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Pathfinders & History
                </button>
                <button
                  onClick={() => setSelectedMobileCategory('puzzles')}
                  className={`px-3 py-1 rounded-lg shrink-0 transition-all ${
                    selectedMobileCategory === 'puzzles'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-white/[0.06] text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Puzzles & Health
                </button>
              </div>
            </div>

            {/* Scrollable Game Cards Catalogue */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
              {filteredDrawerGames.map((game) => {
                const IconComponent = game.icon;
                const isActive = activeScreen === game.id;
                return (
                  <button
                    key={game.id}
                    onClick={() => handleNav(game.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group active:scale-[0.98] border ${
                      isActive 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-md' 
                        : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2.5 rounded-xl shrink-0 border ${game.color} group-hover:scale-105 transition-transform`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-white truncate">{game.name}</p>
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md bg-white/10 text-slate-300 border border-white/10">
                            {game.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 leading-snug">{game.desc}</p>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-amber-400 translate-x-1' : 'text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1'}`} />
                  </button>
                );
              })}

              {filteredDrawerGames.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <p className="text-xs font-semibold">No games match "{searchQuery}"</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedMobileCategory('all'); }}
                    className="mt-2 text-xs text-amber-400 hover:underline"
                  >
                    Reset Search & Filters
                  </button>
                </div>
              )}

              {/* Additional Utility Portals */}
              <div className="pt-3 pb-1 border-t border-white/10 space-y-1.5">
                <div className="px-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Community & Tools
                </div>
                
                <button
                  onClick={() => handleNav('leaderboard')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>Global Leaderboard</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() => handleNav('achievements')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Badges & Honors</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() => handleNav('admin')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Teacher Question Pool</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  onClick={() => handleNav('settings')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4 text-amber-400" />
                    <span>{t.settings}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Daily Faith Inspiration Footer */}
            <div className="p-3.5 border-t border-white/10 bg-white/[0.02] flex items-center gap-2 text-slate-400">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <p className="text-[11px] italic font-serif leading-tight">
                "Thy word is a lamp unto my feet, and a light unto my path." — Psalm 119:105
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MOBILE FLOATING GLASS ISLAND BOTTOM NAVIGATION BAR                     */}
      {/* ========================================================================= */}
      <nav 
        id="mobile-bottom-navigation"
        aria-label="Mobile Bottom Navigation Bar"
        className={`lg:hidden fixed bottom-3 left-3 right-3 sm:left-6 sm:right-6 max-w-md mx-auto z-40 backdrop-blur-2xl px-2 py-1.5 rounded-2xl flex items-center justify-around transition-all ${
          darkMode
            ? 'bg-slate-950/85 border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/10'
            : 'bg-white/90 border border-slate-300 shadow-[0_12px_30px_rgba(0,0,0,0.15)] ring-1 ring-slate-200'
        }`}
      >
        {/* Tab 1: Games Hub */}
        <button
          id="mobile-tab-dashboard"
          onClick={() => handleNav('dashboard')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl min-w-[56px] transition-all relative ${
            activeScreen === 'dashboard'
              ? darkMode
                ? 'text-amber-300 bg-amber-500/20 font-bold shadow-inner border border-amber-500/30'
                : 'text-amber-700 bg-amber-100 font-bold shadow-inner border border-amber-300'
              : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Gamepad2 className={`w-5 h-5 mb-0.5 ${activeScreen === 'dashboard' ? 'text-amber-500 scale-110' : ''} transition-transform`} />
          <span className="text-[10px] font-semibold leading-none">{t.games}</span>
          {activeScreen === 'dashboard' && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute -bottom-0.5 shadow-sm shadow-amber-400" />
          )}
        </button>

        {/* Tab 2: Multiplayer Live Arena */}
        <button
          id="mobile-tab-multiplayer"
          onClick={() => handleNav('multiplayer')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl min-w-[56px] transition-all relative ${
            activeScreen === 'multiplayer'
              ? darkMode
                ? 'text-indigo-300 bg-indigo-500/25 font-bold shadow-inner border border-indigo-500/35'
                : 'text-indigo-700 bg-indigo-100 font-bold shadow-inner border border-indigo-300'
              : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className={`w-5 h-5 mb-0.5 ${activeScreen === 'multiplayer' ? 'text-indigo-500 scale-110' : ''} transition-transform`} />
          <span className="text-[10px] font-semibold leading-none">{t.arena}</span>
          {activeScreen === 'multiplayer' && (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 absolute -bottom-0.5 shadow-sm shadow-indigo-400" />
          )}
        </button>

        {/* Tab 3: Pathfinders & Honors */}
        <button
          id="mobile-tab-pathfinder"
          onClick={() => handleNav('pathfinder')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl min-w-[56px] transition-all relative ${
            activeScreen === 'pathfinder'
              ? darkMode
                ? 'text-sky-300 bg-sky-500/20 font-bold shadow-inner border border-sky-500/30'
                : 'text-sky-700 bg-sky-100 font-bold shadow-inner border border-sky-300'
              : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className={`w-5 h-5 mb-0.5 ${activeScreen === 'pathfinder' ? 'text-sky-500 scale-110' : ''} transition-transform`} />
          <span className="text-[10px] font-semibold leading-none">{t.honors}</span>
          {activeScreen === 'pathfinder' && (
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 absolute -bottom-0.5 shadow-sm shadow-sky-400" />
          )}
        </button>

        {/* Tab 4: Leaderboard / Ranks */}
        <button
          id="mobile-tab-leaderboard"
          onClick={() => handleNav('leaderboard')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl min-w-[56px] transition-all relative ${
            activeScreen === 'leaderboard'
              ? darkMode
                ? 'text-amber-300 bg-amber-500/20 font-bold shadow-inner border border-amber-500/30'
                : 'text-amber-700 bg-amber-100 font-bold shadow-inner border border-amber-300'
              : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Trophy className={`w-5 h-5 mb-0.5 ${activeScreen === 'leaderboard' ? 'text-amber-500 scale-110' : ''} transition-transform`} />
          <span className="text-[10px] font-semibold leading-none">{t.ranks}</span>
          {activeScreen === 'leaderboard' && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute -bottom-0.5 shadow-sm shadow-amber-400" />
          )}
        </button>

        {/* Tab 5: Honors & Achievements */}
        <button
          id="mobile-tab-achievements"
          onClick={() => handleNav('achievements')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl min-w-[56px] transition-all relative ${
            activeScreen === 'achievements'
              ? darkMode
                ? 'text-amber-300 bg-amber-500/20 font-bold shadow-inner border border-amber-500/30'
                : 'text-amber-700 bg-amber-100 font-bold shadow-inner border border-amber-300'
              : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className={`w-5 h-5 mb-0.5 ${activeScreen === 'achievements' ? 'text-amber-500 scale-110' : ''} transition-transform`} />
          <span className="text-[10px] font-semibold leading-none">{language === 'tl' ? 'Parangal' : 'Awards'}</span>
          {activeScreen === 'achievements' && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute -bottom-0.5 shadow-sm shadow-amber-400" />
          )}
        </button>
      </nav>
    </>
  );
};
