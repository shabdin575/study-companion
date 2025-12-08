import { useState } from "react";
import Header from "@/components/Header";
import DaySchedule from "@/components/DaySchedule";
import { weekSchedule } from "@/data/scheduleData";
import { motion } from "framer-motion";

const Schedule = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [expandedDay, setExpandedDay] = useState<string | null>(today);

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Weekly Schedule" subtitle="BSc (NQ) Study Timetable" />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {[
            { label: "MA", color: "bg-course-math" },
            { label: "PH", color: "bg-course-physics" },
            { label: "BI", color: "bg-course-biology" },
            { label: "CH", color: "bg-course-chemistry" },
            { label: "CS", color: "bg-course-computing" },
            { label: "LA", color: "bg-course-communication" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Schedule Cards */}
        <div className="space-y-3">
          {weekSchedule.map((schedule, index) => (
            <DaySchedule
              key={schedule.day}
              day={schedule.day}
              focus={schedule.focus}
              blocks={schedule.blocks}
              isToday={schedule.day === today}
              isExpanded={expandedDay === schedule.day}
              onToggle={() => toggleDay(schedule.day)}
            />
          ))}
        </div>

        {/* Study Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-course-chemistry-light border-l-4 border-course-chemistry rounded-xl"
        >
          <p className="text-sm text-foreground">
            <strong>Note:</strong> The 17:00-20:00 block is essential for dinner, rest, and preparation.
            The 20:50-21:10 slot is a mandatory break for mental recovery.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Schedule;
