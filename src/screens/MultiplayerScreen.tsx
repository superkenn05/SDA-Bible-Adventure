import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Sparkles, 
  Crown, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  SmilePlus
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Question } from '../types';
import { sound } from '../utils/audio';
import { localizeQuestion } from '../utils/localize';

interface PlayerState {
  id: string;
  name: string;
  avatar: string;
  score: number;
  hasAnswered: boolean;
  selectedOption: number | null;
  reaction?: string;
}

export const MultiplayerScreen: React.FC = () => {
  const { user, questions, addXpAndCoins, setActiveScreen, celebrate, language, darkMode } = useGame();

  const [stage, setStage] = useState<'lobby' | 'room' | 'playing' | 'podium'>('lobby');
  const [roomCode, setRoomCode] = useState('SDA7');
  const [inputCode, setInputCode] = useState('');
  
  // Players in the room
  const [players, setPlayers] = useState<PlayerState[]>([
    { id: '1', name: user.name, avatar: user.avatar, score: 0, hasAnswered: false, selectedOption: null },
    { id: '2', name: language === 'tl' ? 'Kapatid na Josiah' : 'Elder Josiah', avatar: '🧔', score: 0, hasAnswered: false, selectedOption: null },
    { id: '3', name: language === 'tl' ? 'Kapatid na Sarah (AY)' : 'Sister Sarah (AY)', avatar: '👩', score: 0, hasAnswered: false, selectedOption: null },
    { id: '4', name: language === 'tl' ? 'Caleb (Pathfinder)' : 'Caleb (Pathfinder)', avatar: '👦', score: 0, hasAnswered: false, selectedOption: null },
  ]);

  const [multiQuestions, setMultiQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userSelectedOpt, setUserSelectedOpt] = useState<number | null>(null);
  const [isRoundRevealed, setIsRoundRevealed] = useState(false);
  const [timer, setTimer] = useState(15);

  const christianEmojis = ['🙏', '🙌', '✝️', '✨', '🔥', '💖', '🕊️', '📖'];

  const handleCreateRoom = () => {
    sound.playClick();
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    setRoomCode(code);
    setStage('room');
  };

  const handleJoinRoom = () => {
    sound.playClick();
    if (inputCode.trim().length >= 3) {
      setRoomCode(inputCode.toUpperCase());
      setStage('room');
    }
  };

  const handleStartGame = () => {
    sound.playClick();
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 4);
    setMultiQuestions(shuffled);
    setCurrentQIndex(0);
    setUserSelectedOpt(null);
    setIsRoundRevealed(false);
    setTimer(15);
    setStage('playing');
  };

  // Timer & AI Player simulated answering
  useEffect(() => {
    let interval: number | null = null;
    if (stage === 'playing' && !isRoundRevealed) {
      interval = window.setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            handleTimeUp();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stage, isRoundRevealed, currentQIndex]);

  const handleTimeUp = () => {
    setIsRoundRevealed(true);
  };

  const currentRawQ = multiQuestions[currentQIndex];
  const currentQ = currentRawQ ? localizeQuestion(currentRawQ, language) : null;

  const handleOptionClick = (idx: number) => {
    if (userSelectedOpt !== null || isRoundRevealed || !currentRawQ) return;
    setUserSelectedOpt(idx);

    const isCorrect = idx === currentRawQ.correctAnswer;

    if (isCorrect) sound.playCorrect();
    else sound.playIncorrect();

    // Simulate AI answers with varied accuracy
    setPlayers(prev => prev.map(p => {
      if (p.id === '1') {
        return {
          ...p,
          hasAnswered: true,
          selectedOption: idx,
          score: isCorrect ? p.score + 100 + timer * 5 : p.score
        };
      } else {
        const aiCorrect = Math.random() > 0.35;
        const aiChoice = aiCorrect ? currentRawQ.correctAnswer : (currentRawQ.correctAnswer + 1) % 4;
        return {
          ...p,
          hasAnswered: true,
          selectedOption: aiChoice,
          score: aiCorrect ? p.score + 80 + Math.floor(Math.random() * 30) : p.score
        };
      }
    }));

    setIsRoundRevealed(true);
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentQIndex + 1 < multiQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
      setUserSelectedOpt(null);
      setIsRoundRevealed(false);
      setTimer(15);
      setPlayers(prev => prev.map(p => ({ ...p, hasAnswered: false, selectedOption: null })));
    } else {
      setStage('podium');
      const userPlayer = players.find(p => p.id === '1');
      if (userPlayer) {
        addXpAndCoins(120, 50, 'Multiplayer Bible Challenge');
      }
      celebrate();
    }
  };

  const sendReaction = (emoji: string) => {
    sound.playClick();
    setPlayers(prev => prev.map(p => p.id === '1' ? { ...p, reaction: emoji } : p));
    setTimeout(() => {
      setPlayers(prev => prev.map(p => p.id === '1' ? { ...p, reaction: undefined } : p));
    }, 2500);
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in">
      
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
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
          <ArrowLeft className="w-4 h-4" /> {language === 'tl' ? 'Bumalik sa Dashboard' : 'Back to Dashboard'}
        </button>

        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
          darkMode 
            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' 
            : 'bg-indigo-100 text-indigo-900 border-indigo-300'
        }`}>
          {language === 'tl' ? 'Live na Sabbath School at AY Room' : 'Live Sabbath School & AY Room'}
        </span>
      </div>

      {/* LOBBY / ROOM CODE JOIN */}
      {stage === 'lobby' && (
        <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="text-center max-w-md mx-auto space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
              <Users className="w-8 h-8" />
            </div>
            <h1 className={`text-2xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'tl' ? 'Multiplayer Hamon sa Bibliya' : 'Multiplayer Bible Challenge'}
            </h1>
            <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'tl'
                ? 'Maglaro nang sama-sama sa Sabbath School, pagtitipon ng AY, Pathfinder club, o pampamilyang pagsamba!'
                : 'Play together in real time during Sabbath School classes, Adventist Youth (AY) meetings, Pathfinder clubs, or family worship!'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Create Room Card */}
            <div className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between backdrop-blur-md ${
              darkMode ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="space-y-1">
                <span className={`text-xs font-bold uppercase ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  {language === 'tl' ? 'Maging Host' : 'Host Game'}
                </span>
                <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'tl' ? 'Gumawa ng Bagong Kuwarto' : 'Create a New Room'}
                </h3>
                <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {language === 'tl' ? 'Bumuo ng natatanging 4-titik na room code para sa iyong klase o barkada.' : 'Generate a unique 4-letter room code to host church youth or classmates.'}
                </p>
              </div>
              <button
                onClick={handleCreateRoom}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all"
              >
                {language === 'tl' ? 'Gumawa ng Kuwarto' : 'Create Room'}
              </button>
            </div>

            {/* Join Room Card */}
            <div className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between backdrop-blur-md ${
              darkMode ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="space-y-1">
                <span className={`text-xs font-bold uppercase ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  {language === 'tl' ? 'Sumali sa Laro' : 'Join Game'}
                </span>
                <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'tl' ? 'Ilagay ang Room Code' : 'Enter Room Code'}
                </h3>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. SDA7"
                  value={inputCode}
                  onChange={e => setInputCode(e.target.value.toUpperCase())}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono font-bold uppercase tracking-widest focus:outline-hidden focus:border-indigo-400 ${
                    darkMode 
                      ? 'bg-slate-900/60 border-white/20 text-white placeholder-slate-500' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
              <button
                onClick={handleJoinRoom}
                disabled={inputCode.trim().length === 0}
                className={`w-full py-3.5 rounded-2xl font-bold text-xs shadow-lg border transition-all disabled:opacity-40 ${
                  darkMode 
                    ? 'bg-white/[0.1] hover:bg-white/[0.18] text-white border-white/10' 
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-indigo-300'
                }`}
              >
                {language === 'tl' ? 'Sumali sa Kuwarto' : 'Join Room'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* WAITING ROOM */}
      {stage === 'room' && (
        <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="text-center space-y-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'tl' ? 'Koda ng Kuwarto:' : 'Room Code:'}
            </span>
            <div className={`inline-block px-8 py-3 rounded-2xl border-2 font-mono font-black text-3xl tracking-widest shadow-lg ${
              darkMode 
                ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-indigo-500/20' 
                : 'bg-indigo-100 border-indigo-500 text-indigo-900 shadow-indigo-200'
            }`}>
              {roomCode}
            </div>
            <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'tl' ? 'Ibahagi ang kodang ito sa iyong klase o mga kaibigan!' : 'Share this code with your youth class or friends!'}
            </p>
          </div>

          {/* Connected Players Grid */}
          <div className="space-y-2">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'tl' ? `Konektadong Manlalaro (${players.length})` : `Connected Players (${players.length})`}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {players.map(p => (
                <div 
                  key={p.id}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 backdrop-blur-md ${
                    darkMode ? 'bg-white/[0.04] border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-2xl">{p.avatar}</span>
                  <div className="min-w-0">
                    <p className={`font-bold text-xs sm:text-sm truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {p.name}
                    </p>
                    <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {language === 'tl' ? 'Handa' : 'Ready'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> {language === 'tl' ? 'Simulan ang Multiplayer Round' : 'Start Multiplayer Round'}
          </button>
        </div>
      )}

      {/* PLAYING ROUND */}
      {stage === 'playing' && currentQ && (
        <div className="space-y-4">
          
          {/* Top Bar with Timer & Scores */}
          <div className={`backdrop-blur-xl rounded-2xl p-4 border shadow-lg flex items-center justify-between ${
            darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${
                darkMode ? 'bg-white/[0.08] text-slate-200 border-white/10' : 'bg-slate-100 text-slate-800 border-slate-200'
              }`}>
                {language === 'tl'
                  ? `Tanong ${currentQIndex + 1} / ${multiQuestions.length}`
                  : `Question ${currentQIndex + 1} / ${multiQuestions.length}`}
              </span>
            </div>

            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-black text-xs border ${
              darkMode ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-indigo-100 text-indigo-900 border-indigo-300'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{timer}s</span>
            </div>
          </div>

          {/* Question Card */}
          <div className={`backdrop-blur-xl rounded-3xl p-5 sm:p-8 border shadow-xl space-y-5 ${
            darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-base sm:text-lg font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userSelectedOpt === idx;
                const isCorrect = idx === currentRawQ.correctAnswer;

                let style = darkMode 
                  ? 'bg-white/[0.06] border-white/10 text-slate-200 hover:bg-white/10' 
                  : 'bg-slate-50 border-slate-200 text-slate-850 hover:bg-slate-100';

                if (isRoundRevealed) {
                  if (isCorrect) {
                    style = darkMode
                      ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold ring-2 ring-emerald-400/40 shadow-lg'
                      : 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-400/40 shadow-md';
                  } else if (isSelected && !isCorrect) {
                    style = darkMode
                      ? 'bg-rose-500/25 border-rose-400 text-rose-200 font-bold'
                      : 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                  } else {
                    style = 'opacity-40 border-slate-300/30';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isRoundRevealed}
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full p-4 rounded-2xl border text-left font-semibold text-xs sm:text-sm transition-all flex items-center justify-between ${style}`}
                  >
                    <span>{opt}</span>
                    {isRoundRevealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {isRoundRevealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                  </button>
                );
              })}
            </div>

            {/* Christian Emoji Reactions Bar */}
            <div className={`pt-3 border-t flex flex-wrap items-center justify-between gap-2 ${
              darkMode ? 'border-white/10' : 'border-slate-200'
            }`}>
              <span className={`text-[11px] font-bold flex items-center gap-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <SmilePlus className="w-3.5 h-3.5" /> {language === 'tl' ? 'Magpadala ng Reaksyon:' : 'Send Reaction:'}
              </span>
              <div className="flex gap-1.5">
                {christianEmojis.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => sendReaction(emoji)}
                    className={`p-1.5 rounded-xl text-base active:scale-125 transition-transform ${
                      darkMode ? 'hover:bg-white/10' : 'hover:bg-slate-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            {isRoundRevealed && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
              >
                {currentQIndex + 1 < multiQuestions.length
                  ? (language === 'tl' ? 'Susunod na Tanong' : 'Next Live Question')
                  : (language === 'tl' ? 'Ipakita ang Podium ng Nagwagi' : 'Show Winner Podium')}
              </button>
            )}
          </div>

          {/* Live Leaderboard Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {sortedPlayers.map(p => (
              <div key={p.id} className={`p-3 rounded-2xl border text-center relative backdrop-blur-md ${
                darkMode ? 'bg-white/[0.04] border-white/10' : 'bg-white border-slate-200'
              }`}>
                {p.reaction && (
                  <span className="absolute -top-3 right-2 text-xl animate-bounce">
                    {p.reaction}
                  </span>
                )}
                <p className={`font-bold text-xs truncate ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{p.name}</p>
                <p className={`text-xs font-black ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{p.score} pts</p>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* PODIUM VIEW */}
      {stage === 'podium' && (
        <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-xl text-center space-y-6 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl">
            <Crown className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className={`text-2xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'tl' ? 'Resulta ng Multiplayer Match!' : 'Multiplayer Match Results!'}
            </h2>
            <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'tl'
                ? 'Purihin ang Panginoon para sa masaya at nakapagpapatibay na pagsasama sa Kasulatan.'
                : 'Praise God for a fun, uplifting fellowship in Scripture.'}
            </p>
          </div>

          {/* Podium List */}
          <div className="space-y-2 max-w-md mx-auto">
            {sortedPlayers.map((p, idx) => (
              <div
                key={p.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                  idx === 0
                    ? darkMode
                      ? 'bg-amber-500/25 border-amber-400 text-white font-bold ring-2 ring-amber-400/40 shadow-lg'
                      : 'bg-amber-100 border-amber-400 text-slate-900 font-bold ring-2 ring-amber-400/40 shadow-md'
                    : darkMode
                      ? 'bg-white/[0.04] border-white/10 text-slate-200'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    darkMode ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    #{idx + 1}
                  </span>
                  <span className="text-xl">{p.avatar}</span>
                  <span className="text-sm font-bold">{p.name}</span>
                </div>
                <span className={`font-black text-sm ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                  {p.score} pts
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStage('lobby')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
          >
            {language === 'tl' ? 'Maglaro Ulit ng Isa Pang Match' : 'Play Another Match'}
          </button>
        </div>
      )}

    </div>
  );
};
