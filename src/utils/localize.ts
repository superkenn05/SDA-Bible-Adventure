import { 
  Question, 
  CharacterClueItem, 
  VerseChallengeItem, 
  PathfinderHonor, 
  PathfinderRank, 
  ChurchHistoryEvent, 
  HealthPrinciple, 
  WordSearchPuzzle, 
  MemoryCardPair, 
  Badge, 
  DailyChallenge,
  LeaderboardEntry,
  QuestionCategory
} from '../types';
import { BeliefDetail } from '../data/adventistBeliefs';
import { SabbathActivityItem, PreparationStep } from '../data/sabbathData';
import { Language } from './translations';

export const categoryLabels: Record<QuestionCategory, { en: string; tl: string }> = {
  bible_general: { en: 'Bible General', tl: 'Pangkalahatang Bibliya' },
  old_testament: { en: 'Old Testament', tl: 'Lumang Tipan' },
  new_testament: { en: 'New Testament', tl: 'Bagong Tipan' },
  gospels: { en: 'The Gospels', tl: 'Mga Ebanghelyo' },
  prophecy: { en: 'Prophecy & Daniel/Revelation', tl: 'Propesiya (Daniel at Pahayag)' },
  adventist_beliefs: { en: '28 Fundamental Beliefs', tl: '28 Pangunahing Paniniwala' },
  sabbath: { en: 'Sabbath Truth', tl: 'Katotohanan ng Sabbath' },
  health_newstart: { en: 'Health & NEWSTART', tl: 'Kalusugan at NEWSTART' },
  church_history: { en: 'Adventist Church History', tl: 'Kasaysayan ng Simbahang Adventista' },
  pathfinder: { en: 'Pathfinder & AY Honors', tl: 'Pathfinder at AY Honors' }
};

export function getCategoryLabel(cat: string, lang: Language): string {
  const c = cat as QuestionCategory;
  if (categoryLabels[c]) {
    return lang === 'tl' ? categoryLabels[c].tl : categoryLabels[c].en;
  }
  return cat.replace(/_/g, ' ');
}

export function localizeQuestion(q: Question, lang: Language): Question {
  if (lang !== 'tl') return q;
  return {
    ...q,
    question: q.questionTl || q.question,
    options: q.optionsTl && q.optionsTl.length === q.options.length ? q.optionsTl : q.options,
    explanation: q.explanationTl || q.explanation,
    tags: q.tagsTl || q.tags
  };
}

export function localizeQuestions(questions: Question[], lang: Language): Question[] {
  if (lang !== 'tl') return questions;
  return questions.map(q => localizeQuestion(q, lang));
}

export function localizeBelief(b: BeliefDetail, lang: Language): BeliefDetail {
  if (lang !== 'tl') return b;
  return {
    ...b,
    title: b.titleTl || b.title,
    summary: b.summaryTl || b.summary,
    categoryTl: b.categoryTl
  };
}

export function localizeCharacter(c: CharacterClueItem, lang: Language): CharacterClueItem {
  if (lang !== 'tl') return c;
  return {
    ...c,
    name: c.nameTl || c.name,
    title: c.titleTl || c.title,
    clues: c.cluesTl && c.cluesTl.length === c.clues.length ? c.cluesTl : c.clues,
    options: c.optionsTl && c.optionsTl.length === c.options.length ? c.optionsTl : c.options,
    correctAnswer: c.correctAnswerTl || c.correctAnswer,
    description: c.descriptionTl || c.description,
    eraTl: c.eraTl
  };
}

export function localizeVerseChallenge(v: VerseChallengeItem, lang: Language): VerseChallengeItem {
  if (lang !== 'tl') return v;
  return {
    ...v,
    fullVerse: v.fullVerseTl || v.fullVerse,
    scrambledWords: v.scrambledWordsTl || v.scrambledWords,
    blankVerse: v.blankVerseTl || v.blankVerse,
    missingWordOptions: v.missingWordOptionsTl || v.missingWordOptions,
    correctWord: v.correctWordTl || v.correctWord,
    theme: v.themeTl || v.theme
  };
}

export function localizeHonor(h: PathfinderHonor, lang: Language): PathfinderHonor {
  if (lang !== 'tl') return h;
  return {
    ...h,
    name: h.nameTl || h.name,
    description: h.descriptionTl || h.description,
    requirements: h.requirementsTl || h.requirements,
    categoryTl: h.categoryTl,
    quiz: localizeQuestions(h.quiz, lang)
  };
}

export function localizeRank(r: PathfinderRank, lang: Language): PathfinderRank {
  if (lang !== 'tl') return r;
  return {
    ...r,
    name: r.nameTl || r.name,
    description: r.descriptionTl || r.description,
    ageGroup: r.ageGroupTl || r.ageGroup
  };
}

export function localizeHistoryEvent(e: ChurchHistoryEvent, lang: Language): ChurchHistoryEvent {
  if (lang !== 'tl') return e;
  return {
    ...e,
    title: e.titleTl || e.title,
    location: e.locationTl || e.location,
    description: e.descriptionTl || e.description,
    significance: e.significanceTl || e.significance,
    quizQuestion: e.quizQuestion ? localizeQuestion(e.quizQuestion, lang) : undefined
  };
}

export function localizeHealthPrinciple(p: HealthPrinciple, lang: Language): HealthPrinciple {
  if (lang !== 'tl') return p;
  return {
    ...p,
    name: p.nameTl || p.name,
    tagline: p.taglineTl || p.tagline,
    description: p.descriptionTl || p.description,
    dailyGoal: p.dailyGoalTl || p.dailyGoal,
    practicalTips: p.practicalTipsTl || p.practicalTips,
    questions: localizeQuestions(p.questions, lang)
  };
}

export const localizePrinciple = localizeHealthPrinciple;

export function localizeBadge(b: Badge, lang: Language): Badge {
  if (lang !== 'tl') return b;
  return {
    ...b,
    name: b.nameTl || b.name,
    description: b.descriptionTl || b.description
  };
}

export function localizeDailyChallenge(d: DailyChallenge, lang: Language): DailyChallenge {
  if (lang !== 'tl') return d;
  return {
    ...d,
    title: d.titleTl || d.title,
    description: d.descriptionTl || d.description
  };
}

export function localizeLeaderboardEntry(l: LeaderboardEntry, lang: Language): LeaderboardEntry {
  if (lang !== 'tl') return l;
  return {
    ...l,
    name: l.nameTl || l.name,
    title: l.titleTl || l.title
  };
}

export function localizeWordSearch(ws: WordSearchPuzzle, lang: Language): WordSearchPuzzle {
  if (lang !== 'tl') return ws;
  return {
    ...ws,
    title: ws.titleTl || ws.title,
    category: ws.categoryTl || ws.category,
    clues: ws.cluesTl || ws.clues
  };
}

export function localizeSabbathActivity(a: SabbathActivityItem, lang: Language): SabbathActivityItem {
  if (lang !== 'tl') return a;
  return {
    ...a,
    activity: a.activityTl || a.activity,
    explanation: a.explanationTl || a.explanation
  };
}

export function localizePreparationStep(p: PreparationStep, lang: Language): PreparationStep {
  if (lang !== 'tl') return p;
  return {
    ...p,
    step: p.stepTl || p.step,
    tip: p.tipTl || p.tip,
    day: (p.dayTl as any) || p.day
  };
}
