
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, Award, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-trivia-purple/10 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-4xl md:text-5xl font-bold text-trivia-purple">
              Trivia Challenge
            </CardTitle>
            <CardDescription className="text-xl">
              Test your knowledge with our fun trivia quiz!
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <FeatureCard 
                icon={<Brain className="w-10 h-10 text-trivia-purple" />}
                title="Test Your Knowledge"
                description="Challenge yourself with questions from various categories and difficulty levels."
              />
              <FeatureCard 
                icon={<Award className="w-10 h-10 text-trivia-purple" />}
                title="Earn Points"
                description="Score points for correct answers. The faster you answer, the more you earn!"
              />
              <FeatureCard 
                icon={<Clock className="w-10 h-10 text-trivia-purple" />}
                title="Beat the Clock"
                description="Race against time to answer questions before the timer runs out."
              />
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">How to Play:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Click "Start Quiz" to begin the challenge</li>
                <li>Read each question carefully and select your answer</li>
                <li>Answer quickly for bonus points</li>
                <li>Complete all questions to see your final score</li>
                <li>Share your results with friends or try again to beat your score!</li>
              </ol>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center pb-8">
            <Link to="/quiz">
              <Button size="lg" className="bg-trivia-purple hover:bg-trivia-purple/90 text-lg px-8 py-6 group">
                Start Quiz <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© 2023 Trivia Challenge. All questions are AI-generated.</p>
        </footer>
      </motion.div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
