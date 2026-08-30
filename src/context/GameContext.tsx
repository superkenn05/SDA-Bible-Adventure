import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserProfile, 
  Question, 
  Badge, 
  DailyChallenge, 
  LeaderboardEntry,
  PathfinderHonor
} from '../types';
import { initialBibleQuestions } from '../data/bibleQuestions';
import { initialBadges, sampleDailyChallenges, sampleLeaderboard } from '../data/rewardsAndLeaderboard';
import { pathfinderHonors } from '../data/pathfinderData';
import { sound } from '../utils/audio';
import { getTranslation, Language, TranslationDictionary } from '../utils/translations';

interface GameContextType {
  user: UserProfile;
  questions: Question[];
  badges: Badge[];
  dailyChallenges: DailyChallenge[];
  leaderboard: LeaderboardEntry[];
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  // Actions
  addXpAndCoins: (xp: number, coins: number, activityName?: string) => void;
  updateUserStats: (updates: Partial<UserProfile['stats']>) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  resetUserProgress: () => void;
  checkAndAwardBadges: () => void;
  unlockHonor: (honorId: string) => void;
  addCustomQuestion: (question: Omit<Question, 'id'>) => void;
  deleteCustomQuestion: (id: string) => void;
  deleteQuestion: (id: string) => void;
  resetQuestionsToDefault: () => void;
  completeDailyChallenge: (challengeId: string) => void;
  triggerCloudSync: () => Promise<void>;
  exportUserData: () => string;
  importUserData: (jsonData: string) => boolean;
  celebrate: () => void;
}

const defaultUser: UserProfile = {
  id: 'usr_local_1',
  name: 'Adventurer',
  avatar: 'avatar_pathfinder',
  title: 'Friend Pathfinder',
  level: 1,
  xp: 0,
  coins: 100,
  streakDays: 1,
  lastPlayedDate: new Date().toISOString().split('T')[0],
  theme: 'nature_sunrise',
  soundEnabled: true,
  musicEnabled: false,
  language: 'en',
  bibleVersion: 'NKJV',
  pathfinderRankId: 'rank_friend',
  earnedHonorIds: [],
  earnedBadgeIds: ['badge_first_quiz'],
  stats: {
    totalQuizzesPlayed: 0,
    totalCorrectAnswers: 0,
    versesMemorized: 0,
    sabbathsCelebrated: 0,
    multiplayerWins: 0,
    perfectQuizzes: 0
  }
};

