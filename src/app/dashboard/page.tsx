import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSession } from '@/lib/auth';
import { BookMarked } from 'lucide-react';

export default async function DashboardPage() {
  const user = await getSession();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">
          Welcome back, {user?.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Ready to learn something new? Select a subject from the sidebar to get
          started.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <BookMarked className="w-6 h-6 text-primary" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your progress will be displayed here as you complete lessons and quizzes.
            Let&apos;s fill this space up!
          </p>
          <div className="mt-4 h-32 flex items-center justify-center bg-muted/50 rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">No progress yet.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
