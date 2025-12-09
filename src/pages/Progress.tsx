import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { TrendingUp, Calendar, Target, Award, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Progress = () => {
  const [stats, setStats] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalSessions: 0,
    totalMinutes: 0,
    weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    const pomodoroSessions = parseInt(localStorage.getItem("pomodoro-sessions") || "0");
    const checklistHistory = JSON.parse(localStorage.getItem("checklist-history") || "{}");
    const moodHistory = JSON.parse(localStorage.getItem("mood-history") || "{}");
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = new Date();
    const sortedDates = Object.keys(checklistHistory).sort().reverse();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split("T")[0];
      
      if (sortedDates.includes(dateKey) || moodHistory[dateKey]) {
        tempStreak++;
        if (i === 0 || (i === tempStreak - 1)) {
          currentStreak = tempStreak;
        }
        longestStreak = Math.max(longestStreak, tempStreak);
      } else if (i > 0) {
        tempStreak = 0;
      }
    }

    const weeklyProgress = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split("T")[0];
      const saved = localStorage.getItem(`checklist-${dateKey}`);
      if (saved) {
        const completed = JSON.parse(saved);
        const completedCount = Object.values(completed).filter(Boolean).length;
        weeklyProgress.push(completedCount);
      } else {
        weeklyProgress.push(0);
      }
    }

    setStats({
      currentStreak: Math.max(currentStreak, 1),
      longestStreak: Math.max(longestStreak, 1),
      totalSessions: pomodoroSessions,
      totalMinutes: pomodoroSessions * 25,
      weeklyProgress,
    });
  }, []);

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date().getDay();
  const orderedDays = [...dayLabels.slice(today - 6 < 0 ? today + 1 : today - 6), ...dayLabels.slice(0, today + 1)].slice(-7);

  const maxProgress = Math.max(...stats.weeklyProgress, 1);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Your Progress" subtitle="Track your study journey" />

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-soft">
              <CardContent className="pt-6 text-center">
                <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{stats.currentStreak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-soft">
              <CardContent className="pt-6 text-center">
                <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{stats.longestStreak}</p>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-soft">
              <CardContent className="pt-6 text-center">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{stats.totalSessions}</p>
                <p className="text-xs text-muted-foreground">Focus Sessions</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-soft">
              <CardContent className="pt-6 text-center">
                <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{stats.totalMinutes}</p>
                <p className="text-xs text-muted-foreground">Minutes Focused</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-32">
                {stats.weeklyProgress.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(value / maxProgress) * 100}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="w-full bg-primary rounded-t-md min-h-[4px]"
                      style={{ minHeight: value > 0 ? "8px" : "4px" }}
                    />
                    <span className="text-xs text-muted-foreground">{orderedDays[index]}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Tasks completed per day this week
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-6 gradient-love rounded-2xl text-center"
        >
          <p className="text-primary-foreground font-medium">
            Keep going, my love! Every study session brings you closer to your dreams.
          </p>
          <p className="text-primary-foreground/80 text-sm mt-2">- Shabdin</p>
        </motion.div>
      </main>
    </div>
  );
};

export default Progress;
