import { useState } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { soldiers } from "../mockData";
import { SoldierPanel } from "./SoldierPanel";
import type { Soldier } from "../mockData";

const statusColor: Record<string, string> = {
  stable: "#00FF88", serious: "#FFC857", critical: "#FF4D4D", offline: "#4A6282",
};

export function Soldiers() {
  const [selected, setSelected] = useState<Soldier | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = soldiers.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.squad.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex gap-4 h-full overflow-hidden">
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Search + filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#4A6282" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search soldiers..."
              className="w-full pl-9 pr-4 py-2 rounded border text-xs outline-none"
              style={{
                background: "#0B1220", borderColor: "#1B2A41",
                color: "#E6EDF3",
              }}
            />
          </div>
          {["all", "stable", "serious", "critical", "offline"].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className="text-xs px-3 py-2 rounded border capitalize transition-colors"
              style={{
                background: statusFilter === f ? `${statusColor[f] || "#00BFFF"}18` : "transparent",
                borderColor: statusFilter === f ? (statusColor[f] || "#00BFFF") : "#1B2A41",
                color: statusFilter === f ? (statusColor[f] || "#00BFFF") : "#4A6282",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div
          className="flex-1 rounded-lg border overflow-hidden flex flex-col"
          style={{ background: "#0B1220", borderColor: "#1B2A41" }}
        >
          <div
            className="grid text-xs font-bold tracking-widest uppercase px-4 py-3 border-b"
            style={{
              gridTemplateColumns: "32px 1fr 80px 80px 60px 60px 60px 60px 60px 70px",
              borderColor: "#1B2A41", color: "#4A6282",
            }}
          >
            <span>#</span>
            <span>Soldier</span>
            <span>Squad</span>
            <span>Role</span>
            <span>HR</span>
            <span>SpO₂</span>
            <span>Temp</span>
            <span>Battery</span>
            <span>Risk</span>
            <span>Status</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor: "#1B2A41" }}>
            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                onClick={() => setSelected(s === selected ? null : s)}
                className="grid items-center px-4 py-3 cursor-pointer transition-colors text-xs"
                style={{
                  gridTemplateColumns: "32px 1fr 80px 80px 60px 60px 60px 60px 60px 70px",
                  background: selected?.id === s.id ? "rgba(0,255,136,0.05)" : undefined,
                  borderLeft: selected?.id === s.id ? "2px solid #00FF88" : "2px solid transparent",
                }}
              >
                <span style={{ color: "#4A6282" }}>{i + 1}</span>
                <div>
                  <div className="font-medium truncate" style={{ color: "#E6EDF3" }}>{s.name}</div>
                  <div style={{ color: "#4A6282" }}>{s.id}</div>
                </div>
                <span style={{ color: "#8097B1" }}>{s.squad}</span>
                <span style={{ color: "#8097B1" }}>{s.role}</span>
                <span style={{ color: s.heartRate > 120 ? "#FF4D4D" : "#00FF88" }}>
                  {s.heartRate || "—"}
                </span>
                <span style={{ color: s.spo2 < 90 ? "#FF4D4D" : s.spo2 < 95 ? "#FFC857" : "#00BFFF" }}>
                  {s.spo2 || "—"}%
                </span>
                <span style={{ color: s.temperature > 101 ? "#FFC857" : "#E6EDF3" }}>
                  {s.temperature || "—"}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: "#1B2A41" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${s.battery}%`,
                        background: s.battery < 30 ? "#FF4D4D" : s.battery < 60 ? "#FFC857" : "#00FF88",
                      }}
                    />
                  </div>
                  <span style={{ color: "#4A6282" }}>{s.battery}%</span>
                </div>
                <span className="font-bold" style={{ color: statusColor[s.status] }}>
                  {s.riskPercent}%
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full capitalize font-semibold"
                  style={{
                    background: `${statusColor[s.status]}18`,
                    color: statusColor[s.status],
                    border: `1px solid ${statusColor[s.status]}40`,
                  }}
                >
                  {s.status}
                </span>
              </motion.div>
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