const STORAGE_KEYS = {
  USER: 'sda_app_user_v1',
  QUESTIONS: 'sda_app_questions_v1',
  BADGES: 'sda_app_badges_v1',
  CHALLENGES: 'sda_app_challenges_v1',
  LAST_SYNC: 'sda_app_last_sync_v1'
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return defaultUser;
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialBibleQuestions;
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BADGES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialBadges;
  });

  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return sampleDailyChallenges;
  });

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || 'Offline Storage Ready';
  });

  const [activeScreen, setActiveScreen] = useState<string>('dashboard');

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
    } catch {}
  }, [questions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
    } catch {}
  }, [badges]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(dailyChallenges));
    } catch {}
  }, [dailyChallenges]);

  // Sync sound settings
  useEffect(() => {
    sound.setSoundMuted(!user.soundEnabled);
    sound.setMusicMuted(!user.musicEnabled);
  }, [user.soundEnabled, user.musicEnabled]);

  // Daily streak check
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (user.lastPlayedDate !== today) {
      const lastDate = new Date(user.lastPlayedDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setUser(prev => ({
        ...prev,
        lastPlayedDate: today,
        streakDays: diffDays === 1 ? prev.streakDays + 1 : (diffDays === 0 ? prev.streakDays : 1)
      }));
    }
  }, [user.lastPlayedDate]);

  const celebrate = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6']
      });
    } catch {}
  }, []);

  const addXpAndCoins = useCallback((xpToAdd: number, coinsToAdd: number, _activityName?: string) => {
    setUser(prev => {
      const newXp = prev.xp + xpToAdd;
      const newCoins = prev.coins + coinsToAdd;
      const newLevel = Math.floor(newXp / 250) + 1;
      const didLevelUp = newLevel > prev.level;

      if (didLevelUp) {
        sound.playLevelUp();
        celebrate();
      }

      // Calculate pathfinder rank based on XP
      let newRankId = prev.pathfinderRankId;
      let newTitle = prev.title;

      if (newXp >= 3000) {
        newRankId = 'rank_master_guide';
        newTitle = 'Master Guide Trailblazer';
      } else if (newXp >= 2000) {
        newRankId = 'rank_guide';
        newTitle = 'Guide Leader';
      } else if (newXp >= 1400) {
        newRankId = 'rank_voyager';
        newTitle = 'Voyager Pioneer';
      } else if (newXp >= 900) {
        newRankId = 'rank_ranger';
        newTitle = 'Ranger Scout';
      } else if (newXp >= 500) {
        newRankId = 'rank_explorer';
        newTitle = 'Explorer Pathfinder';
      } else if (newXp >= 200) {
        newRankId = 'rank_companion';
        newTitle = 'Companion Pathfinder';
      }

      return {
        ...prev,
        xp: newXp,
        coins: newCoins,
        level: newLevel,
        pathfinderRankId: newRankId,
        title: newTitle
      };
    });
  }, [celebrate]);

  const updateUserStats = useCallback((updates: Partial<UserProfile['stats']>) => {
    setUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        ...updates
      }
    }));
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const unlockHonor = useCallback((honorId: string) => {
    setUser(prev => {
      if (prev.earnedHonorIds.includes(honorId)) return prev;
      sound.playLevelUp();
      celebrate();
      return {
        ...prev,
        earnedHonorIds: [...prev.earnedHonorIds, honorId],
        xp: prev.xp + 150,
        coins: prev.coins + 75
      };
    });
  }, [celebrate]);

  const checkAndAwardBadges = useCallback(() => {
    setBadges(prevBadges => {
      return prevBadges.map(badge => {
        let isUnlocked = !!badge.unlockedAt;
        let currentProgress = badge.progress;

        if (badge.id === 'badge_first_quiz' && user.stats.totalQuizzesPlayed >= 1) {
          isUnlocked = true;
          currentProgress = 1;
        } else if (badge.id === 'badge_perfect_score' && user.stats.perfectQuizzes >= 1) {
          isUnlocked = true;
          currentProgress = 1;
        } else if (badge.id === 'badge_streak_3' && user.streakDays >= 3) {
          isUnlocked = true;
          currentProgress = Math.min(3, user.streakDays);
        } else if (badge.id === 'badge_sabbath_delight' && user.stats.sabbathsCelebrated >= 1) {
          isUnlocked = true;
          currentProgress = 1;
        } else if (badge.id === 'badge_pathfinder_honor') {
          currentProgress = Math.min(3, user.earnedHonorIds.length);
          if (currentProgress >= 3) isUnlocked = true;
        }

        return {
          ...badge,
          progress: currentProgress,
          unlockedAt: isUnlocked && !badge.unlockedAt ? new Date().toISOString().split('T')[0] : badge.unlockedAt
        };
      });
    });
  }, [user.stats, user.streakDays, user.earnedHonorIds.length]);

  const addCustomQuestion = useCallback((qData: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...qData,
      id: 'custom_q_' + Date.now()
    };
    setQuestions(prev => [newQuestion, ...prev]);
  }, []);

  const deleteCustomQuestion = useCallback((id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  }, []);

  const resetQuestionsToDefault = useCallback(() => {
    setQuestions(initialBibleQuestions);
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
  }, []);

  const completeDailyChallenge = useCallback((challengeId: string) => {
    setDailyChallenges(prev => 
      prev.map(c => {
        if (c.id === challengeId && !c.completed) {
          addXpAndCoins(c.rewardXp, c.rewardCoins);
          return { ...c, completed: true, currentCount: c.targetCount };
        }
        return c;
      })
    );
  }, [addXpAndCoins]);

  const triggerCloudSync = useCallback(async () => {
    setIsSyncing(true);
    // Simulate instantaneous offline/cloud sync with timestamp
    await new Promise(resolve => setTimeout(resolve, 900));
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSyncedAt(`Synced at ${nowStr}`);
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, `Synced at ${nowStr}`);
    setIsSyncing(false);
  }, []);

  const exportUserData = useCallback(() => {
    return JSON.stringify({
      user,
      questions,
      badges,
      dailyChallenges,
      version: '1.0.0',
      exportedAt: new Date().toISOString()
    }, null, 2);
  }, [user, questions, badges, dailyChallenges]);

  const importUserData = useCallback((jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.user) setUser(parsed.user);
      if (parsed.questions) setQuestions(parsed.questions);
      if (parsed.badges) setBadges(parsed.badges);
      if (parsed.dailyChallenges) setDailyChallenges(parsed.dailyChallenges);
      return true;
    } catch {
      return false;
    }
  }, []);

  // Compute dynamic leaderboard including current user
  const combinedLeaderboard = React.useMemo(() => {
    const userEntry: LeaderboardEntry = {
      id: user.id,
      name: `${user.name} (You)`,
      avatar: user.avatar,
      title: user.title,
      clubOrChurch: 'Your Local Church / Club',
      score: user.xp,
      level: user.level,
      rank: 1,
      isCurrentUser: true
    };

    const all = [...sampleLeaderboard, userEntry].sort((a, b) => b.score - a.score);
    return all.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
  }, [user]);

  const resetUserProgress = useCallback(() => {
    setUser(defaultUser);
    setBadges(initialBadges);
    setDailyChallenges(sampleDailyChallenges);
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.BADGES);
      localStorage.removeItem(STORAGE_KEYS.CHALLENGES);
    } catch {}
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    updateProfile({ soundEnabled: enabled });
  }, [updateProfile]);

  const setDarkMode = useCallback((enabled: boolean) => {
    updateProfile({ theme: enabled ? 'dark' : 'nature_sunrise' });
  }, [updateProfile]);

  const setLanguage = useCallback((lang: Language) => {
    updateProfile({ language: lang });
  }, [updateProfile]);

  const currentLanguage: Language = user.language === 'tl' ? 'tl' : 'en';
  const t = getTranslation(currentLanguage);

  const deleteQuestion = useCallback((id: string) => {
    deleteCustomQuestion(id);
  }, [deleteCustomQuestion]);

  return (
    <GameContext.Provider value={{
      user,
      questions,
      badges,
      dailyChallenges,
      leaderboard: combinedLeaderboard,
      isOnline,
      isSyncing,
      lastSyncedAt,
      activeScreen,
      setActiveScreen,
      soundEnabled: user.soundEnabled ?? true,
      setSoundEnabled,
      darkMode: user.theme === 'dark',
      setDarkMode,
      language: currentLanguage,
      setLanguage,
      t,
      addXpAndCoins,
      updateUserStats,
      updateProfile,
      updateUserProfile: updateProfile,
      resetUserProgress,
      checkAndAwardBadges,
      unlockHonor,
      addCustomQuestion,
      deleteCustomQuestion,
      deleteQuestion,
      resetQuestionsToDefault,
      completeDailyChallenge,
      triggerCloudSync,
      exportUserData,
      importUserData,
      celebrate
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
