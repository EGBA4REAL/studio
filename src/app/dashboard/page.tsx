import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getSession } from '@/lib/auth';
import { BookMarked, Target, TrendingUp } from 'lucide-react';
import { getTotalTopicCount } from '@/lib/curriculum-api';
import { Progress } from '@/components/ui/progress';

export default async function DashboardPage() {
  const user = await getSession();
  const completedTopics = user?.progress?.completedTopics || [];
  const totalTopics = await getTotalTopicCount();
  const progressPercentage = totalTopics > 0 ? (completedTopics.length / totalTopics) * 100 : 0;

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
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topics Completed</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTopics.length}</div>
            <p className="text-xs text-muted-foreground">out of {totalTopics} total topics</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
             <Progress value={progressPercentage} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Complete 1 more topic!</div>
            <p className="text-xs text-muted-foreground">Keep up the great work</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <BookMarked className="w-6 h-6 text-primary" />
            Your Learning Journey
          </CardTitle>
          <CardDescription>
            Your progress will be displayed here as you complete lessons and quizzes.
            Let&apos;s fill this space up!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {completedTopics.length > 0 ? (
             <div>
                <p className="text-muted-foreground mb-4">You have completed {completedTopics.length} out of {totalTopics} topics.</p>
                <div className="space-y-2">
                    <Progress value={progressPercentage} />
                    <p className="text-sm font-medium text-right">{Math.round(progressPercentage)}% Complete</p>
                </div>
            </div>
          ) : (
             <div className="mt-4 h-32 flex items-center justify-center bg-muted/50 rounded-lg border border-dashed">
                <p className="text-sm text-muted-foreground">No progress yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
