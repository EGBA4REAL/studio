
'use server';

/**
 * @fileOverview Generates a quiz from a lesson's text or HTML content.
 *
 * - generateQuizFromLesson - A function that generates a quiz from lesson content.
 */
import { z } from 'zod';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import type { GenerateQuizFromLessonInput, GenerateQuizFromLessonOutput } from '@/lib/types';
import { QuizQuestionSchema } from '@/lib/schemas';


export async function generateQuizFromLesson(
  input: GenerateQuizFromLessonInput
): Promise<GenerateQuizFromLessonOutput> {
  const GenerateQuizFromLessonInputSchema = z.object({
    lessonContent: z
      .string()
      .describe(
        'The text or HTML content of the lesson from which to generate the quiz.'
      ),
  });

  const GenerateQuizFromLessonOutputSchema = z.object({
    quiz: z.object({
      questions: z.array(QuizQuestionSchema),
    }),
  });

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
    async (flowInput) => {
      const {output} = await prompt(flowInput);
      return output!;
    }
  );
  
  return await generateQuizFromLessonFlow(input);
}
