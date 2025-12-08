import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Heart, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ReunionCountdown = () => {
  const [reunionDate, setReunionDate] = useState<string>(() => {
    return localStorage.getItem("reunionDate") || "";
  });
  const [isEditing, setIsEditing] = useState(!reunionDate);
  const [tempDate, setTempDate] = useState(reunionDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (!reunionDate) return;

    const calculateTimeLeft = () => {
      const difference = new Date(reunionDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [reunionDate]);

  const handleSave = () => {
    if (tempDate) {
      setReunionDate(tempDate);
      localStorage.setItem("reunionDate", tempDate);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempDate(reunionDate);
    setIsEditing(false);
  };

  const isPast = reunionDate && new Date(reunionDate).getTime() < new Date().getTime();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-6 bg-gradient-to-br from-primary/10 via-accent to-primary/5 rounded-3xl shadow-soft border border-primary/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" fill="currentColor" />
          <h3 className="font-semibold text-foreground">Until We Meet Again</h3>
        </div>
        {!isEditing && reunionDate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-muted-foreground hover:text-primary"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Set reunion date:</span>
          </div>
          <Input
            type="date"
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
            className="bg-background/50"
            min={new Date().toISOString().split("T")[0]}
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm" className="flex-1">
              <Check className="w-4 h-4 mr-1" />
              Save
            </Button>
            {reunionDate && (
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      ) : isPast ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center py-4"
        >
          <Heart className="w-12 h-12 text-primary mx-auto mb-2 animate-heart-beat" fill="currentColor" />
          <p className="text-lg font-medium text-primary">We're together! 💕</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="mt-2 text-muted-foreground"
          >
            Set next reunion
          </Button>
        </motion.div>
      ) : timeLeft ? (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Min" },
              { value: timeLeft.seconds, label: "Sec" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-3 bg-background/60 rounded-xl backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-primary tabular-nums">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Every second counts, my love 💕
          </p>
        </div>
      ) : (
        <div className="text-center py-4">
          <Calendar className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Set a date and start counting down!
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="mt-3"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Set Reunion Date
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default ReunionCountdown;
