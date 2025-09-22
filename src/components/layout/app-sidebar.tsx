'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Level, Class, Subject } from '@/lib/types';
import { BookOpen, GraduationCap, Shapes } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Logo } from '../ui/logo';
import Link from 'next/link';

type AppSidebarProps = {
  levels: (Level & { classes: (Class & { subjects: Subject[] })[] })[];
};

export function AppSidebar({ levels }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <Accordion type="multiple" className="w-full">
            {levels.map((level) => (
              <AccordionItem value={level.id} key={level.id}>
                <SidebarMenuItem>
                  <AccordionTrigger className="w-full [&[data-state=open]>svg]:-rotate-90">
                    <SidebarMenuButton
                      asChild
                      variant="ghost"
                      className="w-full justify-start"
                      isActive={pathname.startsWith(`/dashboard/${level.id}`)}
                    >
                      <div>
                        <Shapes />
                        <span>{level.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </AccordionTrigger>
                </SidebarMenuItem>
                <AccordionContent>
                  <SidebarMenuSub>
                    {level.classes.map((cls) => (
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        key={cls.id}
                      >
                        <AccordionItem value={cls.id} className="border-b-0">
                          <SidebarMenuSubItem>
                            <AccordionTrigger className="w-full [&[data-state=open]>svg]:-rotate-90">
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname.startsWith(
                                  `/dashboard/${level.id}/${cls.id}`
                                )}
                              >
                                <div>
                                  <GraduationCap />
                                  <span>{cls.name}</span>
                                </div>
                              </SidebarMenuSubButton>
                            </AccordionTrigger>
                          </SidebarMenuSubItem>
                          <AccordionContent>
                            <SidebarMenuSub>
                              {cls.subjects.map((subject) => (
                                <SidebarMenuSubItem key={subject.id}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname.startsWith(
                                      `/dashboard/subject/${subject.id}`
                                    )}
                                  >
                                    <Link
                                      href={`/dashboard/subject/${subject.id}`}
                                    >
                                      <BookOpen />
                                      <span>{subject.name}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </SidebarMenuSub>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
