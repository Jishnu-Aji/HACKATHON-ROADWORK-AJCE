import React, { useState } from "react";
import { C, disp, body, ProgressBar, Pill } from "./UI";
import { QUESTIONS } from "../data/questions";

export default function Assessment({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hovered, setHovered] = useState(null);
  const q = QUESTIONS[step];
  const progress = (step / QUESTIONS.length) * 100;

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
    q.type === "text"
      ? (answers[q.key] || "").trim().length > 0
      : q.type === "multi"
      ? (answers[q.key] || []).length > 0
      : !!answers[q.key];

  const next = () => {
    if (step === QUESTIONS.length - 1) onComplete(answers);
    else setStep(step + 1);
  };
  const back = () => step > 0 && setStep(step - 1);

  return (
    <div style={{ background: C.paper, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px 64px" }}>
        {/* Progress header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 10,
          }}
        >
          <span style={{ ...disp, fontSize: 16, fontWeight: 700, color: C.sub, letterSpacing: 1 }}>
            MILE 0{step + 1} / 0{QUESTIONS.length}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, background: C.amber, borderRadius: 2 }} />
            <span style={{ ...disp, fontSize: 14, fontWeight: 700, color: C.asphalt, letterSpacing: 0.4 }}>
              ROADWORK
            </span>
          </div>
        </div>
        <ProgressBar value={progress} color={C.route} track={C.paperDim} h={6} />

        <div style={{ marginTop: 40, minHeight: 300 }}>
          <h2 style={{ ...disp, fontSize: 32, fontWeight: 700, color: C.ink, margin: 0 }}>
            {q.title}
          </h2>
          <p style={{ ...body, fontSize: 15, color: C.sub, marginTop: 8 }}>{q.sub}</p>

          <div style={{ marginTop: 28 }}>
            {/* Text input */}
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
                  color: C.ink,
                  background: "#fff",
                }}
              />
            )}

            {/* Single-choice */}
            {q.type === "single" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {q.options.map((opt) => {
                  const isSelected = answers[q.key] === opt;
                  const isHov = hovered === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setAnswer(opt)}
                      onMouseEnter={() => setHovered(opt)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        ...body,
                        textAlign: "left",
                        padding: "14px 16px",
                        borderRadius: 8,
                        border: `2px solid ${
                          isSelected ? C.amber : isHov ? C.amberDeep : C.line
                        }`,
                        background: isSelected
                          ? "#FFF7E0"
                          : isHov
                          ? "#FAFAF6"
                          : "#fff",
                        color: C.ink,
                        fontSize: 15.5,
                        fontWeight: isSelected ? 600 : 400,
                        cursor: "pointer",
                        transition: "all 150ms ease",
                        outline: "none",
                      }}
                    >
                      {isSelected && (
                        <span
                          style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: C.amber,
                            marginRight: 10,
                            verticalAlign: "middle",
                          }}
                        />
                      )}
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Multi-choice */}
            {q.type === "multi" && (
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {q.options.map((opt) => (
                    <Pill
                      key={opt}
                      active={(answers[q.key] || []).includes(opt)}
                      onClick={() => toggleMulti(opt)}
                    >
                      {opt}
                    </Pill>
                  ))}
                </div>
                {q.max && (
                  <div style={{ ...body, fontSize: 12.5, color: C.sub, marginTop: 12 }}>
                    Pick up to {q.max} —{" "}
                    <strong>{(answers[q.key] || []).length}/{q.max}</strong> selected
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
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
            {step === QUESTIONS.length - 1 ? "See My Profile" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
