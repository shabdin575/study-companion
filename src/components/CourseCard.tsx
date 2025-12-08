import { cn } from "@/lib/utils";

export type CourseType = "math" | "physics" | "biology" | "chemistry" | "computing" | "communication";

interface CourseCardProps {
  course: CourseType;
  code: string;
  name: string;
  content: React.ReactNode;
  className?: string;
}

const courseStyles: Record<CourseType, { bg: string; border: string; text: string }> = {
  math: {
    bg: "bg-course-math-light",
    border: "border-l-course-math",
    text: "text-course-math",
  },
  physics: {
    bg: "bg-course-physics-light",
    border: "border-l-course-physics",
    text: "text-course-physics",
  },
  biology: {
    bg: "bg-course-biology-light",
    border: "border-l-course-biology",
    text: "text-course-biology",
  },
  chemistry: {
    bg: "bg-course-chemistry-light",
    border: "border-l-course-chemistry",
    text: "text-course-chemistry",
  },
  computing: {
    bg: "bg-course-computing-light",
    border: "border-l-course-computing",
    text: "text-course-computing",
  },
  communication: {
    bg: "bg-course-communication-light",
    border: "border-l-course-communication",
    text: "text-course-communication",
  },
};

const CourseCard = ({ course, code, name, content, className }: CourseCardProps) => {
  const styles = courseStyles[course];

  return (
    <div
      className={cn(
        "rounded-xl p-4 border-l-4 transition-all duration-300 hover:shadow-card",
        styles.bg,
        styles.border,
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <span className={cn("text-sm font-bold", styles.text)}>{code}</span>
      </div>
      <h3 className="font-medium text-foreground mb-2">{name}</h3>
      <div className="text-sm text-muted-foreground">{content}</div>
    </div>
  );
};

export default CourseCard;
