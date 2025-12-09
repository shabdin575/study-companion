import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Timer, 
  Camera, 
  TrendingUp, 
  FileText, 
  Heart,
  Moon,
  Sun,
  ChevronRight,
  Sparkles
} from "lucide-react";
import MoodTracker from "@/components/MoodTracker";
import SpecialDatesCountdown from "@/components/SpecialDatesCountdown";
import MotivationalQuote from "@/components/MotivationalQuote";

const More = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const features = [
    { to: "/timer", icon: Timer, label: "Study Timer", description: "Pomodoro focus sessions", color: "text-primary" },
    { to: "/gallery", icon: Camera, label: "Photo Gallery", description: "Our precious memories", color: "text-pink-500" },
    { to: "/progress", icon: TrendingUp, label: "Progress", description: "Track your journey", color: "text-green-500" },
    { to: "/notes", icon: FileText, label: "Notes", description: "Quick study notes", color: "text-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="More Features" subtitle="Everything you need" />

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsDark(!isDark)}
          data-testid="button-theme-toggle"
          className="w-full flex items-center justify-between p-4 bg-card rounded-xl shadow-soft"
        >
          <div className="flex items-center gap-3">
            {isDark ? (
              <Moon className="w-5 h-5 text-blue-400" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
            <div className="text-left">
              <p className="font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">
                {isDark ? "Currently on" : "Currently off"}
              </p>
            </div>
          </div>
          <div
            className={`w-12 h-6 rounded-full transition-colors ${
              isDark ? "bg-primary" : "bg-muted"
            }`}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-md mt-0.5"
              animate={{ x: isDark ? 26 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </motion.button>

        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={feature.to}
                data-testid={`link-${feature.to.slice(1)}`}
                className="flex flex-col items-center p-5 bg-card rounded-xl shadow-soft hover:shadow-card transition-shadow text-center"
              >
                <feature.icon className={`w-8 h-8 ${feature.color} mb-3`} />
                <p className="font-medium text-foreground">{feature.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-5 bg-card rounded-xl shadow-soft"
        >
          <MoodTracker />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Special Dates</h3>
          </div>
          <SpecialDatesCountdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <MotivationalQuote />
        </motion.div>
      </main>
    </div>
  );
};

export default More;
