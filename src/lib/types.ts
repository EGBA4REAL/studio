
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  subscription?: {
    status: 'free' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    // Add more subscription details here later, like expiry date
  };
  progress?: {
    completedTopics: string[];
  };
}

export interface Level {
  id: string;
  name: string;
  description: string;
}

export interface Class {
  id: string;
  name: string;
  levelId: string;
}

export interface Subject {
  id: string;
  name:string;
  classId: string;
  icon: string;
}

export interface Topic {
  id: string;
  title: string;
  week: number;
  subjectId: string;
  lessonContent: string;
  studyMaterials: string[]; // Array of URLs or references
  completed?: boolean;
}

export interface QuizQuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  question: string;
  options: QuizQuestionOption[];
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}


// AI Flow Types from `src/ai/flows/answer-lesson-question.ts`
export type {
  AnswerLessonQuestionInput,
  AnswerLessonQuestionOutput,
} from '@/ai/flows/answer-lesson-question';

// AI Flow Types from `src/ai/flows/explain-incorrect-answer.ts`
export type {
  ExplainIncorrectAnswerInput,
  ExplainIncorrectAnswerOutput,
} from '@/ai/flows/explain-incorrect-answer';

// AI Flow Types from `src/ai/flows/generate-lesson-from-title.ts`
export type {
  GenerateLessonFromTitleInput,
  GenerateLessonFromTitleOutput,
} from '@/ai/flows/generate-lesson-from-title';

// AI Flow Types from `src/ai/flows/generate-quiz-from-lesson.ts`
export type {
  GenerateQuizFromLessonInput,
  GenerateQuizFromLessonOutput,
} from '@/ai/flows/generate-quiz-from-lesson';

// AI Flow Types from `src/ai/flows/generate-study-plan.ts`
export type {
  GenerateStudyPlanInput,
  GenerateStudyPlanOutput,
} from '@/ai/flows/generate-study-plan';
