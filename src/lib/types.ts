
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  subscription?: {
    status: 'free' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    // Add more subscription details here later, like expiry date
  };
  progress?: {
    completedTopics: string[];
  };
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


// AI Flow Types

// answer-lesson-question
export interface AnswerLessonQuestionInput {
  lessonContent: string;
  userQuestion: string;
};
export interface AnswerLessonQuestionOutput {
  answer: string;
};


// explain-incorrect-answer
export interface ExplainIncorrectAnswerInput {
  lessonContent: string;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
};
export interface ExplainIncorrectAnswerOutput {
  explanation: string;
};


// generate-lesson-from-title
export interface GenerateLessonFromTitleInput {
  topicTitle: string;
};
export interface GenerateLessonFromTitleOutput {
  lessonContent: string;
};


// generate-quiz-from-lesson
export interface GenerateQuizFromLessonInput {
  lessonContent: string;
};
export interface GenerateQuizFromLessonOutput {
  quiz: Quiz;
};


// generate-study-plan
export interface GenerateStudyPlanInput {
  lessonContent: string;
  questions: {
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
  score: number;
  totalQuestions: number;
};
export interface GenerateStudyPlanOutput {
  studyPlan: string;
};
