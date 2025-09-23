
'use server';

/**
 * @fileOverview Answers a user's question based on the lesson content.
 *
 * - answerLessonQuestion - A function that answers a user's question.
 */

import {getAi} from '@/ai/genkit';
import type {
  AnswerLessonQuestionInput,
  AnswerLessonQuestionOutput,
} from '@/lib/types';
import {
  AnswerLessonQuestionInputSchema,
  AnswerLessonQuestionOutputSchema,
} from '@/lib/types';

const ai = getAi();

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
  async (flowInput: AnswerLessonQuestionInput) => {
    const {output} = await prompt(flowInput);
    return output!;
  }
);

export async function answerLessonQuestion(
  input: AnswerLessonQuestionInput
): Promise<AnswerLessonQuestionOutput> {
  return await answerLessonQuestionFlow(input);
}
