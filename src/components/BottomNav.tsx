import { Calendar, BookOpen, CheckSquare, Heart, MoreHorizontal } from "lucide-react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Calendar, label: "Schedule" },
  { to: "/subjects", icon: BookOpen, label: "Subjects" },
  { to: "/checklist", icon: CheckSquare, label: "Tasks" },
  { to: "/love", icon: Heart, label: "Love" },
  { to: "/more", icon: MoreHorizontal, label: "More" },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border shadow-soft">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => (
          <RouterNavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                isActive
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-primary"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    isActive && "scale-110"
                  )}
                  fill={isActive && item.to === "/love" ? "currentColor" : "none"}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </>
            )}
          </RouterNavLink>
        ))}
      </div>
      {/* Safe area for mobile */}
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  );
};

export default BottomNav;
