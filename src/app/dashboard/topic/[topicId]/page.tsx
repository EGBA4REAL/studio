import { getTopicById, getSubjectById, getClassById, getLevelById } from '@/lib/curriculum-api';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookText, FileText, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import type { BreadcrumbItem } from '@/lib/types';
import { QuizGenForm } from '@/components/quiz/quiz-form';

export default async function TopicPage({ params }: { params: { topicId: string } }) {
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

  return (
    <div className="space-y-6">
      <BreadcrumbNav items={breadcrumbs} />
      <div className="space-y-2">
        <p className="text-primary font-semibold">Week {topic.week}</p>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">{topic.title}</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <BookText className="w-6 h-6 text-primary" />
              Lesson Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Dive into this week's detailed lesson.
            </p>
            <Button asChild className="w-full group">
              <Link href={`/dashboard/topic/${topic.id}/lesson`}>
                Start Lesson <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <FileText className="w-6 h-6 text-primary" />
              Study Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Review supplementary materials and notes.
            </p>
            <Button variant="secondary" className="w-full" disabled>
              View Materials
            </Button>
          </CardContent>
        </Card>

         <Card className="border-accent bg-accent/10 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <BrainCircuit className="w-6 h-6 text-accent-foreground" />
              Test Your Knowledge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Generate an AI-powered quiz to master this topic.
            </p>
             <QuizGenForm topicId={topic.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
