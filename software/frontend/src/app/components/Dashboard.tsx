import { useState } from "react";
import { motion } from "motion/react";
import { Activity, Heart, AlertTriangle, WifiOff, Users, TrendingUp } from "lucide-react";
import { soldiers, alerts } from "../mockData";
import { SoldierPanel } from "./SoldierPanel";
import type { Soldier } from "../mockData";

const statusColor: Record<string, string> = {
  stable: "#00FF88",
  serious: "#FFC857",
  critical: "#FF4D4D",
  offline: "#4A6282",
};

const statusDot: Record<string, string> = {
  stable: "🟢",
  serious: "🟡",
  critical: "🔴",
  offline: "⚫",
};

function StatCard({
  label, value, icon, color, delay,
}: {
  label: string; value: number; icon: React.ReactNode; color: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="rounded-lg p-4 border"
      style={{ background: "#0B1220", borderColor: "#1B2A41" }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs tracking-widest uppercase" style={{ color: "#4A6282" }}>
          {label}
        </span>
        <div
          className="p-2 rounded"
          style={{ background: `${color}18`, color }}
        >
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold" style={{ color }}>
        {value}
      </div>
      <div className="mt-1 h-0.5 rounded-full" style={{ background: `${color}30` }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / soldiers.length) * 100}%` }}
          transition={{ delay: delay + 0.3, duration: 0.8 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  );
}

export function Dashboard({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null);

  const counts = {
    active: soldiers.filter((s) => s.status !== "offline").length,
    stable: soldiers.filter((s) => s.status === "stable").length,
    serious: soldiers.filter((s) => s.status === "serious").length,
    critical: soldiers.filter((s) => s.status === "critical").length,
    offline: soldiers.filter((s) => s.status === "offline").length,
  };

  const recentAlerts = alerts.slice(0, 4);
  const topCasualties = soldiers
    .filter((s) => s.status !== "stable")
    .sort((a, b) => b.riskPercent - a.riskPercent)
    .slice(0, 4);

  return (
    <div className="flex gap-4 h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-4 min-w-0">
        {/* Stats */}
        <div className="grid grid-cols-5 gap-3">
          <StatCard label="Active" value={counts.active} icon={<Users size={16} />} color="#00BFFF" delay={0} />
          <StatCard label="Stable" value={counts.stable} icon={<TrendingUp size={16} />} color="#00FF88" delay={0.05} />
          <StatCard label="Serious" value={counts.serious} icon={<Activity size={16} />} color="#FFC857" delay={0.1} />
          <StatCard label="Critical" value={counts.critical} icon={<Heart size={16} />} color="#FF4D4D" delay={0.15} />
          <StatCard label="Offline" value={counts.offline} icon={<WifiOff size={16} />} color="#4A6282" delay={0.2} />
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg border overflow-hidden"
          style={{ background: "#0B1220", borderColor: "#1B2A41" }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: "#1B2A41" }}
          >
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#E6EDF3" }}>
              Battlefield Map
            </span>
            <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88" }}>
              LIVE
            </span>
          </div>
          <div
            className="relative"
            style={{
              height: 280,
              background: "linear-gradient(135deg, #060e1a 0%, #081424 50%, #060e1a 100%)",
            }}
          >
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B2A41" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            {/* Terrain patches */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute rounded-full" style={{ left: "25%", top: "30%", width: 120, height: 60, background: "#1B3A2A" }} />
              <div className="absolute rounded-full" style={{ left: "55%", top: "50%", width: 80, height: 50, background: "#1B2A3A" }} />
            </div>
            {/* Soldier markers */}
            {soldiers.map((s) => (
              <motion.button
                key={s.id}
                onClick={() => setSelectedSoldier(s)}
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                whileHover={{ scale: 1.5 }}
              >
                <div className="relative">
                  <span className="text-lg leading-none">{statusDot[s.status]}</span>
                  {s.status === "critical" && (
                    <motion.div
                      animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: "#FF4D4D" }}
                    />
                  )}
                </div>
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-1 text-xs px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none opacity-0 hover:opacity-100"
                  style={{ background: "#0B1220", color: "#E6EDF3", border: "1px solid #1B2A41", top: "100%" }}
                >
                  {s.id}
                </div>
              </motion.button>
            ))}
            {/* Legend */}
            <div
              className="absolute bottom-3 left-3 flex gap-3 text-xs px-3 py-2 rounded"
              style={{ background: "rgba(11,18,32,0.9)", border: "1px solid #1B2A41" }}
            >
              {["stable", "serious", "critical", "offline"].map((s) => (
                <span key={s} className="flex items-center gap-1" style={{ color: "#8097B1" }}>
                  {statusDot[s]} <span className="capitalize">{s}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Casualty Queue */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg border"
            style={{ background: "#0B1220", borderColor: "#1B2A41" }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: "#1B2A41" }}>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#E6EDF3" }}>
                Priority Casualties
              </span>
            </div>
            <div className="divide-y" style={{ borderColor: "#1B2A41" }}>
              {topCasualties.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setSelectedSoldier(s)}
                >
                  <span>{statusDot[s.status]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate" style={{ color: "#E6EDF3" }}>{s.name}</div>
                    <div className="text-xs" style={{ color: "#4A6282" }}>{s.squad} · {s.role}</div>
                  </div>
                  <div className="text-xs font-bold" style={{ color: statusColor[s.status] }}>
                    {s.riskPercent}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="rounded-lg border"
            style={{ background: "#0B1220", borderColor: "#1B2A41" }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: "#1B2A41" }}>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#E6EDF3" }}>
                Recent Alerts
              </span>
            </div>
            <div className="divide-y" style={{ borderColor: "#1B2A41" }}>
              {recentAlerts.map((a) => {
                const color = a.severity === "critical" ? "#FF4D4D" : a.severity === "warning" ? "#FFC857" : "#00BFFF";
                return (
                  <div key={a.id} className="flex items-start gap-3 px-4 py-3">
                    <div
                      className="mt-0.5 shrink-0 w-2 h-2 rounded-full"
                      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium" style={{ color }}>
                        {a.type}
                      </div>
                      <div className="text-xs truncate" style={{ color: "#4A6282" }}>{a.soldier}</div>
                    </div>
                    <div className="text-xs shrink-0" style={{ color: "#4A6282" }}>{a.time}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Soldier Panel */}
      {selectedSoldier && (
        <div className="w-72 shrink-0">
          <SoldierPanel soldier={selectedSoldier} onClose={() => setSelectedSoldier(null)} />
        </div>
      )}
    </div>
  );
}
