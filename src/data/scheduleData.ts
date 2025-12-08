export const weekSchedule = [
  {
    day: "Monday",
    focus: "Computing & Math",
    blocks: [
      { time: "05:00-05:50", subject: "CS 110", code: "CS 110", task: "Algorithm Review", course: "computing" as const },
      { time: "05:50-06:05", subject: "Morning Break", code: "", task: "Rest & Refresh", course: "break" as const },
      { time: "06:05-06:45", subject: "MA 110", code: "MA 110", task: "Formula Review", course: "math" as const },
      { time: "17:00-20:00", subject: "Dinner & Rest", code: "", task: "Recovery Time", course: "break" as const },
      { time: "20:00-20:50", subject: "MA 110", code: "MA 110", task: "Problem Set (50 min)", course: "math" as const },
      { time: "20:50-21:10", subject: "Break", code: "", task: "Mental Recovery", course: "break" as const },
      { time: "21:10-22:00", subject: "CH 110", code: "CH 110", task: "Reaction Map/Balancing", course: "chemistry" as const },
    ],
  },
  {
    day: "Tuesday",
    focus: "Math, Chemistry & Biology",
    blocks: [
      { time: "05:00-05:50", subject: "MA 110", code: "MA 110", task: "Formula Derivation", course: "math" as const },
      { time: "05:50-06:05", subject: "Morning Break", code: "", task: "Rest & Refresh", course: "break" as const },
      { time: "06:05-06:45", subject: "CH 110", code: "CH 110", task: "Conceptual Review", course: "chemistry" as const },
      { time: "17:00-20:00", subject: "Dinner & Rest", code: "", task: "Recovery Time", course: "break" as const },
      { time: "20:00-20:50", subject: "BI 110", code: "BI 110", task: "Diagram/Vocab Drill", course: "biology" as const },
      { time: "20:50-21:10", subject: "Break", code: "", task: "Mental Recovery", course: "break" as const },
      { time: "21:10-22:00", subject: "CH 110", code: "CH 110", task: "Conceptual Prep", course: "chemistry" as const },
    ],
  },
  {
    day: "Wednesday",
    focus: "Physics, Biology & Computing",
    blocks: [
      { time: "05:00-05:50", subject: "PH 110", code: "PH 110", task: "Conceptual Review", course: "physics" as const },
      { time: "05:50-06:05", subject: "Morning Break", code: "", task: "Rest & Refresh", course: "break" as const },
      { time: "06:05-06:45", subject: "BI 110", code: "BI 110", task: "Process Mapping", course: "biology" as const },
      { time: "17:00-20:00", subject: "Dinner & Rest", code: "", task: "Recovery Time", course: "break" as const },
      { time: "20:00-20:50", subject: "CS 110", code: "CS 110", task: "Coding Practice (50 min)", course: "computing" as const },
      { time: "20:50-21:10", subject: "Break", code: "", task: "Mental Recovery", course: "break" as const },
      { time: "21:10-22:00", subject: "MA 110", code: "MA 110", task: "New Topic Practice", course: "math" as const },
    ],
  },
  {
    day: "Thursday",
    focus: "Chemistry & Physics",
    blocks: [
      { time: "05:00-05:50", subject: "CH 110", code: "CH 110", task: "Problem Set (Stoich.)", course: "chemistry" as const },
      { time: "05:50-06:05", subject: "Morning Break", code: "", task: "Rest & Refresh", course: "break" as const },
      { time: "06:05-06:45", subject: "PH 110", code: "PH 110", task: "Problem Drill", course: "physics" as const },
      { time: "17:00-20:00", subject: "Dinner & Rest", code: "", task: "Recovery Time", course: "break" as const },
      { time: "20:00-20:50", subject: "PH 110", code: "PH 110", task: "Problem Drill/Lecture Prep", course: "physics" as const },
      { time: "20:50-21:10", subject: "Break", code: "", task: "Mental Recovery", course: "break" as const },
      { time: "21:10-22:00", subject: "BI 110", code: "BI 110", task: "Process/Cycle Review", course: "biology" as const },
    ],
  },
  {
    day: "Friday",
    focus: "Biology & Communication",
    blocks: [
      { time: "05:00-05:50", subject: "BI 110", code: "BI 110", task: "Process Mapping", course: "biology" as const },
      { time: "05:50-06:05", subject: "Morning Break", code: "", task: "Rest & Refresh", course: "break" as const },
      { time: "06:05-06:45", subject: "LA 111", code: "LA 111", task: "Review/Lecture Prep", course: "communication" as const },
      { time: "17:00-20:00", subject: "Dinner & Rest", code: "", task: "Recovery Time", course: "break" as const },
      { time: "20:00-20:50", subject: "LA 111", code: "LA 111", task: "Assignment Writing", course: "communication" as const },
      { time: "20:50-21:10", subject: "Break", code: "", task: "Mental Recovery", course: "break" as const },
      { time: "21:10-22:00", subject: "Weekly Review", code: "", task: "Plan Sunday targets", course: "break" as const },
    ],
  },
  {
    day: "Saturday",
    focus: "SABBATH DAY",
    blocks: [
      { time: "All Day", subject: "Keep the Sabbath Holy", code: "🙏", task: "Rest & Worship", course: "sabbath" as const },
    ],
  },
  {
    day: "Sunday",
    focus: "DEEP STUDY DAY",
    blocks: [
      { time: "09:00-11:00", subject: "MA 110", code: "MA 110", task: "Deep Practice: 10-15 complex problems", course: "math" as const },
      { time: "11:00-14:00", subject: "Lunch & Rest", code: "", task: "Recharge", course: "break" as const },
      { time: "14:00-16:00", subject: "PH 110", code: "PH 110", task: "Mock Exam/Complex Applications", course: "physics" as const },
    ],
  },
];

