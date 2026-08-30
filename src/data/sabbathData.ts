export interface SabbathActivityItem {
  id: string;
  activity: string;
  activityTl?: string;
  isSabbathAppropriate: boolean;
  category: 'Worship & Fellowship' | 'Nature & Creation' | 'Service & Mercy' | 'Secular & Commercial' | 'Rest & Family';
  categoryTl?: string;
  explanation: string;
  explanationTl?: string;
  scripture: string;
}

export const sabbathActivitiesData: SabbathActivityItem[] = [
  {
    id: 'sab_act_1',
    activity: 'Taking a peaceful nature walk to observe God\'s flowers, trees, and wildlife',
    activityTl: 'Mapayapang paglalakad sa kalikasan upang pagmasdan ang mga bulaklak, puno, at mga nilikha ng Diyos',
    isSabbathAppropriate: true,
    category: 'Nature & Creation',
    categoryTl: 'Kalikasan at Paglalang',
    explanation: 'Sabbath is a celebration of Creation week. Enjoying God\'s handiwork in nature draws our hearts to the Creator.',
    explanationTl: 'Ang Sabbath ay pagdiriwang ng Paglalang. Ang pagmamasid sa kalikasan ay naglalapit ng ating puso sa Lumikha.',
    scripture: 'Psalm 19:1, Genesis 2:1-3'
  },
  {
    id: 'sab_act_2',
    activity: 'Shopping at the shopping mall and negotiating commercial business transactions',
    activityTl: 'Pamimili sa mall at pakikipagnegosasyon sa negosyo o komersiyo',
    isSabbathAppropriate: false,
    category: 'Secular & Commercial',
    categoryTl: 'Sekular at Negosyo',
    explanation: 'Scripture instructs us not to buy, sell, or pursue ordinary commercial business on God\'s holy day.',
    explanationTl: 'Itinuturo ng Kasulatan na huwag tayong magbili o bumili o magnegosyo sa banal na araw ng Panginoon.',
    scripture: 'Nehemiah 13:15-21, Isaiah 58:13'
  },
  {
    id: 'sab_act_3',
    activity: 'Visiting hospital patients, nursing home residents, and elderly church members',
    activityTl: 'Pagdalaw sa mga pasyente sa ospital, matatanda sa home for the aged, at mga may sakit na kapatid',
    isSabbathAppropriate: true,
    category: 'Service & Mercy',
    categoryTl: 'Paglilingkod at Habag',
    explanation: 'Jesus frequently healed the suffering on Sabbath, declaring that it is lawful and blessed to do good on the Sabbath day.',
    explanationTl: 'Madalas magpagaling si Hesus sa araw ng Sabbath, na nagpapatunay na matuwid at kapuri-puri ang gumawa ng mabuti sa Sabbath.',
    scripture: 'Matthew 12:11-12, Luke 13:10-16'
  },
  {
    id: 'sab_act_4',
    activity: 'Attending Sabbath School and Church Divine Service to praise God together',
    activityTl: 'Pagdalo sa Sabbath School at Divine Worship Service upang sama-samang sumamba sa Diyos',
    isSabbathAppropriate: true,
    category: 'Worship & Fellowship',
    categoryTl: 'Pagsamba at Samahan',
    explanation: 'The Sabbath is designated as a holy convocation for corporate worship and joyful fellowship.',
    explanationTl: 'Ang Sabbath ay itinalaga bilang banal na pagpupulong para sa sama-samang pagsamba at masayang samahan.',
    scripture: 'Leviticus 23:3, Luke 4:16'
  },
  {
    id: 'sab_act_5',
    activity: 'Working overtime hours at a secular corporate desk job or commercial shop',
    activityTl: 'Pag-o-overtime sa sekular na trabaho sa opisina o tindahan para kumita ng dagdag na pera',
    isSabbathAppropriate: false,
    category: 'Secular & Commercial',
    categoryTl: 'Sekular at Negosyo',
    explanation: 'The fourth commandment bids us to do all our secular labor during the six working days and rest on the seventh.',
    explanationTl: 'Ipinag-uutos ng ikaapat na utos na gawin ang lahat ng hanapbuhay sa anim na araw at magpahinga sa ikapito.',
    scripture: 'Exodus 20:9-10'
  },
  {
    id: 'sab_act_6',
    activity: 'Singing hymns and reading Bible stories together as a family around sundown',
    activityTl: 'Pag-awit ng mga himno at sama-samang pagbabasa ng kwento sa Bibliya sa paglubog ng araw kasama ang pamilya',
    isSabbathAppropriate: true,
    category: 'Rest & Family',
    categoryTl: 'Pahinga at Pamilya',
    explanation: 'Family worship welcomes the Sabbath with gratitude, song, and joyful contemplation of God\'s promises.',
    explanationTl: 'Sinasalubong ng pampamilyang pagsamba ang Sabbath nang may pasasalamat, awitan, at kagalakan sa mga pangako ng Diyos.',
    scripture: 'Colossians 3:16, Psalm 92:1-4'
  },
  {
    id: 'sab_act_7',
    activity: 'Studying for secular university chemistry or economics exams under stressful deadlines',
    activityTl: 'Pangangaral o pagrerebyu para sa sekular na pagsusulit sa paaralan sa ilalim ng tensyon at stress',
    isSabbathAppropriate: false,
    category: 'Secular & Commercial',
    categoryTl: 'Sekular at Negosyo',
    explanation: 'God offers Sabbath rest to free our minds from secular worries, school grades, and career pressures.',
    explanationTl: 'Ipinagkakaloob ng Diyos ang Sabbath upang palayain ang ating isipan mula sa sekular na alalahanin at grado sa paaralan.',
    scripture: 'Exodus 16:23, Hebrews 4:9-10'
  },
  {
    id: 'sab_act_8',
    activity: 'Sharing homemade lunch / potluck with church visitors and lonely neighbors',
    activityTl: 'Pakikibahagi ng pananghalian o potluck sa mga bisita sa iglesya at kapitbahay',
    isSabbathAppropriate: true,
    category: 'Worship & Fellowship',
    categoryTl: 'Pagsamba at Samahan',
    explanation: 'Hospitality and breaking bread in Christian love reflects the communion and sweetness of Sabbath rest.',
    explanationTl: 'Ang pagiging bukas-palad at pagsasalu-salo sa pag-ibig ni Kristo ay nagpapakita ng tamis ng kapahingahan sa Sabbath.',
    scripture: 'Acts 2:46-47, Hebrews 13:2'
  }
];

