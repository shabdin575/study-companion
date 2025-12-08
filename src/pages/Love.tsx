import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { loveNotes } from "@/data/scheduleData";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw, MapPin } from "lucide-react";
import ReunionCountdown from "@/components/ReunionCountdown";

const Love = () => {
  const [currentNote, setCurrentNote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomNote = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = Math.floor(Math.random() * loveNotes.length);
    setCurrentNote(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    // Random note on load
    setCurrentNote(Math.floor(Math.random() * loveNotes.length));
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Love Notes" subtitle="From Shabdin, with love" />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Distance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-accent rounded-2xl mb-6"
        >
          <MapPin className="w-5 h-5 text-primary" />
          <p className="text-sm text-foreground">
            <span className="font-medium">Miles apart</span>, but{" "}
            <span className="text-primary font-semibold">always together</span>{" "}
            in heart.
          </p>
        </motion.div>

        {/* Reunion Countdown */}
        <ReunionCountdown />

        {/* Love Note Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-3xl gradient-love p-8 shadow-glow mt-6"
        >
          {/* Decorative Hearts */}
          <div className="absolute top-4 right-4 opacity-20">
            <Heart className="w-16 h-16 text-primary-foreground" fill="currentColor" />
          </div>
          <div className="absolute bottom-4 left-4 opacity-10">
            <Heart className="w-24 h-24 text-primary-foreground" fill="currentColor" />
          </div>

          <div className="relative z-10">
            <Heart
              className="w-10 h-10 text-primary-foreground mb-4 animate-heart-beat"
              fill="currentColor"
            />

            <AnimatePresence mode="wait">
              <motion.p
                key={currentNote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-xl font-serif text-primary-foreground leading-relaxed min-h-[100px]"
              >
                {loveNotes[currentNote]}
              </motion.p>
            </AnimatePresence>

            <button
              onClick={getRandomNote}
              disabled={isAnimating}
              className="mt-6 flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isAnimating ? "animate-spin" : ""}`} />
              New message
            </button>
          </div>
        </motion.div>

        {/* Personal Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-card rounded-2xl shadow-soft text-center"
        >
          <p className="font-serif text-lg text-foreground mb-2">
            My Dearest Miriam,
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I made this app just for you. Every time you feel tired or
            overwhelmed, come here and remember that I believe in you
            completely. Your success is our future together.
          </p>
          <p className="mt-4 text-primary font-medium">
            With all my love,
            <br />
            Shabdin 💕
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 grid grid-cols-2 gap-4"
        >
          <div className="p-4 bg-card rounded-xl shadow-soft text-center">
            <p className="text-2xl font-bold text-primary">6</p>
            <p className="text-xs text-muted-foreground">Subjects to Master</p>
          </div>
          <div className="p-4 bg-card rounded-xl shadow-soft text-center">
            <p className="text-2xl font-bold text-primary">∞</p>
            <p className="text-xs text-muted-foreground">Love & Support</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Love;
