'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { askQuestionAction } from '@/app/actions';
import { BrainCircuit, Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Thinking...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Ask Your Question
        </>
      )}
    </Button>
  );
}

export function LessonQA({ lessonContent }: { lessonContent: string }) {
  const initialState = { answer: null, error: null };
  const [state, formAction] = useFormState(askQuestionAction, initialState);

  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <BrainCircuit className="w-6 h-6 text-primary" />
          Ask the AI Tutor
        </CardTitle>
        <CardDescription>
          Have a question about this lesson? Ask away, and the AI will do its best to answer based on the content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="lessonContent" value={lessonContent} />
          <Textarea
            name="userQuestion"
            placeholder="For example: What is a whole number?"
            className="bg-background"
            rows={3}
            required
          />
          <SubmitButton />
        </form>

        {(state.answer || state.error) && (
          <div className="mt-6">
            {state.error ? (
                 <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {state.error}
                    </AlertDescription>
                </Alert>
            ) : state.answer && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Answer:</CardTitle>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: state.answer }}
                    />
                </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
