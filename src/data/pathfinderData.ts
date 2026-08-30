import { PathfinderHonor, PathfinderRank } from '../types';

export const pathfinderRanks: PathfinderRank[] = [
  {
    id: 'rank_friend',
    name: 'Friend',
    nameTl: 'Friend (Kaibigan)',
    ageGroup: 'Grade 5 (Age 10)',
    ageGroupTl: 'Baitang 5 (Edad 10)',
    color: '#3b82f6', // Blue
    badge: 'Shield',
    description: 'Learn foundational Bible truth, nature discovery, and teamwork.',
    descriptionTl: 'Matutunan ang mga pangunahing katotohanan sa Bibliya, pagtuklas sa kalikasan, at pagtutulungan.',
    requiredXp: 0,
    unlocked: true
  },
  {
    id: 'rank_companion',
    name: 'Companion',
    nameTl: 'Companion (Kasama)',
    ageGroup: 'Grade 6 (Age 11)',
    ageGroupTl: 'Baitang 6 (Edad 11)',
    color: '#ef4444', // Red
    badge: 'Compass',
    description: 'Explore wilderness skills, friendship, and personal Bible study.',
    descriptionTl: 'Tuklasin ang kasanayan sa kagubatan, tunay na pakikipagkaibigan, at personal na pag-aaral ng Bibliya.',
    requiredXp: 200,
    unlocked: false
  },
  {
    id: 'rank_explorer',
    name: 'Explorer',
    nameTl: 'Explorer (Manunuklas)',
    ageGroup: 'Grade 7 (Age 12)',
    ageGroupTl: 'Baitang 7 (Edad 12)',
    color: '#10b981', // Green
    badge: 'Map',
    description: 'Deepen Christian leadership, camping knowledge, and first aid mastery.',
    descriptionTl: 'Palalimin ang Kristiyanong pamumuno, kaalaman sa camping, at kasanayan sa pangunahing lunas (First Aid).',
    requiredXp: 500,
    unlocked: false
  },
  {
    id: 'rank_ranger',
    name: 'Ranger',
    nameTl: 'Ranger (Tanod)',
    ageGroup: 'Grade 8 (Age 13)',
    ageGroupTl: 'Baitang 8 (Edad 13)',
    color: '#f59e0b', // Silver / Gold
    badge: 'Tent',
    description: 'Serve the community, study prophecy, and guide younger Pathfinders.',
    descriptionTl: 'Maglingkod sa komunidad, mag-aral ng propesiya, at gabayan ang mas nakababatang mga Pathfinder.',
    requiredXp: 900,
    unlocked: false
  },
  {
    id: 'rank_voyager',
    name: 'Voyager',
    nameTl: 'Voyager (Manlalakbay)',
    ageGroup: 'Grade 9 (Age 14)',
    ageGroupTl: 'Baitang 9 (Edad 14)',
    color: '#8b5cf6', // Purple
    badge: 'Anchor',
    description: 'Embark on advanced wilderness challenges, spiritual mentoring, and career discovery.',
    descriptionTl: 'Makisabak sa mas mataas na hamon sa kagubatan, espirituwal na paggabay, at paghahanda sa bokasyon.',
    requiredXp: 1400,
    unlocked: false
  },
  {
    id: 'rank_guide',
    name: 'Guide',
    nameTl: 'Guide (Tagapatnubay)',
    ageGroup: 'Grade 10 (Age 15)',
    ageGroupTl: 'Baitang 10 (Edad 15)',
    color: '#06b6d4', // Yellow / Cyan
    badge: 'Flame',
    description: 'Demonstrate mature Christian character, mission leadership, and survival navigation.',
    descriptionTl: 'Magpamalas ng may-gulang na Kristiyanong karakter, pamumuno sa misyon, at survival navigation.',
    requiredXp: 2000,
    unlocked: false
  },
  {
    id: 'rank_master_guide',
    name: 'Master Guide',
    nameTl: 'Master Guide',
    ageGroup: 'Youth Leaders & Adults',
    ageGroupTl: 'Mga Pinuno ng Kabataan at Matatanda',
    color: '#eab308', // Master Gold
    badge: 'Crown',
    description: 'The highest recognized international leadership award in Adventist Youth Ministries.',
    descriptionTl: 'Ang pinakamataas na kinikilalang pandaigdigang parangal sa pamumuno sa Adventist Youth Ministries.',
    requiredXp: 3000,
    unlocked: false
  }
];

