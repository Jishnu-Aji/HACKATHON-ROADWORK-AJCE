import React from "react";
import { C, disp, body, StatRow, DemoTag, SectionLabel } from "./UI";

function CareerDNA({ profile, answers }) {
  const bars = 10;
  const makeBar = (pct) => {
    const n = Math.round((pct / 100) * bars);
    return "█".repeat(n) + "░".repeat(bars - n);
  };

  const workStyleLabel = answers.workStyle || "Mixed";
  const learningPath = answers.pathwayPref || "Open";
  const constraintLabel = answers.budget || "Balanced";

  return (
    <div
      style={{
        background: C.asphalt,
        borderRadius: 12,
        padding: "20px 22px",
        marginBottom: 20,
      }}
    >
      <SectionLabel>YOUR CAREER DNA</SectionLabel>
      {/* ASCII bar chart */}
      <div
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          marginBottom: 16,
        }}
      >
        {Object.entries(profile.traits).map(([trait, val]) => (
          <div
            key={trait}
            style={{
              display: "grid",
              gridTemplateColumns: "148px 1fr 40px",
              gap: 10,
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <span
              style={{
                color: "#9CA3AF",
                fontSize: 11,
                letterSpacing: 0.6,
                textTransform: "uppercase",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {trait}
            </span>
            <span style={{ color: C.amber, fontSize: 13, letterSpacing: 1 }}>
              {makeBar(val)}
            </span>
            <span
              style={{
                color: C.paper,
                fontWeight: 700,
                fontSize: 13,
                textAlign: "right",
              }}
            >
              {val}%
            </span>
          </div>
        ))}
      </div>

      {/* Summary chips */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 14,
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        {[
          ["WORK STYLE", workStyleLabel],
          ["LEARNING PATH", learningPath],
          ["FOCUS", constraintLabel],
        ].map(([k, v]) => (
          <div key={k}>
            <div
              style={{
                ...body,
                fontSize: 10,
                color: "#6B6A62",
                marginBottom: 2,
                letterSpacing: 0.5,
              }}
            >
              {k}
            </div>
            <div style={{ ...disp, fontSize: 15, fontWeight: 700, color: C.paper }}>
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Profile({ answers, profile, onContinue }) {
  return (
    <div style={{ background: C.paper, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "56px 24px 64px" }}>
        <DemoTag children="YOUR PROFILE" />
        <h2
          style={{
            ...disp,
            fontSize: 34,
            fontWeight: 700,
            marginTop: 14,
            marginBottom: 4,
            color: C.ink,
          }}
        >
          Your Student Profile
        </h2>
        <p style={{ ...body, fontSize: 15, color: C.sub, marginBottom: 24 }}>
          Built from your answers — this drives your career matches.
        </p>

        {/* Career DNA */}
        <CareerDNA profile={profile} answers={answers} />

        {/* Trait Strengths */}
        <div
          style={{
            background: "#fff",
            border: `1px solid ${C.line}`,
            borderRadius: 12,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <div style={{ ...disp, fontSize: 18, fontWeight: 700, marginBottom: 16, color: C.ink }}>
            Trait Strengths
          </div>
          {Object.entries(profile.traits).map(([k, v]) => (
            <StatRow key={k} label={k} value={v} color={C.route} />
          ))}
        </div>

        {/* Skills */}
        <div
          style={{
            background: "#fff",
            border: `1px solid ${C.line}`,
            borderRadius: 12,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <div style={{ ...disp, fontSize: 18, fontWeight: 700, marginBottom: 16, color: C.ink }}>
            Skill Map
          </div>
          {Object.entries(profile.skills)
            .filter(([, v]) => v >= 30)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([k, v]) => (
              <StatRow key={k} label={k} value={v} color={C.amberDeep} />
            ))}
          <div style={{ ...body, fontSize: 13, color: C.sub, marginTop: 16, padding: 12, background: C.paperDim, borderRadius: 8 }}>
            Your interest in some areas is currently ahead of your skill level. That's okay. Your roadmap will focus on building the missing skills.
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
