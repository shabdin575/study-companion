import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, RefreshCw } from "lucide-react";
import { motivationalQuotes } from "@/data/scheduleData";

const MotivationalQuote = () => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    return Math.floor(Math.random() * motivationalQuotes.length);
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let newIndex = Math.floor(Math.random() * motivationalQuotes.length);
    while (newIndex === currentIndex && motivationalQuotes.length > 1) {
      newIndex = Math.floor(Math.random() * motivationalQuotes.length);
    }
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const quote = motivationalQuotes[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 bg-card rounded-2xl shadow-soft"
    >
      <div className="flex items-start gap-3">
        <Quote className="w-6 h-6 text-primary shrink-0 mt-1" />
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-foreground font-medium italic leading-relaxed">
                "{quote.quote}"
              </p>
              <p className="text-sm text-muted-foreground mt-2">— {quote.author}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <button
        onClick={getNewQuote}
        disabled={isAnimating}
        data-testid="button-new-quote"
        className="mt-4 flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <RefreshCw className={`w-3 h-3 ${isAnimating ? "animate-spin" : ""}`} />
        New inspiration
      </button>
    </motion.div>
  );
};

export default MotivationalQuote;
