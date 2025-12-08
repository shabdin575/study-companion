import Header from "@/components/Header";
import { prayerSteps } from "@/data/scheduleData";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Prayer = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Prayer Guide" subtitle="Before Every Study Session" />

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-accent rounded-2xl mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="font-serif text-lg font-semibold text-foreground">
              Study Prep Ritual
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Before starting any study session, take 5 minutes to follow these
            steps. Center yourself, connect with your purpose, and invite God's
            guidance into your learning.
          </p>
        </motion.div>

        {/* Prayer Steps */}
        <div className="space-y-4">
          {prayerSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="flex gap-4 p-5 bg-card rounded-2xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-2xl shrink-0">
                {step.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-primary font-semibold">
                    STEP {index + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            "Commit your work to the Lord, and your plans will be established."
          </p>
          <p className="text-xs text-muted-foreground mt-1">— Proverbs 16:3</p>
        </motion.div>

        {/* Sabbath Reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-5 gradient-love rounded-2xl text-center"
        >
          <p className="text-lg mb-1">🙏</p>
          <p className="text-primary-foreground font-semibold">
            Remember the Sabbath
          </p>
          <p className="text-sm text-primary-foreground/80 mt-1">
            Saturday is sacred. Rest, worship, and rejuvenate.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Prayer;
