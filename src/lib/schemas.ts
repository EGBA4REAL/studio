
'use server';

import { z } from 'zod';

export const QuizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(
    z.object({
      text: z.string(),
      isCorrect: z.boolean(),
    })
  ),
});
