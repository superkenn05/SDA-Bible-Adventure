import { Badge, DailyChallenge, LeaderboardEntry } from '../types';

export const initialBadges: Badge[] = [
  {
    id: 'badge_first_quiz',
    name: 'Bible Seeker',
    nameTl: 'Naghahanap sa Bibliya (Bible Seeker)',
    description: 'Completed your first Bible Quiz session',
    descriptionTl: 'Natapos ang iyong unang Bible Quiz session',
    icon: 'BookOpen',
    category: 'quiz',
    progress: 1,
    maxProgress: 1,
    unlockedAt: '2026-08-20'
  },
  {
    id: 'badge_perfect_score',
    name: 'Sanctuary Scholar',
    nameTl: 'Iskolar ng Santuwaryo (Sanctuary Scholar)',
    description: 'Scored 100% accuracy on a Medium or Hard quiz',
    descriptionTl: 'Nakamit ang 100% perpektong marka sa Katamtaman o Mahirap na pagsusulit',
    icon: 'Crown',
    category: 'quiz',
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'badge_streak_3',
    name: 'Faithful Herald',
    nameTl: 'Tapat na Tagapagbalita (Faithful Herald)',
    description: 'Maintained a 3-day daily Bible learning streak',
    descriptionTl: 'Napanatili ang 3-araw na sunod-sunod na pag-aaral ng Bibliya',
    icon: 'Flame',
    category: 'streak',
    progress: 1,
    maxProgress: 3
  },
  {
    id: 'badge_sabbath_delight',
    name: 'Sabbath Keeper',
    nameTl: 'Taga-ingat ng Sabbath (Sabbath Keeper)',
    description: 'Completed all Sabbath activities sorting & preparation steps',
    descriptionTl: 'Natapos ang pagsasaayos ng mga gawain sa Sabbath at paghahanda',
    icon: 'Sunrise',
    category: 'sabbath',
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'badge_pathfinder_honor',
    name: 'Honor Master',
    nameTl: 'Guro ng mga Honor (Honor Master)',
    description: 'Earned at least 3 Pathfinder Honor patches',
    descriptionTl: 'Nagkamit ng kahit 3 Pathfinder Honor patches',
    icon: 'Award',
    category: 'pathfinder',
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'badge_newstart_champion',
    name: 'Temple Steward',
    nameTl: 'Katiwala ng Templo (Temple Steward)',
    description: 'Explored all 8 NEWSTART health principles & completed the health quiz',
    descriptionTl: 'Natuklasan ang lahat ng 8 NEWSTART prinsipyo sa kalusugan at natapos ang pagsusulit',
    icon: 'Heart',
    category: 'health',
    progress: 0,
    maxProgress: 8
  },
  {
    id: 'badge_church_historian',
    name: 'Pioneer Trailblazer',
    nameTl: 'Mapanuklas na Pioneer (Pioneer Trailblazer)',
    description: 'Explored all 1844-1903 church history milestones',
    descriptionTl: 'Natuklasan ang lahat ng mahahalagang kasaysayan ng simbahan mula 1844 hanggang 1903',
    icon: 'Scroll',
    category: 'history',
    progress: 0,
    maxProgress: 6
  }
];

export const sampleDailyChallenges: DailyChallenge[] = [
  {
    id: 'daily_1',
    title: 'Morning Scripture Quiz',
    titleTl: 'Pang-umagang Pagsusulit sa Kasulatan',
    description: 'Complete 1 Bible Quiz with at least 80% score',
    descriptionTl: 'Kumpletuhin ang 1 Bible Quiz na may hindi bababa sa 80% na marka',
    rewardXp: 100,
    rewardCoins: 50,
    completed: false,
    gameMode: 'bible_quiz',
    targetCount: 1,
    currentCount: 0
  },
  {
    id: 'daily_2',
    title: 'Character Detective',
    titleTl: 'Detektib ng Karakter sa Bibliya',
    description: 'Correctly identify 2 Bible Characters from clues',
    descriptionTl: 'Wastong hulaan ang 2 Tauhan sa Bibliya mula sa mga pahiwatig',
    rewardXp: 80,
    rewardCoins: 40,
    completed: false,
    gameMode: 'character_guess',
    targetCount: 2,
    currentCount: 0
  },
  {
    id: 'daily_3',
    title: 'Sabbath Delight Challenge',
    titleTl: 'Hamon sa Kaluguran ng Sabbath',
    description: 'Complete a Sabbath Activity sort round',
    descriptionTl: 'Kumpletuhin ang pagsasaayos ng mga gawain sa Sabbath',
    rewardXp: 90,
    rewardCoins: 45,
    completed: false,
    gameMode: 'sabbath_challenge',
    targetCount: 1,
    currentCount: 0
  }
];

