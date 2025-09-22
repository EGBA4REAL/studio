'use server';

/**
 * @fileOverview Generates a quiz from a lesson's text or HTML content.
 *
 * - generateQuizFromLesson - A function that generates a quiz from lesson content.
 * - GenerateQuizFromLessonInput - The input type for the generateQuizFromLesson function.
 * - GenerateQuizFromLessonOutput - The return type for the generateQuizFromLesson function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizFromLessonInputSchema = z.object({
  lessonContent: z
    .string()
    .describe('The text or HTML content of the lesson from which to generate the quiz.'),
});
export type GenerateQuizFromLessonInput = z.infer<
  typeof GenerateQuizFromLessonInputSchema
>;

const GenerateQuizFromLessonOutputSchema = z.object({
  quiz: z.string().describe('The generated quiz in JSON format.'),
});
export type GenerateQuizFromLessonOutput = z.infer<
  typeof GenerateQuizFromLessonOutputSchema
>;

export async function generateQuizFromLesson(
  input: GenerateQuizFromLessonInput
): Promise<GenerateQuizFromLessonOutput> {
  return generateQuizFromLessonFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizFromLessonPrompt',
  input: {schema: GenerateQuizFromLessonInputSchema},
  output: {schema: GenerateQuizFromLessonOutputSchema},
  prompt: `You are a teacher who is creating a quiz based on the content of a lesson.

  The lesson content is provided below:
  {{lessonContent}}

  Create a quiz with multiple-choice questions based on the lesson content. The quiz should be returned in JSON format.
  Each question should have 4 options, one of which is the correct answer. Mark the correct answer.
  {
  "questions": [
  {
  "question": "",
  "options": [
  {
  "text": "",
  "isCorrect": false
  },
  {
  "text": "",
  "isCorrect": false
  },
  {
  "text": "",
  "isCorrect": false
  },
  {
  "text": "",
  "isCorrect": true
  }
  ]
  }
  ]
  }`,
});

const generateQuizFromLessonFlow = ai.defineFlow(
  {
    name: 'generateQuizFromLessonFlow',
    inputSchema: GenerateQuizFromLessonInputSchema,
    outputSchema: GenerateQuizFromLessonOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
