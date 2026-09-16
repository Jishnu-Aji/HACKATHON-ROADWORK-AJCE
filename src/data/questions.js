export const INTERESTS = [
  "Technology",
  "Problem Solving",
  "Creativity",
  "Communication",
  "Hands-on/Mechanical",
  "Business/Finance",
  "Helping People",
  "Science",
];

export const SKILLS = [
  "Computer Basics",
  "Programming",
  "Problem Solving",
  "Communication",
  "Creativity",
  "Technical/Mechanical",
  "Organization",
  "Customer Service",
];

export const SKILL_DESC = {
  "Computer Basics": "Confidence with computers and OS tools is the baseline for nearly every tech-adjacent role.",
  "Programming": "Writing, reading and debugging code is foundational — even partial coding ability multiplies your options.",
  "Problem Solving": "Structured analytical thinking is how professionals debug, optimise, and build — it is transferable across every role.",
  "Communication": "Explaining technical ideas clearly to non-technical people is a genuine career accelerant in any field.",
  "Creativity": "Design, content and novel solution-building all depend on creative thinking — not just artistic roles.",
  "Technical/Mechanical": "Hands-on practical skills are the core of trades, hardware and field-based roles that are always in demand.",
  "Organization": "Managing tasks, priorities and documentation keeps complex projects on track and makes you indispensable.",
  "Customer Service": "Handling people, expectations and complaints professionally is critical for every client-facing role.",
};

export const ROADBLOCK_OPTIONS = [
  "I can't afford an expensive degree",
  "I need to start earning quickly",
  "I cannot relocate",
  "I prefer practical learning",
  "I have limited access to training",
  "I need a part-time path",
];

export const QUESTIONS = [
  // MILE 01
  {
    id: "m1",
    key: "education",
    title: "Where are you starting from?",
    sub: "This helps us anchor your starting point.",
    type: "single",
    options: ["Class 9–10", "Class 11–12", "Recently graduated", "Diploma / Vocational", "Other"],
  },
  // MILE 02
  {
    id: "m2",
    key: "region",
    title: "Where are you planning your journey from?",
    sub: "We'll show demo career-demand data framed around your region.",
    type: "text",
    placeholder: "e.g. Thiruvananthapuram, Kerala",
  },
  // MILE 03
  {
    id: "m3",
    key: "interests",
    title: "What naturally pulls your attention?",
    sub: "Pick 3–6 that feel most like you.",
    type: "multi",
    options: INTERESTS,
    max: 6,
  },
  // MILE 04
  {
    id: "m4",
    key: "subjects",
    title: "Which subjects do you enjoy most?",
    sub: "Pick up to 5.",
    type: "multi",
    options: [
      "Math",
      "Computer Science",
      "Biology",
      "Physics",
      "Chemistry",
      "Art",
      "Business Studies",
      "Languages",
      "Social Studies",
    ],
    max: 5,
  },
  // MILE 05
  {
    id: "m5",
    key: "skills",
    title: "Which of these feel like a strength for you right now?",
    sub: "Be honest, not aspirational — this is your starting point, not your ceiling.",
    type: "multi",
    options: SKILLS,
    max: 6,
  },
  // MILE 06
  {
    id: "m6",
    key: "workStyle",
    title: "What kind of workday sounds most like you?",
    sub: "There's no wrong answer here.",
    type: "single",
    options: [
      "Working with computers",
      "Building things",
      "Working outdoors",
      "Working with people",
      "Working independently",
      "Working in a team",
      "Solving difficult problems",
      "Creating new things",
    ],
  },
  // MILE 07
  {
    id: "m7",
    key: "budget",
    title: "What matters most when choosing a career?",
    sub: "This shapes which pathways make sense for you.",
    type: "single",
    options: [
      "Good income",
      "Job stability",
      "Creativity",
      "Helping people",
      "Freedom / Work-life balance",
      "Working with technology",
    ],
  },
  // MILE 08
  {
    id: "m8",
    key: "pathwayPref",
    title: "What kind of path sounds more comfortable?",
    sub: "Both are legitimate — we'll show you both either way.",
    type: "single",
    options: ["Traditional degree", "Diploma", "Certification / skill-first", "Vocational / apprenticeship", "I want to compare all routes"],
  },
];
