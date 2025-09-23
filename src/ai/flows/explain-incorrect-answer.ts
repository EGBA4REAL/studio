
'use server';

/**
 * @fileOverview Explains why a quiz answer is incorrect.
 *
 * - explainIncorrectAnswer - A function that generates an explanation.
 */

import {genkit, z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import type { ExplainIncorrectAnswerInput, ExplainIncorrectAnswerOutput } from '@/lib/types';

const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});


const ExplainIncorrectAnswerInputSchema = z.object({
  lessonContent: z.string().describe('The HTML content of the lesson.'),
  question: z
    .string()
    .describe('The quiz question that was answered incorrectly.'),
  selectedAnswer: z
    .string()
    .describe('The incorrect answer the user selected.'),
  correctAnswer: z.string().describe('The correct answer for the question.'),
});

const ExplainIncorrectAnswerOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A clear explanation in HTML format about why the answer was incorrect, based on the lesson content.'
    ),
});

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
  async (flowInput: ExplainIncorrectAnswerInput) => {
    const {output} = await prompt(flowInput);
    return output!;
  }
);

export async function explainIncorrectAnswer(
  input: ExplainIncorrectAnswerInput
): Promise<ExplainIncorrectAnswerOutput> {
  return await explainIncorrectAnswerFlow(input);
}
