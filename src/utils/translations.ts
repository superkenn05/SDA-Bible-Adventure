export type Language = 'en' | 'tl';

export interface TranslationDictionary {
  // Navigation & General
  appName: string;
  hub: string;
  games: string;
  arena: string;
  ranks: string;
  pathfinders: string;
  honors: string;
  settings: string;
  menu: string;
  multiplayer: string;
  backToGames: string;
  streak: string;
  talents: string;
  level: string;
  totalXp: string;
  soundFx: string;
  soundFxDesc: string;
  hymns: string;
  hymnsDesc: string;
  muteHymn: string;
  playHymn: string;
  darkTheme: string;
  darkThemeDesc: string;
  searchGamesPlaceholder: string;
  allGames: string;
  scripture: string;
  puzzles: string;
  
  // Settings Screen
  settingsTitle: string;
  tabProfile: string;
  tabPreferences: string;
  tabData: string;
  viewBadgesAndHonors: string;
  chooseAvatar: string;
  displayName: string;
  churchOrClub: string;
  saveProfile: string;
  profileSaved: string;
  
  // Language Setting
  languageTitle: string;
  languageDesc: string;
  englishOption: string;
  englishDesc: string;
  tagalogOption: string;
  tagalogDesc: string;
  
  // Audio & Appearance
  audioAndVisualTitle: string;
  
  // Data & Backup
  dataBackupTitle: string;
  dataBackupDesc: string;
  exportBackup: string;
  importBackup: string;
  syncCloud: string;
  syncing: string;
  teacherPoolTitle: string;
  teacherPoolDesc: string;
  openQuestionEditor: string;
  dangerZoneTitle: string;
  dangerZoneDesc: string;
  resetProgressBtn: string;
  resetConfirm: string;
  importSuccess: string;
  importFail: string;
  
  // Dashboard & Games
  dailyChallengesTitle: string;
  completeTodayChallenges: string;
  playNow: string;
  quickLaunch: string;
  pathfinderRank: string;
  verseOfTheDay: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    // Navigation & General
    appName: 'SDA Bible Games',
    hub: 'Hub',
    games: 'Games',
    arena: 'Arena',
    ranks: 'Ranks',
    pathfinders: 'Pathfinders',
    honors: 'Honors',
    settings: 'Settings',
    menu: 'Menu',
    multiplayer: 'Multiplayer',
    backToGames: 'Back to Games Hub',
    streak: 'Streak',
    talents: 'Talents',
    level: 'Level',
    totalXp: 'Total XP',
    soundFx: 'Sound Effects & Chimes',
    soundFxDesc: 'Audio cues for correct answers, clicks, and celebrations',
    hymns: 'SDA Hymnal Melodies',
    hymnsDesc: 'Peaceful acoustic hymns (We Have This Hope, Day is Dying in the West)',
    muteHymn: 'Mute Hymn',
    playHymn: 'Play Hymn',
    darkTheme: 'Twilight Dark Canvas',
    darkThemeDesc: 'Eye-safe starry night mode / Warm daylight',
    searchGamesPlaceholder: 'Search 10 games, honors, trivia...',
    allGames: 'All Games',
    scripture: 'Scripture',
    puzzles: 'Puzzles',
    
    // Settings Screen
    settingsTitle: 'App Settings & Profile',
    tabProfile: 'Profile',
    tabPreferences: 'Preferences',
    tabData: 'Data & Sync',
    viewBadgesAndHonors: 'View Badges & Honors',
    chooseAvatar: 'Choose Character Avatar',
    displayName: 'Display Name',
    churchOrClub: 'Church / Pathfinder Club',
    saveProfile: 'Save Profile Changes',
    profileSaved: 'Profile Updated',
    
    // Language Setting
    languageTitle: 'Language / Wika',
    languageDesc: 'Pumili sa pagitan ng English o Tagalog (Taglish)',
    englishOption: 'English',
    englishDesc: 'Default English language',
    tagalogOption: 'Tagalog (Taglish)',
    tagalogDesc: 'Kaswal at madaling intindihin na Taglish',
    
    // Audio & Appearance
    audioAndVisualTitle: 'Audio & Appearance Preferences',
    
    // Data & Backup
    dataBackupTitle: 'Offline Storage & Backup',
    dataBackupDesc: 'All your quiz scores, badges, and honors are stored safely on your device. You can download a backup file or sync to cloud anytime.',
    exportBackup: 'Export Backup',
    importBackup: 'Import Backup',
    syncCloud: 'Sync Cloud Backup',
    syncing: 'Syncing...',
    teacherPoolTitle: 'Teacher Question Pool & Custom Quizzes',
    teacherPoolDesc: 'Add custom Bible trivia questions, modify options, and set difficulty for Sabbath School',
    openQuestionEditor: 'Open Question Editor',
    dangerZoneTitle: 'Danger Zone',
    dangerZoneDesc: 'Resetting will clear your local quiz scores, streak, and unlocked badges, restoring the default character state.',
    resetProgressBtn: 'Reset Local Game Progress',
    resetConfirm: 'Are you sure you want to reset all game scores and start fresh?',
    importSuccess: 'Progress imported successfully!',
    importFail: 'Failed to read file format.',
    
