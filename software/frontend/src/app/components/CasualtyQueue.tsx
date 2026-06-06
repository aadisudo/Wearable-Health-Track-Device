import { motion } from "motion/react";
import { soldiers } from "../mockData";

const statusColor: Record<string, string> = {
  stable: "#00FF88", serious: "#FFC857", critical: "#FF4D4D", offline: "#4A6282",
};
const priorityLabel: Record<number, string> = {
  1: "IMMEDIATE", 2: "URGENT", 3: "DELAYED", 4: "MINIMAL", 5: "EXPECTANT",
};
const priorityColor: Record<number, string> = {
  1: "#FF4D4D", 2: "#FFC857", 3: "#00BFFF", 4: "#00FF88", 5: "#4A6282",
};

export function CasualtyQueue() {
  const sorted = [...soldiers].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return b.riskPercent - a.riskPercent;
  });

  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {/* Priority legend */}
      <div
        className="flex gap-4 p-3 rounded-lg border flex-wrap"
        style={{ background: "#0B1220", borderColor: "#1B2A41" }}
      >
        {Object.entries(priorityLabel).map(([p, label]) => (
          <div key={p} className="flex items-center gap-2 text-xs">
            <div
              className="w-4 h-4 rounded flex items-center justify-center text-xs font-bold"
              style={{ background: `${priorityColor[Number(p)]}20`, color: priorityColor[Number(p)] }}
            >
              {p}
            </div>
            <span style={{ color: "#8097B1" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Queue list */}
      <div className="space-y-2">
        {sorted.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-4 p-4 rounded-lg border"
            style={{
              background: "#0B1220",
              borderColor: s.status === "critical" ? "#FF4D4D40" : "#1B2A41",
              boxShadow: s.status === "critical" ? "0 0 12px #FF4D4D15" : undefined,
            }}
          >
            {/* Queue number */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: `${priorityColor[s.priority]}20`, color: priorityColor[s.priority] }}
            >
              {i + 1}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 grid grid-cols-4 gap-2 items-center">
              <div>
                <div className="text-sm font-medium" style={{ color: "#E6EDF3" }}>{s.name}</div>
                <div className="text-xs" style={{ color: "#4A6282" }}>{s.rank}</div>
              </div>
              <div>
                <div className="text-xs" style={{ color: "#4A6282" }}>Squad</div>
                <div className="text-sm" style={{ color: "#8097B1" }}>{s.squad}</div>
              </div>
              <div>
                <div className="text-xs" style={{ color: "#4A6282" }}>Risk</div>
                <div className="text-sm font-bold" style={{ color: statusColor[s.status] }}>
                  {s.riskPercent}%
                </div>
              </div>
              <div>
                <div className="text-xs" style={{ color: "#4A6282" }}>Priority</div>
                <div
                  className="inline-flex text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{
                    background: `${priorityColor[s.priority]}20`,
                    color: priorityColor[s.priority],
                  }}
                >
                  {priorityLabel[s.priority]}
                </div>
              </div>
            </div>

            {/* Vitals strip */}
            <div className="flex gap-3 text-xs shrink-0">
              <div className="text-center">
                <div style={{ color: "#4A6282" }}>HR</div>
                <div className="font-bold" style={{ color: s.heartRate > 120 ? "#FF4D4D" : "#00FF88" }}>
                  {s.heartRate || "—"}
                </div>
              </div>
              <div className="text-center">
                <div style={{ color: "#4A6282" }}>SpO₂</div>
                <div className="font-bold" style={{ color: s.spo2 < 90 ? "#FF4D4D" : "#00BFFF" }}>
                  {s.spo2 || "—"}%
                </div>
              </div>
            </div>

            {/* Status badge */}
            <div
              className="shrink-0 text-xs px-3 py-1.5 rounded-full capitalize font-semibold"
              style={{
                background: `${statusColor[s.status]}18`,
                color: statusColor[s.status],
                border: `1px solid ${statusColor[s.status]}40`,
              }}
            >
              {s.status}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
