import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Coffee, BookOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MotivationalQuote from "@/components/MotivationalQuote";

type TimerMode = "focus" | "shortBreak" | "longBreak";

const timerModes = {
  focus: { duration: 25 * 60, label: "Focus Time", color: "text-primary" },
  shortBreak: { duration: 5 * 60, label: "Short Break", color: "text-green-500" },
  longBreak: { duration: 15 * 60, label: "Long Break", color: "text-blue-500" },
};

const Timer = () => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(timerModes.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    const saved = localStorage.getItem("pomodoro-sessions");
    return saved ? parseInt(saved) : 0;
  });
  const [showQuote, setShowQuote] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (mode === "focus") {
      const newSessions = sessionsCompleted + 1;
      setSessionsCompleted(newSessions);
      localStorage.setItem("pomodoro-sessions", newSessions.toString());
      setShowQuote(true);
      
      if (newSessions % 4 === 0) {
        setMode("longBreak");
        setTimeLeft(timerModes.longBreak.duration);
      } else {
        setMode("shortBreak");
        setTimeLeft(timerModes.shortBreak.duration);
      }
    } else {
      setMode("focus");
      setTimeLeft(timerModes.focus.duration);
      setShowQuote(false);
    }
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerModes[mode].duration);
  };

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(timerModes[newMode].duration);
    setShowQuote(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((timerModes[mode].duration - timeLeft) / timerModes[mode].duration) * 100;

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Study Timer" subtitle="Pomodoro Focus Sessions" />

      <main className="px-4 py-6 max-w-lg mx-auto">
        <div className="flex justify-center gap-2 mb-8">
          {(Object.keys(timerModes) as TimerMode[]).map((m) => (
            <Button
              key={m}
              variant={mode === m ? "default" : "outline"}
              size="sm"
              onClick={() => switchMode(m)}
              data-testid={`button-mode-${m}`}
              className="text-xs"
            >
              {m === "focus" ? (
                <BookOpen className="w-3 h-3 mr-1" />
              ) : (
                <Coffee className="w-3 h-3 mr-1" />
              )}
              {timerModes[m].label}
            </Button>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-64 h-64 mx-auto mb-8"
        >
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
              strokeLinecap="round"
              className={cn("transition-all duration-1000", timerModes[mode].color)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-5xl font-bold", timerModes[mode].color)}>
              {formatTime(timeLeft)}
            </span>
            <span className="text-sm text-muted-foreground mt-2">
              {timerModes[mode].label}
            </span>
          </div>
        </motion.div>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            size="lg"
            onClick={toggleTimer}
            data-testid="button-toggle-timer"
            className="w-32"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 mr-2" /> Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" /> Start
              </>
            )}
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={resetTimer}
            data-testid="button-reset-timer"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 bg-card rounded-xl shadow-soft text-center mb-6">
          <p className="text-3xl font-bold text-primary">{sessionsCompleted}</p>
          <p className="text-sm text-muted-foreground">Focus sessions completed today</p>
        </div>

        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MotivationalQuote />
            </motion.div>
          )}
        </AnimatePresence>

        {!showQuote && mode === "focus" && (
          <div className="p-4 bg-accent rounded-xl text-center">
            <p className="text-sm text-accent-foreground">
              Complete a focus session to receive an inspirational quote!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Timer;
