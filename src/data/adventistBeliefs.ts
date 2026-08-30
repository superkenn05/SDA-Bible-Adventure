export interface BeliefDetail {
  number: number;
  category: 'God' | 'Humanity' | 'Salvation' | 'Church' | 'Living' | 'End Time';
  categoryTl?: string;
  title: string;
  titleTl?: string;
  summary: string;
  summaryTl?: string;
  keyScriptures: string[];
  icon: string;
}

export const adventistBeliefsList: BeliefDetail[] = [
  {
    number: 1,
    category: 'God',
    categoryTl: 'Diyos',
    title: 'The Holy Scriptures',
    titleTl: 'Ang Banal na Kasulatan',
    summary: 'The Holy Scriptures, Old and New Testaments, are the written Word of God, given by divine inspiration.',
    summaryTl: 'Ang Banal na Kasulatan (Lumang Tipan at Bagong Tipan) ay ang nasusulat na Salita ng Diyos na ibinigay sa pamamagitan ng banal na pagkasi (inspiration).',
    keyScriptures: ['2 Timothy 3:16-17', '2 Peter 1:20-21', 'Psalm 119:105'],
    icon: 'BookOpen'
  },
  {
    number: 2,
    category: 'God',
    categoryTl: 'Diyos',
    title: 'The Trinity',
    titleTl: 'Ang Trinidad (Diyos Tatlong Persona)',
    summary: 'There is one God: Father, Son, and Holy Spirit, a unity of three coeternal Persons.',
    summaryTl: 'May iisang Diyos: Ama, Anak, at Espiritu Santo—isang pagkakaisa ng tatlong magkakapantay at walang-hanggang Persona.',
    keyScriptures: ['Genesis 1:26', 'Matthew 28:19', '2 Corinthians 13:14'],
    icon: 'ShieldCheck'
  },
  {
    number: 3,
    category: 'God',
    categoryTl: 'Diyos',
    title: 'The Father',
    titleTl: 'Ang Diyos Ama',
    summary: 'God the eternal Father is the Creator, Source, Sustainer, and Sovereign of all creation.',
    summaryTl: 'Ang walang-hanggang Diyos Ama ang Manlilikha, Pinagmulan, Tagapag-ingat, at Kataas-taasang Pinuno ng buong sangnilikha.',
    keyScriptures: ['Genesis 1:1', '1 John 4:8', '1 Timothy 1:17'],
    icon: 'Crown'
  },
  {
    number: 4,
    category: 'God',
    categoryTl: 'Diyos',
    title: 'The Son',
    titleTl: 'Ang Diyos Anak (Hesukristo)',
    summary: 'God the eternal Son became incarnate in Jesus Christ, truly God and truly human, our Savior.',
    summaryTl: 'Ang walang-hanggang Diyos Anak ay nagkatawang-tao kay Hesukristo—tunay na Diyos at tunay na tao, ang ating Tagapagligtas.',
    keyScriptures: ['John 1:1-3, 14', 'Colossians 1:15-19', 'Philippians 2:5-11'],
    icon: 'HeartHandshake'
  },
  {
    number: 5,
    category: 'God',
    categoryTl: 'Diyos',
    title: 'The Holy Spirit',
    titleTl: 'Ang Banal na Espiritu',
    summary: 'God the eternal Spirit was active with the Father and the Son in Creation, incarnation, and redemption.',
    summaryTl: 'Ang Banal na Espiritu ay kasama ng Ama at Anak sa Paglalang, pagkakatawang-tao, at pagtubos sa sangkatauhan.',
    keyScriptures: ['Genesis 1:1-2', 'Luke 1:35', 'John 14:16-18, 26'],
    icon: 'Flame'
  },
  {
    number: 6,
    category: 'God',
    categoryTl: 'Diyos',
    title: 'Creation',
    titleTl: 'Ang Paglalang',
    summary: 'God is Creator of all things and made the heavens and the earth in six literal days and rested on the seventh.',
    summaryTl: 'Nilalang ng Diyos ang langit at lupa sa loob ng anim na literal na araw at nagpahinga sa ikapitong araw ng Sabbath.',
    keyScriptures: ['Genesis 1-2', 'Exodus 20:8-11', 'Psalm 33:6, 9'],
    icon: 'Sun'
  },
  {
    number: 7,
    category: 'Humanity',
    categoryTl: 'Sangkatauhan',
    title: 'Nature of Humanity',
    titleTl: 'Ang Kalikasan ng Tao',
    summary: 'Man and woman were made in the image of God with individuality and free will, but fell into sin.',
    summaryTl: 'Ang lalaki at babae ay nilalang ayon sa wangis ng Diyos na may sariling pagpapasya, ngunit nahulog sa kasalanan.',
    keyScriptures: ['Genesis 1:26-28', 'Psalm 8:4-8', 'Romans 3:23'],
    icon: 'Users'
  },
  {
    number: 8,
    category: 'Salvation',
    categoryTl: 'Kaligtasan',
    title: 'The Great Controversy',
    titleTl: 'Ang Dakilang Tunggalian (Great Controversy)',
    summary: 'All humanity is involved in a cosmic conflict between Christ and Satan regarding the character of God and His law.',
    summaryTl: 'Lahat ng tao ay nasasangkot sa labanan sa pagitan ni Kristo at Satanas patungkol sa katangian ng Diyos at ng Kanyang kautusan.',
    keyScriptures: ['Revelation 12:4-9', 'Isaiah 14:12-14', 'Ezekiel 28:12-18'],
    icon: 'Swords'
  },
  {
    number: 9,
    category: 'Salvation',
    categoryTl: 'Kaligtasan',
    title: 'Life, Death, & Resurrection of Christ',
    titleTl: 'Buhay, Kamatayan, at Muling Pagkabuhay ni Kristo',
    summary: 'In Christ\'s life of perfect obedience and atoning death on the cross, God provided the only means of atonement for sin.',
    summaryTl: 'Sa ganap na pagsunod at pagtubos ng kamatayan ni Kristo sa krus, ipinagkaloob ng Diyos ang tanging daan ng kapatawaran sa kasalanan.',
    keyScriptures: ['John 3:16', '1 Corinthians 15:3-4', '1 Peter 2:21-22'],
    icon: 'Cross'
  },
  {
    number: 10,
    category: 'Salvation',
    categoryTl: 'Kaligtasan',
    title: 'The Experience of Salvation',
    titleTl: 'Ang Karanasan sa Kaligtasan',
    summary: 'In infinite love and mercy God made Christ, who knew no sin, to be sin for us, so that we might be made righteous through faith.',
    summaryTl: 'Sa Kanyang dakilang pag-ibig, ginawa ng Diyos si Kristo na maging kasalanan para sa atin upang tayo ay maituring na matuwid sa pamamagitan ng pananampalataya.',
    keyScriptures: ['2 Corinthians 5:17-21', 'Ephesians 2:8-10', 'Romans 5:1'],
    icon: 'Sparkles'
  },
  {
    number: 11,
    category: 'Salvation',
    categoryTl: 'Kaligtasan',
    title: 'Growing in Christ',
    titleTl: 'Paglago Kay Kristo',
    summary: 'By His death on the cross Jesus triumphed over evil forces. Daily walking with Him gives victory and peace.',
    summaryTl: 'Nagtagumpay si Hesus laban sa kadiliman. Sa pamamagitan ng panalangin, pag-aaral ng Salita, at pagsaksi, tayo ay lumalago sa Kanya.',
    keyScriptures: ['Psalm 1:1-2', 'Colossians 2:6', 'Galatians 2:20'],
    icon: 'TreePine'
  },
  {
    number: 12,
    category: 'Church',
    categoryTl: 'Simbahan',
    title: 'The Church',
    titleTl: 'Ang Simbahan / Iglesya',
    summary: 'The church is the community of believers who confess Jesus Christ as Lord and Savior.',
    summaryTl: 'Ang iglesya ay ang komunidad ng mga mananampalataya na nagpapahayag kay Hesukristo bilang Panginoon at Tagapagligtas.',
    keyScriptures: ['Genesis 12:1-3', 'Acts 7:38', 'Ephesians 4:11-15'],
    icon: 'Building2'
  },
  {
    number: 13,
    category: 'Church',
    categoryTl: 'Simbahan',
    title: 'The Remnant and Its Mission',
    titleTl: 'Ang Nalabi at ang Kanyang Misyon',
    summary: 'In the last days a remnant is called out to keep the commandments of God and have the faith of Jesus.',
    summaryTl: 'Sa mga huling araw, tinawag ang isang nalabi (remnant) upang tuparin ang mga utos ng Diyos at taglayin ang pananampalataya ni Hesus.',
    keyScriptures: ['Revelation 12:17', 'Revelation 14:6-12', 'Revelation 18:1-4'],
    icon: 'Compass'
  },
  {
    number: 14,
    category: 'Church',
    categoryTl: 'Simbahan',
    title: 'Unity in the Body of Christ',
    titleTl: 'Pagkakaisa sa Katawan ni Kristo',
    summary: 'The church is one body with many members, called from every nation, kindred, tongue, and people.',
    summaryTl: 'Ang iglesya ay iisang katawan na may maraming sangkap, tinipon mula sa bawat bansa, lipi, wika, at bayan.',
    keyScriptures: ['Romans 12:4-5', '1 Corinthians 12:12-14', 'Galatians 3:28'],
    icon: 'Globe'
  },
  {
    number: 15,
    category: 'Church',
    categoryTl: 'Simbahan',
    title: 'Baptism',
    titleTl: 'Bautismo',
    summary: 'By baptism by immersion we confess our faith in the death and resurrection of Jesus Christ.',
    summaryTl: 'Sa pamamagitan ng bautismo sa pamamagitan ng paglubog sa tubig, ipinapahayag natin ang ating pananampalataya kay Kristo.',
    keyScriptures: ['Romans 6:1-6', 'Matthew 28:19-20', 'Acts 2:38'],
    icon: 'Droplets'
  },
  {
    number: 16,
    category: 'Church',
    categoryTl: 'Simbahan',
    title: 'The Lord\'s Supper & Foot Washing',
    titleTl: 'Ang Banal na Hapunan at Paghuhugas ng Paa',
    summary: 'The Lord\'s Supper is a participation in the emblems of the body and blood of Jesus, preceded by foot washing.',
    summaryTl: 'Ang Banal na Hapunan ay pakikibahagi sa mga sagisag ng katawan at dugo ni Hesus, na pinangungunahan ng paghuhugas ng paa bilang pagpapakumbaba.',
    keyScriptures: ['1 Corinthians 11:23-30', 'John 13:1-17', 'Matthew 26:17-30'],
    icon: 'Wine'
  },
  {
    number: 17,
    category: 'Church',
    categoryTl: 'Simbahan',
    title: 'Spiritual Gifts and Ministries',
    titleTl: 'Mga Espirituwal na Kaloob at Ministeryo',
    summary: 'God bestows upon all members of His church in every age spiritual gifts for loving service and building up the church.',
    summaryTl: 'Ipinagkakaloob ng Diyos sa mga miyembro ang mga espirituwal na kaloob para sa paglilingkod at pagpapatibay ng iglesya.',
    keyScriptures: ['Romans 12:4-8', '1 Corinthians 12:7-11', 'Ephesians 4:8-11'],
    icon: 'Gift'
  },
  {
    number: 18,
    category: 'Church',
    categoryTl: 'Simbahan',
    title: 'The Gift of Prophecy',
    titleTl: 'Ang Kaloob ng Propesiya',
    summary: 'The Scriptures testify that one of the gifts of the Holy Spirit is prophecy, manifested in the ministry of Ellen G. White.',
    summaryTl: 'Isa sa mga kaloob ng Espiritu Santo ay ang propesiya, na nahayag sa ministeryo at mga sulat ni Ellen G. White.',
    keyScriptures: ['Joel 2:28-29', 'Revelation 12:17', 'Revelation 19:10'],
    icon: 'Feather'
  },
  {
    number: 19,
    category: 'Living',
    categoryTl: 'Pamumuhay',
    title: 'The Law of God',
    titleTl: 'Ang Kautusan ng Diyos',
    summary: 'The great principles of God\'s law are embodied in the Ten Commandments and exemplified in the life of Christ.',
    summaryTl: 'Ang mga dakilang prinsipyo ng kautusan ng Diyos ay nakasaad sa Sampung Utos at ipinakita sa buhay ni Kristo.',
    keyScriptures: ['Exodus 20:1-17', 'Psalm 40:7-8', 'Matthew 22:36-40'],
    icon: 'Scroll'
  },
  {
    number: 20,
    category: 'Living',
    categoryTl: 'Pamumuhay',
    title: 'The Sabbath',
    titleTl: 'Ang Sabbath (Araw ng Pamamahinga)',
    summary: 'The gracious Creator, after the six days of Creation, rested on the seventh day and instituted the Sabbath for all people.',
    summaryTl: 'Matapos ang anim na araw ng paglalang, nagpahinga ang Diyos sa ikapitong araw (Sabado) at itinalaga ito bilang banal na Sabbath para sa lahat.',
    keyScriptures: ['Genesis 2:1-3', 'Exodus 20:8-11', 'Luke 4:16', 'Hebrews 4:9-11'],
    icon: 'Sunrise'
  },
  {
    number: 21,
    category: 'Living',
    categoryTl: 'Pamumuhay',
    title: 'Stewardship',
    titleTl: 'Pangangasiwa (Stewardship)',
    summary: 'We are God\'s stewards, entrusted by Him with time and opportunities, abilities and possessions, returning tithe and offerings.',
    summaryTl: 'Tayo ay mga katiwala ng Diyos sa ating oras, talento, at ari-arian, at nagbabalik ng ikapu at mga handog sa Kanya.',
    keyScriptures: ['Genesis 1:26-28', 'Malachi 3:8-12', '1 Corinthians 9:9-14'],
    icon: 'Coins'
  },
  {
    number: 22,
    category: 'Living',
    categoryTl: 'Pamumuhay',
    title: 'Christian Behavior',
    titleTl: 'Kristiyanong Pag-uugali at Pamumuhay',
    summary: 'We are called to be a godly people whose thoughts, words, and actions bring the mind of Christ into our daily lives.',
    summaryTl: 'Tinatawag tayong mamuhay nang banal sa pananamit, pagkain (kalusugan), pananalita, at libangan.',
    keyScriptures: ['Romans 12:1-2', '1 Corinthians 6:19-20', '1 Peter 3:1-4'],
    icon: 'Activity'
  },
  {
    number: 23,
    category: 'Living',
    categoryTl: 'Pamumuhay',
    title: 'Marriage and the Family',
    titleTl: 'Kasal at ang Pamilya',
    summary: 'Marriage was divinely established in Eden and affirmed by Jesus to be a lifelong union between a man and a woman.',
    summaryTl: 'Ang kasal ay itinatag ng Diyos sa Eden bilang panghabambuhay na pagkakaisa sa pagitan ng isang lalaki at isang babae.',
    keyScriptures: ['Genesis 2:18-25', 'Matthew 19:3-9', 'Ephesians 5:21-33'],
    icon: 'Home'
  },
  {
    number: 24,
    category: 'End Time',
    categoryTl: 'Huling Araw',
    title: 'Christ\'s Ministry in the Heavenly Sanctuary',
    titleTl: 'Ministeryo ni Kristo sa Santuwaryo sa Langit',
    summary: 'There is a sanctuary in heaven where Christ ministers as our High Priest, having begun the Investigative Judgment in 1844.',
    summaryTl: 'May santuwaryo sa langit kung saan naglilingkod si Kristo bilang Dakilang Saserdote, at sinimulan ang Paghuhukom noong 1844.',
    keyScriptures: ['Hebrews 8:1-5', 'Daniel 8:14', 'Revelation 14:6-7'],
    icon: 'Church'
  },
  {
    number: 25,
    category: 'End Time',
    categoryTl: 'Huling Araw',
    title: 'The Second Coming of Christ',
    titleTl: 'Ang Muling Pagparito ni Kristo',
    summary: 'The second coming of Christ is the blessed hope of the church, literal, personal, visible, and worldwide.',
    summaryTl: 'Ang muling pagparito ni Kristo ang mapalad na pag-asa ng iglesya—literal, personal, makikita ng lahat ng mata sa buong daigdig.',
    keyScriptures: ['Titus 2:13', 'Matthew 24:30', '1 Thessalonians 4:16-17', 'Revelation 1:7'],
    icon: 'CloudSun'
  },
  {
    number: 26,
    category: 'End Time',
    categoryTl: 'Huling Araw',
    title: 'Death and Resurrection',
    titleTl: 'Kamatayan at Muling Pagkabuhay',
    summary: 'The wages of sin is death. But God will grant eternal life to His redeemed at the resurrection of the righteous.',
    summaryTl: 'Ang kamatayan ay tulad ng mahimbing na pagtulog (walang malay). Bubuhayin ang mga matuwid sa pagdating ni Hesus.',
    keyScriptures: ['1 Thessalonians 4:13-18', 'Ecclesiastes 9:5-6, 10', '1 Corinthians 15:51-54'],
    icon: 'Hourglass'
  },
  {
    number: 27,
    category: 'End Time',
    categoryTl: 'Huling Araw',
    title: 'The Millennium and the End of Sin',
    titleTl: 'Ang Milenyo at ang Wakas ng Kasalanan',
    summary: 'The millennium is the thousand-year reign of Christ with His saints in heaven between the first and second resurrections.',
    summaryTl: 'Ang isang libong taon (milenyo) kung kailan kasama ng mga banal si Kristo sa langit, bago pawiin magpakailanman ang kasalanan.',
    keyScriptures: ['Revelation 20', '1 Corinthians 6:2-3', 'Jeremiah 4:23-26'],
    icon: 'Key'
  },
  {
    number: 28,
    category: 'End Time',
    categoryTl: 'Huling Araw',
    title: 'The New Earth',
    titleTl: 'Ang Bagong Lupa',
    summary: 'On the new earth, in which righteousness dwells, God will provide an eternal home for the redeemed and an environment for everlasting life.',
    summaryTl: 'Sa bagong lupa kung saan nananahan ang katuwiran, magbibigay ang Diyos ng walang-hanggang tahanan na walang luha, sakit, o kamatayan.',
    keyScriptures: ['2 Peter 3:13', 'Isaiah 65:17-25', 'Revelation 21:1-7'],
    icon: 'Mountain'
  }
];
