import { getTopicById, getSubjectById, getClassById, getLevelById } from '@/lib/curriculum-api';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import type { BreadcrumbItem } from '@/lib/types';
import { QuizGenForm } from '@/components/quiz/quiz-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, FileText, Sparkles } from 'lucide-react';
import { LessonQA } from '@/components/qa/lesson-qa';
import { Button } from '@/components/ui/button';
import { generateLessonAction } from '@/app/actions';

function GenerateLessonForm({ topicId, topicTitle }: { topicId: string; topicTitle: string }) {
  return (
    <form action={generateLessonAction} className="space-y-4 text-center">
      <input type="hidden" name="topicId" value={topicId} />
      <input type="hidden" name="topicTitle" value={topicTitle} />
      <Button type="submit" size="lg">
        <Sparkles className="mr-2 h-5 w-5" />
        Generate Lesson with AI
      </Button>
    </form>
  );
}

export default async function LessonPage({
  params,
  searchParams,
}: {
  params: { topicId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const topic = await getTopicById(params.topicId);
  if (!topic) {
    notFound();
  }

  const subject = await getSubjectById(topic.subjectId);
  const classInfo = subject ? await getClassById(subject.classId) : undefined;
  const levelInfo = classInfo ? await getLevelById(classInfo.levelId) : undefined;
  
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/dashboard' },
  ];
  if (levelInfo) breadcrumbs.push({ label: levelInfo.name, href: '/dashboard' });
  if (classInfo) breadcrumbs.push({ label: classInfo.name, href: '/dashboard' });
  if (subject) breadcrumbs.push({ label: subject.name, href: `/dashboard/subject/${subject.id}` });
  breadcrumbs.push({ label: topic.title, href: `/dashboard/topic/${topic.id}` });
  breadcrumbs.push({ label: 'Lesson', href: `/dashboard/topic/${topic.id}/lesson` });

  const showError = searchParams?.error === 'generation_failed';
  const showPlaceholder = topic.lessonContent.includes('Lesson content coming soon');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <BreadcrumbNav items={breadcrumbs} />

      <div className="space-y-2 text-center">
        <p className="text-primary font-semibold">Week {topic.week} Lesson</p>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">{topic.title}</h1>
      </div>

      {showPlaceholder ? (
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <FileText className="w-6 h-6 text-primary" />
                    Lesson Content
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
                <p className="text-muted-foreground mb-6">
                    This lesson hasn&apos;t been generated yet. Click the button below to create it using AI.
                </p>
                <GenerateLessonForm topicId={topic.id} topicTitle={topic.title} />
            </CardContent>
         </Card>
      ) : (
        <>
            <Card>
                <CardContent className="prose dark:prose-invert max-w-none p-6 md:p-8" dangerouslySetInnerHTML={{ __html: topic.lessonContent }} />
            </Card>
            
            <div className="py-6">
                <LessonQA lessonContent={topic.lessonContent} />
            </div>

            <div className="text-center py-6 space-y-4">
                <h2 className="text-2xl font-headline font-semibold">Ready to test your knowledge?</h2>
                <p className="text-muted-foreground">
                Click the button below to generate a unique quiz based on this lesson.
                </p>
                {showError && (
                    <Alert variant="destructive" className="text-left">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Quiz Generation Failed</AlertTitle>
                        <AlertDescription>
                            There was an error generating the quiz. Please try again later.
                        </AlertDescription>
                    </Alert>
                )}
                <QuizGenForm topicId={topic.id} />
            </div>
        </>
      )}
    </div>
  );
}
