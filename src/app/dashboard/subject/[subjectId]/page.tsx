import {
  getSubjectById,
  getTopicsBySubject,
  getClassById,
  getLevelById,
} from '@/lib/curriculum-api';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Circle, ListTodo } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import type { BreadcrumbItem } from '@/lib/types';
import { cn } from '@/lib/utils';

export default async function SubjectPage({
  params,
}: {
  params: { subjectId: string };
}) {
  const subject = await getSubjectById(params.subjectId);
  if (!subject) {
    notFound();
  }

  const topics = await getTopicsBySubject(params.subjectId);
  const classInfo = await getClassById(subject.classId);
  const levelInfo = classInfo
    ? await getLevelById(classInfo.levelId)
    : undefined;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/dashboard' },
  ];
  if (levelInfo)
    breadcrumbs.push({ label: levelInfo.name, href: `/dashboard` }); // Simplified href
  if (classInfo)
    breadcrumbs.push({ label: classInfo.name, href: `/dashboard` }); // Simplified href
  breadcrumbs.push({ label: subject.name, href: `/dashboard/subject/${subject.id}` });

  return (
    <div className="space-y-6">
      <BreadcrumbNav items={breadcrumbs} />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-headline text-3xl">
            <ListTodo className="w-8 h-8 text-primary" />
            {subject.name}: Full-Year Outline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topics.map((topic) => (
              <Link
                href={`/dashboard/topic/${topic.id}`}
                key={topic.id}
                className="block"
              >
                <div className={cn(
                    "flex items-center gap-4 rounded-lg border p-4 transition-all hover:bg-accent hover:shadow-md",
                    topic.completed && "bg-green-50 border-green-200"
                )}>
                  {topic.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                  )}
                  <div className="flex-grow">
                    <p className="font-semibold">{topic.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Week {topic.week}
                    </p>
                  </div>
                  <div className="text-sm text-primary font-semibold">
                    Start Lesson
                  </div>
                </div>
              </Link>
            ))}
            {topics.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No topics found for this subject yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
