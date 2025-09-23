
'use server';

/**
 * @fileOverview Generates a personalized study plan based on quiz results.
 *
 * - generateStudyPlan - A function that generates a study plan.
 */
import { z } from 'zod';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import type { GenerateStudyPlanInput, GenerateStudyPlanOutput } from '@/lib/types';

const GenerateStudyPlanInputSchema = z.object({
  lessonContent: z.string().describe('The HTML content of the lesson.'),
  questions: z
    .array(
      z.object({
        question: z.string(),
        selectedAnswer: z.string(),
        correctAnswer: z.string(),
        isCorrect: z.boolean(),
      })
    )
    .describe('The list of questions, user answers, and results.'),
  score: z.number().describe("The user's final score."),
  totalQuestions: z
    .number()
    .describe('The total number of questions in the quiz.'),
});

const GenerateStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('The personalized study plan in HTML format.'),
});

export async function generateStudyPlan(
  input: GenerateStudyPlanInput
): Promise<GenerateStudyPlanOutput> {
  const ai = genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.5-flash',
  });

  const prompt = ai.definePrompt({
    name: 'generateStudyPlanPrompt',
    input: {schema: GenerateStudyPlanInputSchema},
    output: {schema: GenerateStudyPlanOutputSchema},
    prompt: `You are a supportive tutor creating a personalized study plan for a student who just finished a quiz.
  Their score was {{score}} out of {{totalQuestions}}.

  Your task is to create a helpful, encouraging study plan based on the questions they answered incorrectly.
  - Identify the core concepts the student struggled with based on the incorrect answers.
  - Recommend specific topics or sections from the lesson content to review.
  - Keep the tone positive and motivating.
  - Format the output as simple HTML, using <ul>, <li>, and <strong> tags.
  - If the student scored perfectly, congratulate them and state that no review is needed.

  Lesson Content:
  {{{lessonContent}}}

  Incorrectly Answered Questions:
  {{#each questions}}
    {{#unless this.isCorrect}}
      - Question: "{{this.question}}" - Student answered: "{{this.selectedAnswer}}" (Correct: "{{this.correctAnswer}}")
    {{/unless}}
  {{/each}}

  Generate the personalized study plan now.
  `,
  });

  const generateStudyPlanFlow = ai.defineFlow(
    {
      name: 'generateStudyPlanFlow',
      inputSchema: GenerateStudyPlanInputSchema,
      outputSchema: GenerateStudyPlanOutputSchema,
    },
    async (flowInput) => {
      const {output} = await prompt(flowInput);
      return output!;
    }
  );

  return await generateStudyPlanFlow(input);
}
