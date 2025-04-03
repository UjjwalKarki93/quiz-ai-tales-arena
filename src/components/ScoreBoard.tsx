
import { Progress } from "@/components/ui/progress";
import { Trophy, Timer, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreBoardProps {
  score: number;
  totalQuestions: number;
  currentQuestion: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeElapsed: number;
  className?: string;
}

export function ScoreBoard({
  score,
  totalQuestions,
  currentQuestion,
  correctAnswers,
  incorrectAnswers,
  timeElapsed,
  className
}: ScoreBoardProps) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const accuracy = totalQuestions > 0 ? (correctAnswers / currentQuestion) * 100 : 0;
  
  return (
    <div className={cn("bg-white rounded-lg shadow-md p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-trivia-dark">Quiz Progress</h3>
        <div className="flex items-center gap-1">
          <Trophy className="w-4 h-4 text-trivia-yellow" />
          <span className="font-bold text-trivia-purple">{score}</span>
          <span className="text-sm text-gray-500">pts</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>{currentQuestion} of {totalQuestions} Questions</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <div className="flex justify-between text-sm mb-6">
        <div className="flex items-center gap-1">
          <Check className="w-4 h-4 text-green-500" />
          <span>{correctAnswers}</span>
        </div>
        <div className="flex items-center gap-1">
          <X className="w-4 h-4 text-red-500" />
          <span>{incorrectAnswers}</span>
        </div>
        <div className="flex items-center gap-1">
          <Timer className="w-4 h-4 text-gray-500" />
          <span>{formatTime(timeElapsed)}</span>
        </div>
      </div>
      
      <div className="text-xs text-center text-gray-500">
        Accuracy: {isNaN(accuracy) ? 0 : Math.round(accuracy)}%
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
