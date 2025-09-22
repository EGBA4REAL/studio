'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { generateQuizAction } from '@/app/actions';
import { BrainCircuit, Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <BrainCircuit className="mr-2 h-5 w-5" />
          Generate Quiz with AI
        </>
      )}
    </Button>
  );
}

export function QuizGenForm({ topicId }: { topicId: string }) {
  return (
    <form action={generateQuizAction}>
      <input type="hidden" name="topicId" value={topicId} />
      <SubmitButton />
    </form>
  );
}
