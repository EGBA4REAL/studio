export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Level {
  id: string;
  name: string;
  description: string;
}

export interface Class {
  id: string;
  name: string;
  levelId: string;
}

export interface Subject {
  id: string;
  name:string;
  classId: string;
  icon: string;
}

export interface Topic {
  id: string;
  title: string;
  week: number;
  subjectId: string;
  lessonContent: string;
  studyMaterials: string[]; // Array of URLs or references
  completed?: boolean;
}

export interface QuizQuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  question: string;
  options: QuizQuestionOption[];
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}
