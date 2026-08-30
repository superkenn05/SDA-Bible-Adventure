import { Question } from '../types';

export const initialBibleQuestions: Question[] = [
  // --- BIBLE GENERAL & GOSPELS ---
  {
    id: 'q1',
    category: 'bible_general',
    difficulty: 'easy',
    question: 'How many books are in the standard Protestant Christian Bible?',
    questionTl: 'Ilang aklat ang bumubuo sa karaniwang Bibliyang Kristiyano?',
    options: ['52 books', '66 books', '73 books', '39 books'],
    optionsTl: ['52 aklat', '66 aklat', '73 aklat', '39 aklat'],
    correctAnswer: 1,
    explanation: 'The Bible contains 66 books: 39 in the Old Testament and 27 in the New Testament.',
    explanationTl: 'Ang Bibliya ay binubuo ng 66 na aklat: 39 sa Lumang Tipan at 27 sa Bagong Tipan.',
    bibleReference: '2 Timothy 3:16-17',
    tags: ['Scripture', 'General'],
    tagsTl: ['Kasulatan', 'Pangkalahatan']
  },
  {
    id: 'q2',
    category: 'gospels',
    difficulty: 'easy',
    question: 'Where was Jesus born according to the Gospels?',
    questionTl: 'Saan ipinanganak si Hesus ayon sa mga Ebanghelyo?',
    options: ['Jerusalem', 'Nazareth', 'Bethlehem', 'Capernaum'],
    optionsTl: ['Jerusalem', 'Nazaret', 'Betlehem', 'Capernaum'],
    correctAnswer: 2,
    explanation: 'Jesus was born in Bethlehem of Judea, fulfilling the prophecy of Micah 5:2.',
    explanationTl: 'Ipinanganak si Hesus sa Betlehem ng Judea, bilang katuparan sa propesiya ng Mikas 5:2.',
    bibleReference: 'Luke 2:4-7, Micah 5:2',
    tags: ['Jesus', 'Prophecy'],
    tagsTl: ['Hesus', 'Propesiya']
  },
  {
    id: 'q3',
    category: 'old_testament',
    difficulty: 'easy',
    question: 'Who led the Israelites out of slavery in Egypt and through the Red Sea?',
    questionTl: 'Sino ang nanguna sa mga Israelita palabas ng pagkaalipin sa Ehipto at tumawid sa Dagat na Pula?',
    options: ['Joshua', 'Moses', 'Aaron', 'Abraham'],
    optionsTl: ['Josue', 'Moises', 'Aaron', 'Abraham'],
    correctAnswer: 1,
    explanation: 'God called Moses at the burning bush to deliver His people from Egypt.',
    explanationTl: 'Tinawag ng Diyos si Moises sa nagliliyab na mababang punong-kahoy upang palayain ang Kanyang bayan sa Ehipto.',
    bibleReference: 'Exodus 3:10, Exodus 14:21-22',
    tags: ['Exodus', 'Moses'],
    tagsTl: ['Exodo', 'Moises']
  },
  {
    id: 'q4',
    category: 'new_testament',
    difficulty: 'medium',
    question: 'On the road to which city was Saul converted when a bright light shone from heaven?',
    questionTl: 'Sa daan patungo saang lungsod nagbago si Saulo nang magliwanag ang kalangitan?',
    options: ['Antioch', 'Damascus', 'Rome', 'Ephesus'],
    optionsTl: ['Antioquia', 'Damasco', 'Roma', 'Efeso'],
    correctAnswer: 1,
    explanation: 'Saul was traveling to Damascus to persecute believers when Jesus appeared to him.',
    explanationTl: 'Papunta si Saulo sa Damasco upang usigin ang mga mananampalataya nang magpakita si Hesus sa kanya.',
    bibleReference: 'Acts 9:3-6',
    tags: ['Paul', 'Conversion'],
    tagsTl: ['Pablo', 'Pagbabalik-loob']
  },
  {
    id: 'q5',
    category: 'gospels',
    difficulty: 'easy',
    question: 'What was Jesus’ first recorded miracle according to the Gospel of John?',
    questionTl: 'Ano ang unang naitalang himala ni Hesus ayon sa Ebanghelyo ni Juan?',
    options: ['Walking on water', 'Turning water into grape juice/wine', 'Feeding 5000', 'Healing the blind man'],
    optionsTl: ['Paglakad sa ibabaw ng tubig', 'Paggawang katas ng ubas/alak mula sa tubig', 'Pagpapakain sa 5000 katao', 'Pagpapagaling sa bulag'],
    correctAnswer: 1,
    explanation: 'Jesus turned water into pure unfermented wine at the wedding in Cana of Galilee.',
    explanationTl: 'Ginawang alak/katas ng ubas ni Hesus ang tubig sa kasalan sa Cana ng Galilea.',
    bibleReference: 'John 2:1-11',
    tags: ['Miracles', 'Cana'],
    tagsTl: ['Mga Himala', 'Cana']
  },
  {
    id: 'q6',
    category: 'old_testament',
    difficulty: 'medium',
    question: 'Which prophet was taken up to heaven in a whirlwind with a chariot of fire?',
    questionTl: 'Sinong propeta ang dinala sa langit sa pamamagitan ng ipu-ipo na may karwaheng apoy?',
    options: ['Elisha', 'Elijah', 'Isaiah', 'Jeremiah'],
    optionsTl: ['Eliseo', 'Elias', 'Isaias', 'Jeremias'],
    correctAnswer: 1,
    explanation: 'Elijah was translated to heaven in a chariot of fire while Elisha watched.',
    explanationTl: 'Si Elias ay dinala sa langit sa karwaheng apoy habang pinapanood ni Eliseo.',
    bibleReference: '2 Kings 2:11',
    tags: ['Prophets', 'Elijah'],
    tagsTl: ['Mga Propeta', 'Elias']
  },
  {
    id: 'q7',
    category: 'bible_general',
    difficulty: 'medium',
    question: 'Which of the following is NOT one of the Fruits of the Spirit in Galatians 5:22-23?',
    questionTl: 'Alin sa mga sumusunod ang HINDI kabilang sa Bunga ng Espiritu sa Galacia 5:22-23?',
    options: ['Love', 'Joy', 'Pride', 'Self-control / Temperance'],
    optionsTl: ['Pag-ibig', 'Kagalakan', 'Katakawan / Kayabangan (Pride)', 'Pagpipigil sa sarili'],
    correctAnswer: 2,
    explanation: 'The fruit of the Spirit is love, joy, peace, longsuffering, kindness, goodness, faithfulness, gentleness, self-control.',
    explanationTl: 'Ang bunga ng Espiritu ay pag-ibig, kagalakan, kapayapaan, pagtitiis, kabaitan, kabutihan, katapatan, kaamuan, at pagpipigil sa sarili.',
    bibleReference: 'Galatians 5:22-23',
    tags: ['Fruit of the Spirit', 'Christian Living'],
    tagsTl: ['Bunga ng Espiritu', 'Kristiyanong Pamumuhay']
  },

  // --- ADVENTIST BELIEFS (28 FUNDAMENTAL BELIEFS) ---
  {
    id: 'q8',
    category: 'adventist_beliefs',
    difficulty: 'easy',
    question: 'Which day of the week is the biblical Seventh-day Sabbath according to Scripture?',
    questionTl: 'Aling araw ng sanlinggo ang biblikal na Ikapitong Araw ng Sabbath ayon sa Banal na Kasulatan?',
    options: ['Sunday (1st day)', 'Friday (6th day)', 'Saturday (7th day)', 'Any chosen day'],
    optionsTl: ['Linggo (Unang araw)', 'Biyernes (Ikaanim na araw)', 'Sabado (Ikapitong araw)', 'Kahit anong araw na mapili'],
    correctAnswer: 2,
    explanation: 'The Seventh day (from Friday sunset to Saturday sunset) was sanctified and blessed at Creation by God.',
    explanationTl: 'Ang ikapitong araw (mula paglubog ng araw ng Biyernes hanggang paglubog ng araw ng Sabado) ay pinabanal at pinagpala ng Diyos noong Paglalang.',
    bibleReference: 'Genesis 2:1-3, Exodus 20:8-11, Luke 23:54-56',
    tags: ['Sabbath', 'Creation', 'Belief 20'],
    tagsTl: ['Sabbath', 'Paglalang', 'Paniniwala 20']
  },
  {
    id: 'q9',
    category: 'adventist_beliefs',
    difficulty: 'medium',
    question: 'According to the 28 Fundamental Beliefs, how will Jesus return at His Second Coming?',
    questionTl: 'Ayon sa 28 Pangunahing Paniniwala, paano babalik si Hesus sa Kanyang Muling Pagparito?',
    options: [
      'Secretly in spirit',
      'Literally, visibly, and personally for all eyes to see',
      'Only to a few elect in the desert',
      'Through political peace'
    ],
    optionsTl: [
      'Lihim at sa espiritu lamang',
      'Literal, personal, at makikita ng bawat mata sa buong daigdig',
      'Sa iilang tao lamang sa ilang',
      'Sa pamamagitan ng pandaigdigang kapayapaan sa politika'
    ],
    correctAnswer: 1,
    explanation: 'The Second Coming of Christ is the blessed hope of the church; it will be literal, personal, visible, and worldwide.',
    explanationTl: 'Ang muling pagparito ni Kristo ay literal, personal, maririnig, at makikita ng bawat mata (Pahayag 1:7).',
    bibleReference: 'Revelation 1:7, 1 Thessalonians 4:16-17, Acts 1:11',
    tags: ['Second Coming', 'Belief 25'],
    tagsTl: ['Muling Pagparito', 'Paniniwala 25']
  },
  {
    id: 'q10',
    category: 'adventist_beliefs',
    difficulty: 'medium',
    question: 'What is the biblical condition of humanity in death (the state of the dead)?',
    questionTl: 'Ano ang kalagayan ng tao kapag namatay ayon sa Bibliya (State of the Dead)?',
    options: [
      'Souls immediately go to conscious heaven or burning hell',
      'Reincarnation into another lifeform',
      'An unconscious sleep awaiting the resurrection',
      'Roaming spirits on the earth'
    ],
    optionsTl: [
      'Diretsong nagpupunta ang kaluluwa sa langit o sa impiyerno',
      'Muling isisilang bilang ibang nilalang (Reincarnation)',
      'Walang-malay na pagtulog habang naghihintay ng pagkabuhay-muli',
      'Gumagalang mga multo/espiritu sa lupa'
    ],
    correctAnswer: 2,
    explanation: 'The Bible compares death to an unconscious sleep until the resurrection at Christ’s return.',
    explanationTl: 'Itinutulad ng Bibliya ang kamatayan sa mahimbing na pagtulog na walang malay hanggang sa araw ng pagkabuhay na mag-uli.',
    bibleReference: 'Ecclesiastes 9:5-6, 10; 1 Thessalonians 4:13-15; John 11:11-14',
    tags: ['State of the Dead', 'Resurrection', 'Belief 26'],
    tagsTl: ['Kalagayan ng Patay', 'Pagkabuhay-muli', 'Paniniwala 26']
  },
  {
    id: 'q11',
    category: 'adventist_beliefs',
    difficulty: 'hard',
    question: 'What prophetic event began at the end of the 2,300 prophetic days/years in 1844?',
    questionTl: 'Anong propetikong kaganapan ang nagsimula sa pagtatapos ng 2,300 araw/taon noong 1844?',
    options: [
      'The start of the Millennium on Earth',
      'The Cleansing of the Heavenly Sanctuary & Investigative Judgment',
      'The rebuilding of Solomon’s Temple',
      'The translation of Enoch'
    ],
    optionsTl: [
      'Pagsisimula ng Milenyo sa lupa',
      'Ang Paglilinis ng Santuwaryo sa Langit at Pagsisiyasat na Paghuhukom (Investigative Judgment)',
      'Muling pagtatayo ng Templo ni Solomon',
      'Pag-akyat ni Enoc sa langit'
    ],
    correctAnswer: 1,
    explanation: 'According to Daniel 8:14, at the end of the 2,300 days (1844), Christ entered the Most Holy Place of the heavenly sanctuary to begin the cleansing and pre-advent judgment.',
    explanationTl: 'Ayon sa Daniel 8:14, noong 1844 pumasok si Kristo sa Kabanal-banalang Dako ng Santuwaryo sa Langit para sa paglilinis at paghuhukom bago ang muling pagparito.',
    bibleReference: 'Daniel 8:14, Hebrews 8:1-2, Revelation 14:7',
    tags: ['Sanctuary', '1844', 'Prophecy', 'Belief 24'],
    tagsTl: ['Santuwaryo', '1844', 'Propesiya', 'Paniniwala 24']
  },
  {
    id: 'q12',
    category: 'adventist_beliefs',
    difficulty: 'medium',
    question: 'What is the "Great Controversy" in Seventh-day Adventist theology?',
    questionTl: 'Ano ang "Dakilang Tunggalian" (Great Controversy) sa pananaw ng mga Sabadista?',
    options: [
      'A debate between church councils',
      'The cosmic conflict between Christ and Satan regarding God’s character, law, and sovereignty',
      'A political struggle in the ancient Roman empire',
      'A disagreement over dietary rules'
    ],
    optionsTl: [
      'Isang debate sa mga konseho ng simbahan',
      'Ang labanan sa sansinukob sa pagitan ni Kristo at Satanas ukol sa katangian ng Diyos, Kanyang kautusan, at pamamahala',
      'Labanan sa politika ng sinaunang Imperyong Romano',
      'Hindi pagkakaunawaan sa mga batas ng pagkain'
    ],
    correctAnswer: 1,
    explanation: 'All humanity is involved in a great controversy between Christ and Satan regarding the character of God, His law, and His rule over the universe.',
    explanationTl: 'Ang buong sangkatauhan ay sakop ng labanan sa pagitan ni Kristo at Satanas patungkol sa katuwiran ng Diyos at Kanyang batas.',
    bibleReference: 'Revelation 12:7-9, Isaiah 14:12-14, Ezekiel 28:12-18',
    tags: ['Great Controversy', 'Belief 8'],
    tagsTl: ['Dakilang Tunggalian', 'Paniniwala 8']
  },
  {
    id: 'q13',
    category: 'adventist_beliefs',
    difficulty: 'easy',
    question: 'How is biblical baptism administered according to Scripture and Adventist practice?',
    questionTl: 'Paano isinasagawa ang biblikal na bautismo ayon sa Kasulatan at gawi ng Adventista?',
    options: ['Sprinkling with water', 'Pouring over the forehead', 'Full immersion under water', 'Verbal declaration without water'],
    optionsTl: ['Pagwiwisik ng tubig', 'Pagbuhos ng tubig sa noo', 'Ganap na paglubog sa ilalim ng tubig', 'Pagsasalita lamang nang walang tubig'],
    correctAnswer: 2,
    explanation: 'Biblical baptism is by full immersion in water, symbolizing death to sin and resurrection to a new life in Christ.',
    explanationTl: 'Ang biblikal na bautismo ay sa pamamagitan ng paglubog sa tubig bilang simbolo ng pagkamatay sa kasalanan at pagkabuhay sa bagong buhay kay Kristo.',
    bibleReference: 'Romans 6:3-5, Matthew 28:19-20, Acts 8:38',
    tags: ['Baptism', 'Belief 15'],
    tagsTl: ['Bautismo', 'Paniniwala 15']
  },
  {
    id: 'q14',
    category: 'adventist_beliefs',
    difficulty: 'easy',
    question: 'What did God do on the Seventh Day of Creation week?',
    questionTl: 'Ano ang ginawa ng Diyos sa Ikapitong Araw ng sanlinggo ng Paglalang?',
    options: ['Created land animals', 'Rested, blessed, and sanctified the day', 'Created the sun and moon', 'Parted the waters'],
    optionsTl: ['Lumikha ng mga hayop sa lupa', 'Nagpahinga, pinagpala, at pinabanal ang araw', 'Nilikha ang araw at buwan', 'Hinati ang mga tubig'],
    correctAnswer: 1,
    explanation: 'On the seventh day God ended His work and rested, and He blessed the seventh day and sanctified it as a memorial of Creation.',
    explanationTl: 'Sa ikapitong araw ay nagpahinga ang Diyos, pinagpala ito at ibinukod bilang banal na alaala ng Paglalang.',
    bibleReference: 'Genesis 2:2-3, Exodus 20:11',
    tags: ['Creation', 'Sabbath', 'Belief 6'],
    tagsTl: ['Paglalang', 'Sabbath', 'Paniniwala 6']
  },

  // --- SABBATH CHALLENGE QUESTIONS ---
  {
    id: 'q15',
    category: 'sabbath',
    difficulty: 'easy',
    question: 'From what time to what time is the Seventh-day Sabbath observed biblically?',
    questionTl: 'Mula kailan hanggang kailan ipinagdiriwang ang biblikal na Ikapitong Araw ng Sabbath?',
    options: ['Midnight to midnight', 'Sunrise to sunrise', 'Friday sunset to Saturday sunset', 'Saturday morning 9am to 6pm'],
    optionsTl: ['Hatinggabi hanggang hatinggabi', 'Pagsikat ng araw hanggang pagsikat', 'Paglubog ng araw ng Biyernes hanggang paglubog ng araw ng Sabado', 'Sabado ng umaga 9am hanggang 6pm'],
    correctAnswer: 2,
    explanation: 'Scripture defines the biblical day from evening to evening (sunset to sunset).',
    explanationTl: 'Itinuturo ng Kasulatan na ang araw ng Sabbath ay mula hapon hanggang kinahapunan (paglubog ng araw hanggang paglubog ng araw).',
    bibleReference: 'Leviticus 23:32, Mark 1:32, Genesis 1:5',
    tags: ['Sabbath', 'Sunset'],
    tagsTl: ['Sabbath', 'Paglubog ng Araw']
  },
  {
    id: 'q16',
    category: 'sabbath',
    difficulty: 'easy',
    question: 'What did Jesus declare about the Sabbath in Mark 2:27?',
    questionTl: 'Ano ang ipinahayag ni Hesus patungkol sa Sabbath sa Marcos 2:27?',
    options: [
      'The Sabbath was made for man, and not man for the Sabbath',
      'The Sabbath was abolished at the cross',
      'The Sabbath is only for Jewish priests',
      'The Sabbath should be moved to the first day'
    ],
    optionsTl: [
      'Ginawa ang Sabbath dahil sa tao, at hindi ang tao dahil sa Sabbath',
      'Ang Sabbath ay pinawalang-bisa sa krus',
      'Ang Sabbath ay para lamang sa mga saserdoteng Judio',
      'Ang Sabbath ay dapat ilipat sa unang araw ng linggo'
    ],
    correctAnswer: 0,
    explanation: 'Jesus emphasized that the Sabbath was created at Eden as a blessing for all mankind.',
    explanationTl: 'Ipinunto ni Hesus na ang Sabbath ay itinatag sa Eden bilang pagpapala at kapahingahan para sa buong sangkatauhan.',
    bibleReference: 'Mark 2:27-28',
    tags: ['Jesus', 'Sabbath'],
    tagsTl: ['Hesus', 'Sabbath']
  },
  {
    id: 'q17',
    category: 'sabbath',
    difficulty: 'medium',
    question: 'What was Jesus’ custom on the Sabbath day according to Luke 4:16?',
    questionTl: 'Ano ang naging kaugalian ni Hesus tuwing araw ng Sabbath ayon sa Lucas 4:16?',
    options: [
      'Working in the carpenter shop',
      'Going into the synagogue and reading Scripture',
      'Shopping at the Roman market',
      'Traveling long trade distances'
    ],
    optionsTl: [
      'Paggawa sa karpinterya',
      'Papasok sa sinagoga at pagbabasa ng Banal na Kasulatan',
      'Pamimili sa pamilihan ng Roma',
      'Pangangalakal sa malalayong lugar'
    ],
    correctAnswer: 1,
    explanation: '"And as His custom was, He went into the synagogue on the Sabbath day, and stood up to read."',
    explanationTl: '"Gaya ng Kanyang kinaugalian, pumasok Siya sa sinagoga sa araw ng Sabbath, at tumayo upang bumasa."',
    bibleReference: 'Luke 4:16',
    tags: ['Jesus', 'Custom', 'Worship'],
    tagsTl: ['Hesus', 'Kaugalian', 'Pagsamba']
  },
  {
    id: 'q18',
    category: 'sabbath',
    difficulty: 'medium',
    question: 'Which of the following is considered an ideal, uplifting activity for the Sabbath hours?',
    questionTl: 'Alin sa mga sumusunod ang mainam at angkop na gawain sa mga banal na oras ng Sabbath?',
    options: [
      'Commercial shopping and business negotiations',
      'Nature exploration, visiting the sick, and studying God’s Word',
      'Doing regular paid overtime work',
      'Studying for secular school exams'
    ],
    optionsTl: [
      'Pamimili sa mall at negosasyon sa negosyo',
      'Pagmamasid sa kalikasan, pagdalaw sa may sakit, at pag-aaral ng Salita ng Diyos',
      'Pag-o-overtime sa trabaho para sa dagdag na sweldo',
      'Pagrerebyu para sa sekular na pagsusulit sa paaralan'
    ],
    correctAnswer: 1,
    explanation: 'Jesus taught that it is lawful and blessed to do good on the Sabbath, appreciating God’s creation and serving others.',
    explanationTl: 'Itinuro ni Hesus na matuwid at mabuti ang gumawa ng kabutihan, maglingkod sa kapwa, at magpasalamat sa Diyos sa araw ng Sabbath.',
    bibleReference: 'Matthew 12:12, Isaiah 58:13-14',
    tags: ['Sabbath Practice', 'Ministry'],
    tagsTl: ['Gawain sa Sabbath', 'Ministeryo']
  },

  // --- HEALTH & NEWSTART ---
  {
    id: 'q19',
    category: 'health_newstart',
    difficulty: 'easy',
    question: 'What does the acronym N.E.W.S.T.A.R.T. stand for in Adventist health education?',
    questionTl: 'Ano ang ibig sabihin ng akronim na N.E.W.S.T.A.R.T. sa kalusugan ng Adventista?',
    options: [
      'Nature, Energy, Work, Sleep, Time, Action, Running, Truth',
      'Nutrition, Exercise, Water, Sunlight, Temperance, Air, Rest, Trust in God',
      'Newness, Eating, Walking, Sunlight, Training, Altitude, Religion, Time',
      'Nourishment, Effort, Warmth, Strength, Toughness, Attitude, Rest, Theology'
    ],
    optionsTl: [
      'Nature, Energy, Work, Sleep, Time, Action, Running, Truth',
      'Nutrition (Sustansya), Exercise (Ehersisyo), Water (Tubig), Sunlight (Sikat ng Araw), Temperance (Pagtitimpi), Air (Sariwang Hangin), Rest (Pahinga), Trust in God (Tiwala sa Diyos)',
      'Newness, Eating, Walking, Sunlight, Training, Altitude, Religion, Time',
      'Nourishment, Effort, Warmth, Strength, Toughness, Attitude, Rest, Theology'
    ],
    correctAnswer: 1,
    explanation: 'NEWSTART represents the 8 natural laws of health: Nutrition, Exercise, Water, Sunlight, Temperance, Air, Rest, and Trust in God.',
    explanationTl: 'Ang NEWSTART ay kumakatawan sa 8 likas na batas ng kalusugan: Nutrisyon, Ehersisyo, Tubig, Sikat ng Araw, Pagtitimpi, Sariwang Hangin, Pahinga, at Tiwala sa Diyos.',
    bibleReference: '3 John 1:2, 1 Corinthians 6:19-20',
    tags: ['NEWSTART', 'Health Laws'],
    tagsTl: ['NEWSTART', 'Batas ng Kalusugan']
  },
  {
    id: 'q20',
    category: 'health_newstart',
    difficulty: 'easy',
    question: 'Why do Christians treat their physical bodies with great care according to 1 Corinthians 6:19?',
    questionTl: 'Bakit dapat ingatan ng mga Kristiyano ang kanilang katawan ayon sa 1 Corinto 6:19?',
    options: [
      'To show off physical strength',
      'Because the body is the temple of the Holy Spirit',
      'To earn salvation through diet',
      'To win sports medals'
    ],
    optionsTl: [
      'Upang magmayabang ng lakas ng katawan',
      'Dahil ang katawan ay templo ng Espiritu Santo',
      'Upang magkamit ng kaligtasan sa pamamagitan ng pagkain',
      'Upang manalo sa mga patimpalak sa pampalakasan'
    ],
    correctAnswer: 1,
    explanation: '"Do you not know that your body is the temple of the Holy Spirit who is in you, whom you have from God?"',
    explanationTl: '"Hindi ba ninyo nalalaman na ang inyong katawan ay templo ng Espiritu Santo na nasa inyo, na tinanggap ninyo mula sa Diyos?"',
    bibleReference: '1 Corinthians 6:19-20',
    tags: ['Temple of God', 'Stewardship'],
    tagsTl: ['Templo ng Diyos', 'Pangangalaga']
  },
  {
    id: 'q21',
    category: 'health_newstart',
    difficulty: 'medium',
    question: 'What was the original diet given to humanity in the Garden of Eden?',
    questionTl: 'Ano ang orihinal na pagkaing ibinigay sa tao sa Hardin ng Eden?',
    options: [
      'Fish and bread',
      'Grains, fruits, nuts, and seeds (plant-based)',
      'Unclean meats',
      'Processed sugars'
    ],
    optionsTl: [
      'Isda at tinapay',
      'Mga butil, prutas, mani, at buto (halamang pagkain)',
      'Maruruming karne',
      'Mga artipisyal na asukal at pampalasa'
    ],
    correctAnswer: 1,
    explanation: 'In Genesis 1:29, God provided every seed-bearing plant and tree yielding fruit with seed as food.',
    explanationTl: 'Sa Genesis 1:29, ibinigay ng Diyos ang lahat ng halamang nagbubunga ng butil at mga punong may bunga bilang pagkain.',
    bibleReference: 'Genesis 1:29',
    tags: ['Original Diet', 'Eden'],
    tagsTl: ['Orihinal na Pagkain', 'Eden']
  },
  {
    id: 'q22',
    category: 'health_newstart',
    difficulty: 'medium',
    question: 'What is true biblical "Temperance"?',
    questionTl: 'Ano ang tunay na biblikal na "Pagtitimpi" (Temperance)?',
    options: [
      'Eating as much as possible on holidays',
      'Moderate use of that which is good, and total abstinence from that which is harmful',
      'Complete fasting without drinking water for months',
      'Doing whatever feels good in moderation'
    ],
    optionsTl: [
      'Pagkain nang labis-labis tuwing may handaan',
      'Katamtamang paggamit sa mabubuting bagay, at lubos na pag-iwas sa anumang nakapipinsala',
      'Tuluyang hindi pag-inom ng tubig sa loob ng buwan',
      'Paggawa ng anumang masarap sa pakiramdam basta katamtaman'
    ],
    correctAnswer: 1,
    explanation: 'True temperance means complete abstinence from hurtful substances (like tobacco, alcohol, illicit drugs) and wise moderation in wholesome things.',
    explanationTl: 'Ang tunay na pagtitimpi ay lubusang pag-iwas sa nakasasama (alkohol, tabako, masasamang bisyo) at wastong paggamit sa mabubuting bagay.',
    bibleReference: '1 Corinthians 9:25, Galatians 5:23',
    tags: ['Temperance', 'Self-Control'],
    tagsTl: ['Pagtitimpi', 'Disiplina']
  },

  // --- CHURCH HISTORY ---
  {
    id: 'q23',
    category: 'church_history',
    difficulty: 'medium',
    question: 'Who was the sea captain pioneer who introduced the Seventh-day Sabbath truth to James and Ellen White in the 1840s?',
    questionTl: 'Sinong kapitan ng barko at pioneer ang nagpakilala ng katotohanan ng Sabbath kina James at Ellen White noong dekada 1840?',
    options: ['Joseph Bates', 'William Miller', 'J.N. Andrews', 'Uriah Smith'],
    optionsTl: ['Joseph Bates', 'William Miller', 'J.N. Andrews', 'Uriah Smith'],
    correctAnswer: 0,
    explanation: 'Captain Joseph Bates learned of the Sabbath from Rachel Oakes Preston and wrote the tract "The Seventh Day Sabbath, a Perpetual Sign."',
    explanationTl: 'Nalaman ni Kapitan Joseph Bates ang tungkol sa Sabbath mula kay Rachel Oakes Preston at isinulat ang polyetong nagpalaganap ng Sabbath sa mga naunang Adventista.',
    bibleReference: 'Revelation 14:12',
    tags: ['Pioneers', 'Joseph Bates'],
    tagsTl: ['Mga Pioneer', 'Joseph Bates']
  },
  {
    id: 'q24',
    category: 'church_history',
    difficulty: 'medium',
    question: 'In what year was the General Conference of Seventh-day Adventists officially organized in Battle Creek, Michigan?',
    questionTl: 'Anong taon opisyal na naitatag ang General Conference ng Seventh-day Adventists sa Battle Creek, Michigan?',
    options: ['1844', '1863', '1888', '1901'],
    optionsTl: ['1844', '1863', '1888', '1901'],
    correctAnswer: 1,
    explanation: 'The Seventh-day Adventist denomination was officially organized in May 1863 with John Byington elected as the first GC President.',
    explanationTl: 'Opisyal na naitatag ang organisasyon ng Simbahang Sabadista noong Mayo 1863, kung saan si John Byington ang unang Pangulo ng General Conference.',
    bibleReference: '1 Corinthians 14:40',
    tags: ['1863', 'Organization'],
    tagsTl: ['1863', 'Organisasyon']
  },
  {
    id: 'q25',
    category: 'church_history',
    difficulty: 'hard',
    question: 'Who was the first official foreign missionary sent by the Seventh-day Adventist Church to Europe (Switzerland) in 1874?',
    questionTl: 'Sino ang unang opisyal na misyonero sa ibang bansa na ipinadala ng Simbahang Adventista sa Europa (Switzerland) noong 1874?',
    options: ['James White', 'J.N. Andrews (John Nevins Andrews)', 'Hiram Edson', 'William Foy'],
    optionsTl: ['James White', 'J.N. Andrews (John Nevins Andrews)', 'Hiram Edson', 'William Foy'],
    correctAnswer: 1,
    explanation: 'J.N. Andrews sailed to Europe in 1874 as the first official SDA foreign missionary. Andrews University is named in his honor.',
    explanationTl: 'Si J.N. Andrews ang naglayag patungong Europa noong 1874 bilang unang opisyal na foreign missionary ng simbahan. Ipinangalan sa kanya ang Andrews University.',
    bibleReference: 'Matthew 28:19',
    tags: ['Missions', 'J.N. Andrews'],
    tagsTl: ['Misyunaryo', 'J.N. Andrews']
  },
  {
    id: 'q26',
    category: 'church_history',
    difficulty: 'hard',
    question: 'What crucial message was highlighted at the 1888 Minneapolis General Conference session by A.T. Jones and E.J. Waggoner?',
    questionTl: 'Anong mahalagang mensahe ang binigyang-diin sa 1888 Minneapolis General Conference nina A.T. Jones at E.J. Waggoner?',
    options: [
      'Building new church buildings',
      'Righteousness by Faith in Jesus Christ',
      'Starting medical airplanes',
      'Changing the hymnal'
    ],
    optionsTl: [
      'Pagtatayo ng mga bagong gusali ng simbahan',
      'Katuwiran sa pamamagitan ng Pananampalataya kay Hesukristo (Righteousness by Faith)',
      'Pagpapatakbo ng mga eroplanong medikal',
      'Pagpapalit ng aklat ng mga awit (Hymnal)'
    ],
    correctAnswer: 1,
    explanation: 'The 1888 session brought renewed focus to Righteousness by Faith, emphasizing that salvation is solely through the merits of Christ.',
    explanationTl: 'Muling ipinagdiinan noong 1888 na ang kaligtasan ay biyaya lamang at katuwiran sa pamamagitan ng pananampalataya sa mga biyaya ni Kristo.',
    bibleReference: 'Romans 3:24-26, Ephesians 2:8',
    tags: ['1888', 'Righteousness by Faith'],
    tagsTl: ['1888', 'Katuwiran sa Pananampalataya']
  },

  // --- PATHFINDER & ADVENTURE ---
  {
    id: 'q27',
    category: 'pathfinder',
    difficulty: 'easy',
    question: 'What is the first part of the Pathfinder Pledge?',
    questionTl: 'Ano ang unang bahagi ng Pathfinder Pledge (Panunumpa ng Pathfinder)?',
    options: [
      'By the grace of God, I will be pure, and kind, and true',
      'I will always win every camping race',
      'I promise to never miss a soccer game',
      'I will march with the flag'
    ],
    optionsTl: [
      'Sa biyaya ng Diyos, ako ay magiging dalisay, mabait, at totoo',
      'Lagi akong mananalo sa bawat karera sa camping',
      'Nangangako akong hindi liliban sa laro',
      'Magmamartsa ako kasama ang watawat'
    ],
    correctAnswer: 0,
    explanation: 'The Pathfinder Pledge begins: "By the grace of God, I will be pure, and kind, and true. I will keep the Pathfinder Law..."',
    explanationTl: 'Ang panunumpa ng Pathfinder ay nagsisimula sa: "Sa biyaya ng Diyos, ako\'y magiging dalisay, mabait, at totoo..."',
    bibleReference: '1 Timothy 4:12',
    tags: ['Pathfinder Pledge', 'Character'],
    tagsTl: ['Panunumpa ng Pathfinder', 'Kaugalian']
  },
  {
    id: 'q28',
    category: 'pathfinder',
    difficulty: 'easy',
    question: 'What is the motto of the Adventist Youth (AY / Pathfinders)?',
    questionTl: 'Ano ang bansag o motto ng Kabataang Adventista (AY / Pathfinders)?',
    options: [
      'To reach the top of the mountain',
      'The Love of Christ Compelleth Us',
      'Knowledge is Power',
      'Be Prepared for Tomorrow'
    ],
    optionsTl: [
      'Marating ang tugatog ng bundok',
      'Ang Pag-ibig ni Kristo ang Nag-uudyok sa Atin (The Love of Christ Compelleth Us)',
      'Ang Kaalaman ay Kapangyarihan',
      'Maging Handa Para sa Bukas'
    ],
    correctAnswer: 1,
    explanation: 'The AY/Pathfinder Motto is "The Love of Christ Compelleth Us" based on 2 Corinthians 5:14.',
    explanationTl: 'Ang bansag ng AY/Pathfinder ay "Ang Pag-ibig ni Kristo ang Nag-uudyok sa Atin" hango sa 2 Corinto 5:14.',
    bibleReference: '2 Corinthians 5:14',
    tags: ['Pathfinder Motto', 'Youth'],
    tagsTl: ['Motto ng Pathfinder', 'Kabataan']
  },
  {
    id: 'q29',
    category: 'pathfinder',
    difficulty: 'medium',
    question: 'In outdoor camping, what is the best knot used to tie two ropes of equal thickness together safely?',
    questionTl: 'Sa outdoor camping, anong buhol (knot) ang pinakamainam gamitin sa pagdurugtong ng dalawang lubid na magkasinlaki?',
    options: ['Square Knot (Reef Knot)', 'Slip Knot', 'Noose', 'Granny Knot'],
    optionsTl: ['Square Knot (Reef Knot)', 'Slip Knot', 'Noose (Bitag)', 'Granny Knot'],
    correctAnswer: 0,
    explanation: 'The Square Knot (Reef Knot) is the classic knot used for joining two ropes of equal diameter.',
    explanationTl: 'Ang Square Knot (Reef Knot) ang klasikong buhol para sa pagdurugtong ng dalawang lubid na may parehong kapal.',
    bibleReference: 'Ecclesiastes 4:12',
    tags: ['Knots', 'Camping'],
    tagsTl: ['Mga Buhol', 'Camping']
  },
  {
    id: 'q30',
    category: 'pathfinder',
    difficulty: 'medium',
    question: 'In emergency first aid, what is the initial recommended treatment for a minor heat burn?',
    questionTl: 'Sa pangunahing lunas (first aid), ano ang unang dapat gawin sa maliit na paso sa balat?',
    options: [
      'Apply butter or oil immediately',
      'Cool under clean running cold water for at least 10–20 minutes',
      'Pop any blisters with a needle',
      'Cover tightly with warm wool'
    ],
    optionsTl: [
      'Lagyan agad ng mantikilya o mantika',
      'Palamigin sa ilalim ng malinis at malamig na umaagos na tubig sa loob ng 10–20 minuto',
      'Tusukin ng karayom ang mga paltos',
      'Balutin nang mahigpit gamit ang mainit na tela'
    ],
    correctAnswer: 1,
    explanation: 'Cooling the burn with cool running water stops the burning process and relieves pain safely without trapping heat.',
    explanationTl: 'Ang pagpapadaloy ng malamig na tubig ay nagpapahinto sa pagkasunog ng tissue at nagpapaginhawa ng kirot nang ligtas.',
    bibleReference: 'Luke 10:34',
    tags: ['First Aid', 'Safety'],
    tagsTl: ['Unang Lunas', 'Kaligtasan']
  },

  // --- PROPHECY & THREE ANGELS' MESSAGES ---
  {
    id: 'q31',
    category: 'prophecy',
    difficulty: 'medium',
    question: 'Where in the Bible are the Three Angels’ Messages of end-time warning found?',
    questionTl: 'Saan matatagpuan sa Bibliya ang Mensahe ng Tatlong Anghel para sa mga huling araw?',
    options: ['Genesis 12', 'Daniel 2', 'Revelation 14:6-12', 'Matthew 24:1-5'],
    optionsTl: ['Genesis 12', 'Daniel 2', 'Pahayag 14:6-12', 'Mateo 24:1-5'],
    correctAnswer: 2,
    explanation: 'The Three Angels’ Messages calling all people to fear God, give Him glory, and worship the Creator are found in Revelation 14:6-12.',
    explanationTl: 'Ang Mensahe ng Tatlong Anghel na nananawagan na matakot sa Diyos, magbigay-kaluwalhatian, at sumamba sa Lumalang ay nasa Pahayag 14:6-12.',
    bibleReference: 'Revelation 14:6-12',
    tags: ['Three Angels', 'Revelation'],
    tagsTl: ['Tatlong Anghel', 'Pahayag']
  },
  {
    id: 'q32',
    category: 'prophecy',
    difficulty: 'hard',
    question: 'In Daniel 2, what represented the head of gold in Nebuchadnezzar’s dream statue?',
    questionTl: 'Sa Daniel 2, ano ang kinakatawan ng ulong ginto sa rebulto sa panaginip ni Nabucodonosor?',
    options: ['Medo-Persia', 'Babylon (King Nebuchadnezzar)', 'Greece', 'Rome'],
    optionsTl: ['Medo-Persia', 'Babilonia (Haring Nabucodonosor)', 'Gresya', 'Roma'],
    correctAnswer: 1,
    explanation: 'Daniel said to Nebuchadnezzar: "You are this head of gold" (Daniel 2:38), representing the kingdom of Babylon.',
    explanationTl: 'Sinabi ni Daniel kay Nabucodonosor: "Ikaw ang ulong gintong iyon" (Daniel 2:38), na kumakatawan sa kaharian ng Babilonia.',
    bibleReference: 'Daniel 2:37-38',
    tags: ['Daniel 2', 'Statue', 'Babylon'],
    tagsTl: ['Daniel 2', 'Rebulto', 'Babilonia']
  },
  {
    id: 'q33',
    category: 'prophecy',
    difficulty: 'hard',
    question: 'In Daniel 7, which beast with four wings and four heads represented the kingdom of Greece (under Alexander the Great)?',
    questionTl: 'Sa Daniel 7, aling hayop na may apat na pakpak at apat na ulo ang kumakatawan sa kaharian ng Gresya (sa pamumuno ni Alexander the Great)?',
    options: ['The Lion with Eagle Wings', 'The Bear with 3 ribs', 'The Leopard with 4 wings and 4 heads', 'The Dreadful 10-horned Beast'],
    optionsTl: ['Leon na may pakpak ng agila', 'Oso na may 3 tadyang sa bibig', 'Chita/Leopardo na may 4 na pakpak at 4 na ulo', 'Kakila-kilabot na hayop na may 10 sungay'],
    correctAnswer: 2,
    explanation: 'The swift four-headed leopard represented the Grecian empire under Alexander and its four division generals (Cassander, Lysimachus, Ptolemy, Seleucus).',
    explanationTl: 'Ang mabilis na leopardo na may apat na ulo at pakpak ay sumasagisag sa Gresya at sa apat na heneral na naghati sa kaharian matapos ang kamatayan ni Alexander.',
    bibleReference: 'Daniel 7:6',
    tags: ['Daniel 7', 'Greece', 'Beasts'],
    tagsTl: ['Daniel 7', 'Gresya', 'Mga Hayop']
  }
];
