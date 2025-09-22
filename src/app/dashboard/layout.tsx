import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Header } from '@/components/layout/header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { getClassesByLevel, getLevels, getSubjectsByClass } from '@/lib/curriculum-api';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  if (!user) {
    redirect('/');
  }

  const levels = await getLevels();
  const classesByLevel = await Promise.all(
    levels.map(async (level) => {
      const classes = await getClassesByLevel(level.id);
      const subjectsByClass = await Promise.all(
        classes.map(async (cls) => {
          const subjects = await getSubjectsByClass(cls.id);
          return { ...cls, subjects };
        })
      );
      return { ...level, classes: subjectsByClass };
    })
  );

  return (
    <SidebarProvider>
      <AppSidebar levels={levelsWithData} />
      <SidebarInset>
        <Header user={user} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
