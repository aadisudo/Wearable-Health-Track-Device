import { motion } from "motion/react";
import { X, User } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { vitalHistory } from "../mockData";
import type { Soldier } from "../mockData";

const statusColor: Record<string, string> = {
  stable: "#00FF88",
  serious: "#FFC857",
  critical: "#FF4D4D",
  offline: "#4A6282",
};

interface VitalCardProps {
  label: string;
  value: number | string;
  unit: string;
  color: string;
  chartData?: { t: number; v: number }[];
  warn?: boolean;
}

function VitalCard({ label, value, unit, color, chartData, warn }: VitalCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded border p-3 space-y-1"
      style={{
        background: "#060e1a",
        borderColor: warn ? color : "#1B2A41",
        boxShadow: warn ? `0 0 8px ${color}30` : undefined,
      }}
    >
      <div className="text-xs" style={{ color: "#4A6282" }}>{label}</div>
      <div className="text-lg font-bold" style={{ color }}>
        {value} <span className="text-xs font-normal" style={{ color: "#4A6282" }}>{unit}</span>
      </div>
      {chartData && (
        <div style={{ height: 32 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}

export function SoldierPanel({ soldier, onClose }: { soldier: Soldier; onClose: () => void }) {
  const sc = statusColor[soldier.status];
  const hrData = vitalHistory(soldier.heartRate, 8);
  const spo2Data = vitalHistory(soldier.spo2, 2);
  const tempData = vitalHistory(soldier.temperature * 10, 3);
  const respData = vitalHistory(soldier.respRate, 4);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      className="h-full overflow-y-auto rounded-lg border"
      style={{ background: "#0B1220", borderColor: "#1B2A41" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b sticky top-0 z-10"
        style={{ background: "#0B1220", borderColor: "#1B2A41" }}
      >
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#E6EDF3" }}>
          Soldier Details
        </span>
        <button onClick={onClose} className="transition-colors" style={{ color: "#4A6282" }}>
          <X size={16} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile */}
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `${sc}15`, border: `1px solid ${sc}40` }}
          >
            <User size={24} style={{ color: sc }} />
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: "#E6EDF3" }}>{soldier.name}</div>
            <div className="text-xs" style={{ color: "#4A6282" }}>{soldier.id} · {soldier.squad}</div>
            <div className="text-xs" style={{ color: "#4A6282" }}>{soldier.role}</div>
            <div
              className="mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-semibold uppercase"
              style={{ background: `${sc}20`, color: sc, border: `1px solid ${sc}40` }}
            >
              {soldier.status}
            </div>
          </div>
        </div>

        {/* Vitals */}
        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#4A6282" }}>
            Vitals
          </div>
          <div className="grid grid-cols-2 gap-2">
            <VitalCard
              label="Heart Rate"
              value={soldier.heartRate || "—"}
              unit="BPM"
              color={soldier.heartRate > 120 ? "#FF4D4D" : "#00FF88"}
              chartData={soldier.status !== "offline" ? hrData : undefined}
              warn={soldier.heartRate > 120}
            />
            <VitalCard
              label="SpO₂"
              value={soldier.spo2 || "—"}
              unit="%"
              color={soldier.spo2 < 90 ? "#FF4D4D" : soldier.spo2 < 95 ? "#FFC857" : "#00BFFF"}
              chartData={soldier.status !== "offline" ? spo2Data : undefined}
              warn={soldier.spo2 < 90}
            />
            <VitalCard
              label="Temperature"
              value={soldier.temperature || "—"}
              unit="°F"
              color={soldier.temperature > 103 ? "#FF4D4D" : soldier.temperature > 100 ? "#FFC857" : "#00FF88"}
              chartData={soldier.status !== "offline" ? tempData : undefined}
              warn={soldier.temperature > 100}
            />
            <VitalCard
              label="Resp. Rate"
              value={soldier.respRate || "—"}
              unit="/min"
              color={soldier.respRate > 30 ? "#FF4D4D" : soldier.respRate > 20 ? "#FFC857" : "#00BFFF"}
              chartData={soldier.status !== "offline" ? respData : undefined}
              warn={soldier.respRate > 25}
            />
          </div>
        </div>

        {/* Battery & Movement */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded border p-3" style={{ background: "#060e1a", borderColor: "#1B2A41" }}>
            <div className="text-xs mb-1" style={{ color: "#4A6282" }}>Battery</div>
            <div
              className="text-lg font-bold"
              style={{ color: soldier.battery < 30 ? "#FF4D4D" : soldier.battery < 60 ? "#FFC857" : "#00FF88" }}
            >
              {soldier.battery}%
            </div>
            <div className="mt-1 h-1 rounded-full" style={{ background: "#1B2A41" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${soldier.battery}%`,
                  background: soldier.battery < 30 ? "#FF4D4D" : soldier.battery < 60 ? "#FFC857" : "#00FF88",
                }}
              />
            </div>
          </div>
          <div className="rounded border p-3" style={{ background: "#060e1a", borderColor: "#1B2A41" }}>
            <div className="text-xs mb-1" style={{ color: "#4A6282" }}>Movement</div>
            <div className="text-sm font-bold" style={{ color: "#E6EDF3" }}>{soldier.movement}</div>
            <div
              className="mt-1 text-xs"
              style={{
                color: soldier.movement === "Active" ? "#00FF88" : soldier.movement === "Slow" ? "#FFC857" : "#FF4D4D",
              }}
            >
              ● {soldier.movement === "Active" ? "Operational" : soldier.movement === "Slow" ? "Reduced" : "No signal"}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