export interface PreparationStep {
  id: string;
  step: string;
  stepTl?: string;
  day: 'Preparation Day (Friday)' | 'Sabbath Hours (Sunset to Sunset)';
  dayTl?: string;
  icon: string;
  tip: string;
  tipTl?: string;
}

export const sabbathPreparationChecklist: PreparationStep[] = [
  {
    id: 'p1',
    step: 'Finish secular work and school projects before Friday afternoon sunset',
    stepTl: 'Tapusin ang sekular na trabaho at mga takdang-aralin bago lumubog ang araw sa Biyernes ng hapon',
    day: 'Preparation Day (Friday)',
    dayTl: 'Araw ng Paghahanda (Biyernes)',
    icon: 'Briefcase',
    tip: 'Plan your schedule so work duties close gracefully before sundown.',
    tipTl: 'Iplano ang iyong oras upang matapos ang mga gawain bago pa sumapit ang paglubog ng araw.'
  },
  {
    id: 'p2',
    step: 'Prepare delicious Sabbath meals and tidy the home in advance',
    stepTl: 'Ihanda ang masasarap na pagkain para sa Sabbath at linisin ang tahanan nang maaga',
    day: 'Preparation Day (Friday)',
    dayTl: 'Araw ng Paghahanda (Biyernes)',
    icon: 'Utensils',
    tip: 'Like the manna in Exodus 16, preparing meals early lets you rest fully.',
    tipTl: 'Gaya ng mana sa Exodo 16, ang maagang pagluluto ay nagbibigay-daan sa ganap na kapahingahan.'
  },
  {
    id: 'p3',
    step: 'Welcome Friday sundown with family prayer, candle lighting, and opening song',
    stepTl: 'Salubungin ang paglubog ng araw sa Biyernes sa panalangin, pag-awit, at pampamilyang pagsamba',
    day: 'Sabbath Hours (Sunset to Sunset)',
    dayTl: 'Banal na Oras ng Sabbath (Paglubog hanggang Paglubog ng Araw)',
    icon: 'Flame',
    tip: 'Welcome the Sabbath angels into your home with a peaceful heart.',
    tipTl: 'Salubungin ang mga anghel ng Sabbath sa inyong tahanan nang may payapang puso.'
  },
  {
    id: 'p4',
    step: 'Participate actively in Sabbath School and church worship',
    stepTl: 'Makisali nang masigla sa Sabbath School at pagsamba sa iglesya',
    day: 'Sabbath Hours (Sunset to Sunset)',
    dayTl: 'Banal na Oras ng Sabbath (Paglubog hanggang Paglubog ng Araw)',
    icon: 'BookOpen',
    tip: 'Share insights during Bible study and encourage your peers.',
    tipTl: 'Magbahagi ng natutunan sa pag-aaral ng Bibliya at magpatibay sa mga kapatid.'
  },
  {
    id: 'p5',
    step: 'Afternoon nature walk or sunshine missionary outreach',
    stepTl: 'Paglalakad sa kalikasan sa hapon o pakikibahagi sa gawaing misyonero ng pag-ibig',
    day: 'Sabbath Hours (Sunset to Sunset)',
    dayTl: 'Banal na Oras ng Sabbath (Paglubog hanggang Paglubog ng Araw)',
    icon: 'Sun',
    tip: 'Spend time outdoors observing God\'s second book: the book of Nature.',
    tipTl: 'Magpalipas ng oras sa labas habang pinagmamasdan ang Ikalawang Aklat ng Diyos: ang Kalikasan.'
  },
  {
    id: 'p6',
    step: 'Close the Sabbath at Saturday sunset with thanksgiving and prayer',
    stepTl: 'Ipagpasalamat at tapusin ang Sabbath sa paglubog ng araw ng Sabado sa panalangin',
    day: 'Sabbath Hours (Sunset to Sunset)',
    dayTl: 'Banal na Oras ng Sabbath (Paglubog hanggang Paglubog ng Araw)',
    icon: 'Moon',
    tip: 'Praise the Lord for a restful, rejuvenating 24 hours of sanctuary in time.',
    tipTl: 'Purihin ang Panginoon para sa mapayapa at nagpapanumbalik na 24 oras ng dambana sa panahon.'
  }
];

