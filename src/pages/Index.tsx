import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import Schedule from "@/pages/Schedule";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Check if splash was shown today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastShown = localStorage.getItem("splash-last-shown");
    
    if (lastShown === today) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("splash-last-shown", today);
    setShowSplash(false);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>
      
      {!showSplash && <Schedule />}
    </>
  );
};

export default Index;
