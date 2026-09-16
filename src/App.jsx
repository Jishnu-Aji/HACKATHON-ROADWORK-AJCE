import React, { useState, useMemo } from "react";
import { useFonts, C, disp, body } from "./components/UI";
import { CAREERS } from "./data/careers";
import { buildProfile, scoreCareer } from "./utils/matching";

import Assessment from "./components/Assessment";
import Profile from "./components/Profile";
import Results from "./components/Results";
import CareerDetail from "./components/Detail";
import CareerComparison from "./components/CareerComparison";

function Landing({ onStart, onDemo }) {
  return (
    <div style={{ background: C.asphalt, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 500, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 24 }}>
            <div style={{ width: 14, height: 14, background: C.amber, borderRadius: 3 }} />
            <div style={{ width: 14, height: 14, background: C.route, borderRadius: 3 }} />
            <div style={{ width: 14, height: 14, background: C.paper, borderRadius: 3 }} />
          </div>
          <h1 style={{ ...disp, fontSize: 64, fontWeight: 800, color: C.paper, margin: "0 0 16px", letterSpacing: 1, lineHeight: 1 }}>
            ROADWORK
          </h1>
          <p style={{ ...body, fontSize: 18, color: "#9CA3AF", marginBottom: 40 }}>
            Your Skills. Your Region. Your Path.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <button
              onClick={onStart}
              style={{ ...disp, fontSize: 18, fontWeight: 700, background: C.amber, color: C.asphalt, border: "none", padding: "16px 32px", borderRadius: 8, cursor: "pointer", letterSpacing: 0.5 }}
            >
              Start Your Road →
            </button>
            <button
              onClick={onDemo}
              style={{ ...disp, fontSize: 16, fontWeight: 700, background: "transparent", color: C.amber, border: `2px solid ${C.amber}`, padding: "14px 32px", borderRadius: 8, cursor: "pointer", letterSpacing: 0.5 }}
            >
              Try Demo (Pre-filled Profile)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  useFonts();
  const [view, setView] = useState("landing");
  const [answers, setAnswers] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleDemo = () => {
    // Fictional student profile focusing on tech and problem solving
    setAnswers({
      education: "Class 11–12",
      region: "Demo Region",
      interests: ["Technology", "Problem Solving", "Creativity"],
      subjects: ["Computer Science", "Math", "Physics"],
      skills: ["Computer Basics", "Problem Solving"],
      workStyle: "Solving difficult problems",
      budget: "Good income",
      pathwayPref: "I want to compare all routes",
    });
    setView("profile");
  };

  const profile = useMemo(() => (answers ? buildProfile(answers) : null), [answers]);
  
  const allResults = useMemo(() => {
    if (!answers) return [];
    return CAREERS.map((c) => scoreCareer(c, answers, CAREERS))
      .sort((a, b) => b.final - a.final);
  }, [answers]);

  const topResults = allResults.slice(0, 3);
  
  // Pick a surprise route: highest score in a category not present in top 3
  const surprise = useMemo(() => {
    if (!allResults.length) return null;
    const topCategories = topResults.map(r => r.career.category);
    const candidates = allResults.slice(3).filter(r => !topCategories.includes(r.career.category));
    return candidates.length > 0 ? candidates[0] : null;
  }, [allResults, topResults]);

  return (
    <div style={{ ...body, minHeight: "100vh", background: C.paper }}>
      {view === "landing" && <Landing onStart={() => setView("assessment")} onDemo={handleDemo} />}

      {view === "assessment" && (
        <Assessment
          onComplete={(a) => {
            setAnswers(a);
            setView("profile");
          }}
        />
      )}

      {view === "profile" && profile && (
        <Profile
          answers={answers}
          profile={profile}
          onContinue={() => setView("results")}
        />
      )}

      {view === "results" && (
        <Results
          results={topResults}
          surprise={surprise}
          answers={answers}
          onOpen={(r) => {
            setSelected(r);
            setView("detail");
          }}
          onCompare={() => setView("compare")}
        />
      )}

      {view === "compare" && (
        <CareerComparison
          allResults={allResults}
          onBack={() => setView("results")}
        />
      )}

      {view === "detail" && selected && (
        <CareerDetail
          result={selected}
          profile={profile}
          answers={answers}
          onBack={() => setView("results")}
        />
      )}
    </div>
  );
}
