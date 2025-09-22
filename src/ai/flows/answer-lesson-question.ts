'use server';

/**
 * @fileOverview Answers a user's question based on the lesson content.
 *
 * - answerLessonQuestion - A function that answers a user's question.
 * - AnswerLessonQuestionInput - The input type for the answerLessonQuestion function.
 * - AnswerLessonQuestionOutput - The return type for the answerLessonQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerLessonQuestionInputSchema = z.object({
  lessonContent: z
    .string()
    .describe('The HTML content of the lesson.'),
  userQuestion: z.string().describe("The user's question about the lesson."),
});
export type AnswerLessonQuestionInput = z.infer<
  typeof AnswerLessonQuestionInputSchema
>;

const AnswerLessonQuestionOutputSchema = z.object({
  answer: z.string().describe('The generated answer to the user\'s question in HTML format.'),
});
export type AnswerLessonQuestionOutput = z.infer<
  typeof AnswerLessonQuestionOutputSchema
>;

export async function answerLessonQuestion(
  input: AnswerLessonQuestionInput
): Promise<AnswerLessonQuestionOutput> {
  return answerLessonQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerLessonQuestionPrompt',
  input: {schema: AnswerLessonQuestionInputSchema},
  output: {schema: AnswerLessonQuestionOutputSchema},
  prompt: `You are an expert tutor for Nigerian students. Your task is to answer a student's question based on the provided lesson content.

  - Your answer must be based *only* on the information within the provided lesson content.
  - If the question cannot be answered from the lesson content, politely state that you cannot answer and that the question is outside the scope of the current lesson.
  - Format your answer clearly using simple HTML tags like <p> and <strong> for emphasis.

  Lesson Content:
  {{{lessonContent}}}

  Student's Question:
  {{{userQuestion}}}

  Generate the answer now.
  `,
});

const answerLessonQuestionFlow = ai.defineFlow(
  {
    name: 'answerLessonQuestionFlow',
    inputSchema: AnswerLessonQuestionInputSchema,
    outputSchema: AnswerLessonQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
