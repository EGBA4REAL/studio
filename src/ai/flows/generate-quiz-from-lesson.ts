
'use server';

/**
 * @fileOverview Generates a quiz from a lesson's text or HTML content.
 *
 * - generateQuizFromLesson - A function that generates a quiz from lesson content.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  GenerateQuizFromLessonInput,
  GenerateQuizFromLessonOutput,
} from '@/lib/types';


const GenerateQuizFromLessonInputSchema = z.object({
  lessonContent: z
    .string()
    .describe('The text or HTML content of the lesson from which to generate the quiz.'),
});

const QuizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.object({
    text: z.string(),
    isCorrect: z.boolean(),
  })),
});

const GenerateQuizFromLessonOutputSchema = z.object({
  quiz: z.object({
    questions: z.array(QuizQuestionSchema),
  })
});


export async function generateQuizFromLesson(
  input: GenerateQuizFromLessonInput
): Promise<GenerateQuizFromLessonOutput> {
  return generateQuizFromLessonFlow(input);
}

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
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
