


import React, { useState, useEffect, useMemo, useRef } from "react";
 

function useFonts() {
  useEffect(() => {
    const id = "roadwork-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}
 
/* ---------- design tokens ---------- */
const C = {
  asphalt: "#1B1D21",
  asphalt2: "#26292E",
  paper: "#F4F2EC",
  paperDim: "#E7E4DA",
  amber: "#F2B705",
  amberDeep: "#C98F02",
  route: "#2F6B4F",
  routeLight: "#E4EFE8",
  line: "#D8D4C6",
  ink: "#1B1D21",
  sub: "#5B5A54",
  danger: "#B23A2E",
};
 
const disp = { fontFamily: "'Barlow Condensed', sans-serif" };
const body = { fontFamily: "'Work Sans', sans-serif" };
 
/* ---------- taxonomy ---------- */
const INTERESTS = [
  "Technology",
  "Problem Solving",
  "Creativity",
  "Communication",
  "Hands-on/Mechanical",
  "Business/Finance",
  "Helping People",
  "Science",
];
const SKILLS = [
  "Computer Basics",
  "Programming",
  "Problem Solving",
  "Communication",
  "Creativity",
  "Technical/Mechanical",
  "Organization",
  "Customer Service",
];
 
/* ---------- career dataset (DEMO / REGIONAL DATA) ---------- */
const CAREERS = [
  {
    id: "web-dev",
    name: "Web Developer",
    category: "Technology",
    color: "#3E6C99",
    description:
      "Builds and maintains websites and web applications, turning designs into working, interactive products.",
    requiredSkills: ["Programming", "Problem Solving", "Computer Basics"],
    interestCategories: ["Technology", "Creativity", "Problem Solving"],
    salaryRange: [45000, 95000],
    localDemand: 82,
    accessibilityBase: 78,
    education: "High school diploma minimum; degree not required but common",
    certifications: ["Responsive Web Design Cert", "Full-Stack Bootcamp Cert"],
    degreePathway: ["Class 12", "Computer Science Degree (4 yrs)", "Internship", "Junior Developer", "Career Growth"],
    skillPathway: ["Class 12", "Coding Bootcamp (6–9 mo)", "Portfolio Projects", "Internship", "Junior Developer"],
    trainingDuration: { degree: "4 years", skill: "6–9 months" },
    cost: { degree: "High", skill: "Low–Medium" },
    dayInLife: [
      { time: "09:00", activity: "Stand-up with the team, review tasks" },
      { time: "10:00", activity: "Write and test code for a feature" },
      { time: "12:30", activity: "Code review with a teammate" },
      { time: "14:00", activity: "Fix bugs reported by QA" },
      { time: "16:00", activity: "Document changes, plan tomorrow's work" },
    ],
  },
  {
    id: "network-tech",
    name: "Network Technician",
    category: "Technology",
    color: "#3E6C99",
    description:
      "Installs, monitors, and repairs the networks and cabling that keep offices and campuses connected.",
    requiredSkills: ["Computer Basics", "Technical/Mechanical", "Problem Solving"],
    interestCategories: ["Technology", "Problem Solving", "Hands-on/Mechanical"],
    salaryRange: [38000, 68000],
    localDemand: 88,
    accessibilityBase: 88,
    education: "High school diploma; certification-driven field",
    certifications: ["CompTIA Network+", "Cisco CCNA"],
    degreePathway: ["Class 12", "IT/Networking Degree (2–4 yrs)", "Internship", "Junior Technician", "Career Growth"],
    skillPathway: ["Class 12", "Network+ Certification (3–6 mo)", "Hands-on Lab Projects", "Internship", "Junior Technician"],
    trainingDuration: { degree: "2–4 years", skill: "3–6 months" },
    cost: { degree: "Medium", skill: "Low" },
    dayInLife: [
      { time: "09:00", activity: "Check systems and network dashboards" },
      { time: "10:30", activity: "Troubleshoot a reported connectivity issue" },
      { time: "12:00", activity: "Run cabling / hardware setup for a new site" },
      { time: "14:00", activity: "Coordinate with the IT team on a rollout" },
      { time: "16:00", activity: "Log tickets and update documentation" },
    ],
  },
  {
    id: "it-support",
    name: "IT Support Specialist",
    category: "Technology",
    color: "#3E6C99",
    description:
      "Helps people solve day-to-day tech problems — from password resets to hardware issues — and keeps systems running.",
    requiredSkills: ["Computer Basics", "Communication", "Problem Solving"],
    interestCategories: ["Technology", "Helping People", "Problem Solving"],
    salaryRange: [35000, 60000],
    localDemand: 85,
    accessibilityBase: 90,
    education: "High school diploma; entry-friendly",
    certifications: ["CompTIA A+", "Google IT Support Cert"],
    degreePathway: ["Class 12", "IT Degree (2–4 yrs)", "Internship", "Support Specialist", "Career Growth"],
    skillPathway: ["Class 12", "IT Support Certification (2–4 mo)", "Help-Desk Practice", "Entry-Level Support Role"],
    trainingDuration: { degree: "2–4 years", skill: "2–4 months" },
    cost: { degree: "Medium", skill: "Low" },
    dayInLife: [
      { time: "09:00", activity: "Triage overnight support tickets" },
      { time: "10:30", activity: "Walk a user through a fix over call/chat" },
      { time: "12:00", activity: "Set up hardware for a new employee" },
      { time: "14:00", activity: "Update the internal knowledge base" },
      { time: "16:00", activity: "Escalate a complex issue to networking" },
    ],
  },
  {
    id: "uiux",
    name: "UI/UX Designer",
    category: "Creative",
    color: "#8A5CB0",
    description:
      "Designs how digital products look and feel, shaping screens and flows that are easy and pleasant to use.",
    requiredSkills: ["Creativity", "Computer Basics", "Communication"],
    interestCategories: ["Creativity", "Technology", "Communication"],
    salaryRange: [50000, 90000],
    localDemand: 70,
    accessibilityBase: 72,
    education: "Portfolio matters more than degree, but degree helps",
    certifications: ["Google UX Design Cert", "Figma Professional Cert"],
    degreePathway: ["Class 12", "Design/HCI Degree (4 yrs)", "Internship", "Junior Designer", "Career Growth"],
    skillPathway: ["Class 12", "UX Bootcamp (4–6 mo)", "Case Study Portfolio", "Internship", "Junior Designer"],
    trainingDuration: { degree: "4 years", skill: "4–6 months" },
    cost: { degree: "High", skill: "Low–Medium" },
    dayInLife: [
      { time: "09:00", activity: "Review user feedback from last release" },
      { time: "10:30", activity: "Sketch and wireframe a new screen" },
      { time: "12:30", activity: "Build an interactive prototype" },
      { time: "14:00", activity: "Present designs to the product team" },
      { time: "16:00", activity: "Iterate based on critique" },
    ],
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    category: "Technology",
    color: "#3E6C99",
    description:
      "Turns raw numbers into insight — cleaning data, building dashboards, and helping teams make decisions.",
    requiredSkills: ["Programming", "Problem Solving", "Organization"],
    interestCategories: ["Technology", "Problem Solving", "Business/Finance"],
    salaryRange: [50000, 95000],
    localDemand: 75,
    accessibilityBase: 65,
    education: "Degree common but bootcamp/cert path is growing",
    certifications: ["Google Data Analytics Cert", "Microsoft Power BI Cert"],
    degreePathway: ["Class 12", "Statistics/CS Degree (4 yrs)", "Internship", "Junior Analyst", "Career Growth"],
    skillPathway: ["Class 12", "Data Analytics Certification (5–8 mo)", "Portfolio Projects", "Internship", "Junior Analyst"],
    trainingDuration: { degree: "4 years", skill: "5–8 months" },
    cost: { degree: "High", skill: "Medium" },
    dayInLife: [
      { time: "09:00", activity: "Pull and clean the latest dataset" },
      { time: "10:30", activity: "Build a dashboard for a business question" },
      { time: "12:30", activity: "Meet stakeholders to clarify requirements" },
      { time: "14:00", activity: "Run analysis and check results" },
      { time: "16:00", activity: "Present findings and recommendations" },
    ],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing Specialist",
    category: "Business",
    color: "#B0762A",
    description:
      "Plans and runs online campaigns — social, search, and content — to grow a brand's audience and sales.",
    requiredSkills: ["Communication", "Creativity", "Organization"],
    interestCategories: ["Creativity", "Business/Finance", "Communication"],
    salaryRange: [40000, 75000],
    localDemand: 78,
    accessibilityBase: 80,
    education: "High school diploma; cert-friendly field",
    certifications: ["Google Digital Marketing Cert", "Meta Blueprint Cert"],
    degreePathway: ["Class 12", "Marketing/Business Degree (4 yrs)", "Internship", "Marketing Associate", "Career Growth"],
    skillPathway: ["Class 12", "Digital Marketing Certification (2–4 mo)", "Run Sample Campaigns", "Internship", "Marketing Associate"],
    trainingDuration: { degree: "4 years", skill: "2–4 months" },
    cost: { degree: "High", skill: "Low" },
    dayInLife: [
      { time: "09:00", activity: "Check campaign performance metrics" },
      { time: "10:30", activity: "Draft content for social channels" },
      { time: "12:30", activity: "Adjust ad targeting and budget" },
      { time: "14:00", activity: "Coordinate with design on assets" },
      { time: "16:00", activity: "Report results to the team" },
    ],
  },
  {
    id: "electrician",
    name: "Electrician",
    category: "Trades",
    color: "#B0762A",
    description:
      "Installs and repairs electrical systems in homes, offices, and industrial sites — hands-on, in-demand skilled work.",
    requiredSkills: ["Technical/Mechanical", "Problem Solving", "Organization"],
    interestCategories: ["Hands-on/Mechanical", "Technology", "Problem Solving"],
    salaryRange: [42000, 72000],
    localDemand: 90,
    accessibilityBase: 85,
    education: "Apprenticeship-based trade; licensing required",
    certifications: ["Electrician Apprenticeship License", "Journeyman Certification"],
    degreePathway: ["Class 12", "Trade School Diploma (2 yrs)", "Apprenticeship", "Licensed Electrician", "Career Growth"],
    skillPathway: ["Class 12", "Electrician Apprenticeship (2–4 yrs, paid)", "On-the-job Training", "Journeyman License", "Licensed Electrician"],
    trainingDuration: { degree: "2 years + apprenticeship", skill: "2–4 years (paid apprenticeship)" },
    cost: { degree: "Medium", skill: "Low (earn while learning)" },
    dayInLife: [
      { time: "09:00", activity: "Review the day's job site and safety checks" },
      { time: "10:00", activity: "Install or repair wiring and fixtures" },
      { time: "12:30", activity: "Test circuits and troubleshoot faults" },
      { time: "14:00", activity: "Coordinate with other trades on site" },
      { time: "16:00", activity: "Log completed work and materials used" },
    ],
  },
  {
    id: "graphic-designer",
    name: "Graphic Designer",
    category: "Creative",
    color: "#8A5CB0",
    description:
      "Creates visual content — logos, layouts, illustrations — for brands, print, and digital media.",
    requiredSkills: ["Creativity", "Computer Basics", "Communication"],
    interestCategories: ["Creativity", "Communication", "Technology"],
    salaryRange: [35000, 65000],
    localDemand: 65,
    accessibilityBase: 75,
    education: "Portfolio-driven; degree optional",
    certifications: ["Adobe Certified Professional"],
    degreePathway: ["Class 12", "Design Degree (4 yrs)", "Internship", "Junior Designer", "Career Growth"],
    skillPathway: ["Class 12", "Design Software Certification (3–5 mo)", "Build a Portfolio", "Freelance/Internship", "Junior Designer"],
    trainingDuration: { degree: "4 years", skill: "3–5 months" },
    cost: { degree: "High", skill: "Low" },
    dayInLife: [
      { time: "09:00", activity: "Review client brief and feedback" },
      { time: "10:30", activity: "Design layouts or illustrations" },
      { time: "12:30", activity: "Present drafts for review" },
      { time: "14:00", activity: "Revise based on feedback" },
      { time: "16:00", activity: "Prepare final files for delivery" },
    ],
  },
  {
    id: "healthcare-tech",
    name: "Healthcare Technician",
    category: "Healthcare",
    color: "#2F8F7A",
    description:
      "Operates medical equipment and supports patient care in labs, clinics, or hospitals — steady, people-facing work.",
    requiredSkills: ["Technical/Mechanical", "Communication", "Organization"],
    interestCategories: ["Helping People", "Science", "Hands-on/Mechanical"],
    salaryRange: [38000, 62000],
    localDemand: 84,
    accessibilityBase: 70,
    education: "Certificate or associate degree typically required",
    certifications: ["State Medical Technician License", "CPR/BLS Certification"],
    degreePathway: ["Class 12", "Allied Health Degree (2 yrs)", "Clinical Internship", "Licensed Technician", "Career Growth"],
    skillPathway: ["Class 12", "Technician Certification Program (9–12 mo)", "Clinical Placement", "Licensing Exam", "Entry-Level Technician"],
    trainingDuration: { degree: "2 years", skill: "9–12 months" },
    cost: { degree: "Medium", skill: "Medium" },
    dayInLife: [
      { time: "09:00", activity: "Prepare equipment and check patient schedule" },
      { time: "10:30", activity: "Run tests or assist with procedures" },
      { time: "12:30", activity: "Record results and update patient files" },
      { time: "14:00", activity: "Support clinical staff with patients" },
      { time: "16:00", activity: "Clean and calibrate equipment" },
    ],
  },
  {
    id: "accountant",
    name: "Accountant",
    category: "Business",
    color: "#B0762A",
    description:
      "Manages financial records, budgets, and reports for individuals or organizations, ensuring accuracy and compliance.",
    requiredSkills: ["Organization", "Problem Solving", "Computer Basics"],
    interestCategories: ["Business/Finance", "Problem Solving", "Communication"],
    salaryRange: [42000, 80000],
    localDemand: 72,
    accessibilityBase: 55,
    education: "Degree usually required; licensing for senior roles",
    certifications: ["Certified Bookkeeper", "CPA (advanced)"],
    degreePathway: ["Class 12", "Accounting/Finance Degree (4 yrs)", "Internship", "Junior Accountant", "Career Growth"],
    skillPathway: ["Class 12", "Bookkeeping Certification (4–6 mo)", "Practice with Real Ledgers", "Entry-Level Bookkeeping Role"],
    trainingDuration: { degree: "4 years", skill: "4–6 months (caps at senior roles without a degree)" },
    cost: { degree: "High", skill: "Low" },
    dayInLife: [
      { time: "09:00", activity: "Reconcile accounts and check entries" },
      { time: "10:30", activity: "Prepare financial statements" },
      { time: "12:30", activity: "Answer client or manager questions" },
      { time: "14:00", activity: "File reports and check compliance" },
      { time: "16:00", activity: "Plan next day's priorities" },
    ],
  },
  {
    id: "teacher",
    name: "Teacher",
    category: "Education",
    color: "#2F8F7A",
    description:
      "Plans lessons and teaches students, shaping how the next generation learns a subject you care about.",
    requiredSkills: ["Communication", "Organization", "Creativity"],
    interestCategories: ["Helping People", "Communication", "Creativity"],
    salaryRange: [38000, 65000],
    localDemand: 76,
    accessibilityBase: 60,
    education: "Degree plus teaching certification typically required",
    certifications: ["Teaching License/Certification"],
    degreePathway: ["Class 12", "Education Degree (4 yrs)", "Student Teaching", "Licensed Teacher", "Career Growth"],
    skillPathway: ["Class 12", "Teaching Assistant Role", "Alternative Certification Program (1–2 yrs)", "Licensed Teacher"],
    trainingDuration: { degree: "4 years", skill: "1–2 years (alternative certification)" },
    cost: { degree: "High", skill: "Medium" },
    dayInLife: [
      { time: "09:00", activity: "Teach morning classes" },
      { time: "11:00", activity: "Grade assignments during a free period" },
      { time: "12:30", activity: "Meet with students needing extra help" },
      { time: "14:00", activity: "Teach afternoon classes" },
      { time: "16:00", activity: "Plan tomorrow's lessons" },
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Technician",
    category: "Technology",
    color: "#3E6C99",
    description:
      "Protects networks and systems from threats — monitoring, patching, and responding to security incidents.",
    requiredSkills: ["Programming", "Technical/Mechanical", "Problem Solving"],
    interestCategories: ["Technology", "Problem Solving", "Hands-on/Mechanical"],
    salaryRange: [50000, 95000],
    localDemand: 91,
    accessibilityBase: 76,
    education: "High school diploma; strongly certification-driven",
    certifications: ["CompTIA Security+", "Certified Ethical Hacker (CEH)"],
    degreePathway: ["Class 12", "Cybersecurity/CS Degree (4 yrs)", "Internship", "SOC Analyst", "Career Growth"],
    skillPathway: ["Class 12", "Security+ Certification (5–8 mo)", "Home-lab Projects", "Internship", "SOC Analyst"],
    trainingDuration: { degree: "4 years", skill: "5–8 months" },
    cost: { degree: "High", skill: "Medium" },
    dayInLife: [
      { time: "09:00", activity: "Review overnight security alerts" },
      { time: "10:30", activity: "Investigate a flagged incident" },
      { time: "12:30", activity: "Patch and update system defenses" },
      { time: "14:00", activity: "Run a phishing-awareness check" },
      { time: "16:00", activity: "Document findings and update runbooks" },
    ],
  },
];
 
/* ---------- assessment questions ---------- */
const QUESTIONS = [
  {
    key: "education",
    title: "What's your current education level?",
    sub: "This helps us anchor your starting point.",
    type: "single",
    options: ["Class 9–10", "Class 11–12", "Recently graduated"],
  },
  {
    key: "region",
    title: "Where are you based?",
    sub: "We'll show demo career-demand data framed around your region.",
    type: "text",
    placeholder: "e.g. Thiruvananthapuram, Kerala",
  },
  {
    key: "interests",
    title: "What are you most drawn to?",
    sub: "Pick 2–4 that feel most like you.",
    type: "multi",
    options: INTERESTS,
    max: 4,
  },
  {
    key: "subjects",
    title: "Which subjects do you enjoy most?",
    sub: "Pick as many as apply.",
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
  {
    key: "skills",
    title: "Which of these feel like a strength for you right now?",
    sub: "Be honest, not aspirational — this is your starting point, not your ceiling.",
    type: "multi",
    options: SKILLS,
    max: 4,
  },
  {
    key: "workStyle",
    title: "What kind of work day sounds best?",
    sub: "There's no wrong answer here.",
    type: "single",
    options: [
      "Hands-on, practical work",
      "Desk / computer-based work",
      "Working closely with people",
      "A mix of everything",
    ],
  },
  {
    key: "budget",
    title: "What's your budget/time reality for education?",
    sub: "This shapes which pathways make sense for you.",
    type: "single",
    options: [
      "Low — need something affordable and fast",
      "Medium — some flexibility",
      "High — can invest in a longer degree",
    ],
  },
  {
    key: "pathwayPref",
    title: "Degree, or skills-and-certification?",
    sub: "Both are legitimate — we'll show you both either way.",
    type: "single",
    options: ["Prefer a degree", "Prefer skills/certification", "Open to both"],
  },
];
 
/* ---------- helpers ---------- */
const clamp = (n, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));
 
function jaccardPct(selected, target) {
  if (!target.length) return 0;
  const setA = new Set(selected);
  const inter = target.filter((t) => setA.has(t)).length;
  const union = new Set([...selected, ...target]).size;
  return union === 0 ? 0 : (inter / target.length) * 100 * 0.7 + (inter / union) * 100 * 0.3;
}
 
function buildProfile(answers) {
  const interests = answers.interests || [];
  const subjects = answers.subjects || [];
  const skills = answers.skills || [];
 
  const subjectTraitMap = {
    "Computer Science": { Technology: 2, "Problem Solving": 1 },
    Math: { "Problem Solving": 2 },
    Physics: { "Problem Solving": 1, Technology: 1 },
    Biology: { Communication: 0 },
    Chemistry: { "Problem Solving": 1 },
    Art: { Creativity: 2 },
    "Business Studies": { Communication: 1 },
    Languages: { Communication: 2 },
    "Social Studies": { Communication: 1 },
  };
 
  const traits = { Technology: 0, "Problem Solving": 0, Creativity: 0, Communication: 0 };
  const maxTraits = { Technology: 0, "Problem Solving": 0, Creativity: 0, Communication: 0 };
 
  Object.keys(traits).forEach((t) => {
    if (interests.includes(t)) traits[t] += 3;
    maxTraits[t] += 3;
    if (skills.includes(t) || (t === "Technology" && (skills.includes("Programming") || skills.includes("Computer Basics")))) {
      traits[t] += 3;
    }
    maxTraits[t] += 3;
  });
 
  subjects.forEach((s) => {
    const m = subjectTraitMap[s] || {};
    Object.entries(m).forEach(([t, v]) => {
      traits[t] += v;
    });
  });
  Object.keys(traits).forEach((t) => (maxTraits[t] += 2));
 
  const traitPct = {};
  Object.keys(traits).forEach((t) => {
    traitPct[t] = clamp(Math.round((traits[t] / Math.max(1, maxTraits[t])) * 100));
  });
 
  const skillPct = {};
  SKILLS.forEach((s) => {
    skillPct[s] = skills.includes(s) ? 85 : 30;
  });
 
  const hands = answers.workStyle === "Hands-on, practical work" ? "High" : answers.workStyle === "A mix of everything" ? "Medium" : "Low";
  const budgetLabel = (answers.budget || "").startsWith("Low")
    ? "Low"
    : (answers.budget || "").startsWith("Medium")
    ? "Medium"
    : "High";
 
  return {
    traits: traitPct,
    skills: skillPct,
    preferences: {
      "Hands-on Work": hands,
      Relocation: budgetLabel === "Low" ? "Low" : "Medium",
      Budget: budgetLabel,
    },
  };
}
 
function scoreCareer(career, answers, allCareers) {
  const interests = answers.interests || [];
  const skills = answers.skills || [];
 
  const interestMatch = clamp(jaccardPct(interests, career.interestCategories));
  const skillMatch = clamp(jaccardPct(skills, career.requiredSkills));
  const localDemand = career.localDemand;
 
  const maxSalary = Math.max(...allCareers.map((c) => (c.salaryRange[0] + c.salaryRange[1]) / 2));
  const avgSalary = (career.salaryRange[0] + career.salaryRange[1]) / 2;
  const salaryPotential = clamp((avgSalary / maxSalary) * 100);
 
  const budgetLow = (answers.budget || "").startsWith("Low");
  const prefSkill = answers.pathwayPref === "Prefer skills/certification";
  const prefDegree = answers.pathwayPref === "Prefer a degree";
  let accessibility = career.accessibilityBase;
  if (budgetLow || prefSkill) accessibility = clamp(accessibility + 8);
  if (prefDegree) accessibility = clamp(accessibility - 4);
 
  const final =
    interestMatch * 0.35 + skillMatch * 0.25 + localDemand * 0.2 + salaryPotential * 0.1 + accessibility * 0.1;
 
  return {
    career,
    final: Math.round(clamp(final)),
    breakdown: {
      interestMatch: Math.round(interestMatch),
      skillMatch: Math.round(skillMatch),
      localDemand: Math.round(localDemand),
      salaryPotential: Math.round(salaryPotential),
      accessibility: Math.round(accessibility),
    },
  };
}
 
function explanationFor(result, answers) {
  const { career, breakdown } = result;
  const interests = (answers.interests || []).slice(0, 2).join(" and ") || "your interests";
  const workStyle = (answers.workStyle || "practical work").toLowerCase();
  const accessNote =
    breakdown.accessibility >= 80
      ? "a genuinely accessible entry pathway"
      : breakdown.accessibility >= 60
      ? "a moderately accessible pathway if you plan ahead"
      : "a pathway that usually takes longer investment to enter";
  return `You showed strong interest in ${interests}, and leaned toward ${workStyle}. ${career.name} scores well on regional demand for the field (${breakdown.localDemand}% demo demand score) and offers ${accessNote}, based on the budget and pathway preference you selected.`;
}
 
/* ---------- small UI atoms ---------- */
function ProgressBar({ value, color = C.amber, track = "rgba(0,0,0,0.08)", h = 8 }) {
  return (
    <div style={{ background: track, height: h, borderRadius: h }}>
      <div
        style={{
          width: `${clamp(value)}%`,
          background: color,
          height: h,
          borderRadius: h,
          transition: "width 500ms ease",
        }}
      />
    </div>
  );
}
 
function StatRow({ label, value, color = C.route }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ ...body, fontSize: 14, color: C.ink }}>{label}</span>
        <span style={{ ...disp, fontSize: 16, fontWeight: 700, color }}>{value}%</span>
      </div>
      <ProgressBar value={value} color={color} />
    </div>
  );
}
 
function Pill({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...body,
        padding: "10px 16px",
        borderRadius: 8,
        border: `2px solid ${active ? C.amber : C.line}`,
        background: active ? C.amber : "#fff",
        color: active ? C.asphalt : C.ink,
        fontWeight: active ? 700 : 500,
        fontSize: 14,
        cursor: "pointer",
        transition: "all 150ms ease",
      }}
    >
      {children}
    </button>
  );
}
 
