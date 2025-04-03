
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTimer } from '@/hooks/useTimer';
import { toast } from "@/components/ui/sonner";
import { Question } from '@/data/questions';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  currentQuestionNumber: number;
  totalQuestions: number;
  timePerQuestion?: number;
}

export function QuestionCard({ 
  question, 
  onAnswer, 
  currentQuestionNumber, 
  totalQuestions,
  timePerQuestion = 15
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | null>(null);
  
  const { time, timePercentage, startTimer, resetTimer } = useTimer({
    initialTime: timePerQuestion,
    onTimeUp: () => {
      if (!isAnswered) {
        handleAnswer('');
        toast("Time's up!", {
          description: "You ran out of time on this question."
        });
      }
    }
  });

  useEffect(() => {
    resetTimer();
    startTimer();
    setSelectedOption(null);
    setIsAnswered(false);
    setAnswerStatus(null);
  }, [question, resetTimer, startTimer]);

  const handleAnswer = (selected: string) => {
    if (isAnswered) return;
    
    setSelectedOption(selected);
    setIsAnswered(true);
    
    const isCorrect = selected === question.correctAnswer;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-500">
            Question {currentQuestionNumber}/{totalQuestions}
          </div>
          <div className="text-sm font-semibold">
            {question.category} ({question.difficulty})
          </div>
        </div>
        <CardTitle className="text-xl md:text-2xl">
          {question.question}
        </CardTitle>
        <div className="mt-2">
          <Progress value={timePercentage} 
            className={cn(
              "h-2 transition-colors",
              timePercentage > 60 ? "bg-green-100" : 
              timePercentage > 30 ? "bg-yellow-100" : 
              "bg-red-100"
            )} 
          />
          <div className="text-right text-sm mt-1">{time}s</div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {question.options.map((option) => (
          <Button
            key={option}
            variant={
              !isAnswered ? "outline" :
              option === question.correctAnswer ? "default" :
              option === selectedOption ? "destructive" : "outline"
            }
            className={cn(
              "justify-start text-left h-auto py-4 transition-all",
              !isAnswered && "hover:bg-muted/50",
              !isAnswered && option === selectedOption && "ring-2 ring-primary",
              isAnswered && option === question.correctAnswer && "bg-green-500 text-white hover:bg-green-500",
              isAnswered && option === selectedOption && option !== question.correctAnswer && "bg-red-500 text-white hover:bg-red-500"
            )}
            onClick={() => handleAnswer(option)}
            disabled={isAnswered}
          >
            {option}
          </Button>
        ))}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground pt-0">
        {answerStatus === 'correct' && (
          <p className="text-green-600 font-semibold">Correct! Well done.</p>
        )}
        {answerStatus === 'incorrect' && (
          <p className="text-red-600 font-semibold">
            Incorrect. The correct answer is: {question.correctAnswer}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
