import { config } from 'dotenv';
config();

import '@/ai/flows/generate-quiz-from-lesson.ts';
import '@/ai/flows/generate-lesson-from-title.ts';
import '@/ai/flows/answer-lesson-question.ts';
import '@/ai/flows/explain-incorrect-answer.ts';
