import { useState } from "react";
import { motion } from "motion/react";
import { AlertTriangle, Zap, Wifi, Battery, Info } from "lucide-react";
import { alerts } from "../mockData";

const severityColor: Record<string, string> = {
  critical: "#FF4D4D", warning: "#FFC857", information: "#00BFFF",
};
const typeIcon: Record<string, React.ReactNode> = {
  "Blast Detected": <Zap size={14} />,
  "Critical Soldier": <AlertTriangle size={14} />,
  "Sensor Failure": <Wifi size={14} />,
  "Battery Low": <Battery size={14} />,
};

export function Alerts() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.severity === filter);

  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {/* Filters */}
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#4A6282" }}>
          Filter:
        </span>
        {["all", "critical", "warning", "information"].map((f) => {
          const c = f === "all" ? "#00BFFF" : severityColor[f];
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-xs px-3 py-1.5 rounded border capitalize transition-colors"
              style={{
                background: filter === f ? `${c}18` : "transparent",
                borderColor: filter === f ? c : "#1B2A41",
                color: filter === f ? c : "#4A6282",
              }}
            >
              {f}
            </button>
          );
        })}
        <div className="flex-1" />
        <div className="text-xs" style={{ color: "#4A6282" }}>{filtered.length} alerts</div>
      </div>

      {/* Timeline */}
      <div className="relative pl-6">
        <div className="absolute left-2 top-0 bottom-0 w-px" style={{ background: "#1B2A41" }} />
        <div className="space-y-3">
          {filtered.map((a, i) => {
            const c = severityColor[a.severity];
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-4 top-4 w-2 h-2 rounded-full"
                  style={{ background: c, boxShadow: `0 0 6px ${c}` }}
                />

                <div
                  className="rounded-lg border p-4"
                  style={{
                    background: "#0B1220",
                    borderColor: a.severity === "critical" ? `${c}50` : "#1B2A41",
                    boxShadow: a.severity === "critical" ? `0 0 12px ${c}15` : undefined,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 p-2 rounded shrink-0"
                      style={{ background: `${c}18`, color: c }}
                    >
                      {typeIcon[a.type] || <Info size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold" style={{ color: c }}>{a.type}</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full capitalize"
                          style={{ background: `${c}18`, color: c }}
                        >
                          {a.severity}
                        </span>
                      </div>
                      <div className="text-xs mb-1" style={{ color: "#8097B1" }}>{a.soldier}</div>
                      <div className="text-xs" style={{ color: "#4A6282" }}>{a.message}</div>
                    </div>
                    <div className="text-xs shrink-0 font-mono" style={{ color: "#4A6282" }}>{a.time}</div>
                  </div>

                  {a.severity === "critical" && (
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="mt-3 flex items-center gap-2 text-xs px-3 py-1.5 rounded"
                      style={{ background: `${c}10`, color: c, border: `1px solid ${c}30` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c }} />
                      IMMEDIATE ACTION REQUIRED
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
