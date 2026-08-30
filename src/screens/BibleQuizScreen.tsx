import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  BookOpen, 
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Question, Difficulty, QuestionCategory } from '../types';
import { sound } from '../utils/audio';
import { localizeQuestion, localizeQuestions, getCategoryLabel } from '../utils/localize';

export const BibleQuizScreen: React.FC = () => {
  const { 
    questions, 
    addXpAndCoins, 
    updateUserStats, 
    checkAndAwardBadges, 
    setActiveScreen,
    celebrate,
    language,
    darkMode,
    t
  } = useGame();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'recap'>('lobby');
  
  // Active quiz state
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  
  const timerRef = useRef<number | null>(null);

  const initialTimeForDiff: Record<Difficulty, number> = {
    easy: 25,
    medium: 18,
    hard: 12
  };

  const startQuiz = () => {
    sound.playClick();
    let filtered = [...questions];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    if (selectedDifficulty) {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }
    // If not enough questions with strict filter, fallback to category
    if (filtered.length < 3) {
      filtered = questions.filter(q => selectedCategory === 'all' || q.category === selectedCategory);
    }
    // Shuffle and pick 5
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 5);
    if (shuffled.length === 0) {
      shuffled.push(questions[0]);
    }

    setQuizQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setTimeLeft(initialTimeForDiff[selectedDifficulty]);
    setGameState('playing');
  };

  const handleNextQuestion = useCallback(() => {
    sound.playClick();
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setTimeLeft(initialTimeForDiff[selectedDifficulty]);
    } else {
      // Quiz Finished
      setGameState('recap');
      const isPerfect = score + (selectedOption === quizQuestions[currentIndex]?.correctAnswer ? 1 : 0) === quizQuestions.length;
      
      const earnedXp = score * 25 + maxStreak * 10;
      const earnedCoins = score * 15;
      addXpAndCoins(earnedXp, earnedCoins, 'Bible Quiz');
      
      updateUserStats({
        totalQuizzesPlayed: 1,
        totalCorrectAnswers: score,
        perfectQuizzes: isPerfect ? 1 : 0
      });
      
      checkAndAwardBadges();
      celebrate();
    }
  }, [currentIndex, quizQuestions, score, selectedOption, selectedDifficulty, maxStreak, addXpAndCoins, updateUserStats, checkAndAwardBadges, celebrate]);

  const handleOptionSelect = useCallback((index: number) => {
    if (isAnswerRevealed) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(index);
    setIsAnswerRevealed(true);

    const rawQ = quizQuestions[currentIndex];
    const isCorrect = index === rawQ.correctAnswer;

    if (isCorrect) {
      sound.playCorrect();
      setScore(prev => prev + 1);
      setStreak(prev => {
        const nextStreak = prev + 1;
        if (nextStreak > maxStreak) setMaxStreak(nextStreak);
        return nextStreak;
      });
    } else {
      sound.playIncorrect();
      setStreak(0);
    }
  }, [isAnswerRevealed, quizQuestions, currentIndex, maxStreak]);

  // Timer loop
  useEffect(() => {
    if (gameState === 'playing' && !isAnswerRevealed) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleOptionSelect(-1); // time out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, isAnswerRevealed, currentIndex, handleOptionSelect]);

  const categories: { id: string; labelEn: string; labelTl: string }[] = [
    { id: 'all', labelEn: 'All Categories', labelTl: 'Lahat ng Kategorya' },
    { id: 'bible_general', labelEn: 'Bible General', labelTl: 'Pangkalahatang Bibliya' },
    { id: 'gospels', labelEn: 'Gospels & Jesus', labelTl: 'Mga Ebanghelyo at Hesus' },
    { id: 'old_testament', labelEn: 'Old Testament', labelTl: 'Lumang Tipan' },
    { id: 'new_testament', labelEn: 'New Testament', labelTl: 'Bagong Tipan' },
    { id: 'prophecy', labelEn: 'Prophecy & Daniel/Rev', labelTl: 'Propesiya (Daniel at Pahayag)' },
    { id: 'adventist_beliefs', labelEn: '28 Beliefs', labelTl: '28 Paniniwala' },
    { id: 'sabbath', labelEn: 'Sabbath Truth', labelTl: 'Katotohanan ng Sabbath' },
    { id: 'health_newstart', labelEn: 'NEWSTART Health', labelTl: 'Kalusugan at NEWSTART' },
    { id: 'church_history', labelEn: 'Church History', labelTl: 'Kasaysayan ng Simbahan' },
    { id: 'pathfinder', labelEn: 'Pathfinder Club', labelTl: 'Pathfinder Club' }
  ];

  const currentQ = quizQuestions[currentIndex] ? localizeQuestion(quizQuestions[currentIndex], language) : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playClick();
            setActiveScreen('dashboard');
          }}
          className={`px-4 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm backdrop-blur-md ${
            darkMode 
              ? 'bg-white/10 hover:bg-white/20 border-white/15 text-slate-200' 
              : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> {language === 'tl' ? 'Bumalik sa Dashboard' : 'Back to Dashboard'}
        </button>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-md ${
            darkMode 
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
              : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}>
            {language === 'tl' ? 'Pagsusulit sa Bibliya' : 'Bible Quiz Mode'}
          </span>
        </div>
      </div>

      {/* LOBBY VIEW (Frosted Glass Panel) */}
      {gameState === 'lobby' && (
        <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="text-center max-w-lg mx-auto space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/25 font-bold">
              <BookOpen className="w-8 h-8 text-slate-950" />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {language === 'tl' ? 'Pagsusulit sa Bibliya at Pananampalataya' : 'Bible & Adventist Quiz Challenge'}
            </h1>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'tl'
                ? 'Subukin ang iyong kaalaman sa Kasulatan, 28 pangunahing paniniwala, Sabbath, at pamumuhay Kristiyano.'
                : 'Test your knowledge of Scripture, 28 fundamental beliefs, Sabbath principles, and Christian living with timed questions.'}
            </p>
          </div>

          {/* Category Selector */}
          <div className="space-y-2.5">
            <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <Filter className={`w-3.5 h-3.5 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} /> {language === 'tl' ? 'Pumili ng Paksa / Kategorya' : 'Select Topic Category'}
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/25'
                      : darkMode
                        ? 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15 hover:border-white/20'
                        : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {language === 'tl' ? cat.labelTl : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="space-y-2.5">
            <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'tl' ? 'Antas ng Hirap at Oras' : 'Select Difficulty & Timer'}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map(diff => (
                <button
                  key={diff}
                  onClick={() => {
                    sound.playClick();
                    setSelectedDifficulty(diff);
                  }}
                  className={`p-3.5 rounded-2xl text-center border transition-all ${
                    selectedDifficulty === diff
                      ? darkMode
                        ? 'bg-amber-500/20 border-amber-400/80 text-amber-300 ring-2 ring-amber-400/30 backdrop-blur-md'
                        : 'bg-amber-100 border-amber-400 text-amber-900 ring-2 ring-amber-400/30'
                      : darkMode
                        ? 'bg-slate-900/50 border-white/10 text-slate-400 hover:bg-slate-900/70 hover:border-white/20'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <p className={`font-bold text-sm capitalize ${
                    selectedDifficulty === diff 
                      ? (darkMode ? 'text-amber-300' : 'text-amber-900') 
                      : (darkMode ? 'text-white' : 'text-slate-900')
                  }`}>
                    {diff === 'easy' ? (language === 'tl' ? 'Madali' : 'Easy') : diff === 'medium' ? (language === 'tl' ? 'Katamtaman' : 'Medium') : (language === 'tl' ? 'Mahirap' : 'Hard')}
                  </p>
                  <p className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {initialTimeForDiff[diff]}s {language === 'tl' ? 'bawat tanong' : 'per question'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <button
            id="btn-start-quiz"
            onClick={startQuiz}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            {language === 'tl' ? 'Simulan ang 5-Tanong na Laro' : 'Start 5-Question Round'}
          </button>
        </div>
      )}

      {/* PLAYING VIEW */}
      {gameState === 'playing' && currentQ && (
        <div className="space-y-4">
          
          {/* Quiz Header Bar */}
          <div className={`backdrop-blur-xl rounded-2xl p-4 border shadow-lg flex items-center justify-between ${
            darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${
                darkMode ? 'bg-white/10 text-white border-white/10' : 'bg-slate-100 text-slate-800 border-slate-200'
              }`}>
                {language === 'tl' ? `Tanong ${currentIndex + 1} sa ${quizQuestions.length}` : `Question ${currentIndex + 1} of ${quizQuestions.length}`}
              </span>
              {streak > 1 && (
                <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-xl border ${
                  darkMode ? 'text-orange-300 bg-orange-500/20 border-orange-500/30' : 'text-orange-800 bg-orange-100 border-orange-300'
                }`}>
                  <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" /> {streak}x Streak!
                </span>
              )}
            </div>

            {/* Countdown Timer */}
            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              timeLeft <= 5 
                ? (darkMode ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse')
                : (darkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-800 border-amber-300')
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>
          </div>

          {/* Question Card */}
          <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 ${
            darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <div className="space-y-1.5">
              <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                {getCategoryLabel(currentQ.category, language)}
              </span>
              <h2 className={`text-xl sm:text-2xl font-bold leading-relaxed ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {currentQ.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswer;
                
                let btnStyle = darkMode
                  ? 'bg-slate-900/50 hover:bg-slate-900/80 border-white/10 hover:border-amber-400/40 text-slate-200'
                  : 'bg-slate-50 hover:bg-amber-50/50 border-slate-300 hover:border-amber-400 text-slate-800 shadow-xs';
                
                if (isAnswerRevealed) {
                  if (isCorrect) {
                    btnStyle = darkMode
                      ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold ring-2 ring-emerald-400/30 shadow-lg'
                      : 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-400/30 shadow-md';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = darkMode
                      ? 'bg-rose-950/80 border-rose-400 text-rose-200 font-bold'
                      : 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                  } else {
                    btnStyle = darkMode
                      ? 'opacity-40 border-white/5 bg-slate-900/30 text-slate-400'
                      : 'opacity-40 border-slate-200 bg-slate-100 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerRevealed}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 backdrop-blur-md ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold border ${
                        darkMode ? 'bg-white/10 text-white border-white/10' : 'bg-slate-200 text-slate-800 border-slate-300'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm font-medium">{option}</span>
                    </div>

                    {isAnswerRevealed && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    )}
                    {isAnswerRevealed && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Box */}
            {isAnswerRevealed && (
              <div className={`p-5 rounded-2xl border backdrop-blur-md space-y-2 animate-in fade-in duration-200 ${
                darkMode ? 'bg-amber-500/15 border-amber-500/30' : 'bg-amber-50 border-amber-300'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-bold ${
                  darkMode ? 'text-amber-300' : 'text-amber-800'
                }`}>
                  <BookOpen className={`w-4 h-4 ${darkMode ? 'text-amber-400' : 'text-amber-700'}`} />
                  <span>{language === 'tl' ? 'Paliwanag at Talata sa Kasulatan:' : 'Scripture Insight & Reference:'}</span>
                </div>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {currentQ.explanation}
                </p>
                <div className={`text-xs font-bold ${darkMode ? 'text-amber-400' : 'text-amber-800'}`}>
                  📖 {currentQ.bibleReference}
                </div>
              </div>
            )}

            {/* Next Button */}
            {isAnswerRevealed && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                {currentIndex + 1 < quizQuestions.length ? (
                  <>{language === 'tl' ? 'Susunod na Tanong' : 'Next Question'} <ChevronRight className="w-4 h-4" /></>
                ) : (
                  <>{language === 'tl' ? 'Tingnan ang Resulta' : 'View Final Results'} <Award className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* RECAP VIEW (Frosted Glass Victory Box) */}
      {gameState === 'recap' && (
        <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-2xl text-center space-y-6 ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/25 font-bold">
            <Award className="w-10 h-10 text-slate-950" />
          </div>

          <div className="space-y-1">
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'tl' ? 'Tapos na ang Pagsusulit!' : 'Quiz Round Completed!'}
            </h2>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'tl' ? 'Magaling! Patuloy na palalimin ang iyong kaalaman sa Salita ng Diyos!' : "Great job deepening your understanding of God's Word!"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3.5 max-w-md mx-auto">
            <div className={`p-3.5 rounded-2xl border backdrop-blur-md ${
              darkMode ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{language === 'tl' ? 'Iskor' : 'Score'}</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                {score} / {quizQuestions.length}
              </p>
            </div>
            <div className={`p-3.5 rounded-2xl border backdrop-blur-md ${
              darkMode ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>XP Earned</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                +{score * 25 + maxStreak * 10}
              </p>
            </div>
            <div className={`p-3.5 rounded-2xl border backdrop-blur-md ${
              darkMode ? 'bg-slate-900/60 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{language === 'tl' ? 'Pinakamataas na Streak' : 'Max Streak'}</p>
              <p className={`text-xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                {maxStreak}x
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={startQuiz}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-slate-950" /> {language === 'tl' ? 'Maglaro Muli' : 'Play Another Round'}
            </button>
            <button
              onClick={() => setActiveScreen('dashboard')}
              className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-semibold text-sm border backdrop-blur-md ${
                darkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/15' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              {language === 'tl' ? 'Bumalik sa Dashboard' : 'Back to Dashboard'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