export const subjects = [
  {
    code: "MA 110",
    name: "Mathematics I",
    course: "math" as const,
    workflow: [
      "Daily Repetition (Morning): 50 min for Formula Derivation/Preview",
      "Daily Practice (Evening - 50 min): Problem Set/New Topic Practice",
      "Sunday Deep Session: Timed practice set (10-15 complex problems)",
    ],
    frequency: "4 days per week (M, T, W, S)",
  },
  {
    code: "PH 110",
    name: "Physics I",
    course: "physics" as const,
    workflow: [
      "Daily Repetition (Morning - 50 min): Conceptual Review/Unit Checks",
      "Daily Practice (Evening - 50 min): Problem Drill/Conceptual Reading",
      "Sunday Deep Session: Full-length Mock Exam or complex application questions",
    ],
    frequency: "3 days per week (W, Th, S)",
  },
  {
    code: "BI 110",
    name: "Biology I",
    course: "biology" as const,
    workflow: [
      "Morning (50 min - F) & Evening (50 min - Th): Process Mapping/Vocab Drill",
      "Study is aligned with the Wednesday/Friday lectures",
    ],
    frequency: "2-3 days per week",
  },
  {
    code: "CH 110",
    name: "Chemistry I",
    course: "chemistry" as const,
    workflow: [
      "Morning (50 min - Th) & Evening (50 min - M): Problem Set/Reaction Map",
      "Study is aligned with the Tuesday/Thursday lectures",
    ],
    frequency: "3 days per week",
  },
  {
    code: "CS 110",
    name: "Introduction to Computing",
    course: "computing" as const,
    workflow: [
      "Morning (50 min - M): Algorithm Review/Pre-reading",
      "Evening (50 min - W): Dedicated Coding Practice",
      "Study is aligned with the Monday lecture",
    ],
    frequency: "2 days per week",
  },
  {
    code: "LA 111",
    name: "Communication Skills",
    course: "communication" as const,
    workflow: [
      "Morning (50 min - F): Focused review",
      "Evening (50 min - F): Assignment Writing/Review",
      "Study is aligned with the Friday lecture",
    ],
    frequency: "1 day per week (Friday focus)",
  },
];

export const dailyChecklist = [
  { id: "morning", label: "Complete 05:00-06:45 morning focus session (with break)", icon: "☀️" },
  { id: "dinner", label: "Take the essential 17:00-20:00 dinner/rest break", icon: "🍽️" },
  { id: "break", label: "Take the mandatory 20:50-21:10 break", icon: "☕" },
  { id: "evening", label: "Complete 20:00-22:00 deep evening focus session", icon: "🌙" },
  { id: "sunday", label: "Sunday: Complete both 2-hour deep study blocks", icon: "📚", sundayOnly: true },
];

export const prayerSteps = [
  {
    title: "Gratitude",
    description: "Thank God for the knowledge you already possess and the ability to learn.",
    icon: "🙏",
  },
  {
    title: "Focus",
    description: "Pray for concentration, clarity, and for the Holy Spirit to guide your understanding.",
    icon: "✨",
  },
  {
    title: "Retention",
    description: "Ask for the ability to retain what you study, especially for the upcoming lectures and exams.",
    icon: "🧠",
  },
  {
    title: "Protection",
    description: "Pray for the strength to Keep the Sabbath Holy and protect your rest day.",
    icon: "🛡️",
  },
];

export const loveNotes = [
  "Every equation you solve brings you closer to your dreams. I'm so proud of you! 💕",
  "Distance means nothing when someone means everything. Keep shining, my star! ⭐",
  "Your dedication to your studies inspires me every day. You've got this! 💪",
  "Remember: I'm thinking of you with every sunrise and sunset. Study well, my love! 🌅",
  "Success is built one study session at a time. And I'll be cheering you on from afar! 📣",
  "The distance between us is just a test to see how far love can travel. Ours goes beyond the stars! 🌟",
  "Every moment of hard work today is a step towards our tomorrow together. Keep going! 🚀",
  "You're not just studying for yourself – you're building our future. I believe in you! 💖",
];
