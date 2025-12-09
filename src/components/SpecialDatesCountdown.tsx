import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Cake, Calendar } from "lucide-react";
import { specialDates } from "@/data/scheduleData";
import { differenceInDays, format, isPast, addYears } from "date-fns";

const iconMap: Record<string, typeof Heart> = {
  heart: Heart,
  sparkles: Sparkles,
  cake: Cake,
};

const SpecialDatesCountdown = () => {
  const [dates, setDates] = useState(specialDates);

  const getNextOccurrence = (dateStr: string) => {
    let date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    while (isPast(date) && differenceInDays(today, date) > 0) {
      date = addYears(date, 1);
    }
    return date;
  };

  const sortedDates = [...dates]
    .map(d => ({
      ...d,
      nextDate: getNextOccurrence(d.date),
    }))
    .sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime());

  return (
    <div className="space-y-3">
      {sortedDates.map((item, index) => {
        const Icon = iconMap[item.icon] || Calendar;
        const daysUntil = differenceInDays(item.nextDate, new Date());
        const isToday = daysUntil === 0;
        const isSoon = daysUntil <= 7;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-4 p-4 rounded-xl ${
              isToday ? "gradient-love" : "bg-card shadow-soft"
            }`}
          >
            <div className={`p-2 rounded-lg ${isToday ? "bg-white/20" : "bg-accent"}`}>
              <Icon className={`w-5 h-5 ${isToday ? "text-white" : "text-primary"}`} />
            </div>
            <div className="flex-1">
              <p className={`font-medium ${isToday ? "text-white" : "text-foreground"}`}>
                {item.name}
              </p>
              <p className={`text-xs ${isToday ? "text-white/80" : "text-muted-foreground"}`}>
                {format(item.nextDate, "MMMM d, yyyy")}
              </p>
            </div>
            <div className={`text-right ${isToday ? "text-white" : ""}`}>
              {isToday ? (
                <span className="text-lg font-bold">Today!</span>
              ) : (
                <>
                  <span className={`text-2xl font-bold ${isSoon ? "text-primary" : ""}`}>
                    {daysUntil}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">days</span>
                </>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SpecialDatesCountdown;
