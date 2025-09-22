'use client';

import { useState } from 'react';
import type { Quiz } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Award, RotateCw } from 'lucide-react';
import Link from 'next/link';

interface QuizClientProps {
  quiz: Quiz;
  topicId: string;
}

export function QuizClient({ quiz, topicId }: QuizClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null) return;
    setIsAnswered(true);
    if (currentQuestion.options[selectedOptionIndex].isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  }

  if (isFinished) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <Award className="w-16 h-16 mx-auto text-yellow-500" />
          <CardTitle className="text-3xl font-headline mt-4">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg text-muted-foreground mb-4">You scored</p>
          <p className="text-6xl font-bold text-primary">{score} / {totalQuestions}</p>
          <p className="text-3xl font-semibold mt-2">{percentage}%</p>
          <div className="flex gap-4 justify-center mt-8">
            <Button onClick={handleRestart} variant="outline">
                <RotateCw className="mr-2 h-4 w-4" />
                Try Again
            </Button>
            <Button asChild>
              <Link href={`/dashboard/topic/${topicId}`}>Back to Topic</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
            <CardTitle className="font-headline text-2xl">Quiz Time!</CardTitle>
            <div className="text-sm font-medium text-muted-foreground">
                Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>
        </div>
        <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="w-full" />
      </CardHeader>
      <CardContent>
        <h2 className="text-lg md:text-xl font-semibold mb-6 text-center">{currentQuestion.question}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOptionIndex === index;
            const isCorrect = option.isCorrect;
            const showAsCorrect = isAnswered && isCorrect;
            const showAsIncorrect = isAnswered && isSelected && !isCorrect;

            return (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  'h-auto py-4 justify-start text-left whitespace-normal relative',
                  isSelected && 'ring-2 ring-primary',
                  showAsCorrect && 'bg-green-100 border-green-500 text-green-800 hover:bg-green-100',
                  showAsIncorrect && 'bg-red-100 border-red-500 text-red-800 hover:bg-red-100'
                )}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
              >
                {option.text}
                {showAsCorrect && <CheckCircle className="absolute right-4 w-5 h-5 text-green-600" />}
                {showAsIncorrect && <XCircle className="absolute right-4 w-5 h-5 text-red-600" />}
              </Button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          {isAnswered ? (
            <Button onClick={handleNextQuestion} size="lg">
              {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          ) : (
            <Button onClick={handleSubmitAnswer} size="lg" disabled={selectedOptionIndex === null}>
              Submit Answer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
