"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";

const TASKS = [
  { at: 22, label: "Cavablarınız təhlil olunur" },
  { at: 58, label: "Sizə uyğun məzmun seçilir" },
  { at: 90, label: "Həftəlik planınız qurulur" },
];

export function PlanLoading({ name, onDone }: { name?: string; onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((v) => (v >= 100 ? 100 : v + 1));
    }, 32);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const t = window.setTimeout(onDone, 600);
    return () => window.clearTimeout(t);
  }, [progress, onDone]);

  return (
    <div className="f-step" style={{ paddingTop: 30 }}>
      <div style={{ textAlign: "center" }}>
        <h1 className="f-title a-heading" style={{ marginBottom: 6 }}>
          Bir anlıq{name ? `, ${name}` : ""}…
        </h1>
        <p className="f-sub" style={{ marginBottom: 0 }}>
          Cavablarınız əsasında planınızı hazırlayırıq
        </p>
      </div>

      <div className="f-ring-wrap">
        <div
          className="f-ring"
          style={{ "--p": progress } as React.CSSProperties}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <p className="f-ring-num a-heading">
            {progress}
            <small>%</small>
          </p>
        </div>
      </div>

      <div className="f-tasks">
        {TASKS.map((task) => {
          const done = progress >= task.at;
          return (
            <div key={task.label} className={`f-task${done ? " done" : ""}`}>
              <span className="f-task-dot">
                <Check size={13} strokeWidth={3.2} />
              </span>
              {task.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