    // Dashboard & Games
    dailyChallengesTitle: 'Daily Faith Challenges',
    completeTodayChallenges: 'Complete daily tasks to earn XP and Talents',
    playNow: 'Play Now',
    quickLaunch: 'Quick Launch',
    pathfinderRank: 'Pathfinder Rank',
    verseOfTheDay: 'Verse of the Day'
  },
  tl: {
    // Navigation & General (Natural conversational Taglish)
    appName: 'SDA Bible Games',
    hub: 'Hub',
    games: 'Mga Laro',
    arena: 'Live Arena',
    ranks: 'Ranks',
    pathfinders: 'Pathfinders',
    honors: 'Honors',
    settings: 'Settings',
    menu: 'Menu',
    multiplayer: 'Multiplayer',
    backToGames: 'Bumalik sa Games',
    streak: 'Streak',
    talents: 'Talents',
    level: 'Level',
    totalXp: 'Kabuuang XP',
    soundFx: 'Sound Effects & Chimes',
    soundFxDesc: 'Tunog para sa tamang sagot, clicks, at tagumpay',
    hymns: 'Tugtog ng SDA Hymnal',
    hymnsDesc: 'Tugtugin ng mga paboritong himno (We Have This Hope, Day is Dying)',
    muteHymn: 'I-pause ang Hymn',
    playHymn: 'Patugtugin ang Hymn',
    darkTheme: 'Dark Mode (Panggabi)',
    darkThemeDesc: 'Madilim at banayad sa mata / Maliwanag na screen',
    searchGamesPlaceholder: 'Maghanap ng laro, honors, trivia...',
    allGames: 'Lahat ng Laro',
    scripture: 'Biblia & Aral',
    puzzles: 'Puzzles',
    
    // Settings Screen
    settingsTitle: 'App Settings & Profile Mo',
    tabProfile: 'Profile Mo',
    tabPreferences: 'Settings & Tunog',
    tabData: 'Backup & Data',
    viewBadgesAndHonors: 'Tingnan ang Badges & Honors',
    chooseAvatar: 'Pumili ng Avatar Mo',
    displayName: 'Pangalan o Nickname',
    churchOrClub: 'Simbahan o Pathfinder Club',
    saveProfile: 'I-save ang Profile',
    profileSaved: 'Na-save na ang Profile!',
    
    // Language Setting
    languageTitle: 'Wika / Language',
    languageDesc: 'Pumili sa English o kaswal na Tagalog (Taglish)',
    englishOption: 'English',
    englishDesc: 'Gamitin ang salitang Ingles',
    tagalogOption: 'Tagalog (Taglish)',
    tagalogDesc: 'Madaling maintindihan at kaswal na Taglish',
    
    // Audio & Appearance
    audioAndVisualTitle: 'Tunog, Musika & Hitsura',
    
    // Data & Backup
    dataBackupTitle: 'Offline Storage & Backup',
    dataBackupDesc: 'Naka-save ang lahat ng iyong score, badges, at honors sa iyong device para makapaglaro kahit offline. Pwede kang mag-download ng backup o mag-sync sa cloud.',
    exportBackup: 'I-download ang Backup',
    importBackup: 'Mag-upload ng Backup',
    syncCloud: 'I-sync sa Cloud',
    syncing: 'Nag-si-sync...',
    teacherPoolTitle: 'Teacher Question Pool & Custom Quizzes',
    teacherPoolDesc: 'Magdagdag ng sariling Bible trivia questions at choices para sa Sabbath School o AY program',
    openQuestionEditor: 'Buksan ang Question Editor',
    dangerZoneTitle: 'Danger Zone (Pag-reset)',
    dangerZoneDesc: 'Buburahin nito ang iyong mga naipong score, streak, at badges pabalik sa simula.',
    resetProgressBtn: 'I-reset ang Game Progress',
    resetConfirm: 'Sigurado ka bang gusto mong i-reset ang lahat ng game scores mo?',
    importSuccess: 'Matagumpay na na-import ang progress mo!',
    importFail: 'Hindi mabasa ang format ng file.',
    
    // Dashboard & Games
    dailyChallengesTitle: 'Araw-araw na Hamon sa Pananampalataya',
    completeTodayChallenges: 'Tapusin ang daily tasks para makakuha ng dagdag XP at Talents',
    playNow: 'Laruin Na',
    quickLaunch: 'Mabilisang Laro',
    pathfinderRank: 'Ranggo sa Pathfinder',
    verseOfTheDay: 'Bersikulo Ngayong Araw'
  }
};

export const getTranslation = (lang?: Language): TranslationDictionary => {
  return translations[lang === 'tl' ? 'tl' : 'en'];
};
