import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Settings,
  User, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Music, 
  Sun, 
  Moon, 
  RotateCcw, 
  Check, 
  Flame, 
  Award, 
  BookOpen, 
  Compass, 
  Church, 
  Download,
  Upload,
  RefreshCw,
  Wifi,
  SlidersHorizontal,
  ShieldCheck,
  ChevronRight,
  Globe,
  Languages
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { pathfinderRanks } from '../data/pathfinderData';
import { sound } from '../utils/audio';

export const ProfileScreen: React.FC = () => {
  const { 
    user, 
    updateProfile,
    updateUserProfile, 
    resetUserProgress, 
    soundEnabled, 
    setSoundEnabled, 
    darkMode, 
    setDarkMode, 
    language,
    setLanguage,
    t,
    setActiveScreen,
    isOnline,
    isSyncing,
    triggerCloudSync,
    exportUserData,
    importUserData
  } = useGame();

  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'data'>('profile');
  const [nameInput, setNameInput] = useState(user.name);
  const [churchInput, setChurchInput] = useState(user.churchOrClub || user.churchName || 'Berean SDA Church');
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || '⭐');
  const [isSaved, setIsSaved] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const availableAvatars = ['👦', '👧', '👨', '👩', '👴', '👵', '🧔', '🧑‍🎓', '🦁', '🕊️', '🌿', '⛰️', '⭐', '🎺', '🛡️', '🕯️'];

  const currentRank = pathfinderRanks.reduce((prev, curr) => {
    return user.xp >= curr.requiredXp ? curr : prev;
  }, pathfinderRanks[0]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const updateFn = updateUserProfile || updateProfile;
    updateFn({
      name: nameInput,
      churchOrClub: churchInput,
      churchName: churchInput,
      avatar: selectedAvatar
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleToggleSound = () => {
    const next = !user.soundEnabled;
    updateProfile({ soundEnabled: next });
    if (setSoundEnabled) setSoundEnabled(next);
    if (next) sound.playClick();
  };

  const handleToggleMusic = () => {
    sound.playClick();
    const next = !user.musicEnabled;
    updateProfile({ musicEnabled: next });
    if (next) sound.playHymnMelody('hope');
  };

  const handleToggleDarkMode = () => {
    sound.playClick();
    setDarkMode(!darkMode);
  };

  const handleSelectLanguage = (lang: 'en' | 'tl') => {
    sound.playClick();
    setLanguage(lang);
  };

  const handleExport = () => {
    sound.playClick();
    const dataStr = exportUserData ? exportUserData() : JSON.stringify(user);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sda-bible-games-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (text && importUserData) {
        const success = importUserData(text);
        if (success) {
          setImportStatus(t.importSuccess);
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus(t.importFail);
          setTimeout(() => setImportStatus(null), 3000);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm(t.resetConfirm)) {
      resetUserProgress();
      sound.playClick();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-in fade-in">
      
      {/* Top Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          id="btn-settings-back"
          onClick={() => {
            sound.playClick();
            setActiveScreen('dashboard');
          }}
          className={`px-3.5 py-2 rounded-2xl backdrop-blur-md border text-xs font-semibold flex items-center gap-2 transition-all shadow-xs ${
            darkMode 
              ? 'bg-white/[0.08] border-white/15 text-slate-200 hover:bg-white/15' 
              : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> {t.backToGames}
        </button>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
            darkMode 
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
              : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}>
            <Settings className={`w-3.5 h-3.5 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} /> {t.settingsTitle}
          </span>
        </div>
      </div>

      {/* Segmented Tab Navigation for clean, uncluttered layout */}
      <div className={`flex items-center gap-2 p-1.5 rounded-2xl backdrop-blur-xl border max-w-lg mx-auto shadow-inner ${
        darkMode ? 'bg-slate-900/80 border-white/10' : 'bg-slate-200/90 border-slate-300'
      }`}>
        <button
          id="tab-settings-profile"
          onClick={() => { sound.playClick(); setActiveTab('profile'); }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'profile'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : darkMode
                ? 'text-slate-400 hover:text-white hover:bg-white/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>{t.tabProfile}</span>
        </button>

        <button
          id="tab-settings-preferences"
          onClick={() => { sound.playClick(); setActiveTab('preferences'); }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'preferences'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : darkMode
                ? 'text-slate-400 hover:text-white hover:bg-white/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{t.tabPreferences}</span>
        </button>

        <button
          id="tab-settings-data"
          onClick={() => { sound.playClick(); setActiveTab('data'); }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'data'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : darkMode
                ? 'text-slate-400 hover:text-white hover:bg-white/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.tabData}</span>
        </button>
      </div>

      {/* Tab 1: Profile & Adventist Character */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className={`flex flex-wrap items-center justify-between gap-4 pb-4 border-b ${
            darkMode ? 'border-white/10' : 'border-slate-200'
          }`}>
            <div className="flex items-center gap-4">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-lg shadow-amber-500/20">
                {selectedAvatar}
              </div>
              <div>
                <h2 className={`text-xl sm:text-2xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {user.name}
                </h2>
                <p className={`text-xs font-semibold ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                  {currentRank.name} • {t.level} {user.level}
                </p>
                <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {user.xp} {t.totalXp} • {user.coins} {t.talents}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveScreen('achievements');
              }}
              className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                darkMode 
                  ? 'bg-white/10 hover:bg-white/15 border-white/15 text-amber-300' 
                  : 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{t.viewBadgesAndHonors}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Avatar Selection Grid */}
          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.chooseAvatar}
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {availableAvatars.map(av => (
                <button
                  type="button"
                  key={av}
                  onClick={() => {
                    sound.playClick();
                    setSelectedAvatar(av);
                  }}
                  className={`h-12 rounded-2xl text-xl flex items-center justify-center border transition-all ${
                    selectedAvatar === av
                      ? 'bg-amber-500/30 border-amber-400 scale-105 shadow-lg ring-2 ring-amber-400/40 text-white'
                      : darkMode
                        ? 'bg-white/[0.05] border-white/10 hover:bg-white/[0.1] text-slate-200'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.displayName}
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold focus:outline-hidden focus:border-amber-400 ${
                  darkMode 
                    ? 'bg-white/[0.05] border-white/15 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.churchOrClub}
              </label>
              <input
                type="text"
                value={churchInput}
                onChange={e => setChurchInput(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold focus:outline-hidden focus:border-amber-400 ${
                  darkMode 
                    ? 'bg-white/[0.05] border-white/15 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
          >
            {isSaved ? <><Check className="w-4 h-4" /> {t.profileSaved}</> : t.saveProfile}
          </button>
        </form>
      )}

      {/* Tab 2: Language, Audio, Hymns & Theme Preferences */}
      {activeTab === 'preferences' && (
        <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          
          {/* Language Selector Section (English vs Taglish) */}
          <div className={`space-y-3 pb-6 border-b ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="flex items-center gap-2">
              <Languages className={`w-4 h-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
              <h3 className={`font-bold text-sm sm:text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.languageTitle}
              </h3>
            </div>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.languageDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* English Option */}
              <button
                type="button"
                id="btn-lang-en"
                onClick={() => handleSelectLanguage('en')}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  language === 'en'
                    ? darkMode
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/30'
                      : 'bg-amber-100 border-amber-400 text-amber-900 ring-2 ring-amber-400/30'
                    : darkMode
                      ? 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇺🇸</span>
                  <div>
                    <p className={`font-bold text-xs sm:text-sm ${
                      language === 'en'
                        ? (darkMode ? 'text-amber-300' : 'text-amber-900')
                        : (darkMode ? 'text-white' : 'text-slate-900')
                    }`}>
                      English
                    </p>
                    <p className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Default English</p>
                  </div>
                </div>
                {language === 'en' && (
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </button>

              {/* Tagalog / Taglish Option */}
              <button
                type="button"
                id="btn-lang-tl"
                onClick={() => handleSelectLanguage('tl')}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  language === 'tl'
                    ? darkMode
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/30'
                      : 'bg-amber-100 border-amber-400 text-amber-900 ring-2 ring-amber-400/30'
                    : darkMode
                      ? 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇵🇭</span>
                  <div>
                    <p className={`font-bold text-xs sm:text-sm ${
                      language === 'tl'
                        ? (darkMode ? 'text-amber-300' : 'text-amber-900')
                        : (darkMode ? 'text-white' : 'text-slate-900')
                    }`}>
                      Tagalog (Taglish)
                    </p>
                    <p className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Kaswal at natural na Filipino</p>
                  </div>
                </div>
                {language === 'tl' && (
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </button>
            </div>
          </div>

          <h3 className={`font-bold text-sm sm:text-base flex items-center gap-2 pt-2 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            <SlidersHorizontal className={`w-4 h-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            <span>{t.audioAndVisualTitle}</span>
          </h3>

          <div className={`divide-y ${darkMode ? 'divide-white/10' : 'divide-slate-200'}`}>
            {/* Sound FX */}
            <div className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${
                  user.soundEnabled 
                    ? darkMode ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : darkMode ? 'bg-white/5 text-slate-400 border-white/10' : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  {user.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <p className={`font-bold text-xs sm:text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {t.soundFx}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.soundFxDesc}</p>
                </div>
              </div>
              <button
                onClick={handleToggleSound}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                  user.soundEnabled ? 'bg-emerald-500' : (darkMode ? 'bg-white/20' : 'bg-slate-300')
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  user.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Background Hymns */}
            <div className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${
                  user.musicEnabled 
                    ? darkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-800 border-amber-300'
                    : darkMode ? 'bg-white/5 text-slate-400 border-white/10' : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <p className={`font-bold text-xs sm:text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {t.hymns}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.hymnsDesc}</p>
                </div>
              </div>
              <button
                onClick={handleToggleMusic}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                  user.musicEnabled ? 'bg-amber-500' : (darkMode ? 'bg-white/20' : 'bg-slate-300')
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  user.musicEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Theme Toggle */}
            <div className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${
                  darkMode 
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' 
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <p className={`font-bold text-xs sm:text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {t.darkTheme}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.darkThemeDesc}</p>
                </div>
              </div>
              <button
                onClick={handleToggleDarkMode}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                  darkMode ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Data Management, Teacher Pool & Reset */}
      {activeTab === 'data' && (
        <div className="space-y-5">
          {/* Teacher Question Pool Shortcut */}
          <div className={`p-6 rounded-3xl backdrop-blur-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl ${
            darkMode 
              ? 'bg-emerald-950/40 border-emerald-500/30 text-white' 
              : 'bg-emerald-50 border-emerald-300 text-emerald-950'
          }`}>
            <div className="flex items-center gap-3.5">
              <div className={`p-3 rounded-2xl border ${
                darkMode ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-emerald-950'}`}>{t.teacherPoolTitle}</h4>
                <p className={`text-xs ${darkMode ? 'text-emerald-200/80' : 'text-emerald-800'}`}>{t.teacherPoolDesc}</p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setActiveScreen('admin');
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t.openQuestionEditor}</span>
            </button>
          </div>

          {/* Cloud Sync & Backup */}
          <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-xl space-y-4 ${
            darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.dataBackupTitle}
            </h4>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {t.dataBackupDesc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleExport}
                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                  darkMode 
                    ? 'bg-white/10 hover:bg-white/15 border-white/15 text-slate-200' 
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                }`}
              >
                <Download className={`w-4 h-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} /> {t.exportBackup}
              </button>

              <label className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                darkMode 
                  ? 'bg-white/10 hover:bg-white/15 border-white/15 text-slate-200' 
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              }`}>
                <Upload className="w-4 h-4 text-emerald-500" /> {t.importBackup}
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>

              <button
                onClick={triggerCloudSync}
                disabled={isSyncing}
                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                  darkMode
                    ? 'bg-sky-500/20 hover:bg-sky-500/30 border-sky-500/30 text-sky-300'
                    : 'bg-sky-100 hover:bg-sky-200 border-sky-300 text-sky-800'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${darkMode ? 'text-sky-400' : 'text-sky-600'} ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? t.syncing : t.syncCloud}</span>
              </button>
            </div>

            {importStatus && (
              <p className={`text-xs font-bold p-2 rounded-lg border ${
                darkMode 
                  ? 'text-amber-300 bg-amber-500/10 border-amber-500/20' 
                  : 'text-amber-900 bg-amber-100 border-amber-300'
              }`}>
                {importStatus}
              </p>
            )}
          </div>

          {/* Reset */}
          <div className={`p-6 rounded-3xl backdrop-blur-xl border space-y-3 ${
            darkMode 
              ? 'bg-rose-950/30 border-rose-500/25' 
              : 'bg-rose-50 border-rose-200'
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              darkMode ? 'text-rose-300' : 'text-rose-800'
            }`}>
              {t.dangerZoneTitle}
            </h4>
            <p className={`text-xs leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {t.dangerZoneDesc}
            </p>

            <button
              onClick={handleResetData}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
                darkMode 
                  ? 'border-rose-400/40 text-rose-300 hover:bg-rose-500/20' 
                  : 'border-rose-300 text-rose-800 bg-white hover:bg-rose-100'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" /> {t.resetProgressBtn}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

