import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { moodOptions } from "@/data/scheduleData";
import { Smile, Frown, Meh, Battery, AlertCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const moodIcons: Record<string, typeof Smile> = {
  amazing: Smile,
  happy: Smile,
  okay: Meh,
  tired: Battery,
  stressed: AlertCircle,
};

const MoodTracker = () => {
  const dateKey = new Date().toISOString().split("T")[0];
  const [selectedMood, setSelectedMood] = useState<string | null>(() => {
    return localStorage.getItem(`mood-${dateKey}`);
  });
  const [moodHistory, setMoodHistory] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("mood-history");
    return saved ? JSON.parse(saved) : {};
  });

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    localStorage.setItem(`mood-${dateKey}`, moodId);
    
    const newHistory = { ...moodHistory, [dateKey]: moodId };
    setMoodHistory(newHistory);
    localStorage.setItem("mood-history", JSON.stringify(newHistory));
  };

  const recentMoods = Object.entries(moodHistory)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 7);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">How are you feeling today?</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {moodOptions.map((mood) => {
          const Icon = moodIcons[mood.id] || Meh;
          return (
            <motion.button
              key={mood.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelect(mood.id)}
              data-testid={`button-mood-${mood.id}`}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 min-w-[100px]",
                selectedMood === mood.id
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-card shadow-soft hover:shadow-card"
              )}
            >
              <Icon className={cn("w-5 h-5", selectedMood !== mood.id && mood.color)} />
              <span className="text-sm font-medium">{mood.label}</span>
            </motion.button>
          );
        })}
      </div>

      {selectedMood && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-muted-foreground mt-2"
        >
          Thanks for sharing! Remember, Shabdin is always cheering for you.
        </motion.p>
      )}

      {recentMoods.length > 1 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Recent moods:</p>
          <div className="flex gap-2">
            {recentMoods.map(([date, moodId]) => {
              const mood = moodOptions.find(m => m.id === moodId);
              const Icon = moodIcons[moodId] || Meh;
              return (
                <div
                  key={date}
                  className="flex flex-col items-center gap-1"
                  title={`${date}: ${mood?.label}`}
                >
                  <Icon className={cn("w-4 h-4", mood?.color)} />
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(date).getDate()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
