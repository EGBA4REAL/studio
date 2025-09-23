'use server';

import { createSession, deleteSession } from '@/lib/auth';
import { getTopicById, updateTopicContent } from '@/lib/curriculum-api';
import { redirect } from 'next/navigation';
import { generateQuizFromLesson } from '@/ai/flows/generate-quiz-from-lesson';
import { answerLessonQuestion } from '@/ai/flows/answer-lesson-question';
import { explainIncorrectAnswer } from '@/ai/flows/explain-incorrect-answer';
import { generateLessonFromTitle } from '@/ai/flows/generate-lesson-from-title';
import { generateStudyPlan } from '@/ai/flows/generate-study-plan';
import type { GenerateStudyPlanInput } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function signIn(idToken: string) {
  await createSession(idToken);
  redirect('/dashboard');
}

export async function signOut() {
  await deleteSession();
  redirect('/');
}

export async function generateLessonAction(formData: FormData) {
  const topicId = formData.get('topicId') as string;
  const topicTitle = formData.get('topicTitle') as string;

  if (!topicId || !topicTitle) {
    throw new Error('Topic ID and title are required');
  }

  try {
    const { lessonContent } = await generateLessonFromTitle({ topicTitle });
    await updateTopicContent(topicId, lessonContent);
    revalidatePath(`/dashboard/topic/${topicId}/lesson`);
  } catch (error) {
    console.error('Failed to generate lesson:', error);
    // You could redirect with an error param here if you want to show a message
  }
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
    const quizData = await generateQuizFromLesson({
      lessonContent: topic.lessonContent,
    });
    
    // The flow now returns a JSON object, so we stringify it
    const encodedQuiz = encodeURIComponent(JSON.stringify(quizData.quiz));
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

export async function askQuestionAction(prevState: any, formData: FormData) {
  const userQuestion = formData.get('userQuestion') as string;
  const lessonContent = formData.get('lessonContent') as string;

  if (!userQuestion || !lessonContent) {
    return {
      ...prevState,
      answer: '<p>Please enter a question.</p>',
      error: 'Missing question or lesson content.'
    };
  }

  try {
    const { answer } = await answerLessonQuestion({ lessonContent, userQuestion });
    return {
      ...prevState,
      answer: answer,
      error: null,
    }
  } catch (error) {
    console.error('Failed to get answer:', error);
    return {
      ...prevState,
      answer: null,
      error: 'Sorry, I was unable to get an answer. Please try again.'
    }
  }
}

export async function getExplanationAction(prevState: any, formData: FormData) {
    const lessonContent = formData.get('lessonContent') as string;
    const question = formData.get('question') as string;
    const selectedAnswer = formData.get('selectedAnswer') as string;
    const correctAnswer = formData.get('correctAnswer') as string;

    if (!lessonContent || !question || !selectedAnswer || !correctAnswer) {
        return { error: "Missing required fields for explanation." };
    }

    try {
        const { explanation } = await explainIncorrectAnswer({
            lessonContent,
            question,
            selectedAnswer,
            correctAnswer
        });
        return { explanation };
    } catch(e) {
        console.error("Error getting explanation", e);
        return { error: "Could not load explanation." }
    }
}


export async function getStudyPlanAction(prevState: any, formData: FormData) {
  try {
    const input: GenerateStudyPlanInput = {
      lessonContent: formData.get('lessonContent') as string,
      score: parseInt(formData.get('score') as string),
      totalQuestions: parseInt(formData.get('totalQuestions') as string),
      questions: JSON.parse(formData.get('questions') as string),
    };

     if (!input.lessonContent || isNaN(input.score) || isNaN(input.totalQuestions) || !input.questions) {
        return { error: "Missing required fields for study plan." };
    }

    const { studyPlan } = await generateStudyPlan(input);
    return { studyPlan };

  } catch(e) {
      console.error("Error getting study plan", e);
      return { error: "Could not load study plan." }
  }
}
