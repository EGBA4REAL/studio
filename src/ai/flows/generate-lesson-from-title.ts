
'use server';

/**
 * @fileOverview Generates lesson content from a topic title.
 *
 * - generateLessonFromTitle - A function that generates lesson content.
 */

import {getAi} from '@/ai/genkit';
import {z} from 'genkit';
import {
  GenerateLessonFromTitleInput,
  GenerateLessonFromTitleOutput,
} from '@/lib/types';


export async function generateLessonFromTitle(
  input: GenerateLessonFromTitleInput
): Promise<GenerateLessonFromTitleOutput> {
  return generateLessonFromTitleFlow(input);
}

const generateLessonFromTitleFlow = async (input: GenerateLessonFromTitleInput) => {
    const ai = await getAi();

    const GenerateLessonFromTitleInputSchema = z.object({
        topicTitle: z
            .string()
            .describe('The title of the topic for which to generate lesson content.'),
    });

    const GenerateLessonFromTitleOutputSchema = z.object({
        lessonContent: z.string().describe('The generated lesson content in HTML format.'),
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

    const flow = ai.defineFlow(
    {
        name: 'generateLessonFromTitleFlow',
        inputSchema: GenerateLessonFromTitleInputSchema,
        outputSchema: GenerateLessonFromTitleOutputSchema,
    },
    async (input: GenerateLessonFromTitleInput) => {
        const {output} = await prompt(input);
        return output!;
    }
    );

    return flow(input);
}
