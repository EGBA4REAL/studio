import { getTopicById, getSubjectById, getClassById, getLevelById } from '@/lib/curriculum-api';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import type { BreadcrumbItem } from '@/lib/types';
import { FileText, FolderOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function StudyMaterialsPage({
  params,
}: {
  params: { topicId: string };
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
  breadcrumbs.push({ label: 'Study Materials', href: `/dashboard/topic/${topic.id}/materials` });

  // For now, studyMaterials is an array of strings. We'll simulate them as links.
  const hasMaterials = topic.studyMaterials && topic.studyMaterials.length > 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <BreadcrumbNav items={breadcrumbs} />

      <div className="space-y-2 text-center">
        <p className="text-primary font-semibold">Week {topic.week}</p>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">{topic.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <FileText className="w-6 h-6 text-primary" />
            Study Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasMaterials ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Download or view these supplementary materials for your study.
              </p>
              <ul className="list-disc list-inside space-y-2">
                {topic.studyMaterials.map((material, index) => (
                  <li key={index}>
                    {/* Assuming materials are links for now */}
                    <Button asChild variant="link">
                        <Link href={material} target="_blank" rel="noopener noreferrer">
                            {material.split('/').pop() || `Material ${index + 1}`}
                        </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
                <FolderOpen className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Materials Yet</h3>
                <p className="text-muted-foreground max-w-sm">
                    There are no supplementary study materials available for this topic at the moment. Please check back later.
                </p>
                <Button asChild className="mt-6">
                    <Link href={`/dashboard/topic/${topic.id}`}>Go Back to Topic</Link>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
