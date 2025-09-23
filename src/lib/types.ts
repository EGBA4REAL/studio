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
export const AnswerLessonQuestionInputSchema = z.object({
  lessonContent: z
    .string()
    .describe('The HTML content of the lesson.'),
  userQuestion: z.string().describe("The user's question about the lesson."),
});
export type AnswerLessonQuestionInput = z.infer<
  typeof AnswerLessonQuestionInputSchema
>;

export const AnswerLessonQuestionOutputSchema = z.object({
  answer: z.string().describe('The generated answer to the user\'s question in HTML format.'),
});
export type AnswerLessonQuestionOutput = z.infer<
  typeof AnswerLessonQuestionOutputSchema
>;

// explain-incorrect-answer
export const ExplainIncorrectAnswerInputSchema = z.object({
  lessonContent: z.string().describe('The HTML content of the lesson.'),
  question: z.string().describe('The quiz question that was answered incorrectly.'),
  selectedAnswer: z.string().describe('The incorrect answer the user selected.'),
  correctAnswer: z.string().describe('The correct answer for the question.'),
});
export type ExplainIncorrectAnswerInput = z.infer<
  typeof ExplainIncorrectAnswerInputSchema
>;

export const ExplainIncorrectAnswerOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A clear explanation in HTML format about why the answer was incorrect, based on the lesson content.'),
});
export type ExplainIncorrectAnswerOutput = z.infer<
  typeof ExplainIncorrectAnswerOutputSchema
>;

// generate-lesson-from-title
export const GenerateLessonFromTitleInputSchema = z.object({
  topicTitle: z
    .string()
    .describe('The title of the topic for which to generate lesson content.'),
});
export type GenerateLessonFromTitleInput = z.infer<
  typeof GenerateLessonFromTitleInputSchema
>;

export const GenerateLessonFromTitleOutputSchema = z.object({
  lessonContent: z.string().describe('The generated lesson content in HTML format.'),
});
export type GenerateLessonFromTitleOutput = z.infer<
  typeof GenerateLessonFromTitleOutputSchema
>;

// generate-quiz-from-lesson
export const GenerateQuizFromLessonInputSchema = z.object({
  lessonContent: z
    .string()
    .describe('The text or HTML content of the lesson from which to generate the quiz.'),
});
export type GenerateQuizFromLessonInput = z.infer<
  typeof GenerateQuizFromLessonInputSchema
>;

export const GenerateQuizFromLessonOutputSchema = z.object({
  quiz: z.string().describe('The generated quiz in JSON format.'),
});
export type GenerateQuizFromLessonOutput = z.infer<
  typeof GenerateQuizFromLessonOutputSchema
>;

// generate-study-plan
export const GenerateStudyPlanInputSchema = z.object({
  lessonContent: z
    .string()
    .describe('The HTML content of the lesson.'),
  questions: z.array(z.object({
    question: z.string(),
    selectedAnswer: z.string(),
    correctAnswer: z.string(),
    isCorrect: z.boolean(),
  })).describe('The list of questions, user answers, and results.'),
   score: z.number().describe('The user\'s final score.'),
   totalQuestions: z.number().describe('The total number of questions in the quiz.'),
});
export type GenerateStudyPlanInput = z.infer<
  typeof GenerateStudyPlanInputSchema
>;

export const GenerateStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('The personalized study plan in HTML format.'),
});
export type GenerateStudyPlanOutput = z.infer<
  typeof GenerateStudyPlanOutputSchema
>;