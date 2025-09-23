

import {z} from 'genkit';

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


// AI Flow Types

// answer-lesson-question
export type AnswerLessonQuestionInput = {
  lessonContent: string;
  userQuestion: string;
};

export type AnswerLessonQuestionOutput = {
  answer: string;
};

// explain-incorrect-answer
export type ExplainIncorrectAnswerInput = {
  lessonContent: string;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
};

export type ExplainIncorrectAnswerOutput = {
  explanation: string;
};

// generate-lesson-from-title
export type GenerateLessonFromTitleInput = {
  topicTitle: string;
};

export type GenerateLessonFromTitleOutput = {
  lessonContent: string;
};

// generate-quiz-from-lesson
export type GenerateQuizFromLessonInput = {
  lessonContent: string;
};

export type GenerateQuizFromLessonOutput = {
  quiz: Quiz;
};

// generate-study-plan
export type GenerateStudyPlanInput = {
  lessonContent: string;
  questions: {
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
  score: number;
  totalQuestions: number;
};

export type GenerateStudyPlanOutput = {
  studyPlan: string;
};
