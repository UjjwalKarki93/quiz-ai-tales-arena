
import { useState, useEffect, useCallback } from 'react';

interface UseTimerProps {
  initialTime: number;
  onTimeUp?: () => void;
}

export function useTimer({ initialTime, onTimeUp }: UseTimerProps) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  
  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);
  
  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);
  
  const resetTimer = useCallback((newTime = initialTime) => {
    setTime(newTime);
    setIsRunning(false);
  }, [initialTime]);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning && time > 0) {
      interval = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            onTimeUp && onTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time, onTimeUp]);
  
  return {
    time,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    timePercentage: (time / initialTime) * 100
  };
}
