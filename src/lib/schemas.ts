
'use server';

import { z } from 'zod';

// answer-lesson-question
export const AnswerLessonQuestionInputSchema = z.object({
  lessonContent: z.string().describe('The HTML content of the lesson.'),
  userQuestion: z.string().describe("The user's question about the lesson."),
});

export const AnswerLessonQuestionOutputSchema = z.object({
  answer: z
    .string()
    .describe("The generated answer to the user's question in HTML format."),
});

// explain-incorrect-answer
export const ExplainIncorrectAnswerInputSchema = z.object({
  lessonContent: z.string().describe('The HTML content of the lesson.'),
  question: z
    .string()
    .describe('The quiz question that was answered incorrectly.'),
  selectedAnswer: z
    .string()
    .describe('The incorrect answer the user selected.'),
  correctAnswer: z.string().describe('The correct answer for the question.'),
});

export const ExplainIncorrectAnswerOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A clear explanation in HTML format about why the answer was incorrect, based on the lesson content.'
    ),
});

// generate-lesson-from-title
export const GenerateLessonFromTitleInputSchema = z.object({
  topicTitle: z
    .string()
    .describe('The title of the topic for which to generate lesson content.'),
});

export const GenerateLessonFromTitleOutputSchema = z.object({
  lessonContent: z
    .string()
    .describe('The generated lesson content in HTML format.'),
});

// generate-quiz-from-lesson
export const GenerateQuizFromLessonInputSchema = z.object({
  lessonContent: z
    .string()
    .describe(
      'The text or HTML content of the lesson from which to generate the quiz.'
    ),
});

export const QuizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(
    z.object({
      text: z.string(),
      isCorrect: z.boolean(),
    })
  ),
});

export const GenerateQuizFromLessonOutputSchema = z.object({
  quiz: z.object({
    questions: z.array(QuizQuestionSchema),
  }),
});

// generate-study-plan
export const GenerateStudyPlanInputSchema = z.object({
  lessonContent: z.string().describe('The HTML content of the lesson.'),
  questions: z
    .array(
      z.object({
        question: z.string(),
        selectedAnswer: z.string(),
        correctAnswer: z.string(),
        isCorrect: z.boolean(),
      })
    )
    .describe('The list of questions, user answers, and results.'),
  score: z.number().describe("The user's final score."),
  totalQuestions: z
    .number()
    .describe('The total number of questions in the quiz.'),
});

export const GenerateStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('The personalized study plan in HTML format.'),
});
