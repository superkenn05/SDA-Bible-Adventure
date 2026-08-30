import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  Plus, 
  Trash2, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  Upload,
  Filter
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Question, QuestionCategory, Difficulty } from '../types';
import { sound } from '../utils/audio';

export const AdminScreen: React.FC = () => {
  const { questions, addCustomQuestion, deleteQuestion, setActiveScreen, darkMode } = useGame();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [qText, setQText] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [bibleRef, setBibleRef] = useState('');
  const [category, setCategory] = useState<QuestionCategory>('bible_general');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.bibleReference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'all' || q.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playCorrect();

    const newQ: Question = {
      id: `custom_${Date.now()}`,
      category,
      difficulty,
      question: qText,
      options: [opt0, opt1, opt2, opt3],
      correctAnswer: correctIdx,
      explanation,
      bibleReference: bibleRef
    };

    addCustomQuestion(newQ);
    setShowAddForm(false);
    
    // Reset Form
    setQText('');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setExplanation('');
    setBibleRef('');
  };

  const handleExportJson = () => {
    sound.playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "sda_bible_questions.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in">
      
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
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportJson}
            className={`px-3.5 py-2 rounded-2xl backdrop-blur-md border text-xs font-semibold flex items-center gap-2 transition-all shadow-xs ${
              darkMode 
                ? 'bg-white/[0.08] border-white/15 text-slate-200 hover:bg-white/15' 
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Download className="w-3.5 h-3.5" /> Export JSON
          </button>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Question
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-xl space-y-2 ${
        darkMode 
          ? 'bg-gradient-to-r from-slate-950/80 via-stone-950/80 to-slate-900/80 border-white/10 text-white' 
          : 'bg-gradient-to-r from-amber-100 via-orange-50 to-amber-50 border-amber-200 text-slate-900 shadow-md'
      }`}>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold uppercase tracking-wider border ${
          darkMode 
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
            : 'bg-amber-200/80 text-amber-900 border-amber-300'
        }`}>
          <Settings className="w-3.5 h-3.5" />
          <span>Church Educator & Youth Leader Portal</span>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Admin Question Management
        </h1>
        <p className={`text-xs sm:text-sm max-w-xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          Create, edit, and organize custom questions for your local church Sabbath School class, AY program, or Pathfinder club camporee!
        </p>
      </div>

      {/* ADD QUESTION FORM */}
      {showAddForm && (
        <form onSubmit={handleAddQuestion} className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-xl space-y-4 animate-in fade-in ${
          darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Add New Scripture Question
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as QuestionCategory)}
                className={`w-full px-3 py-2.5 rounded-2xl border text-xs font-semibold focus:outline-hidden focus:border-amber-400 ${
                  darkMode 
                    ? 'bg-white/[0.05] border-white/15 text-white' 
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="bible_general" className="bg-slate-900 text-white">Bible General</option>
                <option value="gospels" className="bg-slate-900 text-white">Gospels & Jesus</option>
                <option value="old_testament" className="bg-slate-900 text-white">Old Testament</option>
                <option value="new_testament" className="bg-slate-900 text-white">New Testament</option>
                <option value="prophecy" className="bg-slate-900 text-white">Prophecy (Daniel/Rev)</option>
                <option value="adventist_beliefs" className="bg-slate-900 text-white">28 Beliefs</option>
                <option value="sabbath" className="bg-slate-900 text-white">Sabbath</option>
                <option value="health_newstart" className="bg-slate-900 text-white">Health (NEWSTART)</option>
                <option value="church_history" className="bg-slate-900 text-white">Church History</option>
                <option value="pathfinder" className="bg-slate-900 text-white">Pathfinder</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Difficulty</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as Difficulty)}
                className={`w-full px-3 py-2.5 rounded-2xl border text-xs font-semibold focus:outline-hidden focus:border-amber-400 ${
                  darkMode 
                    ? 'bg-white/[0.05] border-white/15 text-white' 
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="easy" className="bg-slate-900 text-white">Easy (25s)</option>
                <option value="medium" className="bg-slate-900 text-white">Medium (18s)</option>
                <option value="hard" className="bg-slate-900 text-white">Hard (12s)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Question Text</label>
            <input
              type="text"
              placeholder="e.g. Which prophet was shown the valley of dry bones?"
              value={qText}
              onChange={e => setQText(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-2xl border text-xs font-medium focus:outline-hidden focus:border-amber-400 ${
                darkMode 
                  ? 'bg-white/[0.05] border-white/15 text-white placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Option A</label>
              <input
                type="text"
                value={opt0}
                onChange={e => setOpt0(e.target.value)}
                className={`w-full px-3 py-2 rounded-2xl border text-xs focus:outline-hidden focus:border-amber-400 ${
                  darkMode ? 'bg-white/[0.05] border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
                required
              />
            </div>
            <div className="space-y-1">
              <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Option B</label>
              <input
                type="text"
                value={opt1}
                onChange={e => setOpt1(e.target.value)}
                className={`w-full px-3 py-2 rounded-2xl border text-xs focus:outline-hidden focus:border-amber-400 ${
                  darkMode ? 'bg-white/[0.05] border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
                required
              />
            </div>
            <div className="space-y-1">
              <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Option C</label>
              <input
                type="text"
                value={opt2}
                onChange={e => setOpt2(e.target.value)}
                className={`w-full px-3 py-2 rounded-2xl border text-xs focus:outline-hidden focus:border-amber-400 ${
                  darkMode ? 'bg-white/[0.05] border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
                required
              />
            </div>
            <div className="space-y-1">
              <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Option D</label>
              <input
                type="text"
                value={opt3}
                onChange={e => setOpt3(e.target.value)}
                className={`w-full px-3 py-2 rounded-2xl border text-xs focus:outline-hidden focus:border-amber-400 ${
                  darkMode ? 'bg-white/[0.05] border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Correct Answer</label>
            <select
              value={correctIdx}
              onChange={e => setCorrectIdx(Number(e.target.value))}
              className={`w-full px-3 py-2 rounded-2xl border text-xs font-bold focus:outline-hidden focus:border-amber-400 ${
                darkMode ? 'bg-white/[0.05] border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            >
              <option value={0} className="bg-slate-900 text-white">Option A</option>
              <option value={1} className="bg-slate-900 text-white">Option B</option>
              <option value={2} className="bg-slate-900 text-white">Option C</option>
              <option value={3} className="bg-slate-900 text-white">Option D</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Bible Reference</label>
              <input
                type="text"
                placeholder="e.g. Ezekiel 37:1-14"
                value={bibleRef}
                onChange={e => setBibleRef(e.target.value)}
                className={`w-full px-3 py-2 rounded-2xl border text-xs focus:outline-hidden focus:border-amber-400 ${
                  darkMode ? 'bg-white/[0.05] border-white/15 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
                required
              />
            </div>
            <div className="space-y-1">
              <label className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Explanation Note</label>
              <input
                type="text"
                placeholder="e.g. God showed Ezekiel the dry bones coming to life."
                value={explanation}
                onChange={e => setExplanation(e.target.value)}
                className={`w-full px-3 py-2 rounded-2xl border text-xs focus:outline-hidden focus:border-amber-400 ${
                  darkMode ? 'bg-white/[0.05] border-white/15 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
                required
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all"
            >
              Save Question to Database
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className={`px-5 py-3 rounded-2xl border font-bold text-xs transition-all ${
                darkMode ? 'bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 border-white/15' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search questions or Bible verses..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-2xl backdrop-blur-xl border text-xs focus:outline-hidden focus:border-amber-400 ${
              darkMode 
                ? 'bg-white/[0.06] border-white/10 text-white placeholder-slate-400' 
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
        </div>

        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className={`px-4 py-3 rounded-2xl backdrop-blur-xl border text-xs font-bold focus:outline-hidden focus:border-amber-400 ${
            darkMode 
              ? 'bg-white/[0.06] border-white/10 text-slate-200' 
              : 'bg-white border-slate-300 text-slate-800 shadow-xs'
          }`}
        >
          <option value="all" className="bg-slate-900 text-white">All Categories</option>
          <option value="bible_general" className="bg-slate-900 text-white">Bible General</option>
          <option value="gospels" className="bg-slate-900 text-white">Gospels</option>
          <option value="old_testament" className="bg-slate-900 text-white">Old Testament</option>
          <option value="new_testament" className="bg-slate-900 text-white">New Testament</option>
          <option value="prophecy" className="bg-slate-900 text-white">Prophecy</option>
          <option value="adventist_beliefs" className="bg-slate-900 text-white">28 Beliefs</option>
          <option value="sabbath" className="bg-slate-900 text-white">Sabbath</option>
          <option value="health_newstart" className="bg-slate-900 text-white">Health</option>
          <option value="church_history" className="bg-slate-900 text-white">Church History</option>
          <option value="pathfinder" className="bg-slate-900 text-white">Pathfinder</option>
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        <div className={`flex items-center justify-between text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <span>Database Pool ({filteredQuestions.length} Questions)</span>
        </div>

        {filteredQuestions.map(q => (
          <div
            key={q.id}
            className={`p-5 rounded-3xl backdrop-blur-xl border shadow-xl space-y-3 ${
              darkMode ? 'bg-white/[0.06] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    darkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    {q.category}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    darkMode ? 'bg-white/[0.08] text-slate-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
                <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {q.question}
                </h4>
              </div>

              {q.id.startsWith('custom_') && (
                <button
                  onClick={() => deleteQuestion(q.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/20 transition-all border border-transparent hover:border-rose-400/30"
                  title="Delete Custom Question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {q.options.map((opt, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border ${
                    idx === q.correctAnswer
                      ? darkMode
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                        : 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold'
                      : darkMode
                        ? 'bg-white/[0.03] border-white/10 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </div>
              ))}
            </div>

            <p className={`text-xs font-bold pt-1 ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              📖 {q.bibleReference}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};