export const sabbathBlessings = [
  {
    verse: 'Exodus 20:8, 11',
    text: 'Remember the Sabbath day, to keep it holy... For in six days the LORD made the heavens and the earth, the sea, and all that is in them, and rested the seventh day.',
    textTl: 'Alalahanin mo ang araw ng Sabbath, upang ipangilin... Sapagkat sa anim na araw ay ginawa ng Panginoon ang langit at lupa, ang dagat, at lahat ng nandoon, at nagpahinga sa ikapitong araw.',
    reflection: 'The Sabbath is God’s gift of time—a sanctuary in time where we pause from striving to rest in His finished love.',
    reflectionTl: 'Ang Sabbath ay kaloob ng Diyos—isang dambana sa panahon kung saan tayo tumitigil sa pagpapagal upang magpahinga sa Kanyang pag-ibig.'
  },
  {
    verse: 'Isaiah 58:13-14',
    text: 'If you turn away your foot from the Sabbath, from doing your pleasure on My holy day, and call the Sabbath a delight... then you shall delight yourself in the LORD.',
    textTl: 'Kung iurong mo ang iyong paa sa Sabbath, sa paggawa ng iyong kalayawan sa Aking banal na araw; at tawagin mo ang Sabbath na kaluguran... kung magkagayo\'y malulugod ka sa Panginoon.',
    reflection: 'When we make Sabbath a true delight, God lifts us above worldly anxieties and feeds us with heavenly peace.',
    reflectionTl: 'Kapag ginawa nating tunay na kaluguran ang Sabbath, itataas tayo ng Diyos higit sa mga alalahanin ng mundo at pupunuin ng kapayapaan.'
  },
  {
    verse: 'Mark 2:27-28',
    text: 'The Sabbath was made for man, and not man for the Sabbath. Therefore the Son of Man is also Lord of the Sabbath.',
    textTl: 'Ginawa ang Sabbath dahil sa tao, at hindi ang tao dahil sa Sabbath. Kaya ang Anak ng Tao ay Panginoon maging ng Sabbath.',
    reflection: 'Jesus is Lord of our rest. In Him, every Sabbath is a foretaste of the eternal rest awaiting the redeemed in the New Earth.',
    reflectionTl: 'Si Hesus ang Panginoon ng ating kapahingahan. Sa Kanya, ang bawat Sabbath ay patikim ng walang-hanggang kapahingahan sa Bagong Lupa.'
  }
];
