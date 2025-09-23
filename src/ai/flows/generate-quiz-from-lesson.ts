
'use server';

/**
 * @fileOverview Generates a quiz from a lesson's text or HTML content.
 *
 * - generateQuizFromLesson - A function that generates a quiz from lesson content.
 */

import {genkit, z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import type { GenerateQuizFromLessonInput, GenerateQuizFromLessonOutput } from '@/lib/types';
import { GenerateQuizFromLessonInputSchema, GenerateQuizFromLessonOutputSchema } from '@/lib/types';

const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

const prompt = ai.definePrompt({
  name: 'generateQuizFromLessonPrompt',
  input: {schema: GenerateQuizFromLessonInputSchema},
  output: {schema: GenerateQuizFromLessonOutputSchema, format: 'json'},
  prompt: `You are a teacher who is creating a quiz based on the content of a lesson.

  The lesson content is provided below:
  {{{lessonContent}}}

  Create a quiz with multiple-choice questions based on the lesson content.
  Each question should have 4 options, one of which is the correct answer. Mark the correct answer.
  Return the quiz in the format specified in the output schema.
  `,
});

const generateQuizFromLessonFlow = ai.defineFlow(
  {
    name: 'generateQuizFromLessonFlow',
    inputSchema: GenerateQuizFromLessonInputSchema,
    outputSchema: GenerateQuizFromLessonOutputSchema,
  },
  async (flowInput: z.infer<typeof GenerateQuizFromLessonInputSchema>) => {
    const {output} = await prompt(flowInput);
    return output!;
  }
);

export async function generateQuizFromLesson(
  input: GenerateQuizFromLessonInput
): Promise<GenerateQuizFromLessonOutput> {
  return await generateQuizFromLessonFlow(input);
}
