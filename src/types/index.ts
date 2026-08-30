export type Difficulty = 'easy' | 'medium' | 'hard';

export type QuestionCategory = 
  | 'bible_general'
  | 'old_testament'
  | 'new_testament'
  | 'gospels'
  | 'prophecy'
  | 'adventist_beliefs'
  | 'sabbath'
  | 'health_newstart'
  | 'church_history'
  | 'pathfinder';

export interface Question {
  id: string;
  category: QuestionCategory;
  difficulty: Difficulty;
  question: string;
  questionTl?: string;
  options: string[];
  optionsTl?: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  explanationTl?: string;
  bibleReference: string;
  tags?: string[];
  tagsTl?: string[];
}

export interface CharacterClueItem {
  id: string;
  name: string;
  nameTl?: string;
  title: string;
  titleTl?: string;
  clues: string[];
  cluesTl?: string[];
  options: string[];
  optionsTl?: string[];
  correctAnswer: string;
  correctAnswerTl?: string;
  bibleReference: string;
  description: string;
  descriptionTl?: string;
  era: 'Patriarchs' | 'Exodus & Judges' | 'Kings & Prophets' | 'Exile & Return' | 'Gospels' | 'Early Church';
  eraTl?: string;
}

export type VerseChallengeType = 'scramble' | 'fill_blank' | 'match_reference';

export interface VerseChallengeItem {
  id: string;
  reference: string;
  fullVerse: string;
  fullVerseTl?: string;
  scrambledWords?: string[];
  scrambledWordsTl?: string[];
  blankVerse?: string;
  blankVerseTl?: string;
  missingWordOptions?: string[];
  missingWordOptionsTl?: string[];
  correctWord?: string;
  correctWordTl?: string;
  theme: string;
  themeTl?: string;
}

export interface PathfinderHonor {
  id: string;
  name: string;
  nameTl?: string;
  category: 'Nature' | 'Outdoor' | 'Health' | 'Spiritual' | 'Crafts' | 'Leadership';
  categoryTl?: string;
  icon: string; // lucide icon identifier
  color: string;
  description: string;
  descriptionTl?: string;
  requirements: string[];
  requirementsTl?: string[];
  quiz: Question[];
}

export interface PathfinderRank {
  id: string;
  name: string;
  nameTl?: string;
  ageGroup: string;
  ageGroupTl?: string;
  color: string;
  badge: string;
  description: string;
  descriptionTl?: string;
  requiredXp: number;
  unlocked: boolean;
}

export interface ChurchHistoryEvent {
  id: string;
  year: number;
  title: string;
  titleTl?: string;
  location: string;
  locationTl?: string;
  description: string;
  descriptionTl?: string;
  significance: string;
  significanceTl?: string;
  pioneers: string[];
  quizQuestion?: Question;
}

export interface HealthPrinciple {
  letter: string;
  name: string;
  nameTl?: string;
  tagline: string;
  taglineTl?: string;
  icon: string;
  description: string;
  descriptionTl?: string;
  biblicalBasis: string;
  dailyGoal: string;
  dailyGoalTl?: string;
  practicalTips: string[];
  practicalTipsTl?: string[];
  questions: Question[];
}

export interface WordSearchPuzzle {
  id: string;
  title: string;
  titleTl?: string;
  category: string;
  categoryTl?: string;
  gridSize: number;
  words: string[];
  wordsTl?: string[];
  grid: string[][];
  gridTl?: string[][];
  clues?: { [word: string]: string };
  cluesTl?: { [word: string]: string };
}

export interface MemoryCardPair {
  id: string;
  type: 'verse' | 'symbol' | 'hero';
  itemA: { id: string; title: string; titleTl?: string; subtitle: string; subtitleTl?: string; icon: string };
  itemB: { id: string; title: string; titleTl?: string; subtitle: string; subtitleTl?: string; icon: string };
}

export interface Badge {
  id: string;
  name: string;
  nameTl?: string;
  description: string;
  descriptionTl?: string;
  icon: string;
  category: 'quiz' | 'streak' | 'pathfinder' | 'sabbath' | 'health' | 'history' | 'master';
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  titleTl?: string;
  description: string;
  descriptionTl?: string;
  rewardXp: number;
  rewardCoins: number;
  completed: boolean;
  gameMode: string;
  targetCount: number;
  currentCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  level: number;
  xp: number;
  coins: number;
  streakDays: number;
  lastPlayedDate: string;
  theme: 'nature_sunrise' | 'peaceful_sabbath' | 'galilee_blue' | 'mount_sinai' | 'eden_green' | 'dark_twilight';
  soundEnabled: boolean;
  musicEnabled: boolean;
  language?: 'en' | 'tl';
  churchOrClub?: string;
  churchName?: string;
  bibleVersion: 'KJV' | 'NKJV' | 'NIV';
  pathfinderRankId: string;
  earnedHonorIds: string[];
  earnedBadgeIds: string[];
  stats: {
    totalQuizzesPlayed: number;
    totalCorrectAnswers: number;
    versesMemorized: number;
    sabbathsCelebrated: number;
    multiplayerWins: number;
    perfectQuizzes: number;
  };
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  nameTl?: string;
  avatar: string;
  title: string;
  titleTl?: string;
  clubOrChurch: string;
  clubOrChurchTl?: string;
  score: number;
  level: number;
  rank: number;
  isCurrentUser?: boolean;
}

export interface RoomPlayer {
  id: string;
  name: string;
  avatar: string;
  score: number;
  isHost: boolean;
  isReady: boolean;
  lastReaction?: string;
  reactionTime?: number;
  answeredCurrent: boolean;
  isBot?: boolean;
}

export interface MultiplayerRoom {
  code: string;
  hostId: string;
  status: 'waiting' | 'playing' | 'round_recap' | 'game_over';
  currentQuestionIndex: number;
  questions: Question[];
  players: RoomPlayer[];
  timeRemaining: number;
  totalRounds: number;
}
