import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { dailyChecklist } from "@/data/scheduleData";
import { motion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const Checklist = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const isSunday = today === "Sunday";
  const dateKey = new Date().toISOString().split("T")[0];

  const [completed, setCompleted] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem(`checklist-${dateKey}`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(`checklist-${dateKey}`, JSON.stringify(completed));
  }, [completed, dateKey]);

  const toggleItem = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecklist = () => {
    setCompleted({});
  };

  const visibleItems = dailyChecklist.filter(
    (item) => !item.sundayOnly || isSunday
  );

  const completedCount = visibleItems.filter((item) => completed[item.id]).length;
  const progress = (completedCount / visibleItems.length) * 100;

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Daily Tasks" subtitle={`${today}'s Checklist`} />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Progress
            </span>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{visibleItems.length} completed
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-love rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Checklist Items */}
        <div className="space-y-3">
          {visibleItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleItem(item.id)}
              className={cn(
                "w-full flex items-start gap-4 p-4 bg-card rounded-xl shadow-soft transition-all duration-300 text-left",
                completed[item.id] && "opacity-70"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                  completed[item.id]
                    ? "bg-primary border-primary"
                    : "border-border"
                )}
              >
                {completed[item.id] && (
                  <Check className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className={cn(
                      "text-sm font-medium text-foreground transition-all duration-300",
                      completed[item.id] && "line-through text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Reset Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={resetChecklist}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Today's Checklist
          </button>
        </motion.div>

        {/* Motivation */}
        {completedCount === visibleItems.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-6 gradient-love rounded-2xl text-center"
          >
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-primary-foreground font-medium">
              Amazing work, my love! You've completed all your tasks today!
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Checklist;
