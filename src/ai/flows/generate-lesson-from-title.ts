
'use server';

/**
 * @fileOverview Generates lesson content from a topic title.
 *
 * - generateLessonFromTitle - A function that generates lesson content.
 */

import {genkit, z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import type { GenerateLessonFromTitleInput, GenerateLessonFromTitleOutput } from '@/lib/types';
import { GenerateLessonFromTitleInputSchema, GenerateLessonFromTitleOutputSchema } from '@/lib/types';

export async function generateLessonFromTitle(
  input: GenerateLessonFromTitleInput
): Promise<GenerateLessonFromTitleOutput> {
   const ai = genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.5-flash',
  });

  const prompt = ai.definePrompt({
    name: 'generateLessonFromTitlePrompt',
    input: {schema: GenerateLessonFromTitleInputSchema},
    output: {schema: GenerateLessonFromTitleOutputSchema},
    prompt: `You are an expert curriculum developer for Nigerian schools. Your task is to generate comprehensive lesson content in HTML format based on a given topic title.

  - The lesson should be structured with headings (h1, h2), paragraphs (p), and lists (ul, ol, li) to be engaging and easy to understand for the target student.
  - Include clear explanations, simple examples, and analogies where appropriate to make the concepts easier to grasp.

  Topic Title: {{{topicTitle}}}

  Generate the lesson content now.
  `,
  });

  const generateLessonFromTitleFlow = ai.defineFlow(
    {
      name: 'generateLessonFromTitleFlow',
      inputSchema: GenerateLessonFromTitleInputSchema,
      outputSchema: GenerateLessonFromTitleOutputSchema,
    },
    async (flowInput) => {
      const {output} = await prompt(flowInput);
      return output!;
    }
  );
  
  return await generateLessonFromTitleFlow(input);
}
