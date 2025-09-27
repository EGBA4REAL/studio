
"use server";

import { adminAuth, adminDb } from "./firebase-admin";
import type { User } from "./types";
import { cookies } from "next/headers";
import {
  generateLessonFromTitle,
  GenerateLessonFromTitleInput,
} from '@/ai/flows/generate-lesson-from-title';
import { updateTopicContent } from './curriculum-api';
import { redirect } from 'next/navigation';
import {
  generateQuizFromLesson,
  GenerateQuizFromLessonInput,
} from '@/ai/flows/generate-quiz-from-lesson';
import {
  answerLessonQuestion,
  AnswerLessonQuestionInput,
} from '@/ai/flows/answer-lesson-question';
import {
  explainIncorrectAnswer,
  ExplainIncorrectAnswerInput,
} from '@/ai/flows/explain-incorrect-answer';
import {
  generateStudyPlan,
  GenerateStudyPlanInput,
} from '@/ai/flows/generate-study-plan';

export async function getSession(): Promise<User | null> {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) {
    return null;
  }
  try {
    const decodedToken = await adminAuth.verifySessionCookie(
      sessionCookie,
      true
    );
    const user: User = {
      id: decodedToken.uid,
      name: decodedToken.name || '',
      email: decodedToken.email || '',
      avatarUrl: decodedToken.picture || '',
      subscription: {
        status: 'free', // Placeholder
      },
      progress: {
        completedTopics: [], // Placeholder
      },
    };

    // Fetch additional user data from Firestore if needed
    const userDoc = await adminDb.collection('users').doc(user.id).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData?.subscription) {
        user.subscription = userData.subscription;
      }
      if (userData?.progress) {
        user.progress = userData.progress;
      }
    }

    return user;
  } catch (error) {
    console.error('Session verification failed:', error);
    // As a fallback for invalid sessions, clear the cookie
    cookies().delete('session');
    return null;
  }
}

export async function createSession(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });
    cookies().set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });

    // Also save user data to Firestore
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userRef = adminDb.collection('users').doc(decodedToken.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set(
        {
          name: decodedToken.name,
          email: decodedToken.email,
          avatarUrl: decodedToken.picture,
          createdAt: new Date(),
          subscription: { status: 'free' },
          progress: { completedTopics: [] },
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.error('Error creating session:', error);
    throw new Error('Failed to create session');
  }
}

export async function signOut() {
  cookies().delete('session');
  redirect('/');
}

export async function generateLessonAction(formData: FormData) {
  const topicId = formData.get('topicId') as string;
  const topicTitle = formData.get('topicTitle') as string;

  if (!topicId || !topicTitle) {
    return { error: 'Missing topic information.' };
  }

  try {
    const input: GenerateLessonFromTitleInput = { topicTitle };
    const output = await generateLessonFromTitle(input);

    await updateTopicContent(topicId, output.lessonContent);

    redirect(`/dashboard/topic/${topicId}/lesson`);
  } catch (error) {
    console.error('Error generating lesson:', error);
    redirect(
      `/dashboard/topic/${topicId}/lesson?error=generation_failed`
    );
  }
}

export async function generateQuizAction(formData: FormData) {
  const topicId = formData.get('topicId') as string;
  const topic = await getTopicById(topicId);

  if (!topic) {
    return redirect(`/dashboard/topic/${topicId}?error=not_found`);
  }

  try {
    const input: GenerateQuizFromLessonInput = {
      lessonContent: topic.lessonContent,
    };
    const output = await generateQuizFromLesson(input);

    const quizData = encodeURIComponent(JSON.stringify(output.quiz));
    redirect(`/dashboard/topic/${topicId}/quiz?data=${quizData}`);
  } catch (error) {
    console.error('Error generating quiz:', error);
    redirect(`/dashboard/topic/${topicId}/lesson?error=generation_failed`);
  }
}

export async function askQuestionAction(
  prevState: any,
  formData: FormData
): Promise<{ answer: string | null; error: string | null }> {
  const userQuestion = formData.get('userQuestion') as string;
  const lessonContent = formData.get('lessonContent') as string;

  if (!userQuestion || !lessonContent) {
    return { answer: null, error: 'Missing question or lesson content.' };
  }

  try {
    const input: AnswerLessonQuestionInput = { userQuestion, lessonContent };
    const result = await answerLessonQuestion(input);
    return { answer: result.answer, error: null };
  } catch (error: any) {
    console.error('Error asking question:', error);
    return {
      answer: null,
      error: error.message || 'Failed to get an answer from the AI.',
    };
  }
}

export async function getExplanationAction(
  prevState: any,
  formData: FormData
): Promise<{ explanation: string | null; error: string | null }> {
  try {
    const input: ExplainIncorrectAnswerInput = {
      lessonContent: formData.get('lessonContent') as string,
      question: formData.get('question') as string,
      selectedAnswer: formData.get('selectedAnswer') as string,
      correctAnswer: formData.get('correctAnswer') as string,
    };
    const result = await explainIncorrectAnswer(input);
    return { explanation: result.explanation, error: null };
  } catch (error: any) {
    console.error('Error getting explanation:', error);
    return {
      explanation: null,
      error:
        error.message || 'Failed to get an explanation from the AI.',
    };
  }
}

export async function getStudyPlanAction(
  prevState: any,
  formData: FormData
): Promise<{ studyPlan: string | null; error: string | null }> {
  try {
    const input: GenerateStudyPlanInput = {
      lessonContent: formData.get('lessonContent') as string,
      score: Number(formData.get('score')),
      totalQuestions: Number(formData.get('totalQuestions')),
      questions: JSON.parse(formData.get('questions') as string),
    };
    const result = await generateStudyPlan(input);
    return { studyPlan: result.studyPlan, error: null };
  } catch (error: any) {
    console.error('Error generating study plan:', error);
    return {
      studyPlan: null,
      error: error.message || 'Failed to generate the study plan.',
    };
  }
}

export async function markTopicAsCompleteAction(formData: FormData) {
  const topicId = formData.get('topicId') as string;
  const subjectId = formData.get('subjectId') as string;
  const user = await getSession();

  if (!user) {
    return redirect('/');
  }

  try {
    const userRef = adminDb.collection('users').doc(user.id);
    const userDoc = await userRef.get();
    const currentProgress = userDoc.data()?.progress?.completedTopics || [];

    if (!currentProgress.includes(topicId)) {
      const updatedProgress = [...currentProgress, topicId];
      await userRef.set(
        {
          progress: {
            completedTopics: updatedProgress,
          },
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.error('Failed to mark topic as complete', error);
    // Optionally, redirect with an error
  }
  // Revalidate the path to show updated progress on the subject page
  redirect(`/dashboard/topic/${topicId}/lesson`);
}