export const pathfinderHonors: PathfinderHonor[] = [
  {
    id: 'honor_knots',
    name: 'Knots & Lashing',
    nameTl: 'Mga Buhol at Pagtatali (Knots & Lashing)',
    category: 'Outdoor',
    categoryTl: 'Panlabas (Outdoor)',
    icon: 'Link',
    color: 'bg-amber-600',
    description: 'Master the art of tying essential pioneer knots, hitches, and camp lashings.',
    descriptionTl: 'Maging bihasa sa pagtali ng mga pangunahing buhol, hitches, at camp lashings.',
    requirements: [
      'Know the difference between a rope, bight, and loop',
      'Demonstrate tying the Square Knot, Bowline, Clove Hitch, and Taut-line Hitch',
      'Explain how knots are used to build safe campsite shelters'
    ],
    requirementsTl: [
      'Alamin ang pagkakaiba ng lubid, bight, at loop',
      'Ipakita ang pagtali ng Square Knot, Bowline, Clove Hitch, at Taut-line Hitch',
      'Ipaliwanag kung paano ginagamit ang mga buhol sa pagbuo ng ligtas na campsite shelter'
    ],
    quiz: [
      {
        id: 'k_q1',
        category: 'pathfinder',
        difficulty: 'easy',
        question: 'Which knot is known as the "King of Knots" because it forms a secure, non-slip loop and is easy to untie?',
        questionTl: 'Aling buhol ang tinaguriang "Hari ng mga Buhol" dahil bumubuo ito ng ligtas na loop na hindi dumudulas at madaling kalagin?',
        options: ['Bowline', 'Granny Knot', 'Square Knot', 'Overhand'],
        optionsTl: ['Bowline', 'Granny Knot', 'Square Knot', 'Overhand'],
        correctAnswer: 0,
        explanation: 'The Bowline is essential for rescue and securing loads because its loop will never slip or jam under tension.',
        explanationTl: 'Ang Bowline ay mahalaga sa pagliligtas (rescue) dahil hindi ito dumudulas kahit higitin nang malakas.',
        bibleReference: 'Ecclesiastes 4:12'
      },
      {
        id: 'k_q2',
        category: 'pathfinder',
        difficulty: 'medium',
        question: 'Which hitch is best used to begin and end a square lashing when building a campsite table?',
        questionTl: 'Aling hitch ang pinakamainam gamitin sa simula at dulo ng square lashing kapag gumagawa ng mesa sa kampo?',
        options: ['Clove Hitch', 'Slip Knot', 'Reef Knot', 'Figure Eight'],
        optionsTl: ['Clove Hitch', 'Slip Knot', 'Reef Knot', 'Figure Eight'],
        correctAnswer: 0,
        explanation: 'A Clove Hitch holds tightly onto a spar or pole to initiate or finish lashings securely.',
        explanationTl: 'Ang Clove Hitch ay mahigpit na kumakapit sa kahoy o poste upang simulan o tapusin ang pagtatali.',
        bibleReference: 'Isaiah 33:20'
      }
    ]
  },
  {
    id: 'honor_first_aid',
    name: 'First Aid - Standard',
    nameTl: 'Pangunahing Lunas (First Aid)',
    category: 'Health',
    categoryTl: 'Kalusugan',
    icon: 'HeartPulse',
    color: 'bg-red-600',
    description: 'Learn life-saving emergency medical responses, CPR basics, and wound treatment.',
    descriptionTl: 'Matutunan ang mga pangunahing lunas sa emerhensiya, CPR basics, at paggamot ng sugat.',
    requirements: [
      'Demonstrate the ABCs of First Aid (Airway, Breathing, Circulation)',
      'Know how to treat cuts, sprains, nosebleeds, and minor burns',
      'Assemble a complete portable Pathfinder first aid kit'
    ],
    requirementsTl: [
      'Ipakita ang ABC ng First Aid (Airway, Breathing, Circulation)',
      'Alamin kung paano gamutin ang mga hiwa, pilay, balinguyngoy, at paso',
      'Maghanda ng kumpletong portable Pathfinder first aid kit'
    ],
    quiz: [
      {
        id: 'fa_q1',
        category: 'pathfinder',
        difficulty: 'easy',
        question: 'What is the first crucial step when encountering an injured person before providing aid?',
        questionTl: 'Ano ang unang dapat tiyakin bago lumapit at tumulong sa isang nasaktang tao?',
        options: ['Check the scene for danger and ensure your safety', 'Move the victim immediately', 'Give them food and water', 'Leave without helping'],
        optionsTl: ['Suriin ang paligid kung ligtas (scene safety) bago lumapit', 'Igalaw agad ang biktima', 'Pakanin at painumin agad', 'Umalis nang walang ginagawa'],
        correctAnswer: 0,
        explanation: 'Always verify scene safety first so you do not become a casualty yourself.',
        explanationTl: 'Laging tiyakin muna ang kaligtasan ng lugar upang hindi ka rin mapahamak habang tumutulong.',
        bibleReference: 'Luke 10:33-34'
      },
      {
        id: 'fa_q2',
        category: 'pathfinder',
        difficulty: 'medium',
        question: 'What does the acronym R.I.C.E. stand for when caring for a sprained ankle?',
        questionTl: 'Ano ang kahulugan ng akronim na R.I.C.E. sa pag-aalaga ng may pilay na bukong-bukong (sprain)?',
        options: [
          'Rest, Ice, Compression, Elevation',
          'Run, Inhale, Clean, Exercise',
          'Rub, Ignite, Cool, Extend',
          'Relax, Ignore, Continue, Eat'
        ],
        optionsTl: [
          'Rest (Pahinga), Ice (Yelo), Compression (Balot), Elevation (Itaas)',
          'Run, Inhale, Clean, Exercise',
          'Rub, Ignite, Cool, Extend',
          'Relax, Ignore, Continue, Eat'
        ],
        correctAnswer: 0,
        explanation: 'R.I.C.E. reduces swelling, relieves pain, and protects the injured joint during early recovery.',
        explanationTl: 'Ang R.I.C.E. ay nagpapababa ng pamamaga at nagpapagaan ng kirot sa napilayang kasukasuan.',
        bibleReference: 'Proverbs 17:22'
      }
    ]
  },
  {
    id: 'honor_stars',
    name: 'Astronomy & Stars',
    nameTl: 'Astronomiya at mga Bituin (Astronomy)',
    category: 'Nature',
    categoryTl: 'Kalikasan',
    icon: 'Sparkles',
    color: 'bg-indigo-600',
    description: 'Identify the constellations that proclaim the glory of God in the night sky.',
    descriptionTl: 'Kilalanin ang mga konstelasyon na nagpapahayag ng kaluwalhatian ng Diyos sa kalangitan.',
    requirements: [
      'Identify the North Star (Polaris) and Southern Cross',
      'Explain Orion\'s nebula and its prophetic significance',
      'Memorize Psalm 19:1'
    ],
    requirementsTl: [
      'Tukuyin ang North Star (Polaris) at Southern Cross sa langit',
      'Ipaliwanag ang nebula ng Orion at ang propetikong kahalagahan nito',
      'Kabisaduhin ang Awit 19:1'
    ],
    quiz: [
      {
        id: 'st_q1',
        category: 'pathfinder',
        difficulty: 'easy',
        question: 'What famous constellation features three bright belt stars (Alnitak, Alnilam, Mintaka)?',
        questionTl: 'Anong sikat na konstelasyon ang nagtataglay ng tatlong maniningning na bituin sa kanyang sinturon (belt)?',
        options: ['Orion', 'Ursa Major', 'Cassiopeia', 'Pleiades'],
        optionsTl: ['Orion', 'Ursa Major', 'Cassiopeia', 'Pleiades (Pitong Bituin)'],
        correctAnswer: 0,
        explanation: 'Orion is one of the most recognizable constellations mentioned in Job 38:31 and Amos 5:8.',
        explanationTl: 'Ang Orion ay isa sa pinakatanyag na konstelasyon na binanggit sa Job 38:31 at Amos 5:8.',
        bibleReference: 'Job 38:31-32, Amos 5:8'
      },
      {
        id: 'st_q2',
        category: 'pathfinder',
        difficulty: 'medium',
        question: 'Complete Psalm 19:1: "The heavens declare the glory of God; and the firmament shows His _____."',
        questionTl: 'Kumpletuhin ang Awit 19:1: "Ipinahahayag ng langit ang kaluwalhatian ng Diyos; at ipinakikilala ng kalawakan ang gawa ng Kanyang _____."',
        options: ['Handiwork', 'Wisdom', 'Judgment', 'Angels'],
        optionsTl: ['Kamay (Handiwork)', 'Karunungan', 'Paghuhukom', 'Mga Anghel'],
        correctAnswer: 0,
        explanation: '"The heavens declare the glory of God; and the firmament shows His handiwork."',
        explanationTl: '"Ipinahahayag ng langit ang kaluwalhatian ng Diyos; at ipinakikilala ng kalawakan ang gawa ng Kanyang mga kamay."',
        bibleReference: 'Psalm 19:1'
      }
    ]
  },
  {
    id: 'honor_camping',
    name: 'Camp Craft & Survival',
    nameTl: 'Camp Craft at Survival',
    category: 'Outdoor',
    categoryTl: 'Panlabas (Outdoor)',
    icon: 'Tent',
    color: 'bg-emerald-600',
    description: 'Pitch tents, practice campfire safety, cook in nature, and leave no trace.',
    descriptionTl: 'Magtayo ng tolda, ligtas na magpaningas ng campfire, magluto sa kalikasan, at panatilihing malinis ang lugar.',
    requirements: [
      'Pitch a 2-person or 4-person tent on level high ground',
      'Build a teepee or criss-cross campfire safely',
      'Know the 7 principles of Leave No Trace wilderness stewardship'
    ],
    requirementsTl: [
      'Magtayo ng 2-person o 4-person na tolda sa patag at mataas na lupa',
      'Gumawa ng ligtas na campfire (teepee o criss-cross)',
      'Alamin ang 7 prinsipyo ng Leave No Trace sa pangangalaga ng kalikasan'
    ],
    quiz: [
      {
        id: 'cmp_q1',
        category: 'pathfinder',
        difficulty: 'easy',
        question: 'Where should a campfire always be extinguished before leaving a campsite?',
        questionTl: 'Paano dapat patayin ang campfire bago iwanan ang campsite?',
        options: [
          'Drown with water, stir the embers, and drown again until cool to touch',
          'Cover lightly with leaves and dry pine needles',
          'Let it burn out while sleeping',
          'Blow on it until it goes away'
        ],
        optionsTl: [
          'Buhusan ng maraming tubig, haluin ang mga baga, at buhusan muli hanggang sa lumamig kapag hinawakan',
          'Takpan ng mga tuyong dahon at tuyong damo',
          'Hayaang mamatay nang kusa habang natutulog',
          'Hipan hanggang mawala'
        ],
        correctAnswer: 0,
        explanation: 'Extinguishing campfires completely with water and stirring prevents dangerous forest fires.',
        explanationTl: 'Ang ganap na pagbuhos ng tubig at paghalo sa mga baga ay nagpoprotekta laban sa sunog sa kagubatan.',
        bibleReference: 'James 3:5'
      }
    ]
  },
  {
    id: 'honor_prayer',
    name: 'Prayer Warrior',
    nameTl: 'Kawal sa Panalangin (Prayer Warrior)',
    category: 'Spiritual',
    categoryTl: 'Espirituwal',
    icon: 'Flame',
    color: 'bg-purple-600',
    description: 'Deepen your personal communion with God through intercession and fasting.',
    descriptionTl: 'Palalimin ang iyong personal na pakikipag-usap sa Diyos sa pamamagitan ng pananalangin para sa iba.',
    requirements: [
      'Maintain a 30-day personal prayer journal',
      'Learn the A.C.T.S. prayer model (Adoration, Confession, Thanksgiving, Supplication)',
      'Organize a prayer walk for your church or school'
    ],
    requirementsTl: [
      'Magpanatili ng 30-araw na talaarawan ng panalangin (prayer journal)',
      'Matutunan ang A.C.T.S. prayer model (Adoration, Confession, Thanksgiving, Supplication)',
      'Makibahagi o mag-organisa ng prayer walk para sa iyong iglesya o paaralan'
    ],
    quiz: [
      {
        id: 'pr_q1',
        category: 'pathfinder',
        difficulty: 'easy',
        question: 'What does the acronym A.C.T.S. stand for in Christian prayer structure?',
        questionTl: 'Ano ang ibig sabihin ng akronim na A.C.T.S. sa balangkas ng panalangin?',
        options: [
          'Adoration, Confession, Thanksgiving, Supplication',
          'Action, Courage, Truth, Salvation',
          'Asking, Crying, Telling, Singing',
          'Alertness, Compassion, Trust, Sincerity'
        ],
        optionsTl: [
          'Adoration (Pagsamba), Confession (Paghingi ng Tawad), Thanksgiving (Pasasalamat), Supplication (Kahilingan)',
          'Action, Courage, Truth, Salvation',
          'Asking, Crying, Telling, Singing',
          'Alertness, Compassion, Trust, Sincerity'
        ],
        correctAnswer: 0,
        explanation: 'A.C.T.S. guides balanced prayer: praising God, confessing faults, thanking Him, and asking for needs.',
        explanationTl: 'Ang A.C.T.S. ay gabay sa maayos na panalangin: pagpupuri sa Diyos, pagtatapat ng kasalanan, pagpapasalamat, at paghingi ng tulong.',
        bibleReference: 'Philippians 4:6'
      }
    ]
  }
];
