'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Quiz, Topic, QuizQuestion } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Award, RotateCw, Lightbulb, Loader2, BookCheck } from 'lucide-react';
import Link from 'next/link';
import { getExplanationAction, getStudyPlanAction } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface QuizClientProps {
  quiz: Quiz;
  topic: Topic;
}

interface AnswerResult {
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
}

function Explanation({ isCorrect, ...props }: { isCorrect: boolean, lessonContent: string, question: string, selectedAnswer: string, correctAnswer: string }) {
    const [explanation, setExplanation] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const getExplanation = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('lessonContent', props.lessonContent);
        formData.append('question', props.question);
        formData.append('selectedAnswer', props.selectedAnswer);
        formData.append('correctAnswer', props.correctAnswer);
        const res = await getExplanationAction(null, formData);
        if (res.error) {
            setError(res.error);
        } else if (res.explanation) {
            setExplanation(res.explanation);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!isCorrect) {
            getExplanation();
        }
    }, [isCorrect]);

    if (isCorrect) return null;

    return <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h3 className="font-semibold text-lg flex items-center gap-2"><Lightbulb className="w-5 h-5 text-amber-500"/> Explanation</h3>
        {loading && <div className="flex items-center gap-2 mt-2"><Loader2 className="animate-spin w-4 h-4" /> Loading explanation...</div>}
        {error && <Alert variant="destructive" className="mt-2">{error}</Alert>}
        {explanation && <div className="prose dark:prose-invert max-w-none mt-2" dangerouslySetInnerHTML={{ __html: explanation }} />}
    </div>
}

export function QuizClient({ quiz, topic }: QuizClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<AnswerResult[]>([]);
  const [studyPlan, setStudyPlan] = useState("");
  const [studyPlanError, setStudyPlanError] = useState("");
  const [studyPlanLoading, setStudyPlanLoading] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null) return;
    const isCorrect = currentQuestion.options[selectedOptionIndex].isCorrect;
    setIsAnswered(true);

    if (isCorrect) {
      setScore(score + 1);
    }
    
    const correctAnswer = currentQuestion.options.find(o => o.isCorrect)?.text || "";
    setResults([...results, {
        question: currentQuestion.question,
        selectedAnswer: currentQuestion.options[selectedOptionIndex].text,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect
    }]);

  };
  
  const generateStudyPlan = async (finalScore: number, finalResults: AnswerResult[]) => {
      setStudyPlanLoading(true);
      const res = await getStudyPlanAction({
          lessonContent: topic.lessonContent,
          questions: finalResults,
          score: finalScore,
          totalQuestions: totalQuestions,
      });

      if (res.error) {
          setStudyPlanError(res.error);
      } else if (res.studyPlan) {
          setStudyPlan(res.studyPlan);
      }
      setStudyPlanLoading(false);
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      generateStudyPlan(score, results);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    setResults([]);
    setStudyPlan("");
    setStudyPlanError("");
  }
  
  const currentResult = useMemo(() => {
    if(!isAnswered) return null;
    return results[currentQuestionIndex];
  }, [isAnswered, currentQuestionIndex, results]);

  if (isFinished) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <Award className="w-16 h-16 mx-auto text-yellow-500" />
            <CardTitle className="text-3xl font-headline mt-4">Quiz Completed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground mb-4">You scored</p>
            <p className="text-6xl font-bold text-primary">{score} / {totalQuestions}</p>
            <p className="text-3xl font-semibold mt-2">{percentage}%</p>
          </CardContent>
          <CardFooter className="flex-col gap-4 justify-center mt-2">
              <Button onClick={handleRestart} variant="outline">
                  <RotateCw className="mr-2 h-4 w-4" />
                  Try Again
              </Button>
              <Button asChild>
                <Link href={`/dashboard/topic/${topic.id}`}>Back to Topic</Link>
              </Button>
          </CardFooter>
        </Card>

        { (studyPlan || studyPlanLoading || studyPlanError) &&
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <BookCheck className="w-6 h-6 text-primary"/>
                        Personalized Study Plan
                    </CardTitle>
                    <CardDescription>Based on your quiz results, here are some topics to focus on.</CardDescription>
                </CardHeader>
                <CardContent>
                    {studyPlanLoading && <div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Generating your study plan...</div>}
                    {studyPlanError && <Alert variant="destructive">{studyPlanError}</Alert>}
                    {studyPlan && <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: studyPlan }} />}
                </CardContent>
            </Card>
        }
      </div>
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
        
        {isAnswered && currentResult && <Explanation 
            isCorrect={currentResult.isCorrect} 
            lessonContent={topic.lessonContent} 
            question={currentResult.question}
            selectedAnswer={currentResult.selectedAnswer}
            correctAnswer={currentResult.correctAnswer}
        />}


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
