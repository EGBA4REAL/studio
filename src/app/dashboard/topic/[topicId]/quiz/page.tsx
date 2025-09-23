import { getTopicById } from '@/lib/curriculum-api';
import { notFound } from 'next/navigation';
import { QuizClient } from '@/components/quiz/quiz-client';
import type { Quiz } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: { topicId: string };
  searchParams: { data?: string };
}) {
  const topic = await getTopicById(params.topicId);
  if (!topic) {
    notFound();
  }

  let quiz: Quiz | null = null;
  let parseError = false;

  if (searchParams.data) {
    try {
      const decodedData = decodeURIComponent(searchParams.data);
      const parsedData = JSON.parse(decodedData);
      
      // The AI might return the quiz nested under a 'quiz' key.
      const quizData = parsedData.quiz ? parsedData.quiz : parsedData;

      if (quizData && Array.isArray(quizData.questions)) {
        quiz = quizData;
      } else {
        quiz = null;
        parseError = true;
      }
    } catch (error) {
      console.error('Failed to parse quiz data:', error);
      parseError = true;
    }
  }

  if (!quiz || parseError) {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <Card className="w-full max-w-md text-center">
                <CardContent className="p-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error Loading Quiz</AlertTitle>
                    <AlertDescription>
                    There was a problem loading the quiz data. It might be invalid or corrupted.
                    </AlertDescription>
                </Alert>
                <Button asChild className="mt-6">
                    <Link href={`/dashboard/topic/${topic.id}`}>Go Back to Topic</Link>
                </Button>
                </CardContent>
            </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <QuizClient quiz={quiz} topic={topic} />
    </div>
  );
}
