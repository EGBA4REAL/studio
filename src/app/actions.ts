'use server';

import { createSession, deleteSession } from '@/lib/auth';
import { getTopicById } from '@/lib/curriculum-api';
import { redirect } from 'next/navigation';
import { generateQuizFromLesson } from '@/ai/flows/generate-quiz-from-lesson';

export async function signIn() {
  await createSession();
  redirect('/dashboard');
}

export async function signOut() {
  await deleteSession();
  redirect('/');
}

export async function generateQuizAction(formData: FormData) {
  const topicId = formData.get('topicId') as string;

  if (!topicId) {
    throw new Error('Topic ID is required');
  }

  const topic = await getTopicById(topicId);

  if (!topic) {
    throw new Error('Topic not found');
  }

  try {
    const { quiz } = await generateQuizFromLesson({
      lessonContent: topic.lessonContent,
    });
    
    const encodedQuiz = encodeURIComponent(quiz);
    const path = `/dashboard/topic/${topicId}/quiz?data=${encodedQuiz}`;
    
    redirect(path);

  } catch (error) {
    console.error('Failed to generate quiz:', error);
    // Optionally, redirect to an error page or show a toast
    // For now, we'll just log the error and won't redirect.
    // In a real app, you would handle this more gracefully.
    redirect(`/dashboard/topic/${topicId}/lesson?error=generation_failed`);
  }
}
