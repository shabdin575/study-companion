import Header from "@/components/Header";
import CourseCard from "@/components/CourseCard";
import { subjects } from "@/data/scheduleData";
import { motion } from "framer-motion";

const Subjects = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Subjects" subtitle="Course Workflows & Study Plans" />

      <main className="px-4 py-6 max-w-lg mx-auto">
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CourseCard
                course={subject.course}
                code={subject.code}
                name={subject.name}
                content={
                  <div className="space-y-3">
                    <ol className="list-decimal list-inside space-y-2">
                      {subject.workflow.map((step, i) => (
                        <li key={i} className="text-sm leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                    <p className="text-xs font-medium text-muted-foreground pt-2 border-t border-current/10">
                      📅 {subject.frequency}
                    </p>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-5 bg-card rounded-2xl shadow-soft"
        >
          <h3 className="font-serif font-semibold text-lg text-foreground mb-4">
            📚 Study Guidelines
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="shrink-0">💪</span>
              <span><strong>Sustainable Study:</strong> The 20:50-21:10 slot is a mandated break. Stand up, stretch, and step away.</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0">📖</span>
              <span><strong>Lecture Alignment:</strong> Study sessions are scheduled on the same day (or morning before) the lecture.</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0">🧠</span>
              <span><strong>Subject Separation:</strong> Difficult subjects (MA 110 & PH 110) are placed on separate weekdays.</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0">🙏</span>
              <span><strong>Sabbath Protection:</strong> Saturday is a day of rest and spiritual focus.</span>
            </li>
          </ul>
        </motion.div>
      </main>
    </div>
  );
};

export default Subjects;
