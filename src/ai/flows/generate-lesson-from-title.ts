'use server';

/**
 * @fileOverview Generates lesson content from a topic title.
 *
 * - generateLessonFromTitle - A function that generates lesson content.
 * - GenerateLessonFromTitleInput - The input type for the generateLessonFromTitle function.
 * - GenerateLessonFromTitleOutput - The return type for the generateLessonFromTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonFromTitleInputSchema = z.object({
  topicTitle: z
    .string()
    .describe('The title of the topic for which to generate lesson content.'),
});
export type GenerateLessonFromTitleInput = z.infer<
  typeof GenerateLessonFromTitleInputSchema
>;

const GenerateLessonFromTitleOutputSchema = z.object({
  lessonContent: z.string().describe('The generated lesson content in HTML format.'),
});
export type GenerateLessonFromTitleOutput = z.infer<
  typeof GenerateLessonFromTitleOutputSchema
>;

export async function generateLessonFromTitle(
  input: GenerateLessonFromTitleInput
): Promise<GenerateLessonFromTitleOutput> {
  return generateLessonFromTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLessonFromTitlePrompt',
  input: {schema: GenerateLessonFromTitleInputSchema},
  output: {schema: GenerateLessonFromTitleOutputSchema},
  prompt: `You are an expert curriculum developer for Nigerian schools. Your task is to generate comprehensive lesson content in HTML format based on a given topic title.

  The lesson should be structured with headings (h1, h2), paragraphs (p), and lists (ul, ol, li) to be engaging and easy to understand for the target student.

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
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
