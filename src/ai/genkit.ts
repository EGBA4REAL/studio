import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

let aiInstance: any;

// This function ensures that the genkit instance is a singleton.
export function getAi() {
  if (!aiInstance) {
    aiInstance = genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-2.5-flash',
    });
  }
  return aiInstance;
}
