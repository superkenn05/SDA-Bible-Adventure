import { HealthPrinciple } from '../types';

export const newstartPrinciples: HealthPrinciple[] = [
  {
    letter: 'N',
    name: 'Nutrition',
    nameTl: 'Nutrisyon (Sustansya)',
    tagline: 'Wholesome, Plant-Rich Nourishment',
    taglineTl: 'Masustansya at Halamang Pagkain mula sa Lumikha',
    icon: 'Apple',
    description: 'Fueling your body temple with vibrant, colorful fruits, vegetables, whole grains, legumes, nuts, and seeds provided by the Creator.',
    descriptionTl: 'Pagpapakain sa templo ng iyong katawan ng makukulay na prutas, gulay, buong butil, mani, at buto na ibinigay ng Maylalang.',
    biblicalBasis: 'Genesis 1:29; Daniel 1:12; 1 Corinthians 10:31',
    dailyGoal: 'Eat at least 3 colorful vegetables and a serving of fresh fruit today.',
    dailyGoalTl: 'Kumain ng kahit 3 makukulay na gulay at sariwang prutas ngayong araw.',
    practicalTips: [
      'Fill half your plate with colorful vegetables and salads.',
      'Choose whole grain breads and brown rice over refined white flour.',
      'Enjoy wholesome plant proteins like lentils, chickpeas, and walnuts.'
    ],
    practicalTipsTl: [
      'Punuin ang kalahati ng iyong plato ng makukulay na gulay at sariwang ensalada.',
      'Pumili ng brown rice o whole wheat bread kaysa sa pinaputing harina.',
      'Kumain ng mga protinang nagmumula sa halaman tulad ng munggo, mani, at tokwa.'
    ],
    questions: [
      {
        id: 'h_nut_1',
        category: 'health_newstart',
        difficulty: 'easy',
        question: 'Which of the following dietary choices best aligns with the Edenic diet in Genesis 1:29?',
        questionTl: 'Alin sa mga sumusunod ang pinaka-umaayon sa orihinal na pagkain sa Eden ayon sa Genesis 1:29?',
        options: ['Ultra-processed fast foods with artificial dyes', 'Whole grains, fresh fruits, nuts, and vegetables', 'High-sugar carbonated soda drinks', 'Caffeinated energy shots'],
        optionsTl: ['Mga processed fast food na may artipisyal na pampakulay', 'Mga butil, sariwang prutas, mani, at gulay', 'Mga inuming softdrinks na mataas sa asukal', 'Mga inuming may matapang na kapeina'],
        correctAnswer: 1,
        explanation: 'Genesis 1:29 provides fruits, grains, nuts, and seeds as the original wholesome food for humanity.',
        explanationTl: 'Ibinigay ng Genesis 1:29 ang mga prutas, butil, mani, at buto bilang orihinal na masustansyang pagkain para sa tao.',
        bibleReference: 'Genesis 1:29'
      }
    ]
  },
  {
    letter: 'E',
    name: 'Exercise',
    nameTl: 'Ehersisyo (Pagkilos)',
    tagline: 'Energizing Physical Activity',
    taglineTl: 'Nagpapasiglang Pisikal na Pagkilos',
    icon: 'Activity',
    description: 'Regular physical movement strengthens the cardiovascular system, improves mood, sharpens mental focus, and boosts immune defenses.',
    descriptionTl: 'Ang regular na pagkilos ay nagpapalakas ng puso, nagpapaganda ng mood, nagpapatulis ng isipan, at nagpapalakas ng resistensya.',
    biblicalBasis: '1 Timothy 4:8; 1 Corinthians 9:26-27',
    dailyGoal: 'Take a brisk 30-minute walk or do outdoor stretching today.',
    dailyGoalTl: 'Maglakad nang mabilis sa loob ng 30 minuto o mag-unat sa labas ngayong araw.',
    practicalTips: [
      'Aim for 30 minutes of moderate activity like brisk walking or cycling daily.',
      'Take stairs instead of elevators when possible.',
      'Stretch gently morning and evening to maintain joint flexibility.'
    ],
    practicalTipsTl: [
      'Magsagawa ng 30 minutong katamtamang ehersisyo tulad ng mabilis na paglalakad o pagbibisikleta araw-araw.',
      'Gumamit ng hagdan sa halip na elevator kung kakayanin.',
      'Mag-unat tuwing umaga at gabi upang mapanatiling maliksi ang mga kasukasuan.'
    ],
    questions: [
      {
        id: 'h_ex_1',
        category: 'health_newstart',
        difficulty: 'easy',
        question: 'What is one of the simplest, most natural and beneficial forms of daily cardiovascular exercise?',
        questionTl: 'Ano ang isa sa pinakasimple, pinakalikas, at kapaki-pakinabang na paraan ng pang-araw-araw na ehersisyo?',
        options: ['Brisk outdoor walking', 'Sitting on the couch for 8 hours', 'Playing video games with fingers only', 'Heavy lifting without stretching'],
        optionsTl: ['Mabilis na paglalakad sa sariwang hangin (Brisk walking)', 'Pag-upo sa sopa nang 8 oras', 'Paglalaro ng video games gamit ang daliri lamang', 'Pagbubuhat nang mabigat nang walang warm-up'],
        correctAnswer: 0,
        explanation: 'Brisk walking engages major muscle groups, boosts circulation, oxygenates the brain, and is gentle on the joints.',
        explanationTl: 'Ang mabilis na paglalakad ay nagpapaganda ng daloy ng dugo, nagbibigay ng oxygen sa utak, at banayad sa mga kasukasuan.',
        bibleReference: '3 John 1:2'
      }
    ]
  },
  {
    letter: 'W',
    name: 'Water',
    nameTl: 'Tubig (Water)',
    tagline: 'Pure, Refreshing Hydration',
    taglineTl: 'Dalisay at Nagpapanariwang Inumin',
    icon: 'Droplets',
    description: 'Water is essential for every cell in the body. Drinking pure water flushes toxins, improves energy, and promotes clear skin.',
    descriptionTl: 'Ang tubig ay mahalaga sa bawat selula ng katawan. Ang pag-inom ng malinis na tubig ay naglalabas ng lason sa katawan at nagpapasigla.',
    biblicalBasis: 'John 4:14; Psalm 23:2; Isaiah 41:17-18',
    dailyGoal: 'Drink 6 to 8 glasses of pure water throughout the day.',
    dailyGoalTl: 'Uminom ng 6 hanggang 8 baso ng malinis na tubig sa buong maghapon.',
    practicalTips: [
      'Drink a glass of warm or room-temperature water upon waking up.',
      'Keep a reusable water bottle near you while studying or working.',
      'Drink water mostly between meals rather than washing food down during eating.'
    ],
    practicalTipsTl: [
      'Uminom ng isang basong maligamgam o katamtamang tubig pagkagising sa umaga.',
      'Laging magdala ng lalagyan ng tubig habang nag-aaral o nagtatrabaho.',
      'Uminom ng tubig sa pagitan ng mga kainan kaysa habang lumulunok ng pagkain.'
    ],
    questions: [
      {
        id: 'h_wat_1',
        category: 'health_newstart',
        difficulty: 'easy',
        question: 'Approximately what percentage of the human body is composed of water?',
        questionTl: 'Tinatayang ilang porsyento ng katawan ng tao ang binubuo ng tubig?',
        options: ['About 60% to 70%', 'Only 15%', '95%', '30%'],
        optionsTl: ['Tinatayang 60% hanggang 70%', '15% lamang', '95%', '30%'],
        correctAnswer: 0,
        explanation: 'The human adult body is about 60% water, requiring daily replenishment for optimal organ function.',
        explanationTl: 'Ang katawan ng tao ay humigit-kumulang 60-70% tubig, kaya kailangan ng sapat na inumin araw-araw.',
        bibleReference: 'John 7:37'
      }
    ]
  },
  {
    letter: 'S',
    name: 'Sunlight',
    nameTl: 'Sikat ng Araw (Sunlight)',
    tagline: 'Life-Giving Vitamin D & Warmth',
    taglineTl: 'Nagbibigay-Buhay na Bitamina D at Liwanag',
    icon: 'Sun',
    description: 'Gentle morning sunlight stimulates natural Vitamin D production, elevates serotonin mood hormones, and strengthens bones.',
    descriptionTl: 'Ang banayad na sikat ng araw sa umaga ay nagpapasigla ng paglikha ng Bitamina D, nagpapaganda ng pakiramdam, at nagpapatibay ng mga buto.',
    biblicalBasis: 'Ecclesiastes 11:7; Malachi 4:2; Psalm 84:11',
    dailyGoal: 'Spend 15-20 minutes in morning sunshine enjoying fresh air.',
    dailyGoalTl: 'Maglaan ng 15-20 minuto sa sikat ng araw sa umaga kasabay ng sariwang hangin.',
    practicalTips: [
      'Enjoy mild morning sunlight on your face and arms safely.',
      'Open window shades at home to let natural light illuminate rooms.',
      'Combine sun exposure with a walk in nature.'
    ],
    practicalTipsTl: [
      'Magpa-araw sa banayad na sikat ng araw sa umaga sa ligtas na oras.',
      'Buksan ang mga kurtina at bintana sa tahanan upang pumasok ang natural na liwanag.',
      'Pagsamahin ang pagpapa-araw sa paglalakad sa kalikasan.'
    ],
    questions: [
      {
        id: 'h_sun_1',
        category: 'health_newstart',
        difficulty: 'medium',
        question: 'Which essential vitamin does our skin synthesize naturally when exposed to gentle sunlight?',
        questionTl: 'Anong mahalagang bitamina ang nalilikha ng ating balat kapag nasisikatan ng araw sa umaga?',
        options: ['Vitamin D', 'Vitamin B12', 'Vitamin C', 'Vitamin K'],
        optionsTl: ['Bitamina D', 'Bitamina B12', 'Bitamina C', 'Bitamina K'],
        correctAnswer: 0,
        explanation: 'Sunlight triggers the synthesis of Vitamin D, which is vital for calcium absorption, bone strength, and immunity.',
        explanationTl: 'Ang sikat ng araw ay nagpapasigla ng Bitamina D na mahalaga para sa pagsipsip ng calcium, lakas ng buto, at resistensya.',
        bibleReference: 'Ecclesiastes 11:7'
      }
    ]
  },
  {
    letter: 'T',
    name: 'Temperance',
    nameTl: 'Pagtitimpi (Temperance)',
    tagline: 'Wise Balance & Self-Control',
    taglineTl: 'Matalinong Pagbalanse at Disiplina sa Sarili',
    icon: 'Scale',
    description: 'Abstinence from everything harmful to mind and body, and moderate, balanced use of all things that are good.',
    descriptionTl: 'Ganap na pag-iwas sa lahat ng nakapipinsala sa isip at katawan, at katamtamang paggamit sa mga bagay na mabubuti.',
    biblicalBasis: 'Galatians 5:22-23; 1 Corinthians 9:25; Proverbs 23:1-3',
    dailyGoal: 'Avoid harmful substances and balance screen time with healthy breaks.',
    dailyGoalTl: 'Iwasan ang masasamang bisyo at limitahan ang pagkababad sa cellphone o computer.',
    practicalTips: [
      'Completely avoid alcohol, tobacco, vaping, and harmful recreational drugs.',
      'Practice balance with screen time, work, and digital entertainment.',
      'Avoid overeating even healthy foods—eat until satisfied, not stuffed.'
    ],
    practicalTipsTl: [
      'Lubusang umiwas sa alak, sigarilyo, vaping, at ipinagbabawal na gamot.',
      'Balansehin ang oras sa cellphone, trabaho, at pahinga.',
      'Iwasan ang labis na pagkain kahit sa masustansyang pagkain—kumain hanggang sa mabusog nang sapat.'
    ],
    questions: [
      {
        id: 'h_tem_1',
        category: 'health_newstart',
        difficulty: 'easy',
        question: 'In biblical health living, what does Christian temperance teach regarding harmful substances?',
        questionTl: 'Sa biblikal na pamumuhay, ano ang itinuturo ng Kristiyanong pagtitimpi patungkol sa mga nakapipinsalang bagay?',
        options: [
          'Total abstinence from what is harmful, and moderate use of what is good',
          'A little bit of poison is fine every day',
          'Overindulgence in everything',
          'Only resting and never working'
        ],
        optionsTl: [
          'Ganap na pag-iwas sa nakapipinsala, at katamtamang paggamit sa mabuti',
          'Ayos lang ang kaunting lason araw-araw',
          'Labis-labis na pagpapasasa sa lahat ng bagay',
          'Puro pahinga lamang at walang trabaho'
        ],
        correctAnswer: 0,
        explanation: 'Christian temperance protects the brain and body by rejecting harmful toxins while using good things with wisdom.',
        explanationTl: 'Ang pagtitimpi ay nagpoprotekta sa katawan at isipan sa pamamagitan ng paglayo sa lason at wastong pamumuhay.',
        bibleReference: '1 Corinthians 9:25'
      }
    ]
  },
  {
    letter: 'A',
    name: 'Air',
    nameTl: 'Sariwang Hangin (Air)',
    tagline: 'Fresh, Clean Oxygen',
    taglineTl: 'Malinis at Dalisay na Oxygen',
    icon: 'Wind',
    description: 'Deep breathing of pure outdoor air revitalizes the blood, clarifies the intellect, and calms tense nervous systems.',
    descriptionTl: 'Ang malalim na paghinga ng sariwang hangin ay nagpapadalisay ng dugo, nagpapalinaw ng isip, at nagpapakalma ng nerbiyos.',
    biblicalBasis: 'Genesis 2:7; Job 33:4; Ezekiel 37:9',
    dailyGoal: 'Practice 5 deep diaphragmatic breaths outdoors in fresh air.',
    dailyGoalTl: 'Magsagawa ng 5 malalalim na paghinga sa sariwang hangin sa labas.',
    practicalTips: [
      'Ventilate living and sleeping rooms daily with fresh outside air.',
      'Take slow, deep breaths from the diaphragm when feeling stressed.',
      'Spend time in forests, parks, or near mountains where air is freshest.'
    ],
    practicalTipsTl: [
      'Pahanginan ang mga silid at kwarto araw-araw sa pamamagitan ng pagbubukas ng bintana.',
      'Huminga nang malalim mula sa tiyan kapag nakakaramdam ng pagod o tensyon.',
      'Magpalipas ng oras sa mga parke, bukid, o tabing-dagat kung saan sariwa ang hangin.'
    ],
    questions: [
      {
        id: 'h_air_1',
        category: 'health_newstart',
        difficulty: 'easy',
        question: 'How did God give life to the first man Adam in Genesis 2:7?',
        questionTl: 'Paano binigyan ng buhay ng Diyos ang unang taong si Adan sa Genesis 2:7?',
        options: [
          'Breathed into his nostrils the breath of life',
          'Gave him an electric spark',
          'Spoke to him from a cloud',
          'Poured oil over his head'
        ],
        optionsTl: [
          'Hiningahan sa kanyang mga butas ng ilong ng hininga ng buhay',
          'Binigyan siya ng kuryente',
          'Kinausap mula sa ulap',
          'Binuhusan ng langis ang kanyang ulo'
        ],
        correctAnswer: 0,
        explanation: 'God formed man of the dust of the ground and breathed into his nostrils the breath of life.',
        explanationTl: 'Nilalang ng Diyos ang tao mula sa alabok ng lupa at hiningahan ang kanyang ilong ng hininga ng buhay.',
        bibleReference: 'Genesis 2:7'
      }
    ]
  },
  {
    letter: 'R',
    name: 'Rest',
    nameTl: 'Pahinga (Rest)',
    tagline: 'Rejuvenating Sleep & Sabbath Rest',
    taglineTl: 'Nagpapanumbalik na Tulog at Kapahingahan sa Sabbath',
    icon: 'Moon',
    description: 'Restorative nighttime sleep repairs tissues, consolidates memory, and weekly Sabbath rest restores the spiritual soul.',
    descriptionTl: 'Ang mahimbing na tulog sa gabi ay nag-aayos ng mga selula, nagpapatatag ng alaala, at ang lingguhang Sabbath ay nagpapanumbalik sa kaluluwa.',
    biblicalBasis: 'Exodus 20:8-11; Psalm 127:2; Matthew 11:28-30',
    dailyGoal: 'Get 7 to 8 hours of peaceful sleep tonight.',
    dailyGoalTl: 'Matulog nang mahimbing ng 7 hanggang 8 oras ngayong gabi.',
    practicalTips: [
      'Keep a consistent sleep schedule, going to bed before 10 PM if possible.',
      'Turn off electronic screens at least 30 minutes before bedtime.',
      'Cherish the weekly 24-hour Sabbath rest as God\'s sanctuary in time.'
    ],
    practicalTipsTl: [
      'Panatilihin ang parehong oras ng pagtulog bago mag-alas diyes ng gabi hangga\'t maaari.',
      'Patayin ang mga cellphone at telebisyon 30 minuto bago matulog.',
      'Pahalagahan ang 24-oras na kapahingahan sa Sabbath bilang banal na dambana sa panahon.'
    ],
    questions: [
      {
        id: 'h_rst_1',
        category: 'health_newstart',
        difficulty: 'easy',
        question: 'What is the recommended average nightly sleep duration for young people and adults for healthy restoration?',
        questionTl: 'Ilang oras ng tulog sa gabi ang inirerekomenda para sa kabataan at matatanda para sa malusog na katawan?',
        options: ['7 to 8 hours', 'Only 2 hours', '14 hours straight during the day', '4 hours with coffee'],
        optionsTl: ['7 hanggang 8 oras', '2 oras lamang', '14 oras nang tuloy-tuloy sa araw', '4 oras na may kasamang kape'],
        correctAnswer: 0,
        explanation: '7-8 hours of sound sleep enables cellular repair, memory consolidation, and immune defense rejuvenation.',
        explanationTl: 'Ang 7-8 oras na tulog ay nagbibigay-daan sa pag-aayos ng katawan, pagpapatibay ng memorya, at pagpapalakas ng resistensya.',
        bibleReference: 'Psalm 127:2'
      }
    ]
  },
  {
    letter: 'T',
    name: 'Trust in God',
    nameTl: 'Tiwala sa Diyos (Trust in God)',
    tagline: 'Faith, Peace, and Gratitude',
    taglineTl: 'Pananampalataya, Kapayapaan, at Pasasalamat',
    icon: 'Heart',
    description: 'Unshakable trust in God\'s loving providence relieves anxiety, strengthens the heart, and fills the spirit with divine peace.',
    descriptionTl: 'Ang matatag na pagtitiwala sa pag-ibig ng Diyos ay nag-aalis ng pangamba, nagpapatatag ng puso, at pumupuno sa kaluluwa ng banal na kapayapaan.',
    biblicalBasis: 'Proverbs 3:5-6; Isaiah 26:3; Philippians 4:6-7',
    dailyGoal: 'Commit all today\'s worries to God in prayer and list 3 blessings.',
    dailyGoalTl: 'Ipagkatiwala ang lahat ng alalahanin sa panalangin at maglista ng 3 pasasalamat.',
    practicalTips: [
      'Start each morning with personal prayer and Scripture reading.',
      'Replace worry with faith by claiming biblical promises like Philippians 4:13.',
      'Cultivate an attitude of gratitude throughout daily tasks.'
    ],
    practicalTipsTl: [
      'Simulan ang bawat umaga sa pananalangin at pagbabasa ng Banal na Kasulatan.',
      'Palitan ang pag-aalala ng pananampalataya sa pamamagitan ng pagtangan sa mga pangako ng Diyos tulad ng Filipos 4:13.',
      'Magkaroon ng pusong mapagpasalamat sa lahat ng sandali.'
    ],
    questions: [
      {
        id: 'h_tr_1',
        category: 'health_newstart',
        difficulty: 'easy',
        question: 'According to Proverbs 17:22, what effect does a merry, trusting Christian heart have on health?',
        questionTl: 'Ayon sa Kawikaan 17:22, ano ang epekto ng masayahing puso at may tiwala sa Diyos sa kalusugan?',
        options: [
          'A merry heart does good like medicine',
          'It causes stomach aches',
          'It has no effect on physical health',
          'It makes bones brittle'
        ],
        optionsTl: [
          'Ang masayang puso ay mabuting lunas (medicine)',
          'Ito ay nagdudulot ng pananakit ng tiyan',
          'Wala itong kinalaman sa katawan',
          'Nagpapahina ito ng mga buto'
        ],
        correctAnswer: 0,
        explanation: '"A merry heart does good, like medicine, but a broken spirit dries the bones." (Proverbs 17:22)',
        explanationTl: '"Ang masayang puso ay mabisang gamot, ngunit ang bagbag na diwa ay nagpapatuyo ng mga buto." (Kawikaan 17:22)',
        bibleReference: 'Proverbs 17:22'
      }
    ]
  }
];
