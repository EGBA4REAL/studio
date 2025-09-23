'use server';

/**
 * @fileOverview Explains why a quiz answer is incorrect.
 *
 * - explainIncorrectAnswer - A function that generates an explanation.
 */

import {ai} from '@/ai/genkit';
import {
  ExplainIncorrectAnswerInput,
  ExplainIncorrectAnswerInputSchema,
  ExplainIncorrectAnswerOutput,
  ExplainIncorrectAnswerOutputSchema,
} from '@/lib/types';


export async function explainIncorrectAnswer(
  input: ExplainIncorrectAnswerInput
): Promise<ExplainIncorrectAnswerOutput> {
  return explainIncorrectAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainIncorrectAnswerPrompt',
  input: {schema: ExplainIncorrectAnswerInputSchema},
  output: {schema: ExplainIncorrectAnswerOutputSchema},
  prompt: `You are a helpful tutor. A student answered a quiz question incorrectly.
  Your task is to explain why their answer is wrong and what the correct answer is,
  using the provided lesson content as the basis for your explanation.

  - Keep the explanation concise and easy to understand.
  - Format the response in simple HTML using <p> and <strong> tags.
  - Refer directly to the lesson content to justify the correct answer.

  Lesson Content:
  {{{lessonContent}}}

  Question:
  "{{{question}}}"

  The student chose:
  "{{{selectedAnswer}}}"

  The correct answer is:
  "{{{correctAnswer}}}"

  Generate the explanation now.
  `,
});

const explainIncorrectAnswerFlow = ai.defineFlow(
  {
    name: 'explainIncorrectAnswerFlow',
    inputSchema: ExplainIncorrectAnswerInputSchema,
    outputSchema: ExplainIncorrectAnswerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
