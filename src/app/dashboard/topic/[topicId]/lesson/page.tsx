import { getTopicById, getSubjectById, getClassById, getLevelById, updateTopicContent } from '@/lib/curriculum-api';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import type { BreadcrumbItem } from '@/lib/types';
import { QuizGenForm } from '@/components/quiz/quiz-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { generateLessonFromTitle } from '@/ai/flows/generate-lesson-from-title';
import { revalidatePath } from 'next/cache';

async function generateAndSaveLesson(topicId: string, title: string) {
  'use server';
  try {
    const { lessonContent } = await generateLessonFromTitle({ topicTitle: title });
    await updateTopicContent(topicId, lessonContent);
    revalidatePath(`/dashboard/topic/${topicId}/lesson`);
    return lessonContent;
  } catch (error) {
    console.error('Failed to generate lesson:', error);
    return null;
  }
}


export default async function LessonPage({
  params,
  searchParams,
}: {
  params: { topicId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let topic = await getTopicById(params.topicId);
  if (!topic) {
    notFound();
  }

  let lessonContent = topic.lessonContent;
  if (lessonContent.includes('Lesson content coming soon')) {
    const newContent = await generateAndSaveLesson(topic.id, topic.title);
    if(newContent) {
      lessonContent = newContent;
    }
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

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <BreadcrumbNav items={breadcrumbs} />

      <div className="space-y-2 text-center">
        <p className="text-primary font-semibold">Week {topic.week} Lesson</p>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">{topic.title}</h1>
      </div>

      <Card>
        <CardContent className="prose dark:prose-invert max-w-none p-6 md:p-8" dangerouslySetInnerHTML={{ __html: lessonContent }} />
      </Card>

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
    </div>
  );
}
