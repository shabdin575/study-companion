import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface TimeBlock {
  time: string;
  subject: string;
  code: string;
  task: string;
  course: "math" | "physics" | "biology" | "chemistry" | "computing" | "communication" | "break" | "sabbath";
}

interface DayScheduleProps {
  day: string;
  focus: string;
  blocks: TimeBlock[];
  isToday?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const courseColors: Record<string, { bg: string; border: string; dot: string }> = {
  math: { bg: "bg-course-math-light", border: "border-course-math", dot: "bg-course-math" },
  physics: { bg: "bg-course-physics-light", border: "border-course-physics", dot: "bg-course-physics" },
  biology: { bg: "bg-course-biology-light", border: "border-course-biology", dot: "bg-course-biology" },
  chemistry: { bg: "bg-course-chemistry-light", border: "border-course-chemistry", dot: "bg-course-chemistry" },
  computing: { bg: "bg-course-computing-light", border: "border-course-computing", dot: "bg-course-computing" },
  communication: { bg: "bg-course-communication-light", border: "border-course-communication", dot: "bg-course-communication" },
  break: { bg: "bg-muted/50", border: "border-muted", dot: "bg-muted-foreground" },
  sabbath: { bg: "bg-accent", border: "border-primary", dot: "bg-primary" },
};

const DaySchedule = ({ day, focus, blocks, isToday, isExpanded, onToggle }: DayScheduleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-card rounded-2xl shadow-soft overflow-hidden transition-all duration-300",
        isToday && "ring-2 ring-primary ring-offset-2"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{day}</h3>
            {isToday && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                Today
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{focus}</p>
        </div>
        <ChevronRight
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-300",
            isExpanded && "rotate-90"
          )}
        />
      </button>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pb-4"
        >
          <div className="space-y-2">
            {blocks.map((block, index) => {
              const colors = courseColors[block.course];
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-xl border-l-4",
                    colors.bg,
                    colors.border
                  )}
                >
                  <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", colors.dot)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">{block.time}</span>
                      <span className="text-xs font-semibold text-foreground">{block.code}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground mt-1">{block.subject}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{block.task}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DaySchedule;
