
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { AdBanner } from './AdBanner';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
  countdown?: number;
}

export function InterstitialAd({ isOpen, onClose, countdown = 5 }: InterstitialAdProps) {
  const [timeRemaining, setTimeRemaining] = useState(countdown);
  
  useEffect(() => {
    let timer: number;
    
    if (isOpen && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // Auto-close after countdown reaches zero
      // But leave this commented for now to let users manually close
      // onClose();
    }
    
    return () => {
      clearInterval(timer);
      setTimeRemaining(countdown);
    };
  }, [isOpen, timeRemaining, countdown, onClose]);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <div className="absolute right-4 top-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            disabled={timeRemaining > 0}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium">
            {timeRemaining > 0 ? `Continue in ${timeRemaining}s` : 'Continue to Results'}
          </h3>
          <p className="text-sm text-muted-foreground">Your quiz results are ready</p>
        </div>
        
        <AdBanner 
          slot="quiz-interstitial" 
          format="rectangle" 
          className="w-full max-w-sm mx-auto"
          style={{ minHeight: '250px' }}
        />
        
        <div className="mt-4 flex justify-center">
          <Button 
            onClick={onClose} 
            disabled={timeRemaining > 0}
            className="mt-2"
          >
            {timeRemaining > 0 ? `Skip in ${timeRemaining}s` : 'Continue to Results'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