function DemoTag({ children = "DEMO / REGIONAL DATA" }) {
  return (
    <span
      style={{
        ...body,
        fontSize: 10.5,
        fontWeight: 600,
        letterSpacing: 0.3,
        color: C.sub,
        background: C.paperDim,
        border: `1px solid ${C.line}`,
        borderRadius: 5,
        padding: "3px 7px",
      }}
    >
      {children}
    </span>
  );
}
 
/* ---------- Landing ---------- */
function Landing({ onStart }) {
  return (
    <div style={{ background: C.asphalt, minHeight: "100%", color: C.paper }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "72px 24px 96px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 48 }}>
          <div style={{ width: 14, height: 14, background: C.amber, borderRadius: 3 }} />
          <span style={{ ...disp, fontSize: 20, fontWeight: 700, letterSpacing: 0.5 }}>ROADWORK</span>
        </div>
 
        <h1 style={{ ...disp, fontSize: "clamp(40px,6vw,72px)", fontWeight: 700, lineHeight: 1.02, margin: 0, maxWidth: 780 }}>
          Your Skills. Your Region. <span style={{ color: C.amber }}>Your Path.</span>
        </h1>
        <p style={{ ...body, fontSize: 19, color: "#C9C7BE", maxWidth: 560, marginTop: 20, lineHeight: 1.5 }}>
          Discover career paths based on who you are and the opportunities around you — not generic AI advice.
        </p>
 
        <button
          onClick={onStart}
          style={{
            ...disp,
            marginTop: 36,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 0.3,
            background: C.amber,
            color: C.asphalt,
            border: "none",
            padding: "16px 32px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Start Career Assessment
        </button>
 
        <div
          style={{
            marginTop: 88,
            height: 2,
            background: `repeating-linear-gradient(90deg, ${C.amber} 0 28px, transparent 28px 52px)`,
            opacity: 0.6,
          }}
        />
 
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 28, marginTop: 56 }}>
          {[
            ["Personalized guidance", "Your interests, subjects and skills shape every recommendation — not a generic quiz result."],
            ["Local opportunity", "Career matches are weighed against demo regional demand, so paths reflect real-world access."],
            ["Degree & skill pathways", "Every career shows both a degree route and a skills/certification route — you choose."],
            ["Explainable matching", "No black-box AI picks. A transparent, weighted scoring model ranks every career."],
          ].map(([t, d]) => (
            <div key={t}>
              <div style={{ ...disp, fontSize: 20, fontWeight: 700, color: C.amber, marginBottom: 8 }}>{t}</div>
              <div style={{ ...body, fontSize: 14.5, color: "#B9B7AE", lineHeight: 1.55 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
/* ---------- Assessment ---------- */
function Assessment({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const q = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;
 
  const setAnswer = (val) => setAnswers((a) => ({ ...a, [q.key]: val }));
 
  const toggleMulti = (opt) => {
    const current = answers[q.key] || [];
    if (current.includes(opt)) {
      setAnswer(current.filter((o) => o !== opt));
    } else {
      if (q.max && current.length >= q.max) return;
      setAnswer([...current, opt]);
    }
  };
 
  const canNext =
    q.type === "text" ? (answers[q.key] || "").trim().length > 0 : q.type === "multi" ? (answers[q.key] || []).length > 0 : !!answers[q.key];
 
  const next = () => {
    if (step === QUESTIONS.length - 1) onComplete(answers);
    else setStep(step + 1);
  };
  const back = () => step > 0 && setStep(step - 1);
 
  return (
    <div style={{ background: C.paper, minHeight: "100%" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <span style={{ ...disp, fontSize: 15, fontWeight: 700, color: C.sub, letterSpacing: 0.4 }}>
            Question {step + 1} of {QUESTIONS.length}
          </span>
        </div>
        <ProgressBar value={progress} color={C.route} track={C.paperDim} h={6} />
 
        <div style={{ marginTop: 40, minHeight: 300 }}>
          <h2 style={{ ...disp, fontSize: 32, fontWeight: 700, color: C.ink, margin: 0 }}>{q.title}</h2>
          <p style={{ ...body, fontSize: 15, color: C.sub, marginTop: 8 }}>{q.sub}</p>
 
          <div style={{ marginTop: 28 }}>
            {q.type === "text" && (
              <input
                autoFocus
                value={answers[q.key] || ""}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={q.placeholder}
                style={{
                  ...body,
                  width: "100%",
                  fontSize: 16,
                  padding: "14px 16px",
                  border: `2px solid ${C.line}`,
                  borderRadius: 8,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            )}
 
            {q.type === "single" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswer(opt)}
                    style={{
                      ...body,
                      textAlign: "left",
                      padding: "14px 16px",
                      borderRadius: 8,
                      border: `2px solid ${answers[q.key] === opt ? C.amber : C.line}`,
                      background: answers[q.key] === opt ? "#FFF7E0" : "#fff",
                      fontSize: 15.5,
                      fontWeight: answers[q.key] === opt ? 600 : 400,
                      cursor: "pointer",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
 
            {q.type === "multi" && (
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {q.options.map((opt) => (
                    <Pill key={opt} active={(answers[q.key] || []).includes(opt)} onClick={() => toggleMulti(opt)}>
                      {opt}
                    </Pill>
                  ))}
                </div>
                {q.max && (
                  <div style={{ ...body, fontSize: 12.5, color: C.sub, marginTop: 12 }}>
                    Pick up to {q.max} — {(answers[q.key] || []).length}/{q.max} selected
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
 
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
          <button
            onClick={back}
            disabled={step === 0}
            style={{
              ...body,
              background: "none",
              border: "none",
              color: step === 0 ? "#B8B6AC" : C.sub,
              fontSize: 14.5,
              fontWeight: 600,
              cursor: step === 0 ? "default" : "pointer",
            }}
          >
            ← Back
          </button>
          <button
            onClick={next}
            disabled={!canNext}
            style={{
              ...disp,
              fontSize: 17,
              fontWeight: 700,
              background: canNext ? C.asphalt : "#CFCDC3",
              color: canNext ? C.amber : "#8B897F",
              border: "none",
              padding: "12px 28px",
              borderRadius: 8,
              cursor: canNext ? "pointer" : "default",
            }}
          >
            {step === QUESTIONS.length - 1 ? "See My Profile" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
 
/* ---------- Profile ---------- */
function Profile({ answers, profile, onContinue }) {
  return (
    <div style={{ background: C.paper, minHeight: "100%" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "56px 24px 64px" }}>
        <DemoTag children="STEP 3 OF 4" />
        <h2 style={{ ...disp, fontSize: 34, fontWeight: 700, marginTop: 14, marginBottom: 4 }}>Your Student Profile</h2>
        <p style={{ ...body, fontSize: 15, color: C.sub, marginBottom: 32 }}>
          Built from your answers — this is what drives your career matches.
        </p>
 
        <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ ...disp, fontSize: 18, fontWeight: 700, marginBottom: 16, color: C.ink }}>Trait Strengths</div>
          {Object.entries(profile.traits).map(([k, v]) => (
            <StatRow key={k} label={k} value={v} color={C.route} />
          ))}
        </div>
 
        <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ ...disp, fontSize: 18, fontWeight: 700, marginBottom: 16, color: C.ink }}>Skills</div>
          {Object.entries(profile.skills)
            .filter(([, v]) => v >= 30)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([k, v]) => (
              <StatRow key={k} label={k} value={v} color={C.amberDeep} />
            ))}
        </div>
 
        <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ ...disp, fontSize: 18, fontWeight: 700, marginBottom: 14, color: C.ink }}>Preferences</div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {Object.entries(profile.preferences).map(([k, v]) => (
              <div key={k}>
                <div style={{ ...body, fontSize: 12.5, color: C.sub }}>{k}</div>
                <div style={{ ...disp, fontSize: 20, fontWeight: 700, color: C.ink }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
 
        <button
          onClick={onContinue}
          style={{
            ...disp,
            fontSize: 19,
            fontWeight: 700,
            background: C.amber,
            color: C.asphalt,
            border: "none",
            padding: "15px 30px",
            borderRadius: 8,
            cursor: "pointer",
            width: "100%",
          }}
        >
          See My Top Career Paths →
        </button>
      </div>
    </div>
  );
}
 
/* ---------- Results ---------- */
function CareerCard({ result, onOpen }) {
  const { career, final, breakdown } = result;
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${C.line}`,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 20,
      }}
    >
      <div style={{ height: 6, background: career.color }} />
      <div style={{ padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ ...body, fontSize: 12, color: C.sub, fontWeight: 600 }}>{career.category}</div>
            <div style={{ ...disp, fontSize: 24, fontWeight: 700, color: C.ink }}>{career.name}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ ...disp, fontSize: 30, fontWeight: 800, color: C.route }}>{final}%</div>
            <div style={{ ...body, fontSize: 11, color: C.sub }}>match</div>
          </div>
        </div>
        <p style={{ ...body, fontSize: 14.5, color: "#3E3D38", lineHeight: 1.5, margin: "12px 0" }}>{career.description}</p>
 
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 14 }}>
          <div>
            <div style={{ ...body, fontSize: 11.5, color: C.sub }}>Salary range (demo)</div>
            <div style={{ ...disp, fontSize: 16, fontWeight: 700 }}>
              ${career.salaryRange[0].toLocaleString()}–${career.salaryRange[1].toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ ...body, fontSize: 11.5, color: C.sub }}>Regional demand (demo)</div>
            <div style={{ ...disp, fontSize: 16, fontWeight: 700 }}>{breakdown.localDemand}/100</div>
          </div>
          <div>
            <div style={{ ...body, fontSize: 11.5, color: C.sub }}>Key skills</div>
            <div style={{ ...body, fontSize: 13, fontWeight: 600 }}>{career.requiredSkills.slice(0, 2).join(", ")}</div>
          </div>
        </div>
 
        <button
          onClick={onOpen}
          style={{
            ...disp,
            fontSize: 16,
            fontWeight: 700,
            background: C.asphalt,
            color: C.amber,
            border: "none",
            padding: "10px 20px",
            borderRadius: 7,
            cursor: "pointer",
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}
 
function Results({ results, onOpen }) {
  return (
    <div style={{ background: C.paper, minHeight: "100%" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "56px 24px 80px" }}>
        <DemoTag children="STEP 4 OF 4" />
        <h2 style={{ ...disp, fontSize: 34, fontWeight: 700, marginTop: 14, marginBottom: 4 }}>Your Top Career Paths</h2>
        <p style={{ ...body, fontSize: 15, color: C.sub, marginBottom: 28 }}>
          Ranked by an explainable match score: interest fit, skill fit, regional demand, salary potential and
          accessibility.
        </p>
        {results.map((r, i) => (
          <CareerCard key={r.career.id} result={r} onOpen={() => onOpen(r)} />
        ))}
      </div>
    </div>
  );
}
 
/* ---------- Career Detail ---------- */
function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4, borderBottom: `2px solid ${C.line}`, marginBottom: 24, overflowX: "auto" }}>
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            ...disp,
            fontSize: 15,
            fontWeight: 700,
            padding: "10px 16px",
            background: "none",
            border: "none",
            borderBottom: active === t ? `3px solid ${C.amber}` : "3px solid transparent",
            color: active === t ? C.ink : C.sub,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
 
function PathwayColumn({ title, steps, meta, accent }) {
  return (
    <div style={{ flex: 1, minWidth: 240 }}>
      <div style={{ ...disp, fontSize: 17, fontWeight: 700, color: accent, marginBottom: 14 }}>{title}</div>
      <div>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 4 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent, flexShrink: 0, marginTop: 4 }} />
              {i < steps.length - 1 && <div style={{ width: 2, height: 30, background: C.line }} />}
            </div>
            <div style={{ ...body, fontSize: 14, paddingBottom: 14 }}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 8, padding: 14 }}>
        {Object.entries(meta).map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, ...body }}>
            <span style={{ color: C.sub }}>{k}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
 
function AiAssistant({ career, profile, answers }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
 
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
 
  const suggested = [
    "Why did you recommend this career?",
    "Can I do this without a degree?",
    "What should I learn first?",
    "What other careers are similar?",
  ];
 
  async function send(text) {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
 
    const systemPrompt = `You are the Roadwork career assistant. Answer ONLY using the career data and student profile JSON provided below. Do not invent job openings, salary figures, or labour-market statistics beyond what's given — if asked for something not in the data, say it's not in the demo dataset. Keep answers short (3-5 sentences), encouraging, and specific to this student and this career. Never claim a degree path is bad; present both degree and skill paths as legitimate.
 
CAREER DATA:
${JSON.stringify(career, null, 1)}
 
STUDENT PROFILE:
${JSON.stringify(profile, null, 1)}
 
STUDENT ASSESSMENT ANSWERS:
${JSON.stringify(answers, null, 1)}`;
 
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: systemPrompt,
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const text =
        (data.content || [])
          .map((b) => (b.type === "text" ? b.text : ""))
          .join("\n")
          .trim() || "Sorry, I couldn't generate a response just now.";
      setMessages((m) => [...m, { role: "assistant", content: text }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "Something went wrong reaching the assistant. Try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  }
 
  return (
    <div>
      <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 18, minHeight: 240, marginBottom: 14 }}>
        {messages.length === 0 && (
          <div style={{ ...body, fontSize: 14, color: C.sub, marginBottom: 14 }}>
            Ask about {career.name} — answers are grounded in this career's data, not invented.
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...body,
              fontSize: 14.5,
              marginBottom: 12,
              padding: "10px 14px",
              borderRadius: 10,
              maxWidth: "85%",
              lineHeight: 1.5,
              background: m.role === "user" ? C.routeLight : C.paperDim,
              marginLeft: m.role === "user" ? "auto" : 0,
            }}
          >
            {m.content}
          </div>
        ))}
        {loading && <div style={{ ...body, fontSize: 13, color: C.sub }}>Thinking…</div>}
        <div ref={endRef} />
      </div>
 
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        {suggested.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            style={{
              ...body,
              fontSize: 12.5,
              padding: "7px 12px",
              borderRadius: 20,
              border: `1px solid ${C.line}`,
              background: "#fff",
              cursor: "pointer",
            }}
          >
            {s}
          </button>
        ))}
      </div>
 
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Ask something about this career…"
          style={{ ...body, flex: 1, padding: "12px 14px", borderRadius: 8, border: `2px solid ${C.line}`, fontSize: 14 }}
        />
        <button
          onClick={() => send(input)}
          disabled={loading}
          style={{
            ...disp,
            fontWeight: 700,
            fontSize: 15,
            background: C.asphalt,
            color: C.amber,
            border: "none",
            padding: "0 22px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
 
function CareerDetail({ result, profile, answers, onBack }) {
  const [tab, setTab] = useState("Why This Career");
  const { career, breakdown } = result;
 
  const roadmap = [
    "Learn fundamentals relevant to " + career.name,
    "Build the core skills: " + career.requiredSkills.join(", "),
    "Complete a certification (" + career.certifications[0] + ")",
    "Build hands-on projects or practical experience",
    "Internship / apprenticeship placement",
    "Apply for entry-level " + career.name + " roles",
  ];
 
  return (
    <div style={{ background: C.paper, minHeight: "100%" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
        <button
          onClick={onBack}
          style={{ ...body, background: "none", border: "none", color: C.sub, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 16 }}
        >
          ← Back to results
        </button>
 
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: career.color }} />
          <span style={{ ...body, fontSize: 13, fontWeight: 600, color: C.sub }}>{career.category}</span>
        </div>
        <h1 style={{ ...disp, fontSize: 40, fontWeight: 800, margin: "0 0 6px" }}>{career.name}</h1>
        <div style={{ ...disp, fontSize: 18, fontWeight: 700, color: C.route, marginBottom: 18 }}>{result.final}% match</div>
        <p style={{ ...body, fontSize: 15.5, color: "#3E3D38", lineHeight: 1.55, marginBottom: 28 }}>{career.description}</p>
 
        <Tabs
          tabs={["Why This Career", "Degree vs Skill Path", "Day in the Life", "Roadmap", "Ask AI"]}
          active={tab}
          onChange={setTab}
        />
 
        {tab === "Why This Career" && (
          <div>
            <div style={{ ...disp, fontSize: 15, fontWeight: 700, letterSpacing: 0.3, color: C.sub, marginBottom: 16 }}>
              WHY WE RECOMMEND THIS
            </div>
            <StatRow label="Interest Match" value={breakdown.interestMatch} color={C.route} />
            <StatRow label="Skill Match" value={breakdown.skillMatch} color={C.route} />
            <StatRow label="Local Demand" value={breakdown.localDemand} color={C.amberDeep} />
            <StatRow label="Accessibility" value={breakdown.accessibility} color={C.amberDeep} />
            <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 10, padding: 18, marginTop: 18 }}>
              <p style={{ ...body, fontSize: 15, lineHeight: 1.6, margin: 0 }}>{explanationFor(result, answers)}</p>
            </div>
            <div style={{ marginTop: 10 }}>
              <DemoTag />
            </div>
          </div>
        )}
 
        {tab === "Degree vs Skill Path" && (
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <PathwayColumn
              title="Degree Path"
              steps={career.degreePathway}
              accent="#3E6C99"
              meta={{ Duration: career.trainingDuration.degree, Cost: career.cost.degree, "Practical experience": "Via internship" }}
            />
            <PathwayColumn
              title="Skill Path"
              steps={career.skillPathway}
              accent={C.amberDeep}
              meta={{ Duration: career.trainingDuration.skill, Cost: career.cost.skill, "Practical experience": "Built in from day one" }}
            />
          </div>
        )}
 
        {tab === "Day in the Life" && (
          <div>
            {career.dayInLife.map((d, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 4 }}>
                <div style={{ ...disp, fontWeight: 700, color: C.amberDeep, width: 64, flexShrink: 0 }}>{d.time}</div>
                <div
                  style={{
                    flex: 1,
                    borderLeft: `2px solid ${C.line}`,
                    paddingLeft: 16,
                    paddingBottom: 20,
                    ...body,
                    fontSize: 14.5,
                  }}
                >
                  {d.activity}
                </div>
              </div>
            ))}
            <DemoTag />
          </div>
        )}
 
        {tab === "Roadmap" && (
          <div>
            {roadmap.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: C.asphalt,
                      color: C.amber,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      ...disp,
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < roadmap.length - 1 && <div style={{ width: 2, flex: 1, background: C.line, minHeight: 28 }} />}
                </div>
                <div style={{ ...body, fontSize: 14.5, paddingTop: 5, paddingBottom: 24 }}>{step}</div>
              </div>
            ))}
          </div>
        )}
 
        {tab === "Ask AI" && <AiAssistant career={career} profile={profile} answers={answers} />}
      </div>
    </div>
  );
}
 
/* ---------- App ---------- */
export default function App() {
  useFonts();
  const [view, setView] = useState("landing");
  const [answers, setAnswers] = useState(null);
  const [selected, setSelected] = useState(null);
 
  const profile = useMemo(() => (answers ? buildProfile(answers) : null), [answers]);
  const results = useMemo(() => {
    if (!answers) return [];
    return CAREERS.map((c) => scoreCareer(c, answers, CAREERS))
      .sort((a, b) => b.final - a.final)
      .slice(0, 3);
  }, [answers]);
 
  return (
    <div style={{ ...body, minHeight: 640, background: C.paper }}>
      {view === "landing" && <Landing onStart={() => setView("assessment")} />}
      {view === "assessment" && (
        <Assessment
          onComplete={(a) => {
            setAnswers(a);
            setView("profile");
          }}
        />
      )}
      {view === "profile" && profile && <Profile answers={answers} profile={profile} onContinue={() => setView("results")} />}
      {view === "results" && (
        <Results
          results={results}
          onOpen={(r) => {
            setSelected(r);
            setView("detail");
          }}
        />
      )}
      {view === "detail" && selected && (
        <CareerDetail result={selected} profile={profile} answers={answers} onBack={() => setView("results")} />
      )}
    </div>
  );
}
 
