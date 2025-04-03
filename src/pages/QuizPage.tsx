
import { useState, useEffect, useCallback } from 'react';
import { QuestionCard } from '@/components/QuestionCard';
import { ScoreBoard } from '@/components/ScoreBoard';
import { ResultPage } from '@/components/ResultPage';
import { questions } from '@/data/questions';
import { shuffle } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdBanner } from '@/components/AdBanner';
import { InterstitialAd } from '@/components/InterstitialAd';

// Number of questions in the quiz
const QUIZ_SIZE = 10;

export default function QuizPage() {
  const [quizQuestions, setQuizQuestions] = useState(shuffle(questions).slice(0, QUIZ_SIZE));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [skippedAnswers, setSkippedAnswers] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  
  // Timer effect
  useEffect(() => {
    let timer: number;
    if (!quizComplete) {
      timer = window.setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [quizComplete]);
  
  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      // Calculate points based on difficulty
      const question = quizQuestions[currentQuestionIndex];
      let points = question.difficulty === 'easy' ? 10 : 
                  question.difficulty === 'medium' ? 20 : 30;
      
      setScore(prevScore => prevScore + points);
      setCorrectAnswers(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => prev + 1);
    }
    
    // Move to next question or end quiz
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        // Show interstitial ad before showing results
        setShowInterstitial(true);
      }
    }, 500);
  }, [currentQuestionIndex, quizQuestions]);
  
  const handleInterstitialClose = () => {
    setShowInterstitial(false);
    setQuizComplete(true);
  };
  
  const restartQuiz = useCallback(() => {
    setQuizQuestions(shuffle(questions).slice(0, QUIZ_SIZE));
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setSkippedAnswers(0);
    setTimeElapsed(0);
    setQuizComplete(false);
  }, []);
  
  if (quizComplete) {
    return (
      <ResultPage 
        score={score}
        totalQuestions={quizQuestions.length}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        skippedAnswers={skippedAnswers}
        timeElapsed={timeElapsed}
        onPlayAgain={restartQuiz}
      />
    );
  }
  
  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-trivia-purple/5 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Top banner ad */}
        <AdBanner 
          slot="quiz-top-banner" 
          format="horizontal" 
          className="w-full mb-4 bg-white rounded-lg shadow-sm p-1"
        />
        
        <header className="mb-6 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-trivia-purple">Trivia Challenge</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <QuestionCard 
              question={quizQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              currentQuestionNumber={currentQuestionIndex + 1}
              totalQuestions={quizQuestions.length}
              timePerQuestion={20}
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <ScoreBoard 
              score={score}
              totalQuestions={quizQuestions.length}
              currentQuestion={currentQuestionIndex + 1}
              correctAnswers={correctAnswers}
              incorrectAnswers={incorrectAnswers}
              timeElapsed={timeElapsed}
              className="h-fit"
            />
            
            {/* Sidebar ad placeholder */}
            <div className="hidden lg:block">
              <AdBanner 
                slot="quiz-sidebar" 
                format="vertical" 
                className="w-full bg-white rounded-lg shadow-sm p-1 mt-4"
                style={{ minHeight: '600px' }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Interstitial ad before results */}
      <InterstitialAd 
        isOpen={showInterstitial} 
        onClose={handleInterstitialClose} 
        countdown={5}
      />
    </div>
  );
}
