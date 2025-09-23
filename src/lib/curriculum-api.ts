
'use server';

import 'server-only';
import { levels, classes, subjects, topics } from './mock-data';
import type { Class, Subject, Topic, Level } from './types';

export async function getLevels(): Promise<Level[]> {
  return Promise.resolve(levels);
}

export async function getLevelById(levelId: string): Promise<Level | undefined> {
  return Promise.resolve(levels.find(l => l.id === levelId));
}

export async function getClassesByLevel(levelId: string): Promise<Class[]> {
  return Promise.resolve(classes.filter((c) => c.levelId === levelId));
}

export async function getClassById(classId: string): Promise<Class | undefined> {
    return Promise.resolve(classes.find(c => c.id === classId));
}

export async function getSubjectsByClass(classId: string): Promise<Subject[]> {
  return Promise.resolve(subjects.filter((s) => s.classId === classId));
}

export async function getSubjectById(subjectId: string): Promise<Subject | undefined> {
    const subject = subjects.find(s => s.id === subjectId);
    return Promise.resolve(subject);
}

export async function getTopicsBySubject(subjectId: string): Promise<Topic[]> {
  return Promise.resolve(topics.filter((t) => t.subjectId === subjectId).sort((a,b) => a.week - b.week));
}

export async function getTopicById(topicId: string): Promise<Topic | undefined> {
    return Promise.resolve(topics.find(t => t.id === topicId));
}

export async function updateTopicContent(topicId: string, newContent: string): Promise<void> {
  const topicIndex = topics.findIndex(t => t.id === topicId);
  if (topicIndex !== -1) {
    topics[topicIndex].lessonContent = newContent;
  }
  return Promise.resolve();
}
