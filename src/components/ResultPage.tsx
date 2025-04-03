
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Award, Clock, RefreshCcw, Home, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { affiliateLinks } from "@/data/affiliateLinks";
import { AdBanner } from "@/components/AdBanner";

interface ResultPageProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  timeElapsed: number;
  onPlayAgain: () => void;
}

export function ResultPage({
  score,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  skippedAnswers,
  timeElapsed,
  onPlayAgain
}: ResultPageProps) {
  const navigate = useNavigate();
  const accuracy = (correctAnswers / totalQuestions) * 100;
  
  let message = "Well done!";
  if (accuracy >= 90) message = "Outstanding performance!";
  else if (accuracy >= 70) message = "Great job!";
  else if (accuracy >= 50) message = "Good effort!";
  else message = "Keep practicing!";
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-trivia-purple/10 to-white">
      {/* Top banner ad */}
      <AdBanner 
        slot="results-top-banner" 
        format="horizontal" 
        className="w-full max-w-4xl mb-6 bg-white rounded-lg shadow-sm p-1"
      />
      
      <Card className="w-full max-w-2xl shadow-lg animate-fade-in">
        <CardHeader className="text-center bg-trivia-purple text-white rounded-t-lg">
          <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-2">
            <Trophy className="w-8 h-8 text-trivia-yellow" />
            Quiz Complete!
          </CardTitle>
          <p className="text-lg md:text-xl">{message}</p>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard 
              icon={<Trophy className="w-6 h-6 text-trivia-yellow" />}
              title="Final Score"
              value={`${score} pts`}
              detail={`${Math.round(accuracy)}% accuracy`}
            />
            
            <StatCard 
              icon={<Award className="w-6 h-6 text-green-500" />}
              title="Questions"
              value={`${correctAnswers}/${totalQuestions}`}
              detail={`${incorrectAnswers} wrong, ${skippedAnswers} skipped`}
            />
            
            <StatCard 
              icon={<Clock className="w-6 h-6 text-blue-500" />}
              title="Time"
              value={formatTime(timeElapsed)}
              detail={`${Math.round(timeElapsed/totalQuestions)}s per question`}
            />
          </div>
          
          {/* In-content ad */}
          <AdBanner 
            slot="results-in-content" 
            format="rectangle" 
            className="w-full max-w-md mx-auto my-6 bg-white rounded-lg shadow-sm p-1"
          />
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Recommended Resources Based on Your Results:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {affiliateLinks.map((item, index) => (
                <a 
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="border rounded-lg p-4 h-full transition-all hover:shadow-md hover:border-trivia-purple/50">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover rounded mb-2" />
                    <h4 className="font-semibold group-hover:text-trivia-purple flex items-center">
                      {item.title} 
                      <ExternalLink className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100" />
                    </h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex gap-4 justify-center pt-2 pb-6">
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" /> Home
          </Button>
          <Button onClick={onPlayAgain} className="bg-trivia-purple hover:bg-trivia-purple/90">
            <RefreshCcw className="mr-2 h-4 w-4" /> Play Again
          </Button>
        </CardFooter>
      </Card>
      
      {/* Bottom banner ad */}
      <AdBanner 
        slot="results-bottom-banner" 
        format="horizontal" 
        className="w-full max-w-4xl mt-6 bg-white rounded-lg shadow-sm p-1"
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
}

function StatCard({ icon, title, value, detail }: StatCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-500">{detail}</p>
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}
