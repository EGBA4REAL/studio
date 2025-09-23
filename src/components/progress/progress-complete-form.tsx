'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { markTopicAsCompleteAction } from '@/app/actions';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

function SubmitButton({ isCompleted }: { isCompleted: boolean }) {
  const { pending } = useFormStatus();
  
  if (isCompleted) {
    return (
      <div className="flex items-center gap-2 text-green-600 font-semibold">
        <CheckCircle className="w-5 h-5" />
        <span>Lesson Completed!</span>
      </div>
    );
  }

  return (
    <Tooltip>
        <TooltipTrigger asChild>
            <Button type="submit" disabled={pending}>
            {pending ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Marking as complete...
                </>
            ) : (
                <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Complete
                </>
            )}
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>Click here to save your progress for this topic.</p>
        </TooltipContent>
    </Tooltip>
  );
}

export function ProgressCompleteForm({ topicId, subjectId, isCompleted }: { topicId: string, subjectId: string, isCompleted: boolean }) {
  return (
    <form action={markTopicAsCompleteAction}>
      <input type="hidden" name="topicId" value={topicId} />
      <input type="hidden" name="subjectId" value={subjectId} />
      <SubmitButton isCompleted={isCompleted} />
    </form>
  );
}