export const sampleLeaderboard: LeaderboardEntry[] = [
  {
    id: 'lb_1',
    name: 'Josiah M. (Youth Leader)',
    nameTl: 'Josiah M. (Pinuno ng Kabataan)',
    avatar: 'Crown',
    title: 'Master Guide Trailblazer',
    titleTl: 'Master Guide Mapanuklas',
    clubOrChurch: 'Berean SDA Youth Club',
    score: 4850,
    level: 18,
    rank: 1
  },
  {
    id: 'lb_2',
    name: 'Miriam K.',
    nameTl: 'Miriam K.',
    avatar: 'Sparkles',
    title: 'Bible Scholar',
    titleTl: 'Iskolar ng Bibliya',
    clubOrChurch: 'Silver Spring SDA Church',
    score: 4230,
    level: 15,
    rank: 2
  },
  {
    id: 'lb_3',
    name: 'Caleb Pathfinder',
    nameTl: 'Caleb Pathfinder',
    avatar: 'Compass',
    title: 'Guide Pathfinder',
    titleTl: 'Guide Pathfinder',
    clubOrChurch: 'Orion Pathfinder Club',
    score: 3910,
    level: 14,
    rank: 3
  },
  {
    id: 'lb_4',
    name: 'Priscilla D.',
    nameTl: 'Priscilla D.',
    avatar: 'Heart',
    title: 'Sanctuary Seeker',
    titleTl: 'Naghahanap sa Santuwaryo',
    clubOrChurch: 'Loma Linda Youth Ministry',
    score: 3450,
    level: 12,
    rank: 4
  },
  {
    id: 'lb_5',
    name: 'Samuel E.',
    nameTl: 'Samuel E.',
    avatar: 'Shield',
    title: 'Explorer Cadet',
    titleTl: 'Explorer Cadet',
    clubOrChurch: 'Andrews Memorial Club',
    score: 2980,
    level: 10,
    rank: 5
  },
  {
    id: 'lb_6',
    name: 'Hannah Grace',
    nameTl: 'Hannah Grace',
    avatar: 'Sun',
    title: 'Faithful Herald',
    titleTl: 'Tapat na Tagapagbalita',
    clubOrChurch: 'Oakwood University Fellowship',
    score: 2650,
    level: 9,
    rank: 6
  }
];

export const availableAvatars = [
  { id: 'avatar_david', name: 'David (Shepherd King)', nameTl: 'David (Pastol at Hari)', icon: 'Crown', unlockLevel: 1 },
  { id: 'avatar_esther', name: 'Queen Esther', nameTl: 'Reyna Ester', icon: 'Sparkles', unlockLevel: 1 },
  { id: 'avatar_daniel', name: 'Daniel the Faithful', nameTl: 'Daniel na Tapat', icon: 'Shield', unlockLevel: 2 },
  { id: 'avatar_pathfinder', name: 'Pathfinder Cadet', nameTl: 'Kagawad ng Pathfinder', icon: 'Compass', unlockLevel: 1 },
  { id: 'avatar_moses', name: 'Moses (Deliverer)', nameTl: 'Moises (Tagapagpalaya)', icon: 'Flame', unlockLevel: 3 },
  { id: 'avatar_deborah', name: 'Deborah (Judge)', nameTl: 'Debora (Hukom)', icon: 'Heart', unlockLevel: 4 },
  { id: 'avatar_pioneer', name: 'Advent Pioneer', nameTl: 'Advent Pioneer', icon: 'Scroll', unlockLevel: 5 },
  { id: 'avatar_angel', name: 'Herald of Hope', nameTl: 'Tagapagbalita ng Pag-asa', icon: 'Sun', unlockLevel: 6 }
];

export const availableThemes = [
  {
    id: 'nature_sunrise',
    name: 'Mount Pisgah Sunrise',
    nameTl: 'Bukang-liwayway sa Bundok Pisgah',
    description: 'Golden morning amber and mountain heights',
    descriptionTl: 'Gintong liwanag ng umaga at matatayog na kabundukan',
    gradient: 'from-amber-500/20 via-orange-500/10 to-sky-500/20',
    primaryColor: 'amber-600',
    previewBg: 'bg-gradient-to-r from-amber-400 to-orange-500'
  },
  {
    id: 'peaceful_sabbath',
    name: 'Peaceful Sabbath Twilight',
    nameTl: 'Mapayapang Takipsilim ng Sabbath',
    description: 'Tranquil twilight purples and sanctuary rest',
    descriptionTl: 'Payapang kulay ube ng takipsilim at kapahingahan sa dambana',
    gradient: 'from-indigo-600/20 via-purple-600/10 to-blue-500/20',
    primaryColor: 'indigo-600',
    previewBg: 'bg-gradient-to-r from-indigo-500 to-purple-600'
  },
  {
    id: 'galilee_blue',
    name: 'Sea of Galilee',
    nameTl: 'Dagat ng Galilea',
    description: 'Calming Mediterranean azure and sky blue',
    descriptionTl: 'Nagpapakalmang asul ng Dagat Galilea at bughaw na langit',
    gradient: 'from-sky-500/20 via-blue-500/10 to-cyan-500/20',
    primaryColor: 'sky-600',
    previewBg: 'bg-gradient-to-r from-sky-400 to-blue-600'
  },
  {
    id: 'eden_green',
    name: 'Garden of Eden',
    nameTl: 'Halamanan ng Eden',
    description: 'Lush evergreen nature and refreshing vitality',
    descriptionTl: 'Luntiang kalikasan at nagpapasiglang sariwang buhay',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-green-500/20',
    primaryColor: 'emerald-600',
    previewBg: 'bg-gradient-to-r from-emerald-400 to-teal-600'
  },
  {
    id: 'dark_twilight',
    name: 'Starry Heavens Dark',
    nameTl: 'Mabituing Kalangitan',
    description: 'Deep midnight indigo with celestial constellation accents',
    descriptionTl: 'Madilim na hatinggabi na may maniningning na mga bituin',
    gradient: 'from-slate-900 via-indigo-950 to-slate-900',
    primaryColor: 'indigo-400',
    previewBg: 'bg-gradient-to-r from-slate-900 to-indigo-950'
  }
];
