import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Puzzle, 
  Scroll, 
  Sunrise, 
  Compass, 
  Grid3X3, 
  Search, 
  HeartPulse, 
  History, 
  Users, 
  Award, 
  Flame, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  Mountain, 
  Sun, 
  Shield 
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { pathfinderRanks } from '../data/pathfinderData';
import { sound } from '../utils/audio';
import { localizeRank, localizeDailyChallenge } from '../utils/localize';

export const DashboardScreen: React.FC = () => {
  const { 
    user, 
    dailyChallenges, 
    setActiveScreen, 
    completeDailyChallenge,
    language,
    darkMode
  } = useGame();

  const rawRank = pathfinderRanks.find(r => r.id === user.pathfinderRankId) || pathfinderRanks[0];
  const currentRank = localizeRank(rawRank, language);

  const handleGameSelect = (screen: string) => {
    sound.playClick();
    setActiveScreen(screen);
  };

  const gameCards = [
    {
      id: 'game_bible_quiz',
      screen: 'bible_quiz',
      title: language === 'tl' ? 'Pagsusulit sa Bibliya' : 'Bible Quiz',
      category: language === 'tl' ? 'Kasulatan at Propesiya' : 'Scripture & Prophecy',
      desc: language === 'tl'
        ? 'Mga tanong na may Madali, Katamtaman, Mahirap na oras, bonus sa streak, at sanggunian sa Bibliya.'
        : 'Multiple choice questions with Easy, Medium, Hard timers, streak bonuses, and Bible references.',
      icon: BookOpen,
      color: 'from-amber-500 to-orange-600',
      tag: language === 'tl' ? 'Klasikong Pagsusulit' : 'Classic Quiz',
      plays: language === 'tl' ? `${user.stats.totalQuizzesPlayed} nilaro` : `${user.stats.totalQuizzesPlayed} played`
    },
    {
      id: 'game_character_guess',
      screen: 'character_guess',
      title: language === 'tl' ? 'Hulaan ang Tauhan sa Bibliya' : 'Bible Character Guessing',
      category: language === 'tl' ? 'Sino Ako?' : 'Who Am I?',
      desc: language === 'tl'
        ? 'Lutasin ang 3 pahiwatig upang makilala ang mga bayani, reyna, propeta, at apostol.'
        : 'Solve 3 progressive Biblical clues to identify heroes, queens, prophets, and apostles.',
      icon: HelpCircle,
      color: 'from-indigo-500 to-blue-600',
      tag: language === 'tl' ? 'Hiwagang Pahiwatig' : 'Mystery Clues',
      plays: language === 'tl' ? '12+ Tauhan' : '12+ Characters'
    },
    {
      id: 'game_verse_challenge',
      screen: 'verse_challenge',
      title: language === 'tl' ? 'Hamon sa Talata ng Bibliya' : 'Bible Verse Challenge',
      category: language === 'tl' ? 'Pagsasaulo ng Talata' : 'Scripture Memory',
      desc: language === 'tl'
        ? 'Ayusin ang nagulong salita, punan ang patlang, at isaulo ang Banal na Salita.'
        : 'Arrange scrambled words into correct order, fill missing blanks, and match references.',
      icon: Puzzle,
      color: 'from-emerald-500 to-teal-600',
      tag: language === 'tl' ? 'Ayusin ang Salita' : 'Word Scramble',
      plays: language === 'tl' ? `${user.stats.versesMemorized} naisaulo` : `${user.stats.versesMemorized} memorized`
    },
    {
      id: 'game_adventist_beliefs',
      screen: 'adventist_beliefs',
      title: language === 'tl' ? '28 Pangunahing Paniniwala' : '28 Fundamental Beliefs',
      category: language === 'tl' ? 'Doktrina at Katotohanan' : 'Doctrines & Truth',
      desc: language === 'tl'
        ? 'Tuklasin ang Dambana, Ikalawang Pagparito, Sabbath, Kalagayan ng Patay, at Paglikha.'
        : 'Master the Sanctuary, Second Coming, Sabbath, State of the Dead, and Creation.',
      icon: Scroll,
      color: 'from-purple-500 to-indigo-600',
      tag: language === 'tl' ? '28 Paniniwala' : '28 Beliefs',
      plays: language === 'tl' ? '6 Kategorya' : '6 Categories'
    },
    {
      id: 'game_sabbath_challenge',
      screen: 'sabbath_challenge',
      title: language === 'tl' ? 'Hamon sa Sabbath' : 'Sabbath Challenge',
      category: language === 'tl' ? 'Dambana sa Panahon' : 'Sanctuary in Time',
      desc: language === 'tl'
        ? 'Suriin ang banal laban sa pang-araw-araw na gawain, maghanda sa paglubog ng araw, at tanggapin ang pagpapala.'
        : 'Sort holy vs weekday activities, prepare for sunset, and receive peaceful Sabbath blessings.',
      icon: Sunrise,
      color: 'from-rose-500 to-amber-600',
      tag: language === 'tl' ? 'Kapayapaan sa Paglubog' : 'Sunset & Peace',
      plays: language === 'tl' ? `${user.stats.sabbathsCelebrated} natapos` : `${user.stats.sabbathsCelebrated} completed`
    },
    {
      id: 'game_pathfinder',
      screen: 'pathfinder',
      title: language === 'tl' ? 'Pakikipagsapalaran ng Pathfinder' : 'Pathfinder Adventure',
      category: language === 'tl' ? 'Klub at mga Honor' : 'Club & Honors',
      desc: language === 'tl'
        ? 'Mula Kaibigan (Friend) hanggang Punong Gabay (Master Guide)! Magkamit ng digital Honor Patches.'
        : 'Progress from Friend to Master Guide! Earn digital Honor Patches in Knots, Camping, First Aid, and Stars.',
      icon: Compass,
      color: 'from-sky-500 to-emerald-600',
      tag: language === 'tl' ? 'Mga Honor at Tsapa' : 'Honors & Badges',
      plays: language === 'tl' ? `${user.earnedHonorIds.length} honors nakamit` : `${user.earnedHonorIds.length} honors earned`
    },
    {
      id: 'game_memory_match',
      screen: 'memory_game',
      title: language === 'tl' ? 'Pares ng Alaala sa Bibliya' : 'Bible Memory Match',
      category: language === 'tl' ? 'Pagpapares ng Kard' : 'Card Pairing',
      desc: language === 'tl'
        ? 'Buklatin at ipares ang mga talata, propesiya, at tauhan sa makinis na cards at timer.'
        : 'Flip and pair Bible verses, prophetic symbols, and heroes with smooth cards and timers.',
      icon: Grid3X3,
      color: 'from-amber-600 to-yellow-600',
      tag: language === 'tl' ? 'Visual Match' : 'Visual Match',
      plays: language === 'tl' ? '3 Sukat ng Grid' : '3 Grid Sizes'
    },
    {
      id: 'game_word_search',
      screen: 'word_search',
      title: language === 'tl' ? 'Paghahanap ng Salita sa Bibliya' : 'Bible Word Search',
      category: language === 'tl' ? 'Grid ng mga Titik' : 'Letter Grid',
      desc: language === 'tl'
        ? 'Hanapin ang mga aklat sa Bibliya, bunga ng Espiritu, at mga pioneer sa interactive na grid.'
        : 'Find hidden Bible books, fruits of the Spirit, and Adventist pioneers in interactive letter grids.',
      icon: Search,
      color: 'from-teal-500 to-cyan-600',
      tag: language === 'tl' ? 'Hanap Salita' : 'Word Finder',
      plays: language === 'tl' ? '3 Paksa ng Palaisipan' : '3 Themed Puzzles'
    },
    {
      id: 'game_health_challenge',
      screen: 'health_challenge',
      title: language === 'tl' ? 'Hamon sa Kalusugan (NEWSTART)' : 'Health Challenge (NEWSTART)',
      category: language === 'tl' ? 'Malusog na Pamumuhay' : 'Wholesome Living',
      desc: language === 'tl'
        ? 'Tuklasin ang Nutrisyon, Ehersisyo, Tubig, Sikat ng Araw, Pagtitimpi, Hangin, Pahinga, at Tiwala sa Diyos.'
        : 'Discover Nutrition, Exercise, Water, Sunlight, Temperance, Air, Rest, and Trust in God.',
      icon: HeartPulse,
      color: 'from-green-600 to-emerald-700',
      tag: language === 'tl' ? '8 Batas ng NEWSTART' : 'NEWSTART Laws',
      plays: language === 'tl' ? '8 Simulain' : '8 Principles'
    },
    {
      id: 'game_church_history',
      screen: 'church_history',
      title: language === 'tl' ? 'Timeline ng Kasaysayan ng Simbahan' : 'Church History Timeline',
      category: language === 'tl' ? 'Mga Pioneer ng Adventista' : 'Advent Pioneers',
      desc: language === 'tl'
        ? 'Galugarin ang 1844-1903 timeline, mga unang pioneer (Miller, White, Bates, Andrews), at mahahalagang yugto.'
        : 'Explore the 1844-1903 timeline, early pioneers (Miller, White, Bates, Andrews), and historic milestones.',
      icon: History,
      color: 'from-stone-600 to-slate-700',
      tag: language === 'tl' ? '1844 Hanggang Pandaigdigan' : '1844 to Global',
      plays: language === 'tl' ? 'Pagsusulit sa Kasaysayan' : 'Milestone Quizzes'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div 
        id="dashboard-hero-banner"
        className={`relative overflow-hidden rounded-3xl backdrop-blur-xl border shadow-2xl p-6 sm:p-9 transition-all ${
          darkMode 
            ? 'bg-gradient-to-br from-amber-500/20 via-orange-600/15 to-purple-700/20 border-white/15 text-white' 
            : 'bg-gradient-to-br from-amber-500/20 via-orange-400/20 to-amber-100/90 border-amber-300 text-slate-900 shadow-amber-900/5'
        }`}
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 -mb-10 w-60 h-60 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-4 border shadow-sm ${
            darkMode 
              ? 'bg-white/10 text-amber-300 border-white/15' 
              : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}>
            <Sun className={`w-3.5 h-3.5 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            <span>{language === 'tl' ? 'Pang-araw-araw na Pagninilay sa Kasulatan' : 'Daily Scripture Reflection'}</span>
          </div>

          <blockquote className={`text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-2 font-serif ${
            darkMode ? 'text-white drop-shadow-sm' : 'text-slate-900'
          }`}>
            {language === 'tl'
              ? '“Ang salita mo\'y ilawan sa aking mga paa, at liwanag sa aking landas.”'
              : '“Your word is a lamp to my feet and a light to my path.”'}
          </blockquote>
          <p className={`text-sm font-semibold mb-6 ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
            {language === 'tl' ? '— Mga Awit 119:105' : '— Psalm 119:105'}
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              id="btn-hero-start-quiz"
              onClick={() => handleGameSelect('bible_quiz')}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-slate-950" />
              {language === 'tl' ? 'Maglaro ng Pagsusulit sa Bibliya' : 'Play Daily Bible Quiz'}
            </button>
            <button
              id="btn-hero-multiplayer"
              onClick={() => handleGameSelect('multiplayer')}
              className={`px-6 py-3 rounded-2xl backdrop-blur-md font-bold text-sm border active:scale-95 transition-all flex items-center gap-2 shadow-lg ${
                darkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/20' 
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
              }`}
            >
              <Users className={`w-4 h-4 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
              {language === 'tl' ? 'Multiplayer Kuwarto' : 'Multiplayer Room'}
            </button>
          </div>
        </div>

        {/* Ambient Decorative Mountain Motif */}
        <div className={`absolute right-6 bottom-2 hidden sm:block pointer-events-none ${
          darkMode ? 'opacity-20 text-amber-200' : 'opacity-25 text-amber-600'
        }`}>
          <Mountain className="w-40 h-40" />
        </div>
      </div>

      {/* Overview Stats & Pathfinder Rank Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Pathfinder Rank Card */}
        <div 
          id="stat-pathfinder-card"
          onClick={() => handleGameSelect('pathfinder')}
          className={`p-6 rounded-3xl backdrop-blur-xl border shadow-xl transition-all cursor-pointer group flex flex-col justify-between ${
            darkMode 
              ? 'bg-white/[0.06] hover:bg-white/[0.10] border-white/10 hover:border-white/20' 
              : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'tl' ? 'Antas ng Pathfinder' : 'Pathfinder Rank'}
            </span>
            <span className={`p-2 rounded-xl border ${
              darkMode ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-sky-100 text-sky-700 border-sky-300'
            }`}>
              <Compass className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`font-bold text-lg transition-colors ${
                darkMode ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
              }`}>
                {currentRank.name}
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{currentRank.ageGroup}</p>
            </div>
          </div>
          <div className={`flex items-center justify-between text-xs font-medium pt-2 border-t ${
            darkMode ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-700'
          }`}>
            <span>
              {language === 'tl'
                ? `${user.earnedHonorIds.length} Honors Nakamit`
                : `${user.earnedHonorIds.length} Honors Earned`}
            </span>
            <span className={`flex items-center gap-1 font-bold ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>
              {language === 'tl' ? 'Tingnan ang Klase' : 'View Class'} <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Daily Learning Streak Card */}
        <div className={`p-6 rounded-3xl backdrop-blur-xl border shadow-xl flex flex-col justify-between ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'tl' ? 'Araw-araw na Debosyon Streak' : 'Daily Devotion Streak'}
            </span>
            <span className={`p-2 rounded-xl border ${
              darkMode ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-300'
            }`}>
              <Flame className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{user.streakDays}</span>
            <span className={`text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'tl' ? 'sunod-sunod na araw' : 'consecutive days'}
            </span>
          </div>
          <p className={`text-xs pt-2 border-t ${
            darkMode ? 'text-slate-400 border-white/10' : 'text-slate-600 border-slate-200'
          }`}>
            {language === 'tl'
              ? 'Maglaro araw-araw upang matamo ang tsapang Tapat na Tagapagbalita!'
              : 'Keep playing every day to earn the Faithful Herald badge!'}
          </p>
        </div>

        {/* Total Talents & Badges */}
        <div 
          onClick={() => handleGameSelect('achievements')}
          className={`p-6 rounded-3xl backdrop-blur-xl border shadow-xl transition-all cursor-pointer group flex flex-col justify-between ${
            darkMode 
              ? 'bg-white/[0.06] hover:bg-white/[0.10] border-white/10 hover:border-white/20' 
              : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'tl' ? 'Gantimpala at Tsapa' : 'Achievements & Badges'}
            </span>
            <span className={`p-2 rounded-xl border ${
              darkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-800 border-amber-300'
            }`}>
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className={`text-4xl font-black ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>{user.earnedBadgeIds.length}</span>
            <span className={`text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'tl' ? 'tsapang nabuksan' : 'badges unlocked'}
            </span>
          </div>
          <div className={`flex items-center justify-between text-xs font-medium pt-2 border-t ${
            darkMode ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-700'
          }`}>
            <span className={`font-bold ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
              {language === 'tl' ? `${user.coins} Bangko ng Talento` : `${user.coins} Talents Bank`}
            </span>
            <span className={`font-bold flex items-center gap-1 ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
              {language === 'tl' ? 'Tingnan ang Gabinete' : 'View Cabinet'} <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Daily Challenges Section */}
      <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-7 border shadow-2xl space-y-4 ${
        darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <Sparkles className={`w-5 h-5 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'tl' ? 'Pang-araw-araw na Hamon Ngayon' : "Today's Daily Challenges"}
            </h2>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
            darkMode ? 'bg-white/10 text-slate-400 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            {language === 'tl' ? 'Nagbabago araw-araw' : 'Resets daily'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {dailyChallenges.map(rawChallenge => {
            const challenge = localizeDailyChallenge(rawChallenge, language);

            return (
              <div 
                key={challenge.id}
                className={`p-4 rounded-2xl border transition-all ${
                  challenge.completed 
                    ? darkMode
                      ? 'bg-emerald-950/40 border-emerald-500/30 backdrop-blur-md'
                      : 'bg-emerald-50 border-emerald-300'
                    : darkMode
                      ? 'bg-slate-900/50 hover:bg-slate-900/70 border-white/10 hover:border-amber-400/40 backdrop-blur-md'
                      : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-amber-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className={`font-bold text-sm leading-snug ${
                    challenge.completed
                      ? darkMode ? 'text-emerald-300' : 'text-emerald-900'
                      : darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {challenge.title}
                  </h4>
                  {challenge.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 border ${
                      darkMode ? 'text-amber-300 bg-amber-500/20 border-amber-500/30' : 'text-amber-800 bg-amber-100 border-amber-300'
                    }`}>
                      +{challenge.rewardXp} XP
                    </span>
                  )}
                </div>
                <p className={`text-xs mb-3.5 leading-relaxed ${
                  challenge.completed
                    ? darkMode ? 'text-emerald-200/80' : 'text-emerald-800'
                    : darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>{challenge.description}</p>
                
                {challenge.completed ? (
                  <div className={`text-[11px] font-bold flex items-center gap-1 ${
                    darkMode ? 'text-emerald-300' : 'text-emerald-700'
                  }`}>
                    <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" /> {language === 'tl' ? 'Nakamit ang Gantimpala' : 'Claimed Reward'}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      sound.playClick();
                      if (challenge.gameMode === 'bible_quiz') setActiveScreen('bible_quiz');
                      else if (challenge.gameMode === 'character_guess') setActiveScreen('character_guess');
                      else if (challenge.gameMode === 'sabbath_challenge') setActiveScreen('sabbath_challenge');
                      else completeDailyChallenge(challenge.id);
                    }}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 shadow-xs ${
                      darkMode 
                        ? 'bg-white/10 hover:bg-amber-500 hover:text-slate-950 border-white/15 text-white' 
                        : 'bg-white hover:bg-amber-500 hover:text-slate-950 border-slate-300 text-slate-800 shadow-sm'
                    }`}
                  >
                    {language === 'tl' ? 'Simulan ang Hamon' : 'Start Challenge'} <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Game Selection Grid Header */}
      <div className="flex items-center justify-between pt-3">
        <div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            darkMode ? 'text-white drop-shadow-xs' : 'text-slate-900'
          }`}>
            {language === 'tl' ? 'Galugarin ang Lahat ng 10 Paraan ng Paglalaro' : 'Explore All 10 Game Modes'}
          </h2>
          <p className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {language === 'tl'
              ? 'Matuto ng Kasulatan, pamanang Adventista, batas sa kalusugan, at Kristiyanong karakter'
              : 'Learn Scripture, Adventist heritage, health laws, and Christian character'}
          </p>
        </div>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {gameCards.map(game => {
          const Icon = game.icon;
          return (
            <div
              key={game.id}
              id={`card-${game.id}`}
              onClick={() => handleGameSelect(game.screen)}
              className={`group relative backdrop-blur-xl rounded-3xl p-6 border shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                darkMode 
                  ? 'bg-white/[0.06] hover:bg-white/[0.10] border-white/10 hover:border-white/25 text-white' 
                  : 'bg-white hover:bg-amber-50/40 border-slate-200 hover:border-amber-400 text-slate-900 shadow-md'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.color} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${
                    darkMode ? 'bg-white/10 text-slate-200 border-white/15' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {game.tag}
                  </span>
                </div>

                <span className={`text-[11px] font-bold uppercase tracking-wider ${
                  darkMode ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  {game.category}
                </span>
                <h3 className={`text-lg font-bold transition-colors mb-2 mt-0.5 ${
                  darkMode ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-700'
                }`}>
                  {game.title}
                </h3>
                <p className={`text-xs leading-relaxed mb-5 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {game.desc}
                </p>
              </div>

              <div className={`pt-4 border-t flex items-center justify-between text-xs ${
                darkMode ? 'border-white/10' : 'border-slate-200'
              }`}>
                <span className={`font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{game.plays}</span>
                <span className={`font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform ${
                  darkMode ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  {language === 'tl' ? 'Laruin Ngayon' : 'Play Now'} <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multiplayer Highlight Card */}
      <div 
        id="card-multiplayer-highlight"
        onClick={() => handleGameSelect('multiplayer')}
        className={`rounded-3xl p-6 sm:p-8 backdrop-blur-xl border shadow-2xl relative overflow-hidden cursor-pointer group transition-all ${
          darkMode 
            ? 'bg-gradient-to-r from-indigo-950/70 via-purple-950/60 to-slate-900/80 border-indigo-500/30 text-white' 
            : 'bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border-indigo-700 text-white shadow-xl'
        }`}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 mb-3">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>{language === 'tl' ? 'Multiplayer sa Sabbath School at Kabataan' : 'Multiplayer Sabbath School & Youth Rooms'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              {language === 'tl' ? 'Mag-host o Sumali sa Live Bible Quiz Kuwarto' : 'Host or Join a Live Bible Quiz Room'}
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              {language === 'tl'
                ? 'Gumawa ng 4-titik na room code para sa iyong samahan, klase sa Sabbath School, o pampamilyang pagsamba. Magpaligsahan nang sabay-sabay!'
                : 'Create a 4-letter room code for your youth club, Sabbath School class, or family worship. Compete simultaneously with real-time scores and Christian emoji reactions!'}
            </p>
          </div>
          <button 
            className="px-6 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-indigo-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Users className="w-4 h-4 text-slate-950" />
            {language === 'tl' ? 'Pumasok sa Multiplayer Lobby' : 'Enter Multiplayer Lobby'}
          </button>
        </div>
      </div>

    </div>
  );
};
