import { useState } from "react";
import { motion } from "motion/react";
import { soldiers } from "../mockData";
import { SoldierPanel } from "./SoldierPanel";
import type { Soldier } from "../mockData";

const statusDot: Record<string, string> = {
  stable: "🟢", serious: "🟡", critical: "🔴", offline: "⚫",
};
const statusColor: Record<string, string> = {
  stable: "#00FF88", serious: "#FFC857", critical: "#FF4D4D", offline: "#4A6282",
};

export function LiveMap() {
  const [selected, setSelected] = useState<Soldier | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? soldiers : soldiers.filter((s) => s.status === filter);

  return (
    <div className="flex gap-4 h-full overflow-hidden">
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Filters */}
        <div className="flex gap-2">
          {["all", "stable", "serious", "critical", "offline"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-xs px-3 py-1.5 rounded border capitalize transition-colors"
              style={{
                background: filter === f ? (f === "all" ? "rgba(0,191,255,0.15)" : `${statusColor[f] || "#00BFFF"}15`) : "transparent",
                borderColor: filter === f ? (f === "all" ? "#00BFFF" : statusColor[f] || "#1B2A41") : "#1B2A41",
                color: filter === f ? (f === "all" ? "#00BFFF" : statusColor[f]) : "#4A6282",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Map */}
        <div
          className="flex-1 rounded-lg border relative overflow-hidden"
          style={{ background: "#0B1220", borderColor: "#1B2A41" }}
        >
          {/* Grid */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="biggrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1B2A41" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#biggrid)" />
            {/* Grid labels */}
            {["A", "B", "C", "D", "E"].map((l, i) => (
              <text key={l} x={i * 60 + 30} y={14} fill="#1B2A41" fontSize="10" textAnchor="middle">{l}</text>
            ))}
            {[1, 2, 3, 4, 5].map((n, i) => (
              <text key={n} x={10} y={i * 60 + 40} fill="#1B2A41" fontSize="10" textAnchor="middle">{n}</text>
            ))}
          </svg>

          {/* Terrain */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute rounded-full" style={{ left: "20%", top: "25%", width: 160, height: 80, background: "#1B3A2A" }} />
            <div className="absolute rounded-full" style={{ left: "50%", top: "45%", width: 120, height: 70, background: "#1B2A3A" }} />
            <div className="absolute rounded-full" style={{ left: "65%", top: "15%", width: 90, height: 55, background: "#2A1B1B" }} />
          </div>

          {/* Zone indicators */}
          <div
            className="absolute border-2 border-dashed rounded-lg"
            style={{ left: "15%", top: "20%", width: "25%", height: "30%", borderColor: "#00FF8840", background: "#00FF8806" }}
          >
            <span className="absolute top-1 left-2 text-xs" style={{ color: "#00FF8860" }}>SAFE ZONE</span>
          </div>
          <div
            className="absolute border-2 border-dashed rounded-lg"
            style={{ left: "55%", top: "50%", width: "30%", height: "35%", borderColor: "#FF4D4D40", background: "#FF4D4D06" }}
          >
            <span className="absolute top-1 left-2 text-xs" style={{ color: "#FF4D4D60" }}>DANGER ZONE</span>
          </div>

          {/* Soldiers */}
          {filtered.map((s) => (
            <motion.button
              key={s.id}
              onClick={() => setSelected(s === selected ? null : s)}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              whileHover={{ scale: 1.4 }}
            >
              <span className="text-xl">{statusDot[s.status]}</span>
              {s.status === "critical" && (
                <motion.div
                  animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="absolute inset-0 rounded-full"
                  style={{ background: "#FF4D4D" }}
                />
              )}
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "#0B1220", border: "1px solid #1B2A41", color: "#E6EDF3" }}
              >
                {s.name} · {s.squad}
                <div style={{ color: statusColor[s.status] }}>HR: {s.heartRate || "—"} · SpO₂: {s.spo2 || "—"}%</div>
              </div>
            </motion.button>
          ))}

          {/* Status legend */}
          <div
            className="absolute bottom-4 right-4 text-xs space-y-1 px-3 py-2 rounded"
            style={{ background: "rgba(11,18,32,0.95)", border: "1px solid #1B2A41" }}
          >
            {Object.entries(statusDot).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2" style={{ color: "#8097B1" }}>
                <span>{v}</span>
                <span className="capitalize">{k}</span>
                <span className="font-bold" style={{ color: statusColor[k] }}>
                  {soldiers.filter((s) => s.status === k).length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="w-72 shrink-0">
          <SoldierPanel soldier={selected} onClose={() => setSelected(null)} />
        </div>
      )}
    </div>
  );
}
