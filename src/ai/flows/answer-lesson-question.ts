
'use server';

/**
 * @fileOverview Answers a user's question based on the lesson content.
 *
 * - answerLessonQuestion - A function that answers a user's question.
 */
import { z } from 'zod';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import type { AnswerLessonQuestionInput, AnswerLessonQuestionOutput } from '@/lib/types';

const AnswerLessonQuestionInputSchema = z.object({
  lessonContent: z.string().describe('The HTML content of the lesson.'),
  userQuestion: z.string().describe("The user's question about the lesson."),
});

const AnswerLessonQuestionOutputSchema = z.object({
  answer: z
    .string()
    .describe("The generated answer to the user's question in HTML format."),
});

export async function answerLessonQuestion(
  input: AnswerLessonQuestionInput
): Promise<AnswerLessonQuestionOutput> {
  const ai = genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.5-flash',
  });

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
    async (flowInput) => {
      const {output} = await prompt(flowInput);
      return output!;
    }
  );

  return await answerLessonQuestionFlow(input);
}
