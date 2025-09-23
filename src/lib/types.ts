
import { z } from 'zod';
import type {
  AnswerLessonQuestionInputSchema,
  AnswerLessonQuestionOutputSchema,
  ExplainIncorrectAnswerInputSchema,
  ExplainIncorrectAnswerOutputSchema,
  GenerateLessonFromTitleInputSchema,
  GenerateLessonFromTitleOutputSchema,
  GenerateQuizFromLessonInputSchema,
  GenerateQuizFromLessonOutputSchema,
  GenerateStudyPlanInputSchema,
  GenerateStudyPlanOutputSchema,
} from './schemas';

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
export type AnswerLessonQuestionInput = z.infer<typeof AnswerLessonQuestionInputSchema>;
export type AnswerLessonQuestionOutput = z.infer<typeof AnswerLessonQuestionOutputSchema>;


// explain-incorrect-answer
export type ExplainIncorrectAnswerInput = z.infer<typeof ExplainIncorrectAnswerInputSchema>;
export type ExplainIncorrectAnswerOutput = z.infer<typeof ExplainIncorrectAnswerOutputSchema>;


// generate-lesson-from-title
export type GenerateLessonFromTitleInput = z.infer<typeof GenerateLessonFromTitleInputSchema>;
export type GenerateLessonFromTitleOutput = z.infer<typeof GenerateLessonFromTitleOutputSchema>;


// generate-quiz-from-lesson
export type GenerateQuizFromLessonInput = z.infer<typeof GenerateQuizFromLessonInputSchema>;
export type GenerateQuizFromLessonOutput = z.infer<typeof GenerateQuizFromLessonOutputSchema>;


// generate-study-plan
export type GenerateStudyPlanInput = z.infer<typeof GenerateStudyPlanInputSchema>;
export type GenerateStudyPlanOutput = z.infer<typeof GenerateStudyPlanOutputSchema>;
